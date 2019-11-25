import React from "react";
import PropTypes from "prop-types";
import { getComments } from "~/lib/comments";
import { mapStateToProps } from "~/ducks/user";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
// import { StreamCard as Card } from "../../stream/components/Stream/components/StreamCard/styled";
import Emoji from "../../../components/Emoji";
import { Link } from "~/routes";
import { connect } from "react-redux";

class CommentsBox extends React.Component {
    state = {
        loading: false,
        comments: null,
        failed: false
    };

    messagesEnd = React.createRef();

    componentDidMount() {
        this.getComments();
    }

    getComments = async () => {
        this.setState({ loading: true });
        try {
            const comments = await getComments(this.props.indexUrl);
            let failed = false;
            let loading = false;
            this.setState({ comments, failed, loading });
            if (this.messagesEnd && comments.length) {
                this.messagesEnd.current.scrollIntoView();
            }
        } catch (e) {
            this.setState({ loading: false, failed: true });
        }
    };

    onCreate = c => {
        this.setState({ comments: [...this.state.comments, c] });
        if (this.messagesEnd) {
            this.messagesEnd.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    render() {
        return (
            <div>
                {this.state.failed && (
                    <div>
                        Couldn't load comments.{" "}
                        <button className={"btn"} onClick={this.getComments}>
                            Retry
                        </button>
                    </div>
                )}
                <div className="card">
                    <div className={"card-content"}>
                        {this.state.comments &&
                            !this.props.isLoggedIn &&
                            this.state.comments.length === 0 && (
                                <h4 className={"center"}>
                                    No comments yet.{" "}
                                    <Link route={"begin"}>
                                        <a>Sign in or join</a>
                                    </Link>{" "}
                                    to post a comment!
                                </h4>
                            )}
                        {this.state.comments &&
                            this.props.isLoggedIn &&
                            this.state.comments.length === 0 && (
                                <h4 className={"center"}>
                                    No comments yet. Start the conversation!
                                    <Emoji emoji={"👇"} />
                                </h4>
                            )}
                        {this.state.comments && this.state.comments.length > 0 && (
                            <div
                                style={{ maxHeight: "50vh", overflow: "auto" }}
                            >
                                <CommentList
                                    indexUrl={this.props.indexUrl}
                                    comments={this.state.comments}
                                />

                                <div ref={this.messagesEnd} />
                            </div>
                        )}
                    </div>
                    <footer>
                        <CommentInput
                            indexUrl={this.props.indexUrl}
                            onCreate={this.onCreate}
                            isLoading={this.state.loading}
                        />
                    </footer>
                </div>
            </div>
        );
    }
}

CommentsBox.propTypes = {
    task: PropTypes.object
};

export default connect(mapStateToProps)(CommentsBox);
