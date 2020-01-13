import React, { Component } from "react";
import Emoji from "~/components/Emoji";
import { mapStateToProps as mapUserToProps } from "~/ducks/user";
import { connect } from "react-redux";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import findHashtags from "find-hashtags";
import debounce from "lodash/debounce";
import uniqueId from "lodash/uniqueId";

const PostTypes = {
    TASK: 1,
    QUESTION: 2,
    MILESTONE: 3,
    RFF: 4
};

const Hashtag = (tag, inText = false) => {
    return {
        tag,
        inText
    };
};

class QuickPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: PostTypes.TASK,
            tasks: [this.createTaskObject("", true)],
            currentTask: null,
            hashtags: []
        };
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
            done: false,
            in_progress: false,
            content,
            posting: false,
            id: initial
                ? "INIT"
                : JSON.stringify(new Date().getUTCMilliseconds())
        };
    };

    onTaskKeyDown = e => {
        if (e.key === "Enter") {
        }

        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
            // detects cmd
            const newTask = this.createTaskObject();
            this.setState({
                tasks: [...this.state.tasks, newTask],
                currentTask: newTask.id
            });
        }

        let task = this.state.tasks.find(t => t.id === this.state.currentTask);
        if (e.key == "Backspace" && task.content === "") {
            if (this.state.tasks.length > 1) {
                const newArray = this.state.tasks.filter(t => t.id !== task.id);
                this.setState({
                    tasks: newArray,
                    currentTask: newArray.slice(-1)[0].id
                });
            } else {
                this.setState({ currentTask: null });
            }
        }
    };

    handleChange = e => {
        if (this.state.type === PostTypes.TASK) {
            this.onTaskInput(e.target.value);

            this.setActiveTask(e.target.name);

            let task = this.state.tasks.find(t => t.id === e.target.name);
            task.content = e.target.value;

            this.setState({
                tasks: this.state.tasks.map(x => (x.id === task.id ? task : x))
            });
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
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

    render() {
        const open = this.state.currentTask !== null;

        return (
            <div className={"QuickPost card " + (open ? "is-active" : "")}>
                <header>
                    <button
                        className={
                            this.state.type === PostTypes.TASK && "is-active"
                        }
                        onClick={() => this.changeType(PostTypes.TASK)}
                    >
                        <FontAwesomeIcon icon="check" /> Task
                    </button>
                    <button
                        className={
                            this.state.type === PostTypes.QUESTION &&
                            "is-active"
                        }
                        onClick={() => this.changeType(PostTypes.QUESTION)}
                    >
                        <FontAwesomeIcon icon="question" /> Question
                    </button>
                    <button
                        className={
                            this.state.type === PostTypes.MILESTONE &&
                            "is-active"
                        }
                        onClick={() => this.changeType(PostTypes.MILESTONE)}
                    >
                        <FontAwesomeIcon icon="trophy" /> Milestone
                    </button>
                    <button
                        className={
                            this.state.type === PostTypes.RFF && "is-active"
                        }
                        onClick={() => this.changeType(PostTypes.RFF)}
                    >
                        <FontAwesomeIcon icon="comments" /> Feedback request
                    </button>
                </header>
                <div className="controls">
                    <div className="input-container"></div>

                    <div className="task-input-list">
                        {this.state.tasks.map(task => (
                            <div
                                className={
                                    "task-input " +
                                    (this.state.currentTask === task.id ||
                                    this.state.currentTask === null
                                        ? "active "
                                        : " ") +
                                    (task.posting ? "posting " : " ")
                                }
                                onClick={e => {
                                    this.setActiveTask(task.id);
                                }}
                                key={task.id}
                            >
                                <div className="check-case">
                                    <div>
                                        <FontAwesomeIcon
                                            color="white"
                                            icon="check"
                                        />
                                    </div>
                                </div>
                                <div className="input">
                                    <input
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

                <footer className="flex flex-gap">
                    <div>
                        <button className="btn-small btn-light">
                            <FontAwesomeIcon icon="check-circle" /> Completed
                        </button>
                    </div>
                    {this.state.hashtags.length > 0 ? (
                        this.state.hashtags.map(t => (
                            <div>
                                <button className="btn-small btn-gray">
                                    #{t.tag}
                                </button>
                            </div>
                        ))
                    ) : (
                        <div>
                            <button className="btn-small btn-gray">
                                + Add tags
                            </button>
                        </div>
                    )}
                    <div className="flex-grow"></div>
                    <div>
                        <button className="btn-small">Post</button>
                    </div>
                </footer>
            </div>
        );
    }
}

const mapStateToProps = state => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(QuickPost);
