import React, { Component } from "react";
import { actions as editorActions } from "~/ducks/editor";
import Modal from "~/components/Modal";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskQueue from "~/features/tasks/components/TaskQueue";
import "./index.scss";

class Editor extends Component {
    state = {
        tab: 0
    };

    switchTab = tab => {
        this.setState({
            tab
        });
    };

    render() {
        if (!this.props.isLoggedIn) return null;

        return (
            <Modal open={this.props.open} onClose={this.props.onClose}>
                <Modal.Content>
                    {this.state.tab === 0 && <TaskQueue />}
                </Modal.Content>
                <Modal.Header>
                    <div className="Editor flex flex-gap v-center">
                        <div className="flex-grow">
                            <a
                                className={
                                    "editor-select " +
                                    (this.state.tab === 0 && "is-active")
                                }
                                onClick={e => this.switchTab(0)}
                            >
                                Task
                            </a>
                            <a
                                className={
                                    "editor-select " +
                                    (this.state.tab === 1 && "is-active")
                                }
                                onClick={e => this.switchTab(1)}
                            >
                                Milestone
                            </a>
                        </div>
                        <div>
                            <button className="btn btn-primary">Post</button>
                        </div>
                    </div>
                </Modal.Header>
            </Modal>
        );
    }
}

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
    addToQueue: () => dispatch(editorActions.addToQueue()),
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

Editor.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
