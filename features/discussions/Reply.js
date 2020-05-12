import React from "react";
import { connect } from "react-redux";
import { mapStateToProps as mapUserToProps } from "~/ducks/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "~/routes";
import Avatar from "~/features/users/components/Avatar";
import Linkify from "react-linkify";
import UserLine from "~/features/users/components/UserLine";
import Markdown from "~/components/Markdown";
import Praisable from "~/features/stream/components/Task/components/Praise/Praisable";
import ReplyEditor from "./ReplyEditor";
import Spinner from "~/components/Spinner";
import { deleteReply } from "~/lib/discussions";

export default connect(mapUserToProps)(
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
            try {
                await this.setState({
                    deleting: true,
                    failedDeletion: false
                });
                await deleteReply(this.props.reply.id, this.props.reply.parent);
                await this.setState({
                    deleting: false,
                    deleted: true
                });
                if (this.props.onDelete) {
                    this.props.onDelete(this.props.reply.id);
                }
            } catch (e) {
                this.setState({
                    failedDeletion: true
                });
            }
        };

        render() {
            const { reply, child } = this.props;

            return (
                <div
                    className={"flex flex-gap Reply"}
                    id={"reply-" + (reply ? reply.id : null)}
                >
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
                    <div style={{ width: "100%" }}>
                        <div className={"reply-user flex flex-gap"}>
                            <UserLine user={reply.owner} />
                        </div>
                        <div className="reply-body mb-em">
                            {this.state.deleting && (
                                <Spinner small text={"One moment..."} />
                            )}
                            {this.state.deleted && (
                                <em>This reply has been deleted.</em>
                            )}
                            {!this.state.editing &&
                                !this.state.deleted &&
                                !this.state.deleting && (
                                    <div>
                                        <Linkify
                                            properties={{ target: "_blank" }}
                                        >
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
                                            className={"btn-small btn-delete"}
                                            onClick={this.deleteReply}
                                            disabled={this.state.failedDeletion}
                                        >
                                            <FontAwesomeIcon
                                                icon={"trash"}
                                                size={"sm"}
                                            />
                                            {this.state.failedDeletion
                                                ? "Failed to delete. Try again later."
                                                : "Delete"}
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
