import React from 'react';
import {withRouter} from 'react-router';
import queryString from 'query-string';
import {registerSlackIntegration} from 'lib/integrations/slack';
import {errorArray} from 'lib/utils/error';
import ErrorMessageList from 'components/forms/ErrorMessageList';
import InstallCard from '../../../../TasksPage/screens/AppsTab/components/InstallCard';


const AddToSlackButton = (props) => (
    <a href="https://slack.com/oauth/authorize?client_id=326793041328.399635065136&scope=bot,commands,links:read"><img
        alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png"
        srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"/></a>
)

class SlackInstallCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isRegistering: false,
            success: false,
            failed: false,
            errorMessages: null,
        }
    }

    async componentWillMount() {
        let params = queryString.parse(this.props.location.search);
        if (params['code']) {
            this.setState({ isRegistering: true });
            try {
                await registerSlackIntegration(params['code']);
                this.setState({ isRegistering: false, success: true });
            } catch (e) {
                this.setState({ isRegistering: false, failed: true, errorMessages: errorArray(e.message) })
            }
        }
    }

	render() {
		return (
			<div>
				{this.state.success &&
				<div className={"panel-message success"}>
						Congrats! We've added Slack to your account.
				</div>}

				{this.state.errorMessages && <ErrorMessageList errorMessages={this.state.errorMessages}/>}

				<div className={"panel-message"}>
					Note: If Makerlog is already installed to your channel, just run <kbd>/mlink {this.props.linkKey}</kbd> to link it to your account.
				</div>

				<InstallCard
					header={"Add to workspace"}
					app="Slack">
					<AddToSlackButton/>
				</InstallCard>
			</div>
		)
	}
}

export default withRouter(SlackInstallCard);