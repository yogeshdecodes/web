import React from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps, mapStateToProps} from "ducks/apps";
import Spinner from "components/Spinner";
import {WebhookTable} from '../Webhooks/components/WebhooksTable';
import AppWebhookCreator from '../Webhooks/components/AppWebhookCreator';

class NodeHost extends React.Component {
    render() {
        const style = {
            backgroundColor: "#2282f8",
            borderRadius: 5,
            color: 'white',
        }

        if (this.props.isLoading && !this.props.apps) {
            return <Spinner />
        }

        const params = new URLSearchParams(this.props.location.search); 
        const success = params.get('success');

		return (
			<div>
				<div className={"hero dark"} style={style}>
					<div className={"container"}>
						<h2 className={"has-text-white"}>
							NodeHost
						</h2>
						<h3>
							Log new websites and other tasks from NodeHost instantly.
						</h3>
					</div>
				</div>
				<br/>
				<section className={"container"}>
					<h3>Link to project</h3>
					<div className={"card"}>
						<div className={"card-content"}>
							Select a project and NodeHost will post to it. It's seamless.
							<hr/>
                            {success && <div className={"panel-message success"}>Done! Your NodeHost account is now linked to Makerlog.</div>}
							<AppWebhookCreator appName="NodeHost" identifier="nodehost" sendKeyTo={"https://nodehost.cloud/webhook/account_integrations_makerlog"}/>
						</div>
					</div>
					<br/>
					<h3>Active webhooks</h3>
					<div className={"card"}>
						<div className={"card-content"}>

							{this.props.apps['nodehost'] && this.props.apps['nodehost'].installed &&
							<WebhookTable webhooks={this.props.apps['nodehost'].webhooks}/>
							}
							{this.props.apps['nodehost'] && !this.props.apps['nodehost'].installed &&
							<h3 className={"has-text-centered"}>Nothing here.</h3>
							}
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NodeHost);