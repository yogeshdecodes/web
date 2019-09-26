import React from 'react';
import PropTypes from 'prop-types';
import {groupTasksByDone} from "lib/utils/tasks";
import {Entry} from "features/stream";
import {Tooltip} from "react-tippy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {connect} from 'react-redux';
import mapDispatchToProps from '../containers/mapDispatchToProps';
import {FullName} from "features/users";
import Greeting from "components/Greeting";
import {isDueSoon, wasAddedToday} from "../../../lib/utils/tasks";


const HelpTooltip = (props) => (
    <Tooltip
        html={<span><FontAwesomeIcon icon={'check'} /> <b>Click</b> to mark as done</span>}
        delay={200}
        position={'right'}
        size={'small'}
        hideOnClick
        sticky>
        {props.children}
    </Tooltip>
)


const RemainingTodayCard = (props) => {
    if (!props.showGreeting && (props.tasks.length === 0 || !props.tasks)) return null;

    var d = new Date()
    const tasks = props.tasks.filter(task => (!task.done && wasAddedToday(task)) || isDueSoon(task))

	return (
		<div className={"card RemainingTodayCard " + (props.showGreeting && tasks.length === 0 && 'empty')}>
			<div className={"card-content"}>
				{tasks.length > 0 && <h3 className={"heading"}>Remaining today</h3>}
				{props.showGreeting && tasks.length === 0 &&
				<div>
					<h3 className={"has-text-white"}>
						<Greeting/>, <FullName user={props.user}/>
					</h3>
					<p>
						Mark a task below as "In Progress" to see it here.
					</p>
				</div>
				}
				{tasks.map(
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
		</div>
	)
}

RemainingTodayCard.propTypes = {
    showGreeting: PropTypes.bool,
}

RemainingTodayCard.defaultProps = {
    showGreeting: true
}

export default connect(
    (state) => ({
        user: state.user.me,
        tasks: groupTasksByDone(state.tasks.tasks)
    }),
    mapDispatchToProps
)(RemainingTodayCard)
