import React from 'react';
import PropTypes from 'prop-types';
import ActivitySparklines from "../ActivitySparklines";
import Streak from 'components/Streak';
import Tda from 'components/Tda';

const ActivityCardPanel = (props) => (
	<div className={"card"}>
		<header>
			<h2>Your activity</h2>
		</header>
		{props.children}
	</div>
)

const ActivityCard = (props) => {
	let trend = [0]
	if (props.trend) {
		trend = props.trend;
	} else {
		// Falls back to user trend, from passed user object. This may be why live update doesn't work.
		trend = props.user.activity_trend ? props.user.activity_trend : [0];
	}

	return (
		<div className={"card"}>
			<div className={"card-content"}>
				<div className={"center"}>
					<strong>{props.heading ? props.heading : 'Your activity'}</strong>
				</div>
				<ActivitySparklines trend={trend}/>
			</div>
			{props.user && props.showOtherStats &&
			<footer className="card-footer">
				<span>
				  <Tda tda={props.user.week_tda}/> tasks/day
				</span>
				<span>
				  <Streak days={props.user.streak}/>
				</span>
			</footer>
			}
		</div>
	)
}

ActivityCard.propTypes = {
	user: PropTypes.shape({
		activity_trend: PropTypes.array.isRequired,
		streak: PropTypes.number.isRequired,
		week_tda: PropTypes.number.isRequired
	}),
	trend: PropTypes.array,
}

ActivityCard.defaultProps = {
	showOtherStats: false
}

export {
	ActivityCard,
	ActivityCardPanel
}