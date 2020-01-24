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
import { mapStateToProps as mapUserToProps } from "~/ducks/user";
import Emoji from "~/components/Emoji";
import FullName from "~/features/users/components/FullName";
import config from "~/config";
import ShareBar from "~/components/ShareBar";
import Linkify from "react-linkify";
import Markdown from "~/components/Markdown";
import ReplyFaces from "~/features/discussions/ReplyFaces";
import RecentDiscussionsCard from "~/components/sidebar/components/RecentDiscussionsCard";
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
import PageNavigation from "~/components/ui/PageNavigation";
import DiscussionsSidebar from "~/components/sidebar/discussions";
import OutboundLink from "../../components/OutboundLink";
import UserMedia from "~/features/users/components/UserMedia";
import MarkdownHelpText from "~/components/MarkdownHelpText";
import UserLine from "../../features/users/components/UserLine";
import sortBy from "lodash/sortBy";

function getThreadHeading(thread) {
    return (
        <small className={"flex center spaced v-center"}>
            {thread.pinned && (
                <div className={"is-brand-green"}>
                    <strong>
                        <FontAwesomeIcon size="xs" icon={"thumbtack"} /> Pinned
                    </strong>
                </div>
            )}
            <div>
                <ReplyFaces threadSlug={thread.slug} withOwner={false} />
            </div>
            <div>
                <Link route={"discussion-page"} params={{ slug: thread.slug }}>
                    <a>{thread.reply_count} comments</a>
                </Link>
            </div>
            <div>20 points</div>
            <div>
                <TimeAgo date={thread.created_at} />
            </div>
            <div>by @{thread.owner.username}</div>
        </small>
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

        /**
         * 
                        <div>
                            <ReplyFaces
                                threadSlug={thread.slug}
                                withOwner={false}
                            />
                        </div>
         */

        switch (thread.type) {
            case "TEXT":
            case "QUESTION":
                return (
                    <div className={"flex v-center flex-gap"}>
                        <div className="upvote-arrows">
                            <div className="up">
                                <FontAwesomeIcon icon="arrow-up" />
                            </div>
                            <div className="down">
                                <FontAwesomeIcon icon="arrow-down" />
                            </div>
                        </div>

                        <div className={"topicMid"}>
                            <Link
                                route={"discussion-page"}
                                params={{ slug: thread.slug }}
                            >
                                <h4>{thread.title}</h4>
                            </Link>
                            <div className="note">
                                {truncate(thread.body, 15, "...")}
                            </div>
                            <span className={"has-text-grey-light"}>
                                {getThreadHeading(thread)}
                            </span>
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
                                <OutboundLink to={thread.body}>
                                    <h3>{thread.title}</h3>
                                </OutboundLink>
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

        return <div className={"ThreadStreamItem"}>{this.renderThread()}</div>;
    }
}

const BodyEditor = props => (
    <div>
        <div className={"form-row"}>
            <div className="control">
                <textarea
                    cols={4}
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
            if (this.props.thread.slug !== prevProps.thread.slug) {
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
                    <div className={"flex col-right mbGap v-center"}>
                        <div>
                            <h2>{thread.title}</h2>
                        </div>
                        <div>
                            <a
                                href={"#ReplyForm"}
                                className={"btn btn-secondary"}
                            >
                                New reply
                            </a>
                        </div>
                    </div>
                    <div className={"card"}>
                        <div
                            className={"card-content flex flex-column flex-gap"}
                        >
                            <div className="thread-head">
                                <UserMedia user={thread.owner} />
                            </div>
                            <div className="thread-body">
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
                            </div>
                            <div className="thread-actions">
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

                    <section className="thread-replies">
                        <h3>{thread.reply_count} replies</h3>

                        <div className="card">
                            <div className="card-content">
                                <ReplyForm
                                    thread={thread}
                                    onCreateReply={onCreateReply}
                                />
                                <hr />
                                <ReplyList
                                    replies={replies}
                                    thread={thread}
                                    onCreateReply={onCreateReply}
                                />
                            </div>
                        </div>
                    </section>
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
                        <div className={"reply-user flex flex-gap"}>
                            <UserLine user={reply.owner} />
                        </div>
                        <div className="reply-body">
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
                        </div>

                        <div className={"reply-actions flex flex-gap"}>
                            <div>
                                <small>
                                    <Praisable
                                        button
                                        textForSameUser
                                        indexUrl={`/discussions/${reply.parent}/replies/${reply.id}`}
                                        initialAmount={reply.praise}
                                        item={reply}
                                    />
                                </small>
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
                    <div className={"alert is-info"} id={"ReplyForm"}>
                        <div className="alert-body">
                            <h4>You must be signed in to reply.</h4>
                            <Link route="begin">
                                <a className="btn btn-light btn-small is-rounded">
                                    Get started
                                </a>
                            </Link>
                        </div>
                    </div>
                );
            }

            return (
                <div className={"flex flex-gap ReplyForm"} id={"ReplyForm"}>
                    <div>
                        <Avatar user={this.props.me} is={32} />
                    </div>
                    <div className="form-row mb0">
                        <div className="control">
                            <Textarea
                                rows={"3"}
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
                        <div className={"action-container flex v-center"}>
                            <div>
                                <MarkdownHelpText />
                            </div>
                            <div className="flex-grow"></div>
                            <div>
                                <button
                                    className={
                                        "btn btn-light " +
                                        (this.state.isCreating
                                            ? "is-loading"
                                            : "")
                                    }
                                    disabled={this.state.isCreating}
                                    onClick={this.onSubmit}
                                >
                                    Post
                                </button>
                            </div>
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
            <Reply reply={reply} onClickReply={this.onClickReply}>
                <div className="reply-children">
                    {orderBy(childrenReplies, "created_at", "asc").map(ch => (
                        <Reply
                            child={true}
                            onClickReply={this.onClickChildReply}
                            reply={ch}
                        />
                    ))}
                </div>
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
        );
    }
}

const ReplyList = connect(mapUserToProps)(
    ({ replies, thread, onCreateReply = null, ...props }) => (
        <div className="ReplyList">
            {replies.length === 0 && (
                <div className="nothing-yet">
                    <Emoji emoji={"🤔"} /> Nothing yet. Start the conversation!
                </div>
            )}
            {sortBy(
                orderBy(
                    replies.filter(rep => !rep.parent_reply),
                    "created_at",
                    "asc"
                ),
                r => {
                    if (!props.isLoggedIn) return;
                    // sortby works by converting to 0, 1
                    return !(r.owner.id === props.me.id);
                }
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
    )
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
            <div>
                <Head
                    title={`${thread.title} | Makerlog`}
                    description={truncate(thread.body, 10, "...")}
                    ogImage={thread.owner.avatar || null}
                />

                <Thread
                    thread={thread}
                    showActions={false}
                    replies={replies}
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
            <div className={"card"}>
                <div className="card-content">
                    {items.map(t => (
                        <ThreadStreamItem thread={t} key={t.id} />
                    ))}
                </div>
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
                <a className={"btn-secondary btn-big"}>
                    <FontAwesomeIcon icon={"plus-square"} /> New topic
                </a>
            </Link>
        );
    }
    return (
        <button className={"btn-secondary btn-big"} onClick={props.openEditor}>
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
            <h2>{title}</h2>
        </div>
        <NewTopicButton onCreate={onCreate} />
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
            <>
                <PageNavigation title="Discussions">
                    <a href="" className="navbar-item">
                        Top
                    </a>{" "}
                    <a href="" className="navbar-item">
                        New
                    </a>{" "}
                    <a href="" className="navbar-item">
                        Rising
                    </a>
                </PageNavigation>
                <div className={"container grid-c-s"}>
                    <div>
                        {thread && replies ? (
                            <Discussion thread={thread} replies={replies} />
                        ) : (
                            <div>
                                <HeaderBar title="Top today" />
                                <ThreadStream />
                            </div>
                        )}
                    </div>
                    <div className={"is-hidden-mobile"}>
                        <DiscussionsSidebar thread={thread} replies={replies} />
                    </div>
                </div>
            </>
        );
    }
}

DiscussionsPage.propTypes = {};

export default DiscussionsPage;
