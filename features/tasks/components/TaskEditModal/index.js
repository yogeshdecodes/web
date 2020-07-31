import React, { Component } from "react";
import { Task } from "../../../stream";
import Modal from "~/components/Modal";
import "./index.scss";
import { DoneStates, getDeltaFromDoneState, getDoneState } from "../../../../lib/utils/tasks";
import { handleChange, loadingClass } from "../../../../lib/utils/random";
import { connect } from "react-redux";
import { actions as tasksActions } from "~/ducks/tasks";
import StdErrorMessages from "~/components/forms/StdErrorMessages";
import isEqual from "lodash/isEqual";

class TaskEditModal extends Component {
    state = {
        doneState: DoneStates.DONE,
        content: ""
    };

    constructor(props) {
        super(props);
        this.state = this.getInitialState(this.props.task);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            ((prevProps.updatingId === this.props.task.id &&
                this.props.updatingId === null) ||
                (prevProps.deletingId === this.props.task.id &&
                    this.props.deletingId === null)) &&
            !this.props.errorMessages
        ) {
            this.props.onClose();
        } else if (!isEqual(prevProps.task, this.props.task)) {
            this.setState(this.getInitialState(this.props.task));
        }
    }

    getInitialState = task => {
        return {
            content: task.content,
            doneState: getDoneState(task),
            description: task.description ? task.description : ""
        };
    };

    handleChange = e => handleChange(e, this);

    onSubmit = async e => {
        if (e.preventDefault) e.preventDefault();
        this.props.updateTask(this.props.task.id, {
            content: this.state.content,
            description:
                this.state.description.length > 0
                    ? this.state.description
                    : null,
            ...getDeltaFromDoneState(this.state.doneState)
        });
    };

    onDelete = () => {
        this.props.deleteTask(this.props.task.id);
    };

    render() {
        return (
            <Modal
                modalClassName="TaskEditModal Modal panel"
                open={this.props.open}
                onClose={this.props.onClose}
            >
                <Modal.Header>
                    <div>
                        <p className="heading">Now editing</p>
                        <Task plain task={this.props.task} />
                    </div>
                </Modal.Header>
                <Modal.Content>
                    <form onSubmit={this.onSubmit}>
                        {this.props.errorMessages && (
                            <StdErrorMessages
                                error={this.props.errorMessages}
                            />
                        )}
                        <div className="control">
                            <label>Task state</label>
                            <select
                                className="select"
                                name="doneState"
                                value={this.state.doneState}
                                onChange={this.handleChange}
                            >
                                <option value={DoneStates.DONE}>Done</option>
                                <option value={DoneStates.IN_PROGRESS}>
                                    In progress
                                </option>
                                <option value={DoneStates.REMAINING}>
                                    Remaining
                                </option>
                            </select>
                        </div>
                        <div className="control">
                            <label>Task content</label>
                            <input
                                type="text"
                                name="content"
                                onChange={this.handleChange}
                                value={this.state.content}
                                placeholder="Task content"
                            />
                        </div>
                        <div className="control">
                            <label>Description</label>
                            <textarea
                                type="text"
                                name="description"
                                onChange={this.handleChange}
                                value={this.state.description}
                                placeholder="Task content"
                            />
                        </div>
                    </form>
                </Modal.Content>
                <Modal.Footer>
                    <div className="flex flex-gap v-center">
                        <div className="flex-grow v-center flex">
                            <button
                                className={loadingClass(
                                    "btn btn-delete",
                                    this.props.isDeleting
                                )}
                                onClick={this.onDelete}
                            >
                                Delete
                            </button>
                        </div>
                        <div>
                            <button
                                className={loadingClass(
                                    "btn btn-primary",
                                    this.props.isUpdating
                                )}
                                onClick={this.onSubmit}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    errorMessages: state.tasks.errorMessages,
    isUpdating: state.tasks.isUpdating,
    updatingId: state.tasks.updatingId,
    isDeleting: state.tasks.isDeleting,
    deletingId: state.tasks.deletingId
});

const mapDispatchToProps = dispatch => {
    return {
        deleteTask: id => dispatch(tasksActions.deleteTask(id)),
        updateTask: (id, payload) =>
            dispatch(tasksActions.updateTask(id, payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskEditModal);
