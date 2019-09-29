import React from "react";
import { groupTasksByDone, orderByDate } from "../../../../lib/utils/tasks";
import { Button } from "~/vendor/bulma";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import mapDispatchToProps from "../../containers/mapDispatchToProps";
import InProgressCard from "../InProgressCard";
import { colorFromProject, joinProjectsWithTasks } from "../../utils";
import KanbanTask from "../KanbanView/KanbanTask";
//import { CSSTransitionGroup } from "react-transition-group";
import Emoji from "../../../../components/Emoji";
import Switch from "react-switch";
import { actions as editorActions } from "../../../../ducks/editor";
import { actions as tasksActions } from "../../../../ducks/tasks";
import { actions as projectsActions } from "../../../../ducks/projects";
import { deleteProject } from "../../../../lib/projects";
import styled from "styled-components";

let ProjectTask = ({ task, markDone, markInProgress, markRemaining }) => (
    <div style={{ margin: 10 }}>
        <KanbanTask
            task={task}
            extraButtons={
                <React.Fragment>
                    {!task.done && (
                        // eslint-disable-next-line
                        <a
                            className={"mark-done"}
                            onClick={() => markDone(task.id)}
                        >
                            <FontAwesomeIcon icon={"check"} /> Mark done
                        </a>
                    )}
                    {!task.done && !task.in_progress && (
                        // eslint-disable-next-line
                        <a
                            className={"mark-in-progress"}
                            onClick={() => markInProgress(task.id)}
                        >
                            <FontAwesomeIcon icon={"dot-circle"} /> Mark in
                            progress
                        </a>
                    )}
                    {(task.done || task.in_progress) && (
                        // eslint-disable-next-line
                        <a
                            className={"mark-remaining"}
                            onClick={() => markRemaining(task.id)}
                        >
                            <FontAwesomeIcon icon={"dot-circle"} /> Mark
                            remaining
                        </a>
                    )}
                </React.Fragment>
            }
        />
    </div>
);

ProjectTask = connect(
    null,
    mapDispatchToProps
)(ProjectTask);

class ProjectTaskList extends React.Component {
    state = {
        confirmDelete: false,
        deleting: false,
        failed: false
    };

    deleteTag = async () => {
        if (!this.state.confirmDelete) {
            this.setState({
                confirmDelete: true
            });
            return true;
        }

        await this.setState({ deleting: true });

        try {
            await deleteProject(this.props.project.id);
            this.setState({
                deleting: false,
                failed: false
            });
            if (this.props.onDeleteList) {
                this.props.onDeleteList(this.props.project);
            }
        } catch (e) {
            this.setState({
                deleting: false,
                failed: true
            });
        }
    };

    render() {
        let project = this.props.project;

        if (!this.props.project) {
            project = {
                name: "Miscellaneous",
                id: 0,
                user: 0
            };
        }

        let tasks = groupTasksByDone(this.props.tasks);

        return (
            <div className={"ProjectTaskList"}>
                <div className={"card ProjectTaskList-Header"}>
                    <div className={"card-content flex"}>
                        <div
                            style={{ borderColor: colorFromProject(project) }}
                            className={"color-circle"}
                        >
                            {" "}
                        </div>
                        <h4>
                            {this.props.project
                                ? `#${project.name}`
                                : project.name}
                        </h4>
                        <div>
                            <Button
                                disabled={project.id === 0}
                                onClick={this.deleteTag}
                                danger={this.state.confirmDelete}
                                text={!this.state.confirmDelete}
                                loading={this.state.deleting}
                            >
                                <FontAwesomeIcon icon={"trash"} />{" "}
                                {this.state.confirmDelete &&
                                    `Are you sure? You will lose ${this.props.tasks.length} tasks.`}
                            </Button>
                        </div>
                    </div>
                </div>
                {this.props.tasks.length === 0 && (
                    <div className={"card"}>
                        <div className={"card-content"}>
                            <h4>
                                No tasks yet. <Emoji emoji={"🌻"} />
                            </h4>
                        </div>
                    </div>
                )}
                {tasks.in_progress.length > 0 && (
                    <div>
                        {tasks.in_progress.map(task => (
                            <ProjectTask task={task} />
                        ))}
                        <hr />
                    </div>
                )}
                {tasks.remaining.map(task => (
                    <ProjectTask task={task} />
                ))}
                {tasks.done.map(task => (
                    <ProjectTask task={task} />
                ))}
            </div>
        );
    }
}

const ProjectLink = styled.button``;

class ListView extends React.Component {
    state = {
        selectedProject: null,
        showDone: false
    };

    componentDidMount() {
        if (this.props.projects.length > 0) {
            this.setState({
                selectedProject: this.props.projects[0].id
            });
        }
    }

    renderInProgress = in_progress => {
        if (!in_progress) return null;

        return <InProgressCard large tasks={in_progress} />;
    };

    toggleDone = () => {
        this.setState({
            showDone: !this.state.showDone
        });
    };

    selectProject = id => {
        this.setState({
            selectedProject: id
        });
    };

    onDeleteList = project => {
        // THIS MAY CAUSE TROUBLE WHEN REUSING THIS COMPONENT
        // get the tasks we deleted
        const batch = this.props.tasks
            .filter(
                task => task.project_set.map(p => p.id).indexOf(project.id) >= 0
            )
            .map(task => task.id);
        this.props.purgeBatch(batch);
        this.props.purgeProject(project.id);
    };

    render() {
        let filteredTasks = orderByDate(this.props.tasks);
        if (!this.state.showDone) {
            filteredTasks = filteredTasks.filter(task => !task.done);
        }
        const tasks = groupTasksByDone(filteredTasks);

        // Hide certain projects
        let projects = joinProjectsWithTasks(
            this.props.projects,
            filteredTasks
        );
        let miscTasks = filteredTasks.filter(
            task => task.project_set.length === 0
        );

        let selectedProject = null;
        if (this.state.selectedProject) {
            selectedProject = projects.find(
                project => project.id === this.state.selectedProject
            );
        }

        return (
            <div className="ListView">
                {this.renderInProgress(tasks.in_progress)}

                <div className={"grid-s-c"}>
                    <div>
                        <div className={"card"}>
                            <div className={"card-content"}>
                                <div className={"center"}>
                                    <button
                                        className={"btn"}
                                        onClick={this.props.toggleEditor}
                                    >
                                        <FontAwesomeIcon icon={"plus"} />
                                        Add task
                                    </button>
                                </div>
                                <hr />
                                <h3 className={"heading"}>Show done tasks</h3>
                                <Switch
                                    onChange={this.toggleDone}
                                    onClick={this.toggleDone}
                                    checked={this.state.showDone}
                                    checkedIcon={
                                        <div className={"toggle-done"}>
                                            <Emoji emoji="✅" />
                                        </div>
                                    }
                                    uncheckedIcon={
                                        <div className={"toggle-done"}>
                                            <Emoji emoji="🕒" />
                                        </div>
                                    }
                                    onColor="#47e0a0"
                                    height={30}
                                    width={60}
                                    handleDiameter={20}
                                />
                                <hr />

                                <aside className={"menu"}>
                                    <h3 className={"heading"}>Tags</h3>
                                    <ul className={"menu-list"}>
                                        {projects.map(project => (
                                            <li>
                                                <ProjectLink
                                                    className={"ProjectLink"}
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        this.selectProject(
                                                            project.id
                                                        );
                                                    }}
                                                >
                                                    #{project.name}{" "}
                                                    {groupTasksByDone(
                                                        project.tasks
                                                    ).remaining.length > 0 && (
                                                        <span
                                                            className={
                                                                "has-text-warning"
                                                            }
                                                        >
                                                            {
                                                                groupTasksByDone(
                                                                    project.tasks
                                                                ).remaining
                                                                    .length
                                                            }
                                                        </span>
                                                    )}
                                                </ProjectLink>
                                            </li>
                                        ))}
                                        <li>
                                            {
                                                // eslint-disable-next-line
                                            }
                                            <ProjectLink
                                                className={"ProjectLink"}
                                                onClick={() =>
                                                    this.selectProject(null)
                                                }
                                            >
                                                Untagged
                                            </ProjectLink>
                                        </li>
                                    </ul>
                                </aside>
                            </div>
                        </div>
                    </div>
                    <div>
                        {!selectedProject && (
                            <ProjectTaskList tasks={miscTasks} />
                        )}
                        {selectedProject && (
                            <ProjectTaskList
                                project={selectedProject}
                                tasks={selectedProject.tasks}
                                onDeleteList={this.onDeleteList}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

ListView.propTypes = {};

export default connect(
    null,
    dispatch => ({
        toggleEditor: () => dispatch(editorActions.toggleEditor()),
        purgeBatch: val => dispatch(tasksActions.purgeBatch(val)),
        purgeProject: val => dispatch(projectsActions.purgeProject(val))
    })
)(ListView);
