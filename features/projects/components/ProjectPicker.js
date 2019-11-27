import React from "react";
import { getProjects } from "../../../lib/user";
import { createProject } from "../../../lib/projects";
import Spinner from "../../../components/Spinner";

class ProjectPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            projects: [],
            failed: false,
            errorMessage: null,
            projectToCreate: "",
            isCreating: false,
            selectedProjects: this.props.initialSelectedProjects
                ? this.props.initialSelectedProjects
                : [],
            otherProjectsToInject: []
        };
    }

    fetchProjects = async () => {
        this.setState({ loading: true, failed: false });
        try {
            const projects = await getProjects();
            this.setState({
                projects: projects,
                loading: false,
                failed: false,
                otherProjectsToInject: this.props.initialSelectedProjects
                    ? this.props.initialSelectedProjects.filter(
                          e => !projects.map(p => p.id).includes(e)
                      )
                    : []
            });
        } catch (e) {
            this.setState({ projects: [], loading: false, failed: true });
        }
    };

    createNewProject = async () => {
        this.setState({ isCreating: true });
        try {
            const project = await createProject(this.state.projectToCreate);
            this.setState({
                isCreating: false,
                projects: [...this.state.projects, project],
                selectedProjects: [...this.state.selectedProjects, project.id],
                projectToCreate: ""
            });
        } catch (e) {
            this.setState({
                isCreating: false,
                errorMessage:
                    "Couldn't create tag. You can only use letters, numbers, underscores and no spaces. Also is the tag name unique?"
            });
        }
    };

    componentDidMount() {
        this.fetchProjects();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedProjects !== this.state.selectedProjects) {
            this.props.onProjectSelect([
                ...this.state.selectedProjects,
                ...this.state.otherProjectsToInject
            ]);
        }
    }

    renderProjectCloud = () => {
        let projects = this.state.selectedProjects;
        if (this.props.product) {
            projects = [...projects, ...this.props.product.projects];
        }

        if (projects.length) {
            return (
                <div className="field is-grouped is-grouped-multiline">
                    {projects.map(project => (
                        <div className="control">
                            <div className="tags has-addons">
                                <span className="tag is-primary">
                                    @{project.user.username}
                                </span>
                                <span className="tag">#{project.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            );
        } else {
            return null;
        }
    };

    render() {
        return (
            <>
                <div className="columns">
                    {this.state.projects && this.state.projects.length > 0 && (
                        <div className="column">
                            <h3>
                                Select some tags (
                                {this.state.selectedProjects.length} selected)
                            </h3>
                            {this.state.errorMessage && (
                                <div className={"panel-message danger"}>
                                    {" "}
                                    {this.state.errorMessage}
                                </div>
                            )}
                            <div className={"control"}>
                                {this.state.loading && (
                                    <Spinner
                                        small={true}
                                        text={"Loading tags"}
                                    />
                                )}
                                {!this.state.loading && !this.state.failed && (
                                    <div className="select is-multiple is-fullwidth">
                                        <select
                                            size={6}
                                            value={this.state.selectedProjects}
                                            onChange={e => {
                                                let value = Array.from(
                                                    e.target.selectedOptions,
                                                    option => option.value
                                                );
                                                this.setState({
                                                    selectedProjects: value
                                                });
                                            }}
                                            multiple
                                        >
                                            {this.state.projects.map(
                                                project => (
                                                    <option value={project.id}>
                                                        #{project.name}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <div className="column">
                        <h3>
                            {this.state.projects &&
                            this.state.projects.length > 0
                                ? "...or create one"
                                : "Create a tag"}
                        </h3>
                        <div className="field">
                            <p className="control">
                                <div
                                    className={
                                        this.state.isCreating
                                            ? "control has-icons-left is-loading"
                                            : "control has-icons-left"
                                    }
                                >
                                    <input
                                        value={this.state.projectToCreate}
                                        onChange={e =>
                                            this.setState({
                                                projectToCreate: e.target.value
                                            })
                                        }
                                        className="input is-large"
                                        placeholder="project"
                                    />
                                    <span className="icon is-medium is-left">
                                        #
                                    </span>
                                </div>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                                <button
                                    className={"btn"}
                                    onClick={this.createNewProject}
                                >
                                    Create
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ProjectPicker;
