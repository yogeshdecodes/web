import React from "react";
import { connect } from "react-redux";
import { mapStateToProps as mapUserToProps } from "~/ducks/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserMedia from "~/features/users/components/UserMedia";
import Linkify from "react-linkify";
import Markdown from "~/components/Markdown";
import ShareBar from "~/components/ShareBar";
import config from "~/config";
import ReplyForm from "./ReplyForm";
import ReplyList from "./ReplyList";
import { deleteThread, updateThread } from "~/lib/discussions";
import Spinner from "~/components/Spinner";
import { Router } from "~/routes";
import BodyEditor from "./BodyEditor";

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

export default connect(mapUserToProps)(
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
                                        <Linkify
                                            properties={{ target: "_blank" }}
                                        >
                                            <Markdown body={this.state.body} />
                                        </Linkify>
                                    </div>
                                )}

                                {!this.state.editing && thread.type === "LINK" && (
                                    <div>
                                        <Linkify
                                            properties={{ target: "_blank" }}
                                        >
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
                                                                "gray-link-with-icon"
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
                                                                "gray-link-with-icon btn-delete"
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
