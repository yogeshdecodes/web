import React from "react";
import { connect } from "react-redux";
import { errorArray } from "~/lib/utils/error";
import { mapDispatchToProps, mapStateToProps } from "~/ducks/apps";
import Spinner from "~/components/Spinner";
import TrelloInstallCard from "./components/TrelloInstallCard";
import {
    createTrelloWebhook,
    getTrelloBoards,
    getTrelloWebhooks,
    installApp,
    resetTrello
} from "~/lib/integrations/trello";
import { getProjects } from "~/lib/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import paramParser from "url-param-parser"; // for hash url
import PageTitle from "~/components/ui/PageTitle";
import "./index.scss";
import { loadingClass } from "~/lib/utils/random";
import {
    renderHelpOrError,
    StdErrorCollection,
    ValidationError
} from "../../../../lib/utils/error";
import StdErrorMessages from "~/components/forms/StdErrorMessages";

class TrelloLinkWizard extends React.Component {
    state = {
        linking: false,
        success: false,
        failed: false,
        board: null,
        list: null,
        project: null
    };

    linkToProject = async () => {
        try {
            this.setState({ linking: true, success: false, failed: false });
            const response = await createTrelloWebhook(
                this.state.list,
                this.state.project
            );
            if (response.success) {
                this.setState({ linking: false, success: true });
            } else {
                this.setState({ linking: false, success: false, failed: true });
            }
        } catch (e) {
            this.setState({ linking: false, failed: true, success: false });
        }
    };

    render() {
        let selectedBoardData = this.props.boards.find(
            board => board.name === this.state.board
        );
        let selectedListData = null;
        if (selectedBoardData) {
            selectedListData = selectedBoardData.lists.find(
                list => list.id === this.state.list
            );
        }

        if (this.state.success) {
            return (
                <div className={"panel-message success"}>
                    Successfully linked. Go add a card to try it!
                </div>
            );
        }

        return (
            <div className={"flex flex-v-gap flex-column"}>
                <strong>Begin by picking a Trello board:</strong>
                <div className={"select"}>
                    <select
                        className={"select"}
                        value={this.state.board}
                        onChange={e => this.setState({ board: e.target.value })}
                    >
                        <option value={null}>Pick a board...</option>
                        {this.props.boards.map(board => (
                            <option value={board.name}>{board.name}</option>
                        ))}
                    </select>
                </div>
                {this.state.board !== null && selectedBoardData && (
                    <div>
                        <strong>Now, pick a list from that board:</strong>

                        <div className={"select"}>
                            <select
                                className={"select"}
                                value={this.state.list}
                                onChange={e =>
                                    this.setState({ list: e.target.value })
                                }
                            >
                                <option value={null}>Pick a list...</option>
                                {selectedBoardData.lists.map(list => (
                                    <option value={list.id}>{list.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
                {this.state.list && this.state.board && (
                    <div>
                        <strong>Finally, which tag do we link it to?</strong>

                        <div className={"select"}>
                            <select
                                className={"select"}
                                value={this.state.project}
                                onChange={e =>
                                    this.setState({ project: e.target.value })
                                }
                            >
                                <option value={null}>Pick a tag...</option>
                                {this.props.projects.map(project => {
                                    const linked =
                                        this.props.webhooks.filter(
                                            link =>
                                                selectedListData.id ===
                                                    link.extra_data &&
                                                project.id === link.project
                                        ).length > 0;
                                    if (!linked) {
                                        return (
                                            <option value={project.id}>
                                                #{project.name}
                                            </option>
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
                            </select>
                        </div>
                    </div>
                )}

                {this.state.list && this.state.board && this.state.project && (
                    <div>
                        <hr />
                        <button
                            onClick={this.linkToProject}
                            className={loadingClass(
                                "btn btn-secondary",
                                this.state.linking
                            )}
                        >
                            <FontAwesomeIcon icon={"plug"} />
                            <span>Link</span>
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

class TrelloSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            boards: null,
            webhooks: null,
            projects: null,
            failed: false,
            errorMessages: null
        };
    }

    async componentDidMount() {
        try {
            const boards = await getTrelloBoards();
            const webhooks = await getTrelloWebhooks();
            const projects = await getProjects();
            const ready = true;

            this.setState({
                webhooks,
                projects,
                boards,
                ready
            });
        } catch (e) {
            this.setState({
                failed: true,
                errorMessages: new StdErrorCollection(e)
            });
        }
    }

    resetTrello = async () => {
        this.setState({
            ready: false
        });
        try {
            await resetTrello();
            window.location.reload();
            this.setState({
                ready: true
            });
        } catch (e) {
            this.setState({
                failed: true,
                ready: true
            });
        }
    };

    render() {
        if (this.state.errorMessages) {
            return <StdErrorMessages error={this.state.errorMessages} />;
        }

        if (this.state.ready) {
            return (
                <div>
                    <TrelloLinkWizard
                        boards={this.state.boards}
                        webhooks={this.state.webhooks}
                        projects={this.state.projects}
                    />
                    <hr />
                    <button className="btn-delete" onClick={this.resetTrello}>
                        Reset Trello (you also have to delete Makerlog from
                        Trello account settings)
                    </button>
                </div>
            );
        } else {
            return (
                <div className={"center"}>
                    <Spinner text={"Hold on, talking to Trello..."} />
                </div>
            );
        }
    }
}

class Trello extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            installed: this.props.apps["trello"]
                ? this.props.apps["trello"].installed
                : false,
            installing: false,
            failed: true,
            errorMessages: null
        };
    }

    async componentDidMount() {
        const qs = new paramParser(window.location.hash);
        if (qs.hash.token) {
            this.setState({ installing: true });
            try {
                await installApp(qs.hash.token);
                this.setState({
                    installed: true
                });
            } catch (e) {
                this.setState({
                    installing: false,
                    failed: true,
                    errorMessages: new StdErrorCollection(e)
                });
            }
        }
    }

    render() {
        const style = {
            backgroundColor: "#0079BF",
            color: "white"
        };

        if (this.state.errorMessages) {
            return <StdErrorMessages error={this.state.errorMessages} />;
        }

        if (this.props.isLoading && !this.props.apps) {
            return <Spinner />;
        }

        return (
            <div>
                <PageTitle title="Trello" />
                <div className="card">
                    <div className="card-content">
                        {!this.state.installed && (
                            <TrelloInstallCard
                                afterInstall={this.props.fetchApps}
                            />
                        )}
                        {this.state.installed && <TrelloSettings />}
                    </div>
                </div>
            </div>
        );
    }
}

Trello.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(Trello);
