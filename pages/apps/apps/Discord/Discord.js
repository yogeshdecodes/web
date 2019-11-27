import React from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps, mapStateToProps} from "ducks/apps";
import Spinner from "components/Spinner";
import InstallCard from '../../../TasksPage/screens/AppsTab/components/InstallCard';

const DiscordInstallCard = (props) => (
    <div className="DiscordInstallCard">
        <InstallCard
            app="Discord">
            Add
        </InstallCard>
    </div>
)

class Discord extends React.Component {
    render() {
        const style = {
            backgroundColor: "#7289da",
            color: 'white'
        }

        if (this.props.isLoading && !this.props.apps) {
            return <Spinner />
        }

		return (
			<div className="Discord">
				<div className={"hero dark"} style={style}>
					<h2>Discord</h2>
					<h3>
						Makerlog's official chat community. Interact with other users, add logs from desktop and mobile, and stay in the loop wherever you go.
					</h3>
				</div>

				{!this.props.apps['discord'].installed && <DiscordInstallCard/>}
			</div>
		)
	}
}

Discord.propTypes = {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Discord);