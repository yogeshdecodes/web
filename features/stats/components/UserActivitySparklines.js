import React from 'react';
import PropTypes from 'prop-types';
import ActivitySparklines from "./ActivitySparklines";
import Spinner from "components/Spinner";
import {connect} from 'react-redux';

const UserActivitySparklines = (props) => {
	if (props.isLoading) {
		return <Spinner small={true}/>
	} else if (!props.activityTrend) {
		return <h3>No data.</h3>
	}

	return <ActivitySparklines trend={props.activityTrend}/>
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.stats.isLoading,
		activityTrend: state.stats.user.activity_trend,
	}
}

UserActivitySparklines.propTypes = {
	isLoading: PropTypes.bool,
	activityTrend: PropTypes.shape({
		done: PropTypes.array
	}),
}

export default connect(
	mapStateToProps,
)(ActivitySparklines)