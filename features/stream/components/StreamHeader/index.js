import React from "react";
import { StatsLevel } from "~/features/stats";
import { connect } from "react-redux";
import { actions as editorActions } from "~/ducks/editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Greeting from "~/components/Greeting";
import { FullName } from "~/features/users";
import HeaderTrend from "../HeaderTrend";
import DayProgressBar from "../DayProgressBar";
import { isDueSoon } from "~/lib/utils/tasks";
import Emoji from "~/components/Emoji";
import "./index.scss";
import Spinner from "~/components/Spinner";
import PageNavigation from "~/components/ui/PageNavigation";

function getStyles(user) {
    if (user.header) return { "--streamheader-bg": `url(${user.header})` };

    return { "--streamheader-bg": `inherit` };
}

const StreamHeader = props => {
    if (props.loading) {
        return (
            <div className={"StreamHeader hero blurred loading"}>
                <Spinner small color="white" text="Syncing your tasks..." />
            </div>
        );
    }

    return (
        <PageNavigation
            title={
                <>
                    <Greeting withEmoji />, <FullName user={props.user} />
                </>
            }
        />
    );

    return (
        <div
            className={"StreamHeader hero blurred"}
            style={getStyles(props.user)}
        >
            <div className={"container"}>
                <div className="title-text">
                    <h2>
                        {props.dueTaskCount > 0 ? (
                            <>
                                <Emoji emoji={"🚨"} /> You have{" "}
                                {props.dueTaskCount} tasks due soon,{" "}
                                <FullName user={props.user} />.
                            </>
                        ) : (
                            <>
                                <Greeting withEmoji />,{" "}
                                <FullName user={props.user} />
                            </>
                        )}
                    </h2>
                </div>
                <StatsLevel importantOnly />
            </div>
        </div>
    );
};

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
// <DayProgressBar />;

const mapDispatchToProps = dispatch => ({
    toggleEditor: () => dispatch(editorActions.toggleEditor())
});

const mapStateToProps = state => ({
    user: state.user.me,
    trend: state.stats.user ? state.stats.user.activity_trend : null,
    dueTaskCount: state.tasks.tasks
        ? state.tasks.tasks.filter(task => isDueSoon(task)).length
        : 0,
    loading: !state.tasks.isSyncing && !state.stats.ready
});

export default connect(mapStateToProps, mapDispatchToProps)(StreamHeader);
