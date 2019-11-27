import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button } from "vendor/bulma";
import { errorArray } from "lib/utils/error";
import { mapDispatchToProps, mapStateToProps } from "ducks/apps";
import Spinner from "components/Spinner";
import TrelloInstallCard from "./components/TrelloInstallCard";
import paramParser from "url-param-parser";
import {
    createTrelloWebhook,
    getTrelloBoards,
    getTrelloWebhooks,
    installApp
} from "lib/integrations/trello";
import { getProjects } from "lib/user";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { resetTrello } from "../../../../lib/integrations/trello";

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
            <div className={"center"}>
                <h3 className="has-text-grey">
                    <strong>Hi! Begin by picking a Trello board:</strong>
                </h3>
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
                        <br />
                        <h3 className="has-text-grey">
                            <strong>Now, pick a list from that board:</strong>
                        </h3>

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
                        <br />
                        <h4 className="has-text-grey">
                            <strong>
                                Finally, which tag do we link it to?
                            </strong>
                        </h4>

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
                        <Button
                            onClick={this.linkToProject}
                            primary
                            loading={this.state.linking}
                        >
                            <FontAwesomeIcon icon={"plug"} />
                            <span>Link</span>
                        </Button>
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
            errorMessages: []
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
                failed: true
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
        if (this.state.ready) {
            return (
                <div>
                    <h2>Link boards to Makerlog</h2>
                    <h3>
                        Link board lists to your projects to automatically add
                        cards to your log.
                    </h3>
                    <hr />
                    <TrelloLinkWizard
                        boards={this.state.boards}
                        webhooks={this.state.webhooks}
                        projects={this.state.projects}
                    />

                    <br />
                    <h2>Reset integration</h2>
                    <h3>Having problems? Just reset the integration.</h3>
                    <hr />
                    <button onClick={this.resetTrello}>
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
            errorMessages: []
        };
    }

    async componentWillMount() {
        const qs = new paramParser(this.props.location.hash);
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
                    errorMessages: errorArray(e.message)
                });
            }
        }
    }

    render() {
        const style = {
            backgroundColor: "#0079BF",
            color: "white"
        };

        if (this.props.isLoading && !this.props.apps) {
            return <Spinner />;
        }

        return (
            <div className="Trello">
                <section className={"hero dark"} style={style}>
                    <div className={"container"}>
                        <h2 className={"has-text-white"}>Trello</h2>
                        <h3>
                            Integrate Trello with Makerlog, and add logs
                            directly from your boards
                        </h3>
                    </div>
                </section>
                <div className={"container"}>
                    <br />
                    {!this.state.installed && (
                        <TrelloInstallCard
                            afterInstall={this.props.fetchApps}
                        />
                    )}
                    {this.state.installed && <TrelloSettings />}
                </div>
            </div>
        );
    }
}

Trello.propTypes = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Trello));
