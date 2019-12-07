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
import { requireAuthed } from "~/lib/auth";

class AppsPage extends React.Component {
    static async getInitialProps({ query, ...ctx }) {
        ctx.store.dispatch(appActions.fetchApps());

        return {
            app: query.app ? query.app : null,
            query
        };
    }

    render() {
        const { app, query } = this.props;

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
    }
}

// TODO: make /apps page unauthed, individual views authed
const passCombinedState = state => {
    return { ...mapStateToProps(state), ...mapUserToProps(state) };
};
export default connect(passCombinedState)(requireAuthed(AppsPage));
