import React from 'react';
import WorldStatsContainer from "./WorldStatsContainer";

const withWorldStats = (WrappedComponent) => {
	class HOC extends React.Component {
		render() {
			return (
				<WorldStatsContainer component={WrappedComponent}/>
			);
		}
	}
};

export default withWorldStats;