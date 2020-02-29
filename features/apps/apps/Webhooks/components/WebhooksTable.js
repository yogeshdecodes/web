import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAppIcon } from "~/lib/apps";
import { deleteHook } from "~/lib/integrations/webhook";
import { loadingClass } from "~/lib/utils/random";

class DeleteButton extends React.Component {
    state = {
        deleting: false,
        failed: false
    };

    onClick = async () => {
        try {
            this.setState({ deleting: true, failed: false });
            await deleteHook(this.props.id);
            this.setState({ deleting: false, failed: false });
            if (this.props.onDelete) {
                this.props.onDelete(this.props.id);
            }
        } catch (e) {
            this.setState({ deleting: false, failed: true });
        }
    };

    render() {
        return (
            <button
                className={loadingClass("btn-delete", this.state.deleting)}
                onClick={this.onClick}
            >
                {this.state.failed ? "Failed to delete." : "Delete hook"}
            </button>
        );
    }
}

const WebhookRow = ({ webhook, onDelete }) => (
    <tr>
        <th>
            <FontAwesomeIcon icon={getAppIcon(webhook.event)} />
        </th>
        <td>{webhook.token_preview}</td>
        <td>
            {webhook.project ? webhook.project.name : "No project attached"}
        </td>
        <td>{webhook.description}</td>
        <td>{webhook.extra_data || "No data."}</td>
        <td>
            <DeleteButton id={webhook.id} onDelete={onDelete} />
        </td>
    </tr>
);

class WebhookTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            webhooks: this.props.webhooks
        };
    }

    deleteHook = id => {
        this.setState({
            webhooks: this.state.webhooks.filter(h => h.id !== id)
        });
    };

    render() {
        const webhooks = this.state.webhooks;

        return (
            <table className="is-full">
                <thead>
                    <th>
                        <abbr title="Application">App</abbr>
                    </th>
                    <th>Token (secret)</th>
                    <th>Linked project</th>
                    <th>Description</th>
                    <th>App data</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {webhooks &&
                        webhooks.map(webhook => (
                            <WebhookRow
                                webhook={webhook}
                                onDelete={this.deleteHook}
                            />
                        ))}
                </tbody>
            </table>
        );
    }
}

export { WebhookRow, WebhookTable };
