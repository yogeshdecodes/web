import React, { Component } from "react";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import findHashtags from "find-hashtags";
import debounce from "lodash/debounce";
import { connect } from "react-redux";
import { actions as editorActions } from "~/ducks/editor";
import Dropzone from "react-dropzone";

import chrono from "chrono-node";
import { format } from "date-fns";
import { DoneStates, getDoneState } from "../../../../lib/utils/tasks";
import { createQueueItem } from "../../../../ducks/editor";

/*
PropTypes:
onChange => control onTaskAdd, remove -> returns newState
onAdd(t) => queue control
onRemove(t) => queue control
queue => controlled component state
*/

const Hashtag = (tag, inText = false) => {
    return {
        tag,
        inText
    };
};

class TaskQueue extends Component {
    constructor(props) {
        super(props);

        const defaultTask = this.createTaskObject("", true);

        this.state = {
            currentTask: defaultTask.id,
            hashtags: [],
            uploadHover: false,
            editorNaturalDate: "",
            tooLarge: false
        };
        this.dropRef = React.createRef();

        this.props.addToQueue(defaultTask);
    }

    onHoverUpload = s => {
        this.setState({
            uploadHover: s
        });
    };

    populateInitialTask = () => {
        const initialTask = this.createTaskObject("", true);
        this.setState({
            tasks: [initialTask]
        });
    };

    createTaskObject = (content = "", initial = false) => {
        return createQueueItem(content, initial);
    };

    setEditorDueAt = e => {
        this.setState({
            editorNaturalDate: e.target.value
        });
        let parsed = chrono.parseDate(e.target.value);
        if (parsed) {
            let task = this.props.queue.find(
                t => t.id === this.state.currentTask
            );
            task.due_at = parsed;
            this.props.addToQueue(task);
        }
    };

    onDueKeypress = e => {
        if (e.key === "Enter") {
            this.toggleDueEditor();
        }
    };

    cycleDoneStates = () => {
        let task = this.props.queue.find(t => t.id === this.state.currentTask);

        if (getDoneState(task) === DoneStates.DONE) {
            this.setDoneState(DoneStates.IN_PROGRESS);
        } else if (getDoneState(task) === DoneStates.IN_PROGRESS) {
            this.setDoneState(DoneStates.REMAINING);
        } else if (getDoneState(task) === DoneStates.REMAINING) {
            this.setDoneState(DoneStates.DONE);
        }
    };

    setDoneState = doneState => {
        let task = this.props.queue.find(t => t.id === this.state.currentTask);

        switch (doneState) {
            case DoneStates.DONE:
                task.done = true;
                task.in_progress = false;
                break;
            case DoneStates.IN_PROGRESS:
                task.done = false;
                task.in_progress = true;
                break;
            case DoneStates.REMAINING:
                task.done = false;
                task.in_progress = false;
                break;
        }

        console.log(getDoneState(task));

        this.props.addToQueue(task);
    };

    getClassNameForDoneState = task => {
        switch (getDoneState(task)) {
            case DoneStates.DONE:
                return "done";
            case DoneStates.IN_PROGRESS:
                return "in-progress";
            case DoneStates.REMAINING:
                return "remaining";
        }
    };

    onTaskKeyDown = e => {
        if (e.key === "Enter" && !e.shiftKey && !(e.ctrlKey || e.metaKey)) {
            // detects cmd
            const newTask = this.createTaskObject();
            this.props.addToQueue(newTask);
            this.setState({
                currentTask: newTask.id
            });
        }

        if (
            (e.key === "Enter" && e.shiftKey) ||
            (e.key === "Enter" && (e.ctrlKey || e.metaKey))
        ) {
            this.props.createTasks();
            // adding initial task moved to duck
        }

        let task = this.props.queue.find(t => t.id === this.state.currentTask);
        if (e.key == "Backspace" && task.content === "") {
            if (this.props.queue.length > 1) {
                this.setState({
                    currentTask: this.props.queue
                        .filter(t => t.id !== task.id)
                        .slice(-1)[0].id
                });
                this.props.removeFromQueue(task);
            } else {
                this.setState({ currentTask: null });
            }
        }
    };

    handleChange = e => {
        this.onTaskInput(e.target.value);

        this.setActiveTask(e.target.name);

        let task = this.props.queue.find(t => t.id === e.target.name);
        task.content = e.target.value;

        this.props.addToQueue(task);
    };

    setActiveTask = currentTask => {
        this.setState({
            currentTask
        });
    };

    doesHashtagExist = value => {
        return this.state.hashtags.find(tag => tag.tag === value);
    };

    onTaskInput = debounce(value => {
        this.setState({
            hashtags: [
                ...findHashtags(value).map(x => Hashtag(x, true)),
                ...this.state.hashtags.filter(tag => !tag.inText)
            ]
        });
    }, 300);

    changeType = type => {
        this.setState({ type });
    };

    getFaIcon = task => {
        return task.done ? (
            <FontAwesomeIcon icon={"check-circle"} color="#27ae60" />
        ) : task.in_progress ? (
            <FontAwesomeIcon icon={"dot-circle"} color="#f39c12" />
        ) : (
            <FontAwesomeIcon icon={["far", "circle"]} color="#f39c12" />
        );
    };

    onDrop = (acceptedFiles, rejectedFiles) => {
        this.onHoverUpload(false);
        let task = this.props.queue.find(t => t.id === this.state.currentTask);
        if (!acceptedFiles.length) {
            this.setState({ tooLarge: true });
            return;
        } else {
            this.setState({ tooLarge: false });
        }
        const file = acceptedFiles[0];

        task.attachment = file;

        this.props.addToQueue(task);
    };

    toggleDueEditor = () => {
        this.setState({ showDueEditor: !this.state.showDueEditor });
    };

    removeAttachment = e => {
        let task = this.props.queue.find(t => t.id === this.state.currentTask);
        delete task.attachment;
        this.props.addToQueue(task);
    };

    render() {
        const open = this.state.currentTask !== null;
        let currentTask = this.props.queue.find(
            t => t.id === this.state.currentTask
        );

        if (this.state.uploadHover)
            return (
                <Dropzone
                    maxSize={2 * 1024 * 1024}
                    className={"task-dropzone"}
                    accept="image/*"
                    multiple={false}
                    onDrop={this.onDrop}
                    disableClick
                    onDragEnter={e => this.onHoverUpload(true)}
                    onDragLeave={e => this.onHoverUpload(false)}
                >
                    <div className="upload-hover-state">
                        Drop to attach an image{" "}
                        {this.state.tooLarge ? "(too large)" : null}
                    </div>
                </Dropzone>
            );
        return (
            <div className={"TaskQueue " + (open ? "is-active" : "")}>
                <div className="controls">
                    <Dropzone
                        maxSize={2 * 1024 * 1024}
                        className={"task-dropzone"}
                        accept="image/*"
                        multiple={false}
                        onDrop={this.onDrop}
                        disableClick
                        onDragEnter={e => this.onHoverUpload(true)}
                        onDragLeave={e => this.onHoverUpload(false)}
                        ref={this.dropRef}
                    >
                        <div className="task-input-list">
                            {this.props.queue.length === 0 && (
                                <div className={"task-input posting"}>
                                    <div className={"check-case "}>
                                        {this.getFaIcon(
                                            this.createTaskObject("", true)
                                        )}
                                    </div>
                                    <div className="input">
                                        <input
                                            disabled={true}
                                            autocomplete="off"
                                            placeholder={
                                                "Start typing a task..."
                                            }
                                            autoFocus
                                        ></input>
                                    </div>
                                </div>
                            )}
                            {this.props.queue.map(task => (
                                <div
                                    className={
                                        "task-input " +
                                        ((this.state.currentTask === task.id ||
                                            this.state.currentTask === null) &&
                                        !this.props.isCreating
                                            ? "active "
                                            : " ") +
                                        (task.posting ? "posting " : " ")
                                    }
                                    onClick={e => {
                                        this.setActiveTask(task.id);
                                    }}
                                    key={task.id}
                                >
                                    <div
                                        className={
                                            "check-case " +
                                            this.getClassNameForDoneState(task)
                                        }
                                        onClick={e => this.cycleDoneStates()}
                                    >
                                        {this.getFaIcon(task)}
                                    </div>
                                    <div className="input">
                                        <input
                                            disabled={
                                                this.state.currentTask === null
                                            }
                                            autocomplete="off"
                                            onKeyDown={this.onTaskKeyDown}
                                            name={task.id}
                                            onChange={this.handleChange}
                                            value={task.content}
                                            placeholder={
                                                "Start typing a task..."
                                            }
                                            autoFocus
                                        ></input>
                                    </div>
                                    <div className="flex attach-controls flex-gap end inline">
                                        {task.due_at && (
                                            <div>
                                                <small
                                                    className="has-text-grey"
                                                    style={{ display: "block" }}
                                                >
                                                    {format(
                                                        task.due_at,
                                                        "MMMM d, yyyy (h:mm aa)"
                                                    )}
                                                </small>
                                            </div>
                                        )}
                                        <div
                                            className="cursor-pointer"
                                            onClick={e => {
                                                if (this.dropRef.current) {
                                                    this.dropRef.current.open();
                                                }
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon="camera"
                                                color="var(--c-text)"
                                            />
                                        </div>
                                        <div
                                            className="cursor-pointer"
                                            onClick={this.toggleDueEditor}
                                        >
                                            <FontAwesomeIcon
                                                icon="clock"
                                                color="var(--c-text)"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {currentTask && currentTask.attachment && (
                            <div
                                className="attachment-panel"
                                style={{
                                    background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${currentTask.attachment.preview})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center"
                                }}
                            >
                                <span
                                    onClick={this.removeAttachment}
                                    className="delete"
                                ></span>
                            </div>
                        )}
                        {currentTask && this.state.showDueEditor && (
                            <div className="flex flex-column flex-v-gap attachment-panel dyn-height">
                                <div>
                                    <div className="control">
                                        <input
                                            type="Text"
                                            autoFocus
                                            value={this.state.editorNaturalDate}
                                            onChange={this.setEditorDueAt}
                                            autoComplete={"off"}
                                            placeholder={
                                                "When is this task due? Type things like in 6 hours, in 2 days, at 6:30..."
                                            }
                                            onKeyPress={this.onDueKeypress}
                                        />
                                        <p className="help">
                                            Hit Enter to set the date.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Dropzone>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TaskQueue);
