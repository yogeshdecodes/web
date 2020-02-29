import React from "react";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "~/ducks/apps";
import Spinner from "~/components/Spinner";
import { WebhookTable } from "../Webhooks/components/WebhooksTable";
import AppWebhookCreator from "../Webhooks/components/AppWebhookCreator";
import PageTitle from "../../../../components/ui/PageTitle";

class NodeHost extends React.Component {
    render() {
        const style = {
            backgroundColor: "#2282f8",
            borderRadius: 5,
            color: "white"
        };

        if (this.props.isLoading && !this.props.apps) {
            return <Spinner />;
        }

        const params = this.props.query;
        const success = params.success;

        return (
            <div>
                <PageTitle title="NodeHost" />
                <div className="card">
                    <div className="card-content">
                        <h4>Link to project</h4>
                        <p>
                            Select a project and NodeHost will post to it. It's
                            seamless.
                        </p>
                        <br />
                        {success && (
                            <div className={"panel-message success"}>
                                Done! Your NodeHost account is now linked to
                                Makerlog.
                            </div>
                        )}
                        <AppWebhookCreator
                            appName="NodeHost"
                            identifier="nodehost"
                            sendKeyTo={
                                "https://nodehost.cloud/webhook/account_integrations_makerlog"
                            }
                        />
                        <hr />
                        <h4>Active webhooks</h4>
                        {this.props.apps["nodehost"] &&
                            this.props.apps["nodehost"].installed && (
                                <WebhookTable
                                    webhooks={
                                        this.props.apps["nodehost"].webhooks
                                    }
                                />
                            )}
                        {this.props.apps["nodehost"] &&
                            !this.props.apps["nodehost"].installed && (
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

export default connect(mapStateToProps, mapDispatchToProps)(NodeHost);
