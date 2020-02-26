import React, { Component } from "react";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import findHashtags from "find-hashtags";
import debounce from "lodash/debounce";

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

        this.state = {
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
        this.onTaskInput(e.target.value);

        this.setActiveTask(e.target.name);

        let task = this.state.tasks.find(t => t.id === e.target.name);
        task.content = e.target.value;

        this.setState({
            tasks: this.state.tasks.map(x => (x.id === task.id ? task : x))
        });
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
            <div className={"TaskQueue " + (open ? "is-active" : "")}>
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

export default TaskQueue;
