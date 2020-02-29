import React, { Component } from "react";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import findHashtags from "find-hashtags";
import debounce from "lodash/debounce";
import { connect } from "react-redux";
import { actions as editorActions } from "~/ducks/editor";

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

const DoneStates = {
    DONE: 0,
    IN_PROGRESS: 1,
    REMAINING: 2
};

class TaskQueue extends Component {
    constructor(props) {
        super(props);

        const defaultTask = this.createTaskObject("", true);

        this.state = {
            currentTask: defaultTask.id,
            hashtags: []
        };

        this.props.addToQueue(defaultTask);
    }

    populateInitialTask = () => {
        const initialTask = this.createTaskObject("", true);
        this.setState({
            tasks: [initialTask]
        });
    };

    createTaskObject = (content = "", initial = false) => {
        // initial task IDs prevents a nextjs state reconciliation problem
        // always populate initial state by using setState on client or use this!
        return {
            done: true,
            in_progress: false,
            content,
            posting: false,
            id: initial
                ? "INIT"
                : JSON.stringify(new Date().getUTCMilliseconds())
        };
    };

    cycleDoneStates = () => {
        let task = this.props.queue.find(t => t.id === this.state.currentTask);

        if (this.getDoneState(task) === DoneStates.DONE) {
            this.setDoneState(DoneStates.IN_PROGRESS);
        } else if (this.getDoneState(task) === DoneStates.IN_PROGRESS) {
            this.setDoneState(DoneStates.REMAINING);
        } else if (this.getDoneState(task) === DoneStates.REMAINING) {
            this.setDoneState(DoneStates.DONE);
        }
    };

    getDoneState = task => {
        if (task.done && !task.in_progress) return DoneStates.DONE;
        if (!task.done && task.in_progress) return DoneStates.IN_PROGRESS;
        return DoneStates.REMAINING;
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

        console.log(this.getDoneState(task));

        this.props.addToQueue(task);
    };

    getClassNameForDoneState = task => {
        switch (this.getDoneState(task)) {
            case DoneStates.DONE:
                return "done";
            case DoneStates.IN_PROGRESS:
                return "in-progress";
            case DoneStates.REMAINING:
                return "remaining";
        }
    };

    onTaskKeyDown = e => {
        if (e.key === "Enter" && !e.shiftKey) {
            this.props.createTasks();
            setTimeout(
                () => this.props.addToQueue(this.createTaskObject("", true)),
                1000
            );
        }

        if (e.key === "Enter" && e.shiftKey) {
            // detects cmd
            const newTask = this.createTaskObject();
            this.props.addToQueue(newTask);
            this.setState({
                currentTask: newTask.id
            });
        }

        let task = this.props.queue.find(t => t.id === this.state.currentTask);
        if (e.key == "Backspace" && task.content === "") {
            if (this.props.queue.length > 1) {
                this.setState({
                    currentTask: this.props.queue
                        .filter(t => t.id !== task.id)
                        .slice(-1)[0].id
                });
                this.props.removeFromQueue(task.id);
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

    render() {
        const open = this.state.currentTask !== null;

        return (
            <div className={"TaskQueue " + (open ? "is-active" : "")}>
                <div className="controls">
                    <div className="input-container"></div>

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
                                        placeholder={"Start typing a task..."}
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
                                        placeholder={"Start typing a task..."}
                                        autoFocus
                                    ></input>
                                </div>
                            </div>
                        ))}
                    </div>
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
