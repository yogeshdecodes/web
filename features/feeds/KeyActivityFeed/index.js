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
        failed: false
    };

    constructor(props) {
        super(props);

        if (this.props.prefetchData) {
            // Prefetched? Override.
            const prefetched = this.props.prefetchData;
            const { nextUrl, activities } = prefetched;

            console.log(nextUrl, activities);

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
        if (!this.state.initialLoaded) {
            await this.loadMore();
        } else {
            // We are server side rendered. However, the server timezone is not the local one.
            // Show the user the data, then reorder it. Prevents later issues when commenting.
            // This sucks. I don't want to show a spinner because the whole SSR magic is gone.
            // this.forceUpdate();
        }

        this.connect();
    }

    componentWillUnmount() {
        this.disconnect();
    }

    connect = () => {
        this.socket = new ReconnectingWebSocket(
            socketUrl(getFeedUrl(this.props.feedKey))
        );
        this.socket.onopen = () => {
            console.log(
                `Makerlog: Established connection to ${getFeedUrl(
                    this.props.feedKey
                )}.`
            );
        };
        this.socket.onmessage = this.onWsEvent;
        this.socket.onclose = () => {
            console.log(
                `Makerlog: Closed connection to ${getFeedUrl(
                    this.props.feedKey
                )}.`
            );
        };
    };

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

    disconnect = () => {
        if (this.socket) {
            this.socket.close();
        }
    };

    loadMore = async () => {
        try {
            let nextUrl = this.state.nextUrl;

            this.setState({ loading: true });

            if (this.state.initialLoaded && nextUrl) {
                new Track().event(
                    "activityfeed-more-loaded",
                    "Infinite scroll load"
                );
            } else {
                nextUrl = getFeedUrl(this.props.feedKey);
            }

            // we now have metadata. go ahead, let's ROLL!
            if (nextUrl) {
                // get the stream data
                const { data } = await axiosWrapper(axios.get, nextUrl);

                this.setState({
                    loading: false,
                    failed: false,
                    activities: [...data.results, ...this.state.activities],
                    initialLoaded: true,
                    nextUrl: data.next
                });
            }

            if (!hasMore) {
                this.setState({ loading: false });
            }
        } catch (e) {
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

async function prefetchActivity(key) {
    try {
        const { data } = await axiosWrapper(axios.get, getFeedUrl(key));
        return { nextUrl: data.next, activities: data.results };
    } catch (e) {
        console.log("Unable to preload stream.", e);
        return {};
    }
}

KeyActivityFeed.propTypes = {};

export default connect(mapStateToProps)(KeyActivityFeed);
export { prefetchActivity };
