import React from "react";
import { connect } from "react-redux";
import { actions as tasksActions } from "~/ducks/tasks";
import { applySearchTerms } from "~/lib/utils/tasks";
import differenceInHours from "date-fns/differenceInHours";
import { Task } from "~/features/stream";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Emoji from "~/components/Emoji";
import OutboundLink from "~/components/OutboundLink";
import { Tooltip } from "react-tippy";
import { actions as editorActions } from "~/ducks/editor";
import "./index.scss";
import config from "../../../../config";

const TodayPage = styled.div`
    min-height: ${props => (props.focusMode ? "100vh" : "calc(100vh - 120px)")};

    &::before {
        background: ${props => props.theme.primaryDarker};
        background-image: url(${props => props.user.header});
    }

    .column {
        ${props =>
            props.focusMode
                ? "display: flex; align-items: center; justify-content: center;"
                : ""}
    }
`;

class TodayView extends React.Component {
    state = {
        focusMode: false
    };

    toggleFocusMode = () => {
        if (this.state.focusMode) {
            this.setState({
                focusMode: false
            });
            document.getElementById("root").classList.remove("nav-hidden");
        } else {
            document.getElementById("root").classList.add("nav-hidden");
            this.setState({
                focusMode: true
            });
        }
    };

    toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    renderTweetButton = () => {
        const text = `Today I completed ${this.props.doneToday} tasks on @getmakerlog! 💪 \n #TogetherWeMake`;
        const url = `${config.BASE_URL}/@${this.props.me.username}`;

        return (
            <OutboundLink
                href={`https://twitter.com/share?text=${encodeURIComponent(
                    text
                )}&url=${url}`}
                className={"btn-small btn-twitter"}
                target="_blank"
            >
                <FontAwesomeIcon icon={["fab", "twitter"]} /> Tweet your victory
            </OutboundLink>
        );
    };

    render() {
        if (!this.props.tasks) return null;
        const tasks = this.props.tasks.filter(
            task =>
                differenceInHours(new Date(), new Date(task.created_at)) <=
                    24 && task.done === false
        );

        return (
            <TodayPage
                user={this.props.me}
                focusMode={this.state.focusMode}
                className={"TodayViewPage"}
            >
                <div className={"overlay"} />
                <div className="column">
                    <div>
                        <div className={"flex col-right v-center mbGap"}>
                            <div>
                                <h2 className={"has-text-white mt0 mb0"}>
                                    Remaining today
                                </h2>
                            </div>
                            <div>
                                <FontAwesomeIcon
                                    icon={"plus"}
                                    color={"white"}
                                    onClick={this.props.toggleEditor}
                                />
                            </div>
                        </div>
                        <div className={"card"}>
                            <div className={"card-content"}>
                                {this.props.doneToday === 0 &&
                                    tasks.length === 0 && (
                                        <div className={"message-container"}>
                                            <h3 className={"mt0 mb0"}>
                                                You haven't done anything today.
                                            </h3>
                                        </div>
                                    )}
                                {tasks.length === 0 &&
                                    this.props.doneToday > 0 && (
                                        <div className={"message-container"}>
                                            <h3 className={"mt0"}>
                                                <Emoji emoji={"🎉"} /> All done
                                                for today!
                                            </h3>
                                            {this.renderTweetButton()}
                                        </div>
                                    )}
                                {tasks.map(task => (
                                    <div
                                        onClick={e =>
                                            this.props.markDone(task.id)
                                        }
                                    >
                                        <Tooltip
                                            html={
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={"check"}
                                                    />{" "}
                                                    <b>Click</b> to mark as done
                                                </span>
                                            }
                                            delay={1000}
                                            position={"right"}
                                            size={"small"}
                                            hideOnClick
                                            followCursor
                                        >
                                            <Task
                                                withTooltip={false}
                                                withPraise={false}
                                                withDetailModal={false}
                                                withCounts={false}
                                                task={task}
                                            />
                                        </Tooltip>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </TodayPage>
        );
    }
}

const mapStateToProps = state => {
    return {
        tasks: applySearchTerms(state.tasks.tasks, state.tasks.searchTerms),
        projects: state.projects.projects,
        isSyncing: state.tasks.isSyncing || state.projects.isSyncing,
        isSilentlySyncing: state.tasks.ready && state.tasks.isSyncing,
        failed: state.tasks.failed,
        errorMessages: state.tasks.errorMessages,
        ready: state.tasks.ready && state.projects.ready,
        searchTerms: state.tasks.searchTerms,
        taskView: state.tasks.taskView,
        me: state.user.me,
        remainingTasks: state.stats.user.remaining_tasks,
        doneToday: state.stats.user.done_today
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTasks: () => dispatch(tasksActions.loadTasks()),
        markDone: id => dispatch(tasksActions.markDone(id)),
        toggleEditor: () => dispatch(editorActions.toggleEditor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodayView);
