import React from "react";
import uniqBy from "lodash/uniqBy";
import ReconnectingWebSocket from "reconnecting-websocket";

import Stream from "../../components/Stream";
import { socketUrl } from "~/lib/utils/random";
import pickBy from "lodash/pickBy";
import { fetchNextUrl } from "../../../../lib/tasks";
import { hasMore } from "../../../../lib/utils/stream";

class WeeklyStream extends React.Component {
    initialState = {
        initialLoaded: false,
        allLoaded: false,
        isSyncing: true,
        tasks: [],
        milestones: [],
        nextUrl: null,
        failed: false
    };

    state = this.initialState;

    async componentDidMount() {
        await this.loadMore();
        this.connect();
    }

    componentWillUnmount() {
        this.disconnect();
    }

    connect = () => {
        this.socket = new ReconnectingWebSocket(
            socketUrl(this.props.tasksIndexUrl)
        );
        this.socket.onopen = () => {
            console.log(
                `Makerlog: Established connection to ${this.props.tasksIndexUrl}.`
            );
        };
        this.socket.onmessage = this.onWsEvent;
        this.socket.onclose = () => {
            console.log(
                `Makerlog: Closed connection to ${this.props.tasksIndexUrl}.`
            );
        };
    };

    onWsEvent = event => {
        const data = JSON.parse(event.data);
        switch (data.type) {
            case "task.created":
            case "task.updated":
            case "task.sync":
                this.setState({
                    tasks: uniqBy([data.payload, ...this.state.tasks], "id")
                });
                break;

            case "task.deleted":
                this.setState({
                    tasks: this.state.tasks.filter(
                        t => t.id !== data.payload.id
                    )
                });
                break;

            case "milestone.created":
            case "milestone.updated":
                this.setState({
                    milestones: uniqBy(
                        [data.payload, ...this.state.milestones],
                        "id"
                    )
                });
                break;

            case "milestone.deleted":
                this.setState({
                    milestones: this.state.milestones.filter(
                        t => t.id !== data.payload.id
                    )
                });
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

            this.setState({ isSyncing: true });

            if (!this.state.initialLoaded && !nextUrl) {
                nextUrl = {};
                // get initial link
                if (this.props.tasksIndexUrl) {
                    nextUrl["tasks"] = this.props.tasksIndexUrl;
                }

                if (this.props.milestonesIndexUrl) {
                    nextUrl["milestones"] = this.props.milestonesIndexUrl;
                }
            }

            // we now have metadata. go ahead, let's ROLL!
            if (nextUrl && hasMore(nextUrl)) {
                // get the stream data
                const nextUrls = {};
                const dataStores = {};
                // Pick by gets rid of any null values
                const data = await Promise.all(
                    Object.keys(pickBy(nextUrl)).map(
                        async type => await fetchNextUrl(type, nextUrl[type])
                    )
                );

                data.map(item => {
                    if (!item) return;
                    nextUrls[item.type] = item.data.previous_url;
                    dataStores[item.type] = item.data.data;
                });

                this.setState({
                    isSyncing: false,
                    failed: false,
                    hasMore: hasMore(nextUrls),
                    tasks: dataStores.tasks
                        ? uniqBy(
                              [...this.state.tasks, ...dataStores.tasks],
                              "id"
                          )
                        : this.state.tasks,
                    milestones: dataStores.milestones
                        ? uniqBy(
                              [
                                  ...this.state.milestones,
                                  ...dataStores.milestones
                              ],
                              "id"
                          )
                        : this.state.milestones,
                    initialLoaded: true,
                    nextUrl: nextUrls
                });
            }

            if (!hasMore) {
                this.setState({ isSyncing: false, hasMore: false });
            }
        } catch (e) {
            this.setState({
                failed: true
            });
        }
    };

    render() {
        return (
            <Stream
                isSyncing={this.state.isSyncing}
                loadMore={this.loadMore}
                hasMore={this.state.hasMore}
                tasks={this.state.tasks}
                milestones={this.state.milestones}
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

WeeklyStream.propTypes = {};

export default WeeklyStream;
