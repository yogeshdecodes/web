import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { groupTasksByDone } from "~/lib/utils/tasks";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Scrollbars } from "react-custom-scrollbars";
import Spinner from "~/components/Spinner";
import mapDispatchToProps from "../../containers/mapDispatchToProps";
import KanbanTask from "./components/KanbanTask";
import isEqual from "lodash/isEqual";
import "./index.scss";
import GoldAlert from "../../../../components/GoldAlert";

/*<div style={{ borderColor: colorFromProject(project) }} className={"color-circle"}></div>*/

class KanbanTaskList extends React.Component {
    shouldComponentUpdate(nextProps) {
        return !isEqual(this.props.tasks, nextProps.tasks);
    }

    render() {
        let tasks = this.props.tasks;
        let truncated = false;
        if (tasks.length > 100) {
            tasks = tasks.slice(0, 100);
            truncated = true;
        }
        return (
            <Scrollbars
                className={"KanbanTaskList"}
                autoHeight
                autoHeightMax={"65vh"}
                autoHideTimeout={1000}
                autoHideDuration={200}
            >
                {tasks.map((task, index) => (
                    <div>
                        <Draggable draggableId={task.id} index={index}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={"Kanban-ListItem"}
                                >
                                    <KanbanTask key={task.id} task={task} />
                                </div>
                            )}
                        </Draggable>
                    </div>
                ))}
                {truncated && (
                    <p className={"has-text-grey-light has-text-centered"}>
                        For practical reasons, only the last 100 done tasks are
                        shown.
                    </p>
                )}
            </Scrollbars>
        );
    }
}

const KanbanProject = ({ columnName, uniqueId, tasks }) => (
    <div className="KanbanProject">
        <div className={"title-card"}>
            {columnName} <span>&nbsp;{tasks.length}</span>
        </div>

        <Droppable droppableId={uniqueId}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    <KanbanTaskList uniqueId={uniqueId} tasks={tasks} />
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </div>
);

class KanbanView extends React.Component {
    lists = {
        done: "done",
        in_progress: "in_progress",
        remaining: "remaining"
    };

    onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            this.props.reorderTask(
                this.getTasks(source.droppableId)[source.index].id,
                this.getTasks(source.droppableId)[destination.onboarding].id
            );
        } else {
            const taskId = this.getTasks(source.droppableId)[source.index].id;
            const destinationTasks = this.getTasks(destination.droppableId);

            if (destinationTasks[destination.onboarding]) {
                // We're replacing a task. reorder and swap its position.
                this.props.reorderTask(
                    taskId,
                    destinationTasks[destination.onboarding].id
                );
            }

            if (destination.droppableId === this.lists.done) {
                this.props.markDone(taskId);
            } else if (destination.droppableId === this.lists.in_progress) {
                this.props.markInProgress(taskId);
            } else if (destination.droppableId === this.lists.remaining) {
                this.props.markRemaining(taskId);
            }
        }
    };

    getTasks = (id = null) => {
        let tasks = groupTasksByDone(this.props.tasks);
        if (id) {
            return tasks[id];
        } else {
            return tasks;
        }
    };

    renderGoldWarning = () => {
        return <GoldAlert />;
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        if (this.props.me && !this.props.me.gold)
            return this.renderGoldWarning();
        if (!this.props.tasks) return <Spinner />;

        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className={"KanbanView columns is-multiline"}>
                    <KanbanProject
                        columnName={"Remaining"}
                        uniqueId={"remaining"}
                        tasks={this.getTasks("remaining")}
                    />
                    <KanbanProject
                        columnName={"In Progress"}
                        uniqueId={"in_progress"}
                        tasks={this.getTasks("in_progress")}
                    />
                    <KanbanProject
                        columnName={"Done"}
                        uniqueId={"done"}
                        tasks={this.getTasks("done")}
                    />
                </div>
            </DragDropContext>
        );
    }
}

KanbanView = connect(state => {
    return {
        me: state.user.me,
        tasks: state.tasks.tasks
    };
}, mapDispatchToProps)(KanbanView);

KanbanView.propTypes = {
    projects: PropTypes.array.isRequired,
    tasks: PropTypes.array.isRequired
};

export default KanbanView;
