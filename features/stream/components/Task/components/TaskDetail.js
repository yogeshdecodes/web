import React from "react";
import { connect } from "react-redux";
import { actions as tasksActions } from "~/ducks/tasks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { actions as streamActions } from "~/ducks/stream";
import Embed from "~/components/Embed";
import config from "~/config";
import ShareBar from "~/components/ShareBar";
import { handleChange, onEnter } from "../../../../../lib/utils/random";
import TaskEditModal from "../../../../tasks/components/TaskEditModal";

class TaskDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            initialContent: this.props.task.content,
            embedOpen: false,
            confirmDelete: false,
            marking: false,
            editing: false,
            editingPosting: false,
            editingFailed: false
        };
    }

    toggleEditing = () => {
        this.setState({
            editing: !this.state.editing
        });
    };

    renderEditingState = () => (
        <div className={"form-row"}>
            <input
                type={"text"}
                value={this.state.initialContent}
                onKeyDown={e => {
                    if (e.keyCode === 13) {
                        this.onEdit({ content: this.state.initialContent });
                        this.setState({ editing: false });
                    }
                }}
                onChange={e => {
                    this.setState({ initialContent: e.target.value });
                }}
            />
        </div>
    );

    onChangeStatus = () => {
        this.setState({
            marking: !this.state.marking
        });
    };

    getPermalink = () => {
        return `${config.BASE_URL}/tasks/${this.props.task.id}`;
    };

    generateTweetText = () => {
        return `✅ ${this.props.task.content} \n ${this.getPermalink()}`;
    };

    toggleEmbed = () => {
        this.setState({
            embedOpen: !this.state.embedOpen
        });
    };

    onTryDelete = () => {
        if (this.state.confirmDelete) {
            this.onDelete();
        }

        this.setState({ confirmDelete: true });
    };

    onDelete = () => {
        this.props.deleteTask(this.props.task.id);
        this.props.removeFromStream(this.props.task.id);
        if (this.props.onDelete) {
            this.props.onDelete(this.props.task);
        }
    };

    renderActionBar = () => {
        if (
            this.props.isLoggedIn &&
            this.props.me.id === this.props.task.user.id
        ) {
            return (
                <ShareBar
                    tweetText={this.generateTweetText()}
                    permalink={this.getPermalink()}
                    rightAlignShare
                    extraPermalinkText={` #${this.props.task.id}`}
                    extraItemsRight={() => (
                        <div>
                            <a
                                className={"gray-link-with-icon"}
                                onClick={this.toggleEmbed}
                            >
                                <FontAwesomeIcon icon={"code"} size={"sm"} />
                                Embed
                            </a>
                        </div>
                    )}
                    extraItemsFirst={() => (
                        <>
                            <div>
                                {this.props.extraItemsFirst
                                    ? this.props.extraItemsFirst
                                    : null}
                                <a
                                    className={"gray-link-with-icon"}
                                    onClick={this.toggleEditing}
                                >
                                    <FontAwesomeIcon
                                        icon={"edit"}
                                        size={"sm"}
                                    />
                                    Edit
                                </a>

                                <a
                                    className="gray-link-with-icon"
                                    onClick={this.onTryDelete}
                                >
                                    <FontAwesomeIcon icon={"trash"} />
                                    {!this.state.confirmDelete && "Delete"}
                                    {this.state.confirmDelete && (
                                        <span>
                                            &nbsp;Click again to confirm.
                                        </span>
                                    )}
                                </a>
                            </div>
                        </>
                    )}
                />
            );
        } else {
            return (
                <ShareBar
                    tweetText={this.generateTweetText()}
                    permalink={this.getPermalink()}
                    extraPermalinkText={` #${this.props.task.id}`}
                    extraItemsLeft={() => (
                        <div>
                            <a
                                className={"gray-link-with-icon"}
                                onClick={this.toggleEmbed}
                            >
                                <FontAwesomeIcon icon={"code"} size={"sm"} />
                                Embed
                            </a>
                        </div>
                    )}
                />
            );
        }
    };

    render() {
        return (
            <div>
                {this.renderActionBar()}
                {this.state.editing && (
                    <TaskEditModal
                        task={this.props.task}
                        open={this.state.editing}
                        onClose={this.toggleEditing}
                    />
                )}
                {this.state.embedOpen && (
                    <div style={{ width: "50%" }}>
                        <Embed
                            task
                            url={`/tasks/${this.props.task.id}/embed`}
                        />
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    me: state.user.me,
    user: state.user.me,
    isLoggedIn: state.auth.loggedIn
});

export default connect(mapStateToProps, dispatch => ({
    updateTask: (id, payload) => {
        dispatch(tasksActions.updateTask(id, payload));
    },
    deleteTask: id => dispatch(tasksActions.deleteTask(id)),
    removeFromStream: id => dispatch(streamActions.removeTask(id)),
    markDone: id => dispatch(tasksActions.markDone(id)),
    markInProgress: id => dispatch(tasksActions.markInProgress(id)),
    markRemaining: id => dispatch(tasksActions.markRemaining(id))
}))(TaskDetail);
