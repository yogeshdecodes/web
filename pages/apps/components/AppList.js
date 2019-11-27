import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LoggedOutOnly, withCurrentUser } from "features/users";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "ducks/apps";
import "./AppsList.scss";

const SignedInSection = styled.div`
    opacity: ${props => (props.isLoggedIn ? "1" : "0.3")};
`;

const InstallButton = ({ to, installed }) => (
    <Link
        to={to}
        className={"btn-light" + (installed ? " btn-light transparent" : "")}
    >
        {installed ? "Settings" : "Install"}
    </Link>
);

const AppList = props => {
    return (
        <>
            <LoggedOutOnly>
                <div className="card">
                    <div className={"card-content"}>
                        <h2 className={"has-text-grey"}>
                            You must be signed in to use the following apps.
                        </h2>
                        <Link to={"/begin"} className={"btn-primary"}>
                            Get started
                        </Link>
                    </div>
                </div>
            </LoggedOutOnly>

            <SignedInSection
                isLoggedIn={props.isLoggedIn}
                className={"grid-apps AppsList"}
            >
                <div className="card TodoistCard">
                    <div className={"card-content"}>
                        <div className={"flex"}>
                            <div>
                                <h2>Todoist</h2>
                                <h3>Log done tasks straight from Todoist.</h3>
                                <InstallButton
                                    to={"/apps/todoist"}
                                    installed={
                                        props.apps && props.apps["todoist"]
                                            ? props.apps["todoist"].installed
                                            : false
                                    }
                                />
                            </div>
                            <div>
                                <img
                                    src={"/assets/img/todoist.png"}
                                    width={80}
                                    alt={"Todoist"}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card SlackCard">
                    <div className={"card-content"}>
                        <div className={"flex"}>
                            <div>
                                <h2>Slack</h2>
                                <h3>
                                    Log tasks and see your stats with Makebot.
                                </h3>
                                <InstallButton
                                    to={"/apps/slack"}
                                    installed={
                                        props.apps && props.apps["slack"]
                                            ? props.apps["slack"].installed
                                            : false
                                    }
                                />
                            </div>
                            <div>
                                <img
                                    src={"/assets/img/slack-white.png"}
                                    width={80}
                                    alt={"Slack"}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card TrelloCard">
                    <div className={"card-content"}>
                        <div className={"flex"}>
                            <div>
                                <h2>Trello</h2>
                                <h3>Log tasks from your Trello boards.</h3>
                                <InstallButton
                                    to={"/apps/trello"}
                                    installed={
                                        props.apps && props.apps["trello"]
                                            ? props.apps["trello"].installed
                                            : false
                                    }
                                />
                            </div>
                            <div>
                                <FontAwesomeIcon
                                    icon={["fab", "trello"]}
                                    color={"white"}
                                    size={"5x"}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card GitHubCard">
                    <div className={"card-content"}>
                        <div className={"flex"}>
                            <div>
                                <h2>GitHub</h2>
                                <h3>
                                    Log your daily commit counts from GitHub.
                                </h3>
                                <InstallButton
                                    to={"/apps/github"}
                                    installed={
                                        props.apps && props.apps["github"]
                                            ? props.apps["github"].installed
                                            : false
                                    }
                                />
                            </div>
                            <div>
                                <FontAwesomeIcon
                                    icon={["fab", "github"]}
                                    color={"white"}
                                    size={"5x"}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card GitLabCard">
                    <div className={"card-content"}>
                        <div className={"flex"}>
                            <div>
                                <h2>GitLab</h2>
                                <h3>
                                    Log your daily commit counts from GitLab.
                                </h3>
                                <InstallButton
                                    to={"/apps/gitlab"}
                                    installed={
                                        props.apps && props.apps["gitlab"]
                                            ? props.apps["gitlab"].installed
                                            : false
                                    }
                                />
                            </div>
                            <div>
                                <FontAwesomeIcon
                                    icon={["fab", "gitlab"]}
                                    color={"white"}
                                    size={"5x"}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card NodeHostCard">
                    <div className={"card-content"}>
                        <div className={"flex"}>
                            <div>
                                <h2>NodeHost</h2>
                                <h3>Auto post tasks from NodeHost.</h3>
                                <InstallButton
                                    to={"/apps/nodehost"}
                                    installed={
                                        props.apps && props.apps["nodehost"]
                                            ? props.apps["nodehost"].installed
                                            : false
                                    }
                                />
                            </div>
                            <div>
                                <FontAwesomeIcon
                                    icon={"rocket"}
                                    color={"white"}
                                    size={"5x"}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card WebhooksCard">
                    <div className={"card-content"}>
                        <div className={"flex"}>
                            <div>
                                <h2>Webhooks</h2>
                                <h3>
                                    Use webhooks to log from your apps, and make
                                    Makerlog truly yours.
                                </h3>
                                <InstallButton
                                    to={"/apps/webhooks"}
                                    installed={
                                        props.apps && props.apps["webhooks"]
                                            ? props.apps["webhooks"].installed
                                            : false
                                    }
                                />
                            </div>
                            <div>
                                <FontAwesomeIcon
                                    icon={"cogs"}
                                    color={"white"}
                                    size={"5x"}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card ShipstreamsCard">
                    <div className={"card-content"}>
                        <div className={"flex"}>
                            <div>
                                <h2>Shipstreams</h2>
                                <h3>
                                    Log when you go live and showcase your
                                    streams!
                                </h3>
                                <InstallButton
                                    to={"/apps/shipstreams"}
                                    installed={
                                        props.apps && props.apps["shipstreams"]
                                            ? props.apps["shipstreams"]
                                                  .installed
                                            : false
                                    }
                                />
                            </div>
                            <div>
                                <FontAwesomeIcon
                                    icon={"ship"}
                                    color={"white"}
                                    size={"5x"}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card TelegramCard">
                    <div className={"card-content"}>
                        <div className={"flex"}>
                            <div>
                                <h2>Telegram</h2>
                                <h3>The official Makerlog bot & community</h3>
                                <InstallButton
                                    to={"/apps/telegram"}
                                    installed={
                                        props.apps && props.apps["telegram"]
                                            ? props.apps["telegram"].installed
                                            : false
                                    }
                                />
                            </div>
                            <div>
                                <FontAwesomeIcon
                                    icon={["fab", "telegram"]}
                                    color={"white"}
                                    size={"5x"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </SignedInSection>
        </>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withCurrentUser(AppList));
