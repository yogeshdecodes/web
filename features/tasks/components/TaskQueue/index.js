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
import {
    DoneStates,
    getDoneState,
    getDeltaFromDoneState
} from "../../../../lib/utils/tasks";
import { createQueueItem } from "../../../../ducks/editor";
import DueCountdown from "~/components/DueCountdown";
import omit from "lodash/omit";

/*
PropTypes:
onChange => control onTaskAdd, remove -> returns newState
onAdd(t) => queue control
onRemove(t) => queue control
queue => controlled component state
doneState={DoneState.STATE}
*/

// Optimize performance for attachment previews
class AttachmentPreview extends React.Component {
    shouldComponentUpdate(nextProps) {
        return (
            this.props.attachment !== nextProps.attachment &&
            (nextProps !== null || nextProps !== undefined)
        );
    }

    render() {
        if (!this.props.attachment) return null;
        return (
            <div
                className="attachment-panel"
                style={{
                    background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${this.props.attachment.preview})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                <span onClick={this.props.onRemove} className="delete"></span>
            </div>
        );
    }
}

const Hashtag = (tag, inText = false) => {
    return {
        tag,
        inText
    };
};

class TaskQueue extends Component {
    constructor(props) {
        super(props);

        let currentTask = this.getCurrentTask();

        /*if (this.props.queue.length === 0) {
            currentTask = ;
        } else {
            currentTask = this.getCurrentTask();
        }*/

        this.state = {
            hashtags: [],
            uploadHover: false,
            editorNaturalDate: "",
            tooLarge: false,
            content: currentTask.content,
            showDescriptionEditor: false
        };
        this.dropRef = React.createRef();

        if (this.props.queue.length === 0) {
            this.props.addToQueue(currentTask);
        }
    }

    componentDidMount() {
        if (this.props.queue.length > 0 && this.props.doneState !== undefined) {
            this.setDoneState(this.props.doneState);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            this.props.isCreating == true &&
            prevProps.isCreating !== this.props.isCreating
        ) {
            this.setState({
                showDescriptionEditor: false,
                showDueEditor: false
                // content: ""
            });
        }

        if (prevProps.isCreating == true && !this.props.isCreating) {
            this.setState({
                content: ""
            });
        }

        if (
            this.props.isCreating === false &&
            prevProps.isCreating !== this.props.isCreating &&
            !prevProps.isCreating
        ) {
            this.setState({ content: "" });
        }

        if (this.props.queue.length == 0 && prevProps.queue.length > 0) {
            this.props.addToQueue(this.createTaskObject("", true));
        }
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
        return createQueueItem(
            content,
            initial,
            this.props.doneState !== undefined
                ? this.props.doneState
                : DoneStates.DONE
        );
    };

    setEditorDueAt = e => {
        this.setState({
            editorNaturalDate: e.target.value
        });
        let parsed = chrono.parseDate(e.target.value);
        if (parsed) {
            let task = this.props.queue.find(
                t => t.id === this.props.activeTask
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
        if (this.props.doneState !== undefined) return;
        let task = this.getCurrentTask();

        if (getDoneState(task) === DoneStates.DONE) {
            this.setDoneState(DoneStates.IN_PROGRESS);
        } else if (getDoneState(task) === DoneStates.IN_PROGRESS) {
            this.setDoneState(DoneStates.REMAINING);
        } else if (getDoneState(task) === DoneStates.REMAINING) {
            this.setDoneState(DoneStates.DONE);
        }
    };

    setDoneState = doneState => {
        let task = this.getCurrentTask();
        if (!task) return;

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

        this.props.updateQueueItem(task);
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
        if (this.props.withoutQueue && e.key === "Enter") {
            // Skip the queue.
            this.props.createTasks();
            return;
        }

        if (e.key === "Enter" && !e.shiftKey && !(e.ctrlKey || e.metaKey)) {
            // detects cmd
            const newTask = this.createTaskObject();
            this.props.addToQueue(newTask);
            this.setState({
                currentTask: newTask.id,
                content: ""
            });
        }

        if (
            (e.key === "Enter" && e.shiftKey) ||
            (e.key === "Enter" && (e.ctrlKey || e.metaKey))
        ) {
            this.props.createTasks();
            // adding initial task moved to duck
        }

        let task = this.getCurrentTask();
        if (e.key == "Backspace" && task.content === "") {
            if (this.props.queue.length > 1) {
                const prevTask = this.props.queue
                    .filter(t => t.id !== task.id)
                    .slice(-1)[0];
                this.setState({
                    currentTask: prevTask.id,
                    content: prevTask.content
                });
                this.props.removeFromQueue(task);
            } else {
                //this.setState({ currentTask: null });
            }
        }
    };

    handleChange = e => {
        //this.onTaskInput(e.target.value);

        this.setActiveTask(e.target.name);

        let task = this.getCurrentTask();
        task.content = e.target.value;
        this.setState({ content: task.content });
    };

    setActiveTask = (activeTask, content) => {
        this.props.setActiveTask(activeTask);
        this.setState({
            // currentTask,
            content
        });
    };

    doesHashtagExist = value => {
        return this.state.hashtags.find(tag => tag.tag === value);
    };

    onTaskInput = debounce(value => {
        /*this.setState({
            hashtags: [
                ...findHashtags(value).map(x => Hashtag(x, true)),
                ...this.state.hashtags.filter(tag => !tag.inText)
            ]
        });*/
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
        let task = this.getCurrentTask();
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

    getCurrentTask = () => {
        const task = this.props.queue.find(t => t.id === this.props.activeTask);
        if (!task) return this.createTaskObject("", true);
        return task;
    };

    toggleDueEditor = () => {
        if (!this.state.showDueEditor && this.getCurrentTask()) {
            // Delete on second open.
            this.props.updateQueueItem({
                ...this.getCurrentTask(),
                due_at: null
            });
        }
        this.setState({
            showDueEditor: !this.state.showDueEditor,
            showDescriptionEditor: false,
            editorNaturalDate: ""
        });
    };

    removeAttachment = e => {
        let task = this.getCurrentTask();
        delete task.attachment;
        this.props.addToQueue(task);
    };

    toggleDescriptionEditor = () => {
        this.setState({
            showDescriptionEditor: !this.state.showDescriptionEditor,
            showDueEditor: false
        });
    };

    onDescriptionChange = e => {
        let task = this.getCurrentTask();
        this.props.updateQueueItem({
            ...task,
            description: e.target.value.length ? e.target.value : null
        });
    };

    syncTaskContent = debounce(val => {
        // Sync for performance reasons.
        this.props.updateQueueItem({
            ...this.getCurrentTask,
            content: val
        });
    }, 200);

    render() {
        const open = this.props.activeTask !== null;
        let currentTask = this.getCurrentTask();

        if (!currentTask) return null;

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
                                <>
                                    <div
                                        className={
                                            "task-input " +
                                            ((this.props.activeTask ===
                                                task.id ||
                                                this.props.activeTask ===
                                                    null) &&
                                            !this.props.isCreating
                                                ? "active "
                                                : " ") +
                                            (task.posting ? "posting " : " ")
                                        }
                                        onClick={e => {
                                            this.setActiveTask(
                                                task.id,
                                                task.content
                                            );
                                        }}
                                        key={task.id}
                                    >
                                        <div
                                            className={
                                                "check-case " +
                                                this.getClassNameForDoneState(
                                                    task
                                                )
                                            }
                                            onClick={e =>
                                                this.cycleDoneStates()
                                            }
                                        >
                                            {this.getFaIcon(task)}
                                        </div>
                                        <div className="input">
                                            <input
                                                disabled={
                                                    this.props.activeTask ===
                                                    null
                                                }
                                                autocomplete="off"
                                                onKeyDown={this.onTaskKeyDown}
                                                name={task.id}
                                                onChange={e => {
                                                    this.handleChange(e);
                                                    this.syncTaskContent(
                                                        e.target.value
                                                    );
                                                }}
                                                value={
                                                    this.props.activeTask ===
                                                        task.id ||
                                                    this.props.activeTask ===
                                                        null
                                                        ? this.state.content
                                                        : task.content
                                                }
                                                placeholder={
                                                    "Start typing a task..."
                                                }
                                                autoFocus
                                            ></input>
                                        </div>
                                    </div>
                                    {(this.props.activeTask === task.id ||
                                        this.props.activeTask === null) &&
                                    !this.props.isCreating ? (
                                        <div className="task-controls">
                                            <div className="buttons flex flex-gap">
                                                <div>
                                                    <button
                                                        onClick={
                                                            this
                                                                .toggleDescriptionEditor
                                                        }
                                                        className={
                                                            "btn btn-light btn-small" +
                                                            (currentTask.description
                                                                ? " btn-selected"
                                                                : "")
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            icon="align-justify"
                                                            color="var(--c-text)"
                                                        />{" "}
                                                        Add a description
                                                    </button>
                                                </div>
                                                <div>
                                                    <button
                                                        onClick={e => {
                                                            if (
                                                                this.dropRef
                                                                    .current
                                                            ) {
                                                                this.dropRef.current.open();
                                                            }
                                                        }}
                                                        className={
                                                            "btn btn-light btn-small" +
                                                            (currentTask.attachment
                                                                ? " btn-selected"
                                                                : "")
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            icon="camera"
                                                            color="var(--c-text)"
                                                        />{" "}
                                                        {currentTask.attachment
                                                            ? "Image attached"
                                                            : "Attach an image"}
                                                    </button>
                                                </div>
                                                <div>
                                                    <button
                                                        className={
                                                            "btn btn-light btn-small" +
                                                            (currentTask.due_at
                                                                ? " btn-selected"
                                                                : "")
                                                        }
                                                        onClick={
                                                            this.toggleDueEditor
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            icon="clock"
                                                            color="var(--c-text)"
                                                        />{" "}
                                                        {currentTask.due_at ? (
                                                            <DueCountdown
                                                                date={
                                                                    currentTask.due_at
                                                                }
                                                            />
                                                        ) : (
                                                            "Add a due date"
                                                        )}
                                                    </button>
                                                </div>
                                            </div>

                                            {this.state.showDueEditor && (
                                                <div className="flex flex-column flex-v-gap attachment-panel dyn-height">
                                                    <div>
                                                        <div className="control">
                                                            <input
                                                                type="Text"
                                                                autoFocus
                                                                value={
                                                                    this.state
                                                                        .editorNaturalDate
                                                                }
                                                                onChange={
                                                                    this
                                                                        .setEditorDueAt
                                                                }
                                                                autoComplete={
                                                                    "off"
                                                                }
                                                                placeholder={
                                                                    "When is this task due? Type things like in 6 hours, in 2 days, at 6:30..."
                                                                }
                                                                onKeyPress={
                                                                    this
                                                                        .onDueKeypress
                                                                }
                                                            />
                                                            <p className="help">
                                                                Hit Enter to set
                                                                the date.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {this.state
                                                .showDescriptionEditor && (
                                                <div className="description-editor flex flex-column flex-v-gap attachment-panel dyn-height">
                                                    <textarea
                                                        value={
                                                            currentTask.description
                                                        }
                                                        onChange={
                                                            this
                                                                .onDescriptionChange
                                                        }
                                                        className="unstyled-textarea"
                                                        placeholder="Write about what you're doing..."
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ) : null}
                                </>
                            ))}
                        </div>
                        <AttachmentPreview
                            attachment={
                                currentTask ? currentTask.attachment : null
                            }
                            onRemove={this.removeAttachment}
                        />
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
    activeTask: state.editor.activeTask,
    queue: state.editor.queue,
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
    updateQueueItem: t => dispatch(editorActions.updateQueueItem(t)),
    removeFromQueue: t => dispatch(editorActions.removeFromQueue(t)),
    createTasks: () => dispatch(editorActions.createTasks()),
    setEditorValue: v => dispatch(editorActions.setEditorValue(v)),
    setEditorDueAt: v => dispatch(editorActions.setEditorDueAt(v)),
    toggleEditorDone: () => dispatch(editorActions.toggleEditorDone()),
    setEditorAttachment: a => dispatch(editorActions.setEditorAttachment(a)),
    markDone: () => dispatch(editorActions.markDone()),
    markInProgress: () => dispatch(editorActions.markInProgress()),
    markRemaining: () => dispatch(editorActions.markRemaining()),
    openDiscussionEditor: () => dispatch(editorActions.openDiscussionEditor()),

    setActiveTask: activeTask =>
        dispatch(editorActions.setActiveTask(activeTask))
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskQueue);
