import React from "react";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "~/ducks/apps";
import Spinner from "~/components/Spinner";
import { WebhookTable } from "../Webhooks/components/WebhooksTable";
import AppWebhookCreator from "../Webhooks/components/AppWebhookCreator";
import PageTitle from "../../../../components/ui/PageTitle";

class GitHub extends React.Component {
    render() {
        const style = {
            backgroundColor: "black",
            color: "white"
        };

        if (this.props.isLoading && !this.props.apps) {
            return <Spinner />;
        }

        return (
            <div>
                <PageTitle title="GitHub" />
                <div className="card">
                    <div className="card-content">
                        <h4>Link to project</h4>
                        Select a project then use the secret generated webhook
                        to link it to a GitHub repository. We'll start tracking
                        events like commits and issues afterwards.
                        <br />
                        <small className="help">
                            Need help?{" "}
                            <a href="https://developer.github.com/webhooks/creating/">
                                Learn how to use this webhook.
                            </a>
                        </small>
                        <br />
                        <br />
                        <AppWebhookCreator
                            appName="GitHub"
                            identifier="github"
                        />
                        <hr />
                        <h4>Active webhooks</h4>
                        {this.props.apps["github"].installed && (
                            <WebhookTable
                                webhooks={this.props.apps["github"].webhooks}
                            />
                        )}
                        {!this.props.apps["github"].installed && (
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

export default connect(mapStateToProps, mapDispatchToProps)(GitHub);
