import React from "react";
import { connect } from "react-redux";
import { WebhookTable } from "./components/WebhooksTable";
import { mapDispatchToProps, mapStateToProps } from "~/ducks/apps";
import Spinner from "~/components/Spinner";
import AppWebhookCreator from "./components/AppWebhookCreator";

const WebhookDocsTable = props => (
    <div className="columns">
        <div className="column">
            <h3>Parameters</h3>
            <table className="is-fullwidth">
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Type</th>
                        <th>Required</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>content</td>
                        <td>String</td>
                        <td>Yes</td>
                        <td>The content of the log to post.</td>
                    </tr>
                    <tr>
                        <td>done</td>
                        <td>Boolean</td>
                        <td>Yes</td>
                        <td>Is it a done task?</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="column">
            <h3>Return values (regular task object, with a few changes)</h3>
            <table className="is-fullwidth">
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>update_hook</td>
                        <td>String</td>
                        <td>
                            A URL you can use to later update the task. POST any
                            changes to it.
                        </td>
                    </tr>
                    <tr>
                        <td>content</td>
                        <td>String</td>
                        <td>The content of the log created.</td>
                    </tr>
                    <tr>
                        <td>done</td>
                        <td>String</td>
                        <td>Whether it was marked as done</td>
                    </tr>
                    <tr>
                        <td>done_at</td>
                        <td>Timestamp</td>
                        <td>
                            This will be returned depending if done is true.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

class Webhooks extends React.Component {
    render() {
        const style = {
            backgroundColor: "#27ae60",
            color: "black"
        };

        if (this.props.isLoading && !this.props.apps) {
            return <Spinner />;
        }

        return (
            <div className="Trello">
                <div className={"hero dark"} style={style}>
                    <div className={"container"}>
                        <h2 className={"has-text-white"}>Webhooks</h2>
                        <h3>
                            Integrate your apps with Makerlog. Terminal, web,
                            server, anywhere. Just POST and go.
                        </h3>
                    </div>
                </div>
                <div className={"container"}>
                    <h3>Create webhook</h3>
                    <div className={"card"}>
                        <div className={"card-content"}>
                            Select a project, and we'll create a webhook linked
                            to it. Afterwards, just send a POST event from
                            anywhere, and we'll log to your feed. It's that
                            simple. No authentication required.
                            <hr />
                            <AppWebhookCreator
                                appName="Makerlog"
                                identifier="webhook"
                            />
                        </div>
                    </div>

                    <h3>Documentation</h3>
                    <div className={"card"}>
                        <div className={"card-content"}>
                            <WebhookDocsTable />
                        </div>
                    </div>

                    <h3>Active webhooks</h3>
                    <div className={"card"}>
                        <div className={"card-content"}>
                            {this.props.apps["webhook"].installed && (
                                <WebhookTable
                                    webhooks={
                                        this.props.apps["webhook"].webhooks
                                    }
                                />
                            )}
                            {!this.props.apps["webhook"].installed && (
                                <h3 className={"has-text-centered"}>
                                    Nothing here.
                                </h3>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Webhooks.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(Webhooks);
