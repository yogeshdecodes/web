import React from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps, mapStateToProps} from "ducks/apps";
import Spinner from "components/Spinner";
import {WebhookTable} from '../Webhooks/components/WebhooksTable';
import AppWebhookCreator from '../Webhooks/components/AppWebhookCreator';

class GitLab extends React.Component {
    render() {
        const style = {
            backgroundColor: "#fc6d26",
            borderRadius: 5,
            color: 'white',
        }

        if (this.props.isLoading && !this.props.apps) {
            return <Spinner />
        }

		return (
			<div>
				<div className={"hero dark"} style={style}>
					<div className={"container"}>
						<h2 className={"has-text-white"}>
							GitLab
						</h2>
						<h3>
							Log your commits and closed issues from GitLab instantly.
						</h3>
					</div>
				</div>
				<div className={"container"}>
					<h3 is='5'>Link to project</h3>
					<div className={"card"}>
						<div className={"card-content"}>
                            Select a project then use the secret generated webhook to link it to a GitLab repository. We'll start tracking events like commits afterwards.
							<br/>
                            <small className='has-text-grey'>Need help? <a href="https://docs.gitlab.com/ee/user/project/integrations/webhooks.html/">Learn how to use this webhook.</a></small>
							<hr/>
							<AppWebhookCreator appName="GitLab" identifier="gitlab"/>
						</div>
					</div>
					<br/>
					<h3 is='5'>Active webhooks</h3>
					<div className={"card"}>
						<div className={"card-content"}>
							{this.props.apps['gitlab'] && this.props.apps['gitlab'].installed &&
							<WebhookTable webhooks={this.props.apps['gitlab'].webhooks}/>
							}
							{this.props.apps['gitlab'] && !this.props.apps['gitlab'].installed &&
							<h3 className={"has-text-centered"}>Nothing here.</h3>
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GitLab);