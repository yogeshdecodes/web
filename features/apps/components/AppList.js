import React from "react";
import LoggedOutOnly from "~/features/users/containers/LoggedOutOnly";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "~/ducks/apps";
import { mapStateToProps as mapUserToProps } from "~/ducks/user";
import { Link } from "~/routes";
import "./AppsList.scss";
import IntegrationMedia from "./IntegrationMedia";

const AppList = props => {
    return (
        <>
            <LoggedOutOnly>
                <div className="card">
                    <div className={"card-content"}>
                        <h2 className={"has-text-grey"}>
                            You must be signed in to use the following apps.
                        </h2>
                        <Link route={"start"}>
                            <a className={"btn-primary"}>Get started</a>
                        </Link>
                    </div>
                </div>
            </LoggedOutOnly>

            <IntegrationMedia
                name="Telegram"
                description="The official Makerlog bot & community"
                icon="https://cdn0.iconfinder.com/data/icons/social-network-24/512/Telegram-512.png"
                app="telegram"
                installed={
                    props.apps && props.apps["telegram"]
                        ? props.apps["telegram"].installed
                        : false
                }
            />

            <IntegrationMedia
                name="Todoist"
                description="Log done tasks straight from Todoist."
                icon="https://getdrawings.com/free-icon/todoist-icon-69.png"
                app="todoist"
                installed={
                    props.apps && props.apps["todoist"]
                        ? props.apps["todoist"].installed
                        : false
                }
            />

            <IntegrationMedia
                name="Slack"
                description="Log tasks and see your stats with Makebot."
                icon="https://a.slack-edge.com/80588/marketing/img/meta/slack_hash_256.png"
                app="slack"
                installed={
                    props.apps && props.apps["slack"]
                        ? props.apps["slack"].installed
                        : false
                }
            />

            <IntegrationMedia
                name="Trello"
                description="Log tasks from your Trello boards."
                icon="https://cdn.iconscout.com/icon/free/png-256/trello-226534.png"
                app="trello"
                installed={
                    props.apps && props.apps["trello"]
                        ? props.apps["trello"].installed
                        : false
                }
            />

            <IntegrationMedia
                name="GitHub"
                description="Log your daily commit counts from GitHub."
                icon="data:image/png;base64,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"
                app="github"
                installed={
                    props.apps && props.apps["github"]
                        ? props.apps["github"].installed
                        : false
                }
            />

            <IntegrationMedia
                name="GitLab"
                description="Log your daily commit counts from GitLab."
                icon="https://pbs.twimg.com/profile_images/694241544899923968/Yj5sO9P4_400x400.png"
                app="gitlab"
                installed={
                    props.apps && props.apps["gitlab"]
                        ? props.apps["gitlab"].installed
                        : false
                }
            />

            <IntegrationMedia
                name="NodeHost"
                description="Auto post tasks from NodeHost."
                icon="https://www.nodehost.ca/themes/node/img/icon.png"
                app="nodehost"
                installed={
                    props.apps && props.apps["nodehost"]
                        ? props.apps["nodehost"].installed
                        : false
                }
            />

            <IntegrationMedia
                name="Webhooks"
                description="Use webhooks to log from pretty much anything."
                icon="data:image/png;base64,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"
                app="webhooks"
                installed={
                    props.apps && props.apps["webhooks"]
                        ? props.apps["webhooks"].installed
                        : false
                }
            />

            <IntegrationMedia
                name="Shipstreams"
                description="Log when you go live and showcase your streams!"
                icon="https://wip.imgix.net/store/product/1852/logo/c39fc1bb7a3758ce74a83430b658d94e.png?ixlib=rb-1.2.2&fit=crop&w=800&h=800&s=6ddf265ffe16e94aa12f3fcb7b4a312b"
                app="shipstreams"
                installed={
                    props.apps && props.apps["shipstreams"]
                        ? props.apps["shipstreams"].installed
                        : false
                }
            />
        </>
    );
};

export default connect(state => {
    return { ...mapStateToProps(state), ...mapUserToProps(state) };
}, mapDispatchToProps)(AppList);
