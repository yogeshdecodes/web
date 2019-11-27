import React from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps, mapStateToProps} from "ducks/apps";
import Spinner from "components/Spinner";
import {WebhookTable} from '../Webhooks/components/WebhooksTable';
import AppWebhookCreator from '../Webhooks/components/AppWebhookCreator';

class GitHub extends React.Component {
    render() {
        const style = {
            backgroundColor: "black",
            color: 'white',
        }

        if (this.props.isLoading && !this.props.apps) {
            return <Spinner />
        }

		return (
			<div>
				<div className={"hero dark"} style={style}>
					<div className={"container"}>
						<h2>GitHub</h2>
						<h3>
							Log your commits and closed issues from GitHub instantly.
						</h3>
					</div>
				</div>
				<br/>
				<section className={"container"}>
					<h4>Link to project</h4>
					<div className={"card"}>
						<div className={"card-content"}>
                            Select a project then use the secret generated webhook to link it to a GitHub repository. We'll start tracking events like commits and issues afterwards.
							<br/>
                            <small className='has-text-grey'>Need help? <a href="https://developer.github.com/webhooks/creating/">Learn how to use this webhook.</a></small>
							<hr/>
							<AppWebhookCreator appName="GitHub" identifier="github"/>
						</div>
					</div>
					<br/>
					<h3>Active webhooks</h3>
					<div className={"card"}>
						<div className={"card-content"}>
							{this.props.apps['github'].installed &&
							<WebhookTable webhooks={this.props.apps['github'].webhooks}/>
							}
							{!this.props.apps['github'].installed &&
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
)(GitHub);