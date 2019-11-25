import React from "react";
import { StatsLevel } from "~/features/stats";
import { connect } from "react-redux";
import { actions as editorActions } from "~/ducks/editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Greeting from "~/components/Greeting";
import { FullName } from "~/features/users";
import HeaderTrend from "./HeaderTrend";
import DayProgressBar from "./DayProgressBar";
import { isDueSoon } from "~/lib/utils/tasks";
import Emoji from "~//components/Emoji";

const StreamHeader = props => (
    <div className={"hero"}>
        <div className={"container"}>
            <div>
                <h2>
                    {props.dueTaskCount > 0 ? (
                        <>
                            <Emoji emoji={"🚨"} /> You have {props.dueTaskCount}{" "}
                            tasks due soon, <FullName user={props.user} />.
                        </>
                    ) : (
                        <>
                            <Greeting withEmoji />,{" "}
                            <FullName user={props.user} />
                        </>
                    )}
                </h2>
                <button onClick={props.toggleEditor} className={"btn-hero"}>
                    <FontAwesomeIcon icon="plus-square" /> Add a new task
                </button>
            </div>
            <StatsLevel importantOnly />
        </div>
        <DayProgressBar />
    </div>
);

/*
Code for trend bar
{props.trend && (
    <div className={"trend"}>
        <HeaderTrend
            color={props.theme.primaryDarker}
            trend={props.trend}
        />
    </div>
)} */

const mapDispatchToProps = dispatch => ({
    toggleEditor: () => dispatch(editorActions.toggleEditor())
});

const mapStateToProps = state => ({
    user: state.user.me,
    trend: state.stats.user ? state.stats.user.activity_trend : null,
    dueTaskCount: state.tasks.tasks
        ? state.tasks.tasks.filter(task => isDueSoon(task)).length
        : 0
});

export default connect(mapStateToProps, mapDispatchToProps)(StreamHeader);
