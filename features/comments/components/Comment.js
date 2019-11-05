import React from "react";
import {Link} from "~/routes";
import {FullName, withCurrentUser} from "~/features/users";
import TimeAgo from "react-timeago";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Markdown from "~/components/Markdown";
import {deleteComment, editComment} from "../../../lib/comments";

class CommentEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            content: this.props.body ? this.props.body : "",
            failed: false
        };
    }

    onSubmit = async e => {
        e.preventDefault();
        try {
            this.setState({
                loading: true,
                failed: false
            });
            await editComment(
                this.props.indexUrl,
                this.props.comment.id,
                this.state.content
            );
            this.setState({
                loading: false,
                failed: false
            });
            if (this.props.onFinish) this.props.onFinish(this.state.content);
        } catch (e) {
            this.setState({
                loading: false,
                failed: true
            });
        }
    };

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className={"form-row"}>
                    <textarea
                        value={this.state.content}
                        onChange={e =>
                            this.setState({ content: e.target.value })
                        }
                    />
                </div>
                <div className={"form-row"}>
                    <button className={"btn"} loading={this.state.loading}>
                        {this.state.failed
                            ? "Failed to edit. Try again later."
                            : "Submit"}
                    </button>
                </div>
            </form>
        );
    }
}

class Comment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            deleted: false,
            body: this.props.comment ? this.props.comment.content : ""
        };
    }

    toggleEditing = e => {
        this.setState({
            editing: !this.state.editing
        });
    };

    onFinish = body => {
        this.setState({
            body,
            editing: false
        });
    };

    onDelete = async e => {
        try {
            await deleteComment(this.props.indexUrl, this.props.comment.id);
            this.setState({ deleted: true, body: "" });
        } catch (e) {
            this.setState({ deleted: false, body: "" });
        }
    };

    render() {
        const props = this.props;

        return (
            <div className={"Comment"}>
                <div className={"flex flex-gap"}>
                    <div>
                        <Link
                            route={"profile-page"}
                            params={{ username: props.comment.user.username }}
                        >
                            <a>
                                <img
                                    className={"img-avatar img-32"}
                                    src={props.comment.user.avatar}
                                    alt={"avatar"}
                                />
                            </a>
                        </Link>
                    </div>
                    <div className={"CommentInfo is-hidden-touch"}>
                        <div>
                            <strong>
                                <FullName user={props.comment.user} />
                            </strong>
                        </div>
                        <div>
                            <span className={"note"}>
                                <TimeAgo date={props.comment.created_at} />
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div style={{ marginTop: 5, marginBottom: 5 }}>
                            {this.state.editing ? (
                                <CommentEditor
                                    indexUrl={this.props.indexUrl}
                                    comment={this.props.comment}
                                    body={this.state.body}
                                    onFinish={this.onFinish}
                                />
                            ) : (
                                <Markdown body={this.state.body} />
                            )}
                            {this.state.deleted && (
                                <em>This comment was deleted.</em>
                            )}
                        </div>
                        <div className={"flex"}>
                            {this.props.me.id === this.props.comment.user.id &&
                                !this.state.editing && (
                                    <>
                                        <div>
                                            <button
                                                className={"btn"}
                                                onClick={this.toggleEditing}
                                            >
                                                <FontAwesomeIcon
                                                    icon={"edit"}
                                                />{" "}
                                                Edit
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                className={"btn"}
                                                onClick={this.onDelete}
                                            >
                                                <FontAwesomeIcon
                                                    icon={"trash"}
                                                />{" "}
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withCurrentUser(Comment);
