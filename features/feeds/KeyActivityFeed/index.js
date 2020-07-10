import React, { Component } from "react";
import { Track } from "../../../vendor/ga";
import axios from "~/lib/axios";
import { axiosWrapper } from "../../../lib/utils/error";
import ActivityFeed from "../ActivityFeed";
import { connect } from "react-redux";
import { mapStateToProps } from "~/ducks/user";
import ReconnectingWebSocket from "reconnecting-websocket";
import { socketUrl } from "../../../lib/utils/random";
import uniqBy from "lodash/uniqBy";
import { orderByDate } from "../../../lib/utils/tasks";
import orderBy from "lodash/orderBy";
import {
    getStreamClient,
    normalizeTimezones,
    orderActivities,
    getStreamClientAndToken
} from "../../../vendor/stream";

const INITIAL_QUERY = {
    limit: 25,
    enriched: true
};

function getFeedUrl(key, following = false, token = "") {
    let extra = "";
    if (following) {
        extra += "?following=1&token=${token}";
    }
    return `/feeds/${key}/${extra}`;
}

class KeyActivityFeed extends Component {
    initialState = {
        loading: false,
        initialLoaded: false,
        nextUrl: null,
        activities: [],
        failed: false,
        pages: 0
    };

    constructor(props) {
        super(props);

        if (this.props.prefetchData) {
            // Prefetched? Override.
            const prefetched = this.props.prefetchData;
            const { nextUrl, activities, token } = prefetched;
            this.token = token;

            this.state = {
                ...this.initialState,
                loading: false,
                failed: false,
                activities: activities ? activities : [],
                initialLoaded: true,
                nextUrl: nextUrl
            };
        } else {
            this.state = this.initialState;
        }
    }

    async componentDidMount() {
        if (this.token) {
            this.streamClient = await getStreamClient(this.token);
            this.feed = this.streamClient.feed(
                this.props.feed,
                this.props.userId
            );
        } else {
            this.streamClient = await getStreamClient();
            this.feed = this.streamClient.feed(
                this.props.feed,
                this.props.userId
            );
        }
        if (!this.state.initialLoaded) {
            await this.loadMore();
        } else {
            // We are server side rendered. However, the server timezone is not the local one.
            // Show the user the data, then reorder it. Prevents later issues when commenting.
            // This sucks. I don't want to show a spinner because the whole SSR magic is gone.
            // this.forceUpdate();
        }

        // this.connect();
    }

    componentWillUnmount() {
        this.disconnect();
    }

    connect = () => {
        this.socket = this.feed.subscribe(data => {
            console.log(data);
            if (data.deleted.length > 0) {
                this.setState({
                    activities: this.state.activities.filter(a => {
                        return !data.deleted.find(x => x === a.id);
                    })
                });
            }

            if (data.new.length > 0) {
                this.setState({
                    activities: uniqBy(
                        [...data.new, ...this.state.activities],
                        "id"
                    )
                });
            }
        });
    };

    /*
    onWsEvent = event => {
        const data = JSON.parse(event.data);
        switch (data.type) {
            case "activity.delta":
                if (data.batch) {
                    this.setState({
                        activities: uniqBy(
                            [
                                ...data.payload.new,
                                ...this.state.activities.filter(a => {
                                    return !data.payload.deleted.find(
                                        x => x === a.id
                                    );
                                })
                            ],
                            "id"
                        )
                    });
                }
                break;

            case "activity.created":
            case "activity.updated":
                if (data.batch) {
                    this.setState({
                        activities: uniqBy(
                            [...data.payload, ...this.state.activities],
                            "id"
                        )
                    });
                } else {
                    this.setState({
                        activities: uniqBy(
                            [data.payload, ...this.state.activities],
                            "id"
                        )
                    });
                }
                break;

            case "activity.deleted":
                if (data.batch) {
                    this.setState({
                        activities: this.state.activities.filter(a => {
                            return !data.payload.find(x => x === a.id);
                        })
                    });
                } else {
                    this.setState({
                        activities: this.state.activities.filter(
                            a => a.id !== data.payload
                        )
                    });
                }
                break;

            default:
                return;
        }
    };
    */

    disconnect = () => {
        if (this.socket) {
            this.socket.cancel();
        }
    };

    loadMore = async () => {
        const feed = this.feed;
        try {
            let nextUrl = this.state.nextUrl;
            const depth = this.state.pages + 1;
            this.setState({ loading: true, pages: depth });

            let query = {
                ...INITIAL_QUERY,
                id_lt: nextUrl
            };

            if (this.state.initialLoaded && nextUrl) {
                new Track().event(
                    `activityfeed-loadmore-${depth}-${this.props.feedKey}`,
                    "Infinite scroll load"
                );
            } else {
                delete query["id_lt"];
            }

            // we now have metadata. go ahead, let's ROLL!
            if (nextUrl || !this.state.initialLoaded) {
                // get the stream data
                const data = await feed.get(query);

                console.log(data);

                this.setState({
                    loading: false,
                    failed: false,
                    activities: uniqBy(
                        [...this.state.activities, ...data.results],
                        "id"
                    ),
                    initialLoaded: true,
                    nextUrl:
                        data.results.length > 0
                            ? data.results[data.results.length - 1].id
                            : null
                });
            }
        } catch (e) {
            console.log(e);
            this.setState({
                failed: true,
                loading: false
            });
        }
    };

    render() {
        return (
            <ActivityFeed
                isSyncing={this.state.loading}
                loadMore={this.loadMore}
                hasMore={this.state.nextUrl !== null}
                activities={this.state.activities}
                user={this.props.me}
                noActivityComponent={
                    this.props.noActivityComponent ? (
                        this.props.noActivityComponent
                    ) : (
                        <div className={"center"}>
                            <h3>There's nothing here yet.</h3>
                        </div>
                    )
                }
            />
        );
    }
}

async function prefetchActivity(feedId, userId) {
    try {
        const { client, token } = await getStreamClientAndToken();
        const feed = client.feed(feedId, userId);
        const data = await feed.get(INITIAL_QUERY);
        console.log(JSON.stringify(data.results, "", "\t"));
        return {
            nextUrl:
                data.results.length > 0
                    ? data.results[data.results.length - 1].id
                    : null,
            activities: data.results,
            token
        };
    } catch (e) {
        console.log("Unable to preload stream.", e);
        return {};
    }
}

KeyActivityFeed.propTypes = {};

export default connect(mapStateToProps)(KeyActivityFeed);
export { prefetchActivity };
