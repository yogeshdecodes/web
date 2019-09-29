import React from "react";
import { processTaskString } from "../../../../lib/utils/tasks";
import { connect } from "react-redux";
import TimeAgo from "react-timeago";
import { TaskDetailModal } from "~/features/stream";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mapDispatchToProps from "../../containers/mapDispatchToProps";

class KanbanTask extends React.Component {
    state = {
        editing: false,
        actionsActive: false
    };

    toggleEditing = () => {
        this.setState({
            editing: !this.state.editing
        });
    };

    toggleActions = () => {
        this.setState({
            actionsActive: !this.state.actionsActive
        });
    };

    render() {
        return (
            <div
                className={
                    "KanbanTask " +
                    (this.props.task.done ? "done" : "remaining")
                }
                onMouseEnter={this.toggleActions}
                onMouseLeave={this.toggleActions}
            >
                <div className={"task-content"}>
                    {processTaskString(this.props.task)}
                </div>
                <small className={"time-ago"}>
                    {this.props.task.done_at && (
                        <span>
                            Done <TimeAgo date={this.props.task.done_at} />
                        </span>
                    )}

                    {!this.props.task.done_at && (
                        <span>
                            Added <TimeAgo date={this.props.task.created_at} />
                        </span>
                    )}
                </small>

                <TaskDetailModal
                    open={this.state.editing}
                    onClose={this.toggleEditing}
                    task={this.props.task}
                />

                <div className="hover-panel">
                    {this.props.extraButtons}
                    <a
                        onClick={this.toggleEditing}
                        className="btn btn-small btn-gray"
                    >
                        <FontAwesomeIcon icon={"edit"} /> Edit
                    </a>

                    <a
                        onClick={() =>
                            this.props.deleteTask(this.props.task.id)
                        }
                        className="btn btn-delete"
                    >
                        <FontAwesomeIcon icon={"trash"} /> Delete
                    </a>
                </div>
            </div>
        );
    }
}

export default connect(
    null,
    mapDispatchToProps
)(KanbanTask);
