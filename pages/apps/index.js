import React from "react";
import { connect } from "react-redux";
import { actions as appActions, mapStateToProps } from "~/ducks/apps";
import { mapStateToProps as mapUserToProps } from "~/ducks/user";
import GitHub from "~/features/apps/apps/GitHub";
import Slack from "~/features/apps/apps/Slack";
import Trello from "~/features/apps/apps/Trello";
import GitLab from "~/features/apps/apps/GitLab";
import Webhooks from "~/features/apps/apps/Webhooks";
import NodeHost from "~/features/apps/apps/NodeHost";
import Todoist from "~/features/apps/apps/Todoist";
import Shipstreams from "~/features/apps/apps/Shipstreams";
import Telegram from "~/features/apps/apps/Telegram";
import "./index.scss";
import Shop from "~/features/apps/components/Shop";
import AppsPageLayout from "~/layouts/AppsPage";
import { Router } from "~/routes";
import { authed } from "../../lib/auth";

class AppsPage extends React.Component {
    static async getInitialProps({ query, state, ...ctx }) {
        ctx.store.dispatch(appActions.fetchApps());
        if (query.app) {
            authed(ctx);
        }
        return {
            app: query.app ? query.app : null,
            query
        };
    }

    getCurrentRoute = () => {
        const { app, query, isLoggedIn } = this.props;

        if (app && !isLoggedIn) {
            Router.pushRoute("/begin");
            return <div></div>;
        }

        switch (app) {
            case "slack":
                return <Slack query={query} />;

            case "trello":
                return <Trello query={query} />;

            case "github":
                return <GitHub query={query} />;

            case "gitlab":
                return <GitLab query={query} />;

            case "webhooks":
                return <Webhooks query={query} />;

            case "nodehost":
                return <NodeHost query={query} />;

            case "todoist":
                return <Todoist query={query} />;

            case "shipstreams":
                return <Shipstreams query={query} />;

            case "telegram":
                return <Telegram query={query} />;

            default:
                return <Shop />;
        }
    };

    render() {
        return (
            <AppsPageLayout
                ready={
                    !this.props.appsState.isLoading &&
                    !this.props.appsState.failed
                }
            >
                {this.getCurrentRoute()}
            </AppsPageLayout>
        );
    }
}

// TODO: make /apps page unauthed, individual views authed
const passCombinedState = state => {
    return { appsState: mapStateToProps(state), ...mapUserToProps(state) };
};
export default connect(passCombinedState)(AppsPage);
