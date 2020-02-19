import React from "react";
import { connect } from "react-redux";
import { Button } from "~/vendor/bulma";
import { mapDispatchToProps, mapStateToProps } from "~/ducks/apps";
import Spinner from "~/components/Spinner";
import { getProjects } from "~/lib/user";
import InstallCard from "../../components/InstallCard";
import {
    deleteLink,
    getInstallUrl,
    getLinks,
    getTodoistProjects,
    installApp,
    linkProjects,
    uninstallApp
} from "~/lib/integrations/todoist";
import { errorArray } from "~/lib/utils/error";
import ErrorMessageList from "~/components/forms/ErrorMessageList";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "~/routes";

class TodoistProjectLinker extends React.Component {
    state = {
        ready: false,
        projects: null,
        todoists: null,
        selectedProject: null,
        selectedTodoist: null,
        success: false,
        linking: false,
        failed: false,
        errorMessage: ""
    };

    async componentDidMount() {
        await this.getProjects();
        await this.getTodoistProjects();
        this.setState({ ready: true });
    }

    getProjects = async () => {
        try {
            const projects = await getProjects();
            this.setState({
                projects
            });
        } catch (e) {
            this.setState({
                failed: true
            });
        }
    };

    getTodoistProjects = async () => {
        try {
            const todoists = await getTodoistProjects();
            this.setState({
                todoists
            });
        } catch (e) {
            this.setState({
                failed: true
            });
        }
    };

    linkToProject = async () => {
        try {
            this.setState({ linking: true, success: false, failed: false });
            await linkProjects(
                this.state.selectedProject,
                this.state.selectedTodoist
            );
            this.setState({ linking: false, success: true });
            window.location = window.location.href.split("?")[0];
        } catch (e) {
            this.setState({
                linking: false,
                success: false,
                failed: true,
                errorMessage:
                    "Failed to link. Is this Todoist project linked already?"
            });
        }
    };

    renderFirstStep = () => {
        return (
            <div>
                <h3 className="has-text-grey">
                    <strong>
                        Begin by picking a Makerlog hashtag to link:
                    </strong>
                    <br />
                    <small>
                        Create one by typing a task with a #hashtag in it!
                    </small>
                </h3>
                <div className={"select"}>
                    <select
                        className={"select"}
                        value={this.state.selectedProject}
                        onChange={e =>
                            this.setState({ selectedProject: e.target.value })
                        }
                    >
                        <option value={null}>Pick a project...</option>
                        {this.state.projects.map(project => (
                            <option value={project.id}>#{project.name}</option>
                        ))}
                    </select>
                </div>
            </div>
        );
    };

    renderSecondStep = () => {
        return (
            <div>
                <br />
                <h3 className="has-text-grey">
                    <strong>Now, pick a Todoist project:</strong>
                </h3>
                <div className={"select"}>
                    <select
                        className={"select"}
                        value={this.state.selectedTodoist}
                        onChange={e =>
                            this.setState({ selectedTodoist: e.target.value })
                        }
                    >
                        <option value={null}>Pick a Todoist project...</option>
                        {this.state.todoists.map(project => (
                            <option value={project.id}>{project.name}</option>
                        ))}
                    </select>
                </div>
            </div>
        );
    };

    renderThirdStep = () => {
        return (
            <div>
                <hr />
                <Button
                    onClick={this.linkToProject}
                    className={"btn"}
                    loading={this.state.linking}
                >
                    <FontAwesomeIcon icon={"plug"} />
                    <span>Link</span>
                </Button>
            </div>
        );
    };

    render() {
        if (!this.state.ready) {
            return (
                <div className={"center"}>
                    <Spinner small />
                </div>
            );
        }

        if (this.state.success) {
            return (
                <div className={"panel-message success"}>
                    Successfully linked. Complete a task on Todoist to try it!
                </div>
            );
        }

        return (
            <>
                {this.state.errorMessage && (
                    <div className={"panel-message danger has-text-centered"}>
                        {this.state.errorMessage}
                    </div>
                )}
                {this.renderFirstStep()}
                {this.state.selectedProject && this.renderSecondStep()}
                {this.state.selectedProject &&
                    this.state.selectedTodoist &&
                    this.renderThirdStep()}
            </>
        );
    }
}

class TodoistLinks extends React.Component {
    state = {
        loading: false,
        deleting: false,
        links: null,
        failed: false
    };

    componentDidMount() {
        this.loadLinks();
    }

    loadLinks = async () => {
        try {
            this.setState({ loading: true });
            const links = await getLinks();
            this.setState({ links: links, loading: false, failed: false });
        } catch (e) {
            this.setState({ failed: true });
        }
    };

    deleteProject = async id => {
        try {
            this.setState({ deleting: true });
            await deleteLink(id);
            this.setState({
                links: this.state.links.filter(l => l.id !== id),
                deleting: false
            });
        } catch (e) {
            this.setState({ deleting: false, failed: true });
        }
    };

    render() {
        if (this.state.loading) {
            return <Spinner />;
        }

        if (!this.state.links || this.state.links.length === 0) {
            return <h3>Nothing yet.</h3>;
        }

        return (
            <table className={"table-bordered"}>
                <tbody>
                    <tr>
                        <th>Link</th>
                        <th>Actions</th>
                    </tr>
                    {this.state.links.map(l => (
                        <tr>
                            <td>#{l.linked_project.name}</td>
                            <td>
                                <Button
                                    onClick={() => this.deleteProject(l.id)}
                                    loading={this.state.deleting}
                                    className={"btn-delete"}
                                >
                                    Unlink
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

class Todoist extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            installing: false,
            installed: this.props.apps["todoist"]
                ? this.props.apps["todoist"].installed
                : false,
            installUrl: "",
            failed: false,
            errorMessages: null
        };
    }

    async componentDidMount() {
        if (!this.state.installed) {
            await this.getInstallUrl();
        } else {
            this.setState({
                ready: true
            });
        }
    }

    async componentWillMount() {
        const params = this.props.query;
        const code = params.code;
        if (code) {
            this.setState({ installing: true });
            try {
                await installApp(code);
                window.location = window.location.href.split("?")[0];
                this.setState({
                    ready: true,
                    installed: true,
                    installing: false
                });
            } catch (e) {
                this.setState({
                    ready: true,
                    installing: false,
                    installed: false,
                    failed: true,
                    errorMessages: errorArray("Failed to link.")
                });
            }
        }
    }

    getInstallUrl = async () => {
        try {
            const installUrl = await getInstallUrl(
                encodeURIComponent(this.props.linkKey)
            );
            this.setState({
                ready: true,
                installUrl: installUrl,
                failed: false
            });
        } catch (e) {
            this.setState({
                ready: true,
                installUrl: "",
                failed: true
            });
        }
    };

    uninstall = async () => {
        try {
            await uninstallApp();
            this.setState({
                installed: false
            });
        } catch (e) {}
    };

    render() {
        const style = {
            backgroundColor: "#F22613",
            color: "white"
        };

        if (
            !this.props.ready ||
            !this.props.apps ||
            this.state.installing ||
            !this.state.ready
        ) {
            return <Spinner />;
        }

        //const params = new URLSearchParams(this.props.location.search);
        // const success = params.get('success');

        return (
            <div>
                <div className={"flex col-right v-center mbGap"}>
                    <div>
                        <h2>
                            <Link route="apps">Apps →</Link> Todoist
                        </h2>
                        <p>
                            Link projects from Todoist and all done tasks will
                            be logged automatically.
                        </p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-content">
                        {this.state.errorMessages && (
                            <ErrorMessageList
                                errorMessages={this.state.errorMessages}
                            />
                        )}

                        {!this.state.installed && (
                            <InstallCard app={"Todoist"}>
                                <a
                                    className={"button is-danger is-large"}
                                    href={this.state.installUrl}
                                >
                                    Install
                                </a>
                            </InstallCard>
                        )}

                        {this.state.installed && (
                            <div>
                                <TodoistProjectLinker />
                                <h2>Links</h2>
                                <h3>All available links.</h3>
                                <hr />
                                <TodoistLinks />
                                <h2>Danger zone</h2>
                                <h3>Here you can do dangerous stuff...</h3>
                                <hr />
                                <button
                                    className={"btn-delete"}
                                    onClick={this.uninstall}
                                >
                                    Uninstall app
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todoist);
