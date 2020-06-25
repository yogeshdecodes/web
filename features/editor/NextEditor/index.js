import React, { Component } from "react";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { getDeltaFromDoneState, DoneStates } from "../../../lib/utils/tasks";

class NextEditor extends Component {
    getFaIcon = task => {
        return task.done ? (
            <FontAwesomeIcon icon={"check-circle"} color="#27ae60" />
        ) : task.in_progress ? (
            <FontAwesomeIcon icon={"dot-circle"} color="#f39c12" />
        ) : (
            <FontAwesomeIcon icon={["far", "circle"]} color="#f39c12" />
        );
    };

    render() {
        return (
            <div className="NextEditor">
                <div className={"task-input posting active"}>
                    <div className={"check-case "}>
                        {this.getFaIcon(
                            getDeltaFromDoneState(this.props.doneState)
                        )}
                    </div>
                    <div className="input">
                        <input
                            disabled={false}
                            autocomplete="off"
                            placeholder={"Start typing a task..."}
                            autoFocus
                        ></input>
                    </div>
                </div>
                <div className="buttons flex flex-gap">
                    <div>
                        <button className="btn btn-light btn-small">
                            <FontAwesomeIcon
                                icon="align-justify"
                                color="var(--c-text)"
                            />{" "}
                            Add a description
                        </button>
                    </div>
                    <div>
                        <button className="btn btn-light btn-small">
                            <FontAwesomeIcon
                                icon="camera"
                                color="var(--c-text)"
                            />{" "}
                            Attach an image
                        </button>
                    </div>
                    <div>
                        <button className="btn btn-light btn-small">
                            <FontAwesomeIcon
                                icon="clock"
                                color="var(--c-text)"
                            />{" "}
                            Add a due date
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

NextEditor.defaultProps = {
    doneState: DoneStates.DONE
};

const mapStateToProps = state => ({
    isLoggedIn: state.auth.loggedIn,
    hasGold: state.user.me ? state.user.me.gold : false,
    open: state.editor.open,
    queue: state.editor.queue,
    creatingMilestone: state.editor.creatingMilestone,
    creatingDiscussion: state.editor.creatingDiscussion,
    editorDueAt: state.editor.editorDueAt,
    editorAttachment: state.editor.editorAttachment,
    isCreating: state.editor.isCreating,
    editorValue: state.editor.editorValue,
    editorDone: state.editor.editorDone,
    editorInProgress: state.editor.editorInProgress,
    createFailed: state.editor.createFailed,
    errorMessages: state.editor.errorMessages,
    fieldErrors: state.editor.fieldErrors
});

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(editorActions.toggleEditor()),
    addToQueue: t => dispatch(editorActions.addToQueue(t)),
    removeFromQueue: t => dispatch(editorActions.removeFromQueue(t)),
    createTasks: () => dispatch(editorActions.createTasks()),
    setEditorValue: v => dispatch(editorActions.setEditorValue(v)),
    setEditorDueAt: v => dispatch(editorActions.setEditorDueAt(v)),
    toggleEditorDone: () => dispatch(editorActions.toggleEditorDone()),
    setEditorAttachment: a => dispatch(editorActions.setEditorAttachment(a)),
    markDone: () => dispatch(editorActions.markDone()),
    markInProgress: () => dispatch(editorActions.markInProgress()),
    markRemaining: () => dispatch(editorActions.markRemaining()),
    openMilestoneEditor: () => dispatch(editorActions.openMilestoneEditor()),
    openDiscussionEditor: () => dispatch(editorActions.openDiscussionEditor())
});

export default connect(mapStateToProps, mapDispatchToProps)(NextEditor);
