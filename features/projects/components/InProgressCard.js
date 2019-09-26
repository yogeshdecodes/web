import React from 'react';
import PropTypes from 'prop-types';
import {groupTasksByDone} from "lib/utils/tasks";
import {Entry} from "features/stream";
import {Tooltip} from "react-tippy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {StatsLevel} from "features/stats";
import {connect} from 'react-redux';
import mapDispatchToProps from '../containers/mapDispatchToProps';
import {FullName} from "features/users";
import Greeting from "components/Greeting";


const HelpTooltip = (props) => (
	<Tooltip
		html={<span><FontAwesomeIcon icon={'check'}/> <b>Click</b> to mark as done</span>}
		delay={200}
		position={'right'}
		size={'small'}
		hideOnClick
		sticky>
		{props.children}
	</Tooltip>
)

const InProgressCard = (props) => {
	if (!props.showGreeting && (props.tasks.length === 0 || !props.tasks)) return null;

	return (
		<div className={"card InProgressCard " + (props.showGreeting && props.tasks.length === 0 && 'empty')}>
			<div className={"card-content"}>
				<div className={"flex"}>
					<div>
						{props.tasks.length > 0 && <h4>In progress</h4>}
						{props.showGreeting && props.tasks.length === 0 &&
						<div>
							<h3>
								<Greeting/>, <FullName user={props.user}/>
							</h3>
							<span className={"note"}>
								Mark a task below as "In Progress" to see it here.
							</span>
						</div>
						}
						{props.tasks.map(
							task =>
								<div onClick={() => props.markDone(task.id)}>
									<Entry
										contentWrapper={HelpTooltip}
										task={task}
										withCounts={false}
										key={task.id}
										withTooltip={false}
										withDetailModal={false}
										withPraise={false}/>
								</div>
						)}
					</div>
					{props.large &&
					<div>
						<StatsLevel className={"has-text-white"} large={false}/>
					</div>
					}
				</div>
			</div>
		</div>
	)
}

InProgressCard.propTypes = {
	showGreeting: PropTypes.bool,
}

InProgressCard.defaultProps = {
	showGreeting: true
}

export default connect(
	(state) => ({
		user: state.user.me,
		tasks: groupTasksByDone(state.tasks.tasks).in_progress
	}),
	mapDispatchToProps
)(InProgressCard)
