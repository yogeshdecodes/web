import React from "react";
import { Button } from "~/vendor/bulma";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import orderBy from "lodash/orderBy";
import uniqBy from "lodash/uniqBy";
import {
    deleteReply,
    deleteThread,
    getThread,
    getThreadReplies,
    postReply,
    updateReply,
    updateThread
} from "~/lib/discussions";
import Spinner from "~/components/Spinner";
import TimeAgo from "react-timeago";
import Textarea from "react-autosize-textarea";
import { Avatar } from "~/features/users";
import { mapUserToProps } from "~/ducks/user";
import Emoji from "~/components/Emoji";
import FullName from "~/features/users/components/FullName";
import config from "~/config";
import ShareBar from "~/components/ShareBar";
import Linkify from "react-linkify";
import Markdown from "~/components/Markdown";
import ReplyFaces from "~/features/discussions/ReplyFaces";
import RecentDiscussionsCard from "~/components/sidebar/RecentDiscussionsCard";
import styled from "styled-components";
import { truncate } from "~/lib/utils/random";
import InfiniteResults from "~/components/InfiniteResults";
import { Praisable } from "~/features/stream/components/Task/components/Praise";
import ReconnectingWebSocket from "reconnecting-websocket";
import { socketUrl } from "~/lib/utils/random";
import { connect } from "react-redux";
import { actions as editorActions } from "~/ducks/editor";
import { Link } from "~/routes";
import "./index.scss";
import { Router } from "~/routes";
import Head from "~/components/Head";

const HelpText = styled.span``;

function getThreadHeading(thread) {
    return (
        <div className={"flex center spaced"}>
            {thread.pinned && (
                <div className={"is-brand-green"}>
                    <strong>
                        <FontAwesomeIcon size="xs" icon={"thumbtack"} /> Pinned
                    </strong>
                </div>
            )}
            <div className={"has-text-grey"}>by @{thread.owner.username}</div>
            <div>
                <FontAwesomeIcon icon={"comments"} /> {thread.reply_count}
            </div>
            <div>
                <FontAwesomeIcon icon={"clock"} />{" "}
                <TimeAgo date={thread.created_at} />
            </div>
        </div>
    );
}

class ThreadStreamItem extends React.Component {
    renderActions = () => (
        <footer>
            <Link
                route={"discussion-page"}
                params={{ slug: this.props.thread.slug }}
            >
                <a className={"card-footer-item has-text-grey"}>
                    <FontAwesomeIcon icon={"reply"} />
                    <strong>Discuss</strong>
                    <span className={"has-text-grey-light"}>
                        {this.props.thread.reply_count} replies
                    </span>
                </a>
            </Link>
            {this.props.thread.reply_count > 0 && (
                <div className={"has-text-grey card-footer-item"}>
                    <ReplyFaces size={32} threadSlug={this.props.thread.slug} />
                </div>
            )}
        </footer>
    );

    renderThread = () => {
        let thread = this.props.thread;

        switch (thread.type) {
            case "TEXT":
            case "QUESTION":
                return (
                    <div className={thread.pinned ? "card pinned" : "card"}>
                        <div className={"flex v-center flex-gap"}>
                            <div>
                                <Avatar
                                    is={"32"}
                                    className={"img-avatar img-32"}
                                    user={thread.owner}
                                />
                            </div>
                            <div className={"topicMid"}>
                                <h2>{thread.title}</h2>
                                <div className={"note"}>
                                    {truncate(thread.body, 25, "...")}
                                </div>
                                <span className={"has-text-grey-light"}>
                                    {getThreadHeading(thread)}
                                </span>
                            </div>
                            <div>
                                <ReplyFaces
                                    threadSlug={thread.slug}
                                    withOwner={false}
                                />
                            </div>
                        </div>
                    </div>
                );

            case "LINK":
                return (
                    <div className={"card"}>
                        <div className={"flex v-center flex-gap"}>
                            <div>
                                <Avatar
                                    is={"32"}
                                    className={"img-avatar img-32"}
                                    user={thread.owner}
                                />
                            </div>
                            <div>
                                <h3>{thread.title}</h3>
                                <div className={"note"}>
                                    {thread.body.indexOf("://") === -1
                                        ? "http://" + thread.body
                                        : thread.body}
                                </div>
                                <span className={"has-text-grey-light"}>
                                    {getThreadHeading(thread)}
                                </span>
                            </div>
                            <div>
                                <ReplyFaces
                                    threadSlug={thread.slug}
                                    withOwner={false}
                                />
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    render() {
        let thread = this.props.thread;

        return (
            <Link route={"discussion-page"} params={{ slug: thread.slug }}>
                <a>
                    <div className={"ThreadStreamItem"}>
                        {this.renderThread()}
                    </div>
                </a>
            </Link>
        );
    }
}

const BodyEditor = props => (
    <div>
        <div className={"form-row"}>
            <div className="control">
                <textarea
                    value={props.value}
                    onChange={props.onChange}
                    placeholder={"Write something..."}
                />
            </div>
        </div>
        <div className={"action-container"}>
            <Button
                className={"is-rounded"}
                loading={props.loading}
                disabled={props.loading}
                onClick={props.onSubmit}
                primary
            >
                <FontAwesomeIcon icon={"reply"} />
                Submit
            </Button>
        </div>
    </div>
);

class ThreadEditor extends React.Component {
    state = {
        updating: false,
        body: null,
        failed: false
    };

    componentDidMount() {
        if (this.props.thread) {
            this.setState({
                body: this.props.thread.body
            });
        }
    }

    updateThread = async () => {
        try {
            await this.setState({
                updating: true,
                failed: false
            });
            await updateThread(this.props.thread.slug, {
                body: this.state.body
            });
            await this.setState({
                updating: false,
                failed: false
            });

            if (this.props.onFinish) {
                this.props.onFinish(this.state.body);
            }
        } catch (e) {
            this.setState({
                updating: false,
                failed: true
            });
        }
    };

    render() {
        return (
            <BodyEditor
                value={this.state.body}
                onChange={e => this.setState({ body: e.target.value })}
                loading={this.state.updating}
                onSubmit={this.updateThread}
            />
        );
    }
}

class ReplyEditor extends React.Component {
    state = {
        updating: false,
        body: null,
        failed: false
    };

    componentDidMount() {
        if (this.props.reply) {
            this.setState({
                body: this.props.reply.body
            });
        }
    }

    updateReply = async () => {
        try {
            await this.setState({
                updating: true,
                failed: false
            });
            await updateReply(this.props.reply.parent, this.props.reply.id, {
                body: this.state.body
            });
            await this.setState({
                updating: false,
                failed: false
            });

            if (this.props.onFinish) {
                this.props.onFinish(this.state.body);
            }
        } catch (e) {
            this.setState({
                updating: false,
                failed: true
            });
        }
    };

    render() {
        return (
            <BodyEditor
                value={this.state.body}
                onChange={e => this.setState({ body: e.target.value })}
                loading={this.state.updating}
                onSubmit={this.updateReply}
            />
        );
    }
}

const Thread = connect(mapUserToProps)(
    class Thread extends React.Component {
        state = {
            body: null,
            editing: false,
            deleting: false,
            deleted: false
        };

        async componentDidUpdate(prevProps) {
            if (this.props.thread !== prevProps.thread) {
                this.setState({
                    body: this.props.thread.body
                });
            }
        }

        getPermalink = () => {
            return `${config.BASE_URL}/discussions/${this.props.thread.slug}`;
        };

        generateTweetText = () => {
            return `${this.props.thread.title} \n ${this.getPermalink()}`;
        };

        toggleEditor = () => {
            this.setState({
                editing: !this.state.editing
            });
        };

        componentDidMount() {
            if (this.props.thread) {
                this.setState({
                    body: this.props.thread.body
                });
            }
        }

        deleteThread = async () => {
            await this.setState({
                deleting: true
            });
            await deleteThread(this.props.thread.slug);
            await this.setState({
                deleting: false,
                deleted: true
            });

            if (this.props.onDelete) {
                this.props.onDelete(this.props.thread.slug);
            }
        };

        render() {
            const { thread, replies = null, onCreateReply = null } = this.props;

            if (!this.props.thread) {
                return (
                    <div className={"panel-message danger"}>
                        Invalid thread.
                    </div>
                );
            }

            if (this.state.deleted) {
                Router.pushRoute("discussions");
            }

            return (
                <div className={"Thread"}>
                    <div className={"flex col-right mbGap"}>
                        <div>
                            <h1 className={"page-title"}>{thread.title}</h1>
                        </div>
                        <div>
                            <a href={"#ReplyForm"} className={"btn"}>
                                <FontAwesomeIcon icon={"plus-square"} /> Reply
                            </a>
                        </div>
                    </div>
                    <div className={"card"}>
                        <div className={"card-content flex flex-gap"}>
                            <div>
                                <Link
                                    route="profile-page"
                                    params={{ username: thread.owner.username }}
                                >
                                    <a>
                                        <img
                                            className="img-avatar img-48"
                                            src={thread.owner.avatar}
                                        />
                                    </a>
                                </Link>
                            </div>
                            <div>
                                <div className="flex flex-gap heading">
                                    <div>
                                        <FullName user={thread.owner} />
                                    </div>
                                    <div className={"has-text-grey-light"}>
                                        <FontAwesomeIcon icon={"clock"} />{" "}
                                        <TimeAgo date={thread.created_at} />
                                    </div>
                                </div>
                                {this.state.deleting && (
                                    <div className={"panel-message danger"}>
                                        <Spinner small /> Deleting...
                                    </div>
                                )}
                                {!this.state.editing && thread.type !== "LINK" && (
                                    <div>
                                        <Linkify>
                                            <Markdown body={this.state.body} />
                                        </Linkify>
                                    </div>
                                )}

                                {!this.state.editing && thread.type === "LINK" && (
                                    <div>
                                        <Linkify>
                                            <Markdown
                                                body={`[${thread.title}](${this.state.body})`}
                                            />
                                        </Linkify>
                                    </div>
                                )}
                                {this.state.editing && (
                                    <ThreadEditor
                                        thread={thread}
                                        onFinish={body =>
                                            this.setState({
                                                body: body,
                                                editing: false
                                            })
                                        }
                                    />
                                )}
                                <ShareBar
                                    permalink={this.getPermalink()}
                                    tweetText={this.generateTweetText()}
                                    extraItemsLeft={props => {
                                        if (
                                            this.props.me.id === thread.owner.id
                                        ) {
                                            return (
                                                <React.Fragment>
                                                    <div>
                                                        <button
                                                            className={
                                                                "btn-link"
                                                            }
                                                            onClick={
                                                                this
                                                                    .toggleEditor
                                                            }
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={"edit"}
                                                                size={"sm"}
                                                            />
                                                            Edit
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <button
                                                            className={
                                                                "btn-small btn-delete"
                                                            }
                                                            onClick={
                                                                this
                                                                    .deleteThread
                                                            }
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={"trash"}
                                                                size={"sm"}
                                                            />
                                                            Delete
                                                        </button>
                                                    </div>
                                                </React.Fragment>
                                            );
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <h4>{thread.reply_count} replies</h4>
                    <ReplyList
                        replies={replies}
                        thread={thread}
                        onCreateReply={onCreateReply}
                    />

                    <div className="card">
                        <div className={"card-content"}>
                            <ReplyForm
                                thread={thread}
                                onCreateReply={onCreateReply}
                            />
                        </div>
                    </div>
                </div>
            );
        }
    }
);

const Reply = connect(mapUserToProps)(
    class Reply extends React.Component {
        state = {
            body: null,
            editing: false,
            deleting: false,
            deleted: false
        };

        componentDidMount() {
            if (this.props.reply) {
                this.setState({
                    body: this.props.reply.body
                });
            }
        }

        async componentDidUpdate(prevProps) {
            if (this.props.reply !== prevProps.reply) {
                this.setState({
                    body: this.props.reply.body
                });
            }
        }

        toggleEditor = () => {
            this.setState({
                editing: !this.state.editing
            });
        };

        deleteReply = async () => {
            await this.setState({
                deleting: true
            });
            await deleteReply(this.props.reply.id, this.props.reply.parent);
            await this.setState({
                deleting: false,
                deleted: true
            });

            if (this.props.onDelete) {
                this.props.onDelete(this.props.reply.id);
            }
        };

        render() {
            const { reply, child } = this.props;

            return (
                <div className={"flex flex-gap Reply"}>
                    <div>
                        <Link
                            route="profile-page"
                            params={{ username: reply.owner.username }}
                        >
                            <a>
                                <Avatar user={reply.owner} is={32} />
                            </a>
                        </Link>
                    </div>
                    <div>
                        <div className={"flex flex-gap heading"}>
                            <div>
                                <FullName user={reply.owner} />
                            </div>
                            <div className={"has-text-grey-light"}>
                                <FontAwesomeIcon icon={"clock"} />{" "}
                                <TimeAgo date={reply.created_at} />
                            </div>
                        </div>
                        {this.state.deleting && (
                            <Spinner small text={"One moment..."} />
                        )}
                        {this.state.deleted && (
                            <em>This reply has been deleted.</em>
                        )}
                        {!this.state.editing && !this.state.deleted && (
                            <div>
                                <Linkify>
                                    <Markdown body={this.state.body} />
                                </Linkify>
                            </div>
                        )}
                        {this.state.editing && (
                            <ReplyEditor
                                reply={reply}
                                onFinish={body =>
                                    this.setState({
                                        body: body,
                                        editing: false
                                    })
                                }
                            />
                        )}
                        <div className={"flex flex-gap"}>
                            <div>
                                <Praisable
                                    button
                                    indexUrl={`/discussions/${reply.parent}/replies/${reply.id}`}
                                    initialAmount={reply.praise}
                                    item={reply}
                                />
                            </div>
                            <div>
                                <button
                                    className={"gray-link-with-icon"}
                                    onClick={() =>
                                        this.props.onClickReply(
                                            this.props.reply
                                        )
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={"reply"}
                                        size={"sm"}
                                    />
                                    Reply
                                </button>
                            </div>
                            {this.props.me.id === this.props.reply.owner.id && (
                                <>
                                    <div>
                                        <button
                                            className={"btn-small btn-gray"}
                                            onClick={this.toggleEditor}
                                        >
                                            <FontAwesomeIcon
                                                icon={"edit"}
                                                size={"sm"}
                                            />
                                            Edit
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            className={"btn-small btn-danger"}
                                            onClick={this.deleteReply}
                                        >
                                            <FontAwesomeIcon
                                                icon={"trash"}
                                                size={"sm"}
                                            />
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                        {this.props.children}
                    </div>
                </div>
            );
        }
    }
);

const ReplyForm = connect(mapUserToProps)(
    class ReplyForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                isCreating: false,
                body: props.prefillText ? props.prefillText : "",
                failed: false
            };
        }

        onSubmit = async () => {
            try {
                await this.setState({
                    isCreating: true,
                    failed: false
                });

                const reply = await postReply(
                    this.props.thread.slug,
                    this.state.body,
                    this.props.parentReply ? this.props.parentReply : null
                );

                if (this.props.onCreateReply) {
                    this.props.onCreateReply(reply);
                }

                this.setState({
                    isCreating: false,
                    body: "",
                    failed: false
                });
            } catch (e) {
                this.setState({
                    isCreating: false,
                    failed: true
                });
            }
        };

        render() {
            if (!this.props.isLoggedIn) {
                return (
                    <div className={"panel-message primary"} id={"ReplyForm"}>
                        You must be signed in to reply.{" "}
                        <Link route="begin">
                            <a className="button is-primary is-small is-rounded">
                                Get started &raquo;
                            </a>
                        </Link>
                    </div>
                );
            }

            return (
                <div className={"flex flex-gap ReplyForm"} id={"ReplyForm"}>
                    <div>
                        <Avatar user={this.props.me} is={32} />
                    </div>
                    <div className="form-row">
                        <div className="control">
                            <Textarea
                                innerRef={input =>
                                    input && this.props.focused && input.focus()
                                }
                                value={this.state.body}
                                onKeyDown={e => {
                                    if (
                                        e.keyCode === 13 &&
                                        (e.ctrlKey || e.metaKey)
                                    )
                                        this.onSubmit(e);
                                }}
                                onChange={e => {
                                    this.setState({ body: e.target.value });
                                }}
                                placeholder={"Write a reply..."}
                            />
                        </div>
                        {this.state.body.length > 0 && (
                            <HelpText>
                                <FontAwesomeIcon icon={["fab", "markdown"]} />{" "}
                                Markdown is enabled. Cmd/Ctrl+Enter to finish.{" "}
                            </HelpText>
                        )}
                        <div className={"action-container"}>
                            <Button
                                className={"is-rounded"}
                                loading={this.state.isCreating}
                                disabled={this.state.isCreating}
                                onClick={this.onSubmit}
                                primary
                            >
                                <FontAwesomeIcon icon={"reply"} />
                                Post reply
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }
    }
);

class ReplyThread extends React.Component {
    state = {
        replying: false,
        prefillText: ""
    };

    onClickReply = () => {
        this.setState({
            replying: true
        });
    };

    onCreateReply = reply => {
        this.setState({
            replying: false
        });

        if (this.props.onCreateReply) {
            this.props.onCreateReply(reply);
        }
    };

    onClickChildReply = reply => {
        this.setState({
            replying: true,
            prefillText: `@${reply.owner.username} `
        });
    };

    render() {
        const { thread, reply, childrenReplies } = this.props;
        return (
            <div className="card">
                <div className={"card-content"}>
                    <Reply reply={reply} onClickReply={this.onClickReply}>
                        {orderBy(childrenReplies, "created_at", "asc").map(
                            ch => (
                                <Reply
                                    child={true}
                                    onClickReply={this.onClickChildReply}
                                    reply={ch}
                                />
                            )
                        )}
                        {this.state.replying && (
                            <ReplyForm
                                focused
                                prefillText={this.state.prefillText}
                                parentReply={reply.id}
                                thread={thread}
                                onCreateReply={this.onCreateReply}
                            />
                        )}
                    </Reply>
                </div>
            </div>
        );
    }
}

const ReplyList = ({ replies, thread, onCreateReply = null }) => (
    <div>
        {replies.length === 0 && (
            <div className="card">
                <div className={"card-content"}>
                    <Emoji emoji={"🤔"} /> Nothing yet. Start the conversation!
                </div>
            </div>
        )}
        {orderBy(
            replies.filter(rep => !rep.parent_reply),
            "created_at",
            "asc"
        ).map(r => (
            <ReplyThread
                reply={r}
                thread={thread}
                childrenReplies={replies.filter(
                    child => child.parent_reply === r.id
                )}
                onCreateReply={onCreateReply}
            />
        ))}
    </div>
);

class Discussion extends React.Component {
    state = {
        thread: null,
        replies: null,
        isCreating: false,
        failedCreating: false,
        replyEditorValue: "",
        failed: false
    };

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
        if (this.state.isLoading) {
            return (
                <div className="center">
                    <Spinner text={"Loading discussion..."} />
                </div>
            );
        }

        if (
            this.state.failed ||
            (!this.state.isLoading && !this.state.thread)
        ) {
            return <div>Failed to load thread.</div>;
        }

        return (
            <div>
                <Head
                    title={`${this.state.thread.title} | Makerlog`}
                    description={truncate(this.state.thread.body, 10, "...")}
                    ogImage={this.state.thread.owner.avatar || null}
                />

                <Thread
                    thread={this.state.thread}
                    showActions={false}
                    replies={this.state.replies}
                    onCreateReply={this.onCreateReply}
                />
            </div>
        );
    }
}

const ThreadStream = ({ threads, compact = false }) => (
    <InfiniteResults
        url={"/discussions/"}
        withSockets
        socketTypePrefix={"thread"}
        component={({ items }) => (
            <div className={"DiscussionsList timeline"}>
                {items.map(t => (
                    <ThreadStreamItem thread={t} />
                ))}
            </div>
        )}
    />
);

export const ThreadTypeSelect = ({ isSelected, ...props }) => (
    <div
        className={
            isSelected ? `ThreadTypeSelect is-selected` : `ThreadTypeSelect`
        }
        onClick={props.onClick}
    >
        {props.children}
    </div>
);

let NewTopicButton = props => {
    if (!props.isLoggedIn) {
        return (
            <Link route={"begin"}>
                <a className={"btn-primary btn-big"}>
                    <FontAwesomeIcon icon={"plus-square"} /> New topic
                </a>
            </Link>
        );
    }
    return (
        <button className={"btn-primary btn-big"} onClick={props.openEditor}>
            <FontAwesomeIcon icon={"plus-square"} />
            New topic
        </button>
    );
};

NewTopicButton = connect(
    state => ({
        isLoggedIn: state.auth.loggedIn
    }),
    dispatch => ({
        openEditor: () => dispatch(editorActions.openDiscussionEditor(false))
    })
)(NewTopicButton);

const GreetingCard = connect(mapUserToProps)(props => {
    return (
        <div className={"card PageCard"}>
            <div className={"card-content"}>
                <h3>Join the conversation</h3>
                <span>
                    Ask questions, share links, tell us your achievements, and
                    more!
                </span>
            </div>
        </div>
    );
});

const HeaderBar = ({ title, onCreate }) => (
    <div className={"flex col-right v-center mbGap"}>
        <div>
            <h1 className={"page-title"}>{title}</h1>
        </div>
        <NewTopicButton className={"btn-primary btn-big"} onCreate={onCreate} />
    </div>
);

const Sidebar = props => (
    <div>
        <GreetingCard />
        <RecentDiscussionsCard />
    </div>
);

class DiscussionsPage extends React.Component {
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

    componentDidUpdate(prevProps, prevState) {
        if (
            this.props.thread &&
            prevProps.thread &&
            this.props.thread.slug !== prevProps.thread.slug
        ) {
            this.setState({});
        }
    }

    render() {
        const { replies, thread } = this.props;

        return (
            <div className={"container grid-c-s"}>
                <div>
                    {thread && replies ? (
                        <Discussion thread={thread} replies={replies} />
                    ) : (
                        <div>
                            <HeaderBar title={"Recent discussions"} />
                            <ThreadStream />
                        </div>
                    )}
                </div>
                <div className={"is-hidden-mobile"}>
                    <Sidebar />
                </div>
            </div>
        );
    }
}

DiscussionsPage.propTypes = {};

export default DiscussionsPage;
