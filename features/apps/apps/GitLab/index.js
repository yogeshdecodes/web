import React from "react";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "~/ducks/apps";
import Spinner from "~/components/Spinner";
import { WebhookTable } from "../Webhooks/components/WebhooksTable";
import AppWebhookCreator from "../Webhooks/components/AppWebhookCreator";
import PageTitle from "../../../../components/ui/PageTitle";

class GitLab extends React.Component {
    render() {
        const style = {
            backgroundColor: "#fc6d26",
            borderRadius: 5,
            color: "white"
        };

        if (this.props.isLoading && !this.props.apps) {
            return <Spinner />;
        }

        return (
            <div>
                <PageTitle title="GitLab" />
                <div className="card">
                    <div className="card-content">
                        <h4>Link to project</h4>
                        Select a project then use the secret generated webhook
                        to link it to a GitLab repository. We'll start tracking
                        events like commits afterwards.
                        <br />
                        <small className="has-text-grey">
                            Need help?{" "}
                            <a href="https://docs.gitlab.com/ee/user/project/integrations/webhooks.html/">
                                Learn how to use this webhook.
                            </a>
                        </small>
                        <br />
                        <br />
                        <AppWebhookCreator
                            appName="GitLab"
                            identifier="gitlab"
                        />
                        <hr />
                        <h4>Active webhooks</h4>
                        {this.props.apps["gitlab"] &&
                            this.props.apps["gitlab"].installed && (
                                <WebhookTable
                                    webhooks={
                                        this.props.apps["gitlab"].webhooks
                                    }
                                />
                            )}
                        {this.props.apps["gitlab"] &&
                            !this.props.apps["gitlab"].installed && (
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

export default connect(mapStateToProps, mapDispatchToProps)(GitLab);
