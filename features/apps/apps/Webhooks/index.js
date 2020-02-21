import React from "react";
import { connect } from "react-redux";
import { WebhookTable } from "./components/WebhooksTable";
import { mapDispatchToProps, mapStateToProps } from "~/ducks/apps";
import Spinner from "~/components/Spinner";
import AppWebhookCreator from "./components/AppWebhookCreator";
import PageTitle from "../../../../components/ui/PageTitle";

const WebhookDocsTable = props => (
    <>
        <h4>Parameters</h4>
        <table className="is-full">
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
        <hr />
        <h4>Return values (regular task object, with a few changes)</h4>
        <table className="is-full">
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
                    <td>This will be returned depending if done is true.</td>
                </tr>
            </tbody>
        </table>
    </>
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
            <div>
                <PageTitle title="Webhooks" />
                <div className="card">
                    <div className="card-content">
                        <h4>Create webhook</h4>
                        <p>
                            Select a project, and we'll create a webhook linked
                            to it. Afterwards, just send a POST event from
                            anywhere, and we'll log to your feed. It's that
                            simple. No authentication required.
                        </p>
                        <br />
                        <AppWebhookCreator
                            appName="Makerlog"
                            identifier="webhook"
                        />
                        <hr />

                        <WebhookDocsTable />
                        <hr />

                        <h4>Active webhooks</h4>
                        {this.props.apps["webhook"].installed && (
                            <WebhookTable
                                webhooks={this.props.apps["webhook"].webhooks}
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
        );
    }
}

Webhooks.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(Webhooks);
