import React from 'react';
import {connect} from 'react-redux';
import {actions as statsActions} from 'ducks/stats';
import Streak from "components/Streak";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tda from "components/Tda";
import Emoji from "../../../../components/Emoji";

class UserStatsLevel extends React.Component {
	render() {
		if (!this.props.ready) {
			return null
		}

		if (this.props.doneToday !== undefined && this.props.streak !== undefined && this.props.remainingTasks !== undefined && this.props.tda !== undefined) {
			return (
				<nav className={"is-mobile " + this.props.className}>

					{this.props.large &&
					<React.Fragment>
						<div className={"flex end"}>
							<div className={"hero-item"}>
								<p className={"heading"}><FontAwesomeIcon icon={'fire'}/> Streak</p>
								<Streak days={this.props.streak} endingSoon={this.props.streakEndingSoon}/>
							</div>
							<div className={"hero-item"}>
							 	<p className={"heading"}><FontAwesomeIcon icon={'bed'} /> Rest days</p>
								<Emoji emoji={"😴️"} /> {this.props.restDayBalance ? this.props.restDayBalance : 0}
							</div>
							<div className={"hero-item"}>
								<p className={"heading"}>
									<FontAwesomeIcon icon={'calendar-check'}/> Tasks/day
								</p>
								<Tda tda={this.props.tda}/>
							</div>
						</div>
					</React.Fragment>
					}

					{!this.props.importantOnly &&
					<React.Fragment>
						<div className="level-item">
						</div>
						<div className="level-item has-text-centered">
							<div>
								<p className="heading">Done today</p>
								<p className="title">{this.props.doneToday}</p>
							</div>
						</div>
						<div className="level-item">
						</div>
						<div className="level-item has-text-centered">
							<div>
								<p className="heading">Remaining</p>
								<p className="title">{this.props.remainingTasks}</p>
							</div>
						</div>
					</React.Fragment>
					}
				</nav>
			);
		} else {
			return <div>Some stats are missing. <button onClick={this.props.refreshStats}>Reload stats</button></div>
		}

	}
}

UserStatsLevel.defaultProps = {
	large: true
}

const mapStateToProps = (state) => {
	return {
		ready: state.stats.ready,
		isLoading: state.stats.isLoading,
		streak: state.stats.user.streak,
        restDayBalance: state.stats.user.rest_day_balance,
		streakEndingSoon: state.stats.user.streak_ending_soon,
		remainingTasks: state.stats.user.remaining_tasks,
		doneToday: state.stats.user.done_today,
		tda: state.stats.user.tda,
		makerScore: state.stats.user.maker_score,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		refreshStats: () => dispatch(statsActions.fetchStats())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserStatsLevel)