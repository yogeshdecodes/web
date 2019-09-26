import React from 'react';
import {ActivityCard, ActivityCardPanel} from "./ActivityCard";
import {connect} from "react-redux";
import Spinner from "components/Spinner";

const UserActivityCard = (props) => {
	if (props.isLoading) {
		return (
			<ActivityCardPanel>
				<div className={"card-content"}>
					<Spinner text={"Loading your activity..."} small={true}/>
				</div>
			</ActivityCardPanel>
		);
	} else if (props.failed || !props.me) {
		return (
			<ActivityCardPanel>
				<div className={"card-content"}>
					<strong>Failed to load your user.</strong>
				</div>
			</ActivityCardPanel>
		)
	}

    return <ActivityCard user={props.me} trend={props.trend ? props.trend : [0]} />
}

UserActivityCard.propTypes = {}

const mapStateToProps = (state) => {
    return {
        isLoading: state.stats.isLoading || state.user.isLoading,
        failed: state.stats.failed || state.user.failed,
        me: state.user.me,
        tda: state.stats.user.tda,
        streak: state.stats.user.streak,
        trend: state.stats.user.activity_trend,
    }
}

export default connect(
    mapStateToProps
)(UserActivityCard);