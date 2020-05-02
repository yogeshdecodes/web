import React from "react";
import uniqBy from "lodash/uniqBy";
import { getThread, getThreadReplies } from "~/lib/discussions";
import Spinner from "~/components/Spinner";
import { socketUrl, truncate } from "~/lib/utils/random";
import ReconnectingWebSocket from "reconnecting-websocket";
import Head from "~/components/Head";
import Thread from "~/features/discussions/Thread";
import DiscussionsPageLayout from "~/layouts/DiscussionsPage";
import "./index.scss";

export default class extends React.Component {
    state = {
        thread: null,
        replies: null,
        isCreating: false,
        failedCreating: false,
        replyEditorValue: "",
        failed: false
    };

    static async getInitialProps({ query }) {
        const layout = { className: "DiscussionsPage" };

        try {
            if (query.slug) {
                const thread = await getThread(query.slug);
                const replies = await getThreadReplies(query.slug);
                return { thread, replies, layout };
            } else {
                return { layout };
            }
        } catch (e) {
            if (e.status_code && e.status_code === 404) {
                return { statusCode: 404 };
            } else {
                return { statusCode: 500 };
            }
        }
    }

    connect = () => {
        this.socket = new ReconnectingWebSocket(
            socketUrl(`/discussions/${this.props.thread.slug}/`)
        );
        this.socket.onopen = () => {
            console.log(
                `Makerlog: Established connection to /discussions/${this.props.thread.slug}/.`
            );
        };
        this.socket.onmessage = this.onWsEvent;
        this.socket.onclose = () => {
            console.log(
                `Makerlog: Closed connection to /discussions/${this.props.thread.slug}/.`
            );
        };
    };

    onWsEvent = event => {
        const data = JSON.parse(event.data);
        switch (data.type) {
            case "reply.created":
            case "reply.updated":
                this.setState({
                    replies: uniqBy([data.payload, ...this.state.replies], "id")
                });
                break;

            case "reply.deleted":
                this.setState({
                    replies: this.state.replies.filter(
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

    async componentDidMount() {
        // Load thread or 404.

        this.setState({
            thread: this.props.thread,
            replies: this.props.replies
        });

        this.connect();
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            this.props.thread &&
            prevProps.thread &&
            this.props.thread.slug !== prevProps.thread.slug
        ) {
            this.disconnect();
            this.componentDidMount();
        }
    }

    componentWillUnmount() {
        this.disconnect();
    }

    onCreateReply = reply => {
        /*const newState = {
            replies: [...this.state.replies, reply]
        }

        this.setState(newState)*/
    };

    render() {
        const thread = this.state.thread
            ? this.state.thread
            : this.props.thread;

        const replies = this.state.replies
            ? this.state.replies
            : this.props.replies;

        if (
            this.state.isLoading ||
            (!this.state.thread && !this.props.thread && !this.state.failed)
        ) {
            return (
                <div className="center">
                    <Spinner text={"Loading discussion..."} />
                </div>
            );
        }

        if (this.state.failed) {
            return <div>Failed to load thread.</div>;
        }

        return (
            <DiscussionsPageLayout thread={thread} replies={replies}>
                <Head
                    title={`${thread.title} | Makerlog`}
                    description={truncate(thread.body, 10, "...")}
                    ogImage={thread.og_image || thread.owner.avatar || null}
                    ogLargeImage={thread.og_image ? true : false}
                />

                <Thread
                    thread={thread}
                    showActions={false}
                    replies={replies}
                    onCreateReply={this.onCreateReply}
                />
            </DiscussionsPageLayout>
        );
    }
}
