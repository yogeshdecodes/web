import React from "react";
import { connect } from "react-redux";
import { actions as tasksActions } from "~/ducks/tasks";
import { applySearchTerms } from "~/lib/utils/tasks";
import differenceInHours from "date-fns/differenceInHours";
import { Task } from "~/features/stream";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Emoji from "../../../components/Emoji";
import OutboundLink from "../../../components/OutboundLink";
import { Tooltip } from "react-tippy";
import { actions as editorActions } from "../../../ducks/editor";
import format from "date-fns/format";
import config from "../../../config";

import TaskQueue from "~/features/tasks/components/TaskQueue";
import { Track } from "../../../vendor/ga";
import { orderByDate } from "../../../lib/utils/tasks";
import orderBy from "lodash/orderBy";

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

    generateTweetText = () => {
        let text = `Done today on @GetMakerlog:\n`;

        orderByDate(
            this.getTodayTasks().filter(t => t.done),
            "asc"
        ).map(task => {
            text = text + `\n✅ ${task.content}`;
            return true;
        });

        return text;
    };

    getTodayTasks = () => {
        return this.props.tasks.filter(
            task =>
                differenceInHours(new Date(), new Date(task.created_at)) <= 24
        );
    };

    onTweetClick = () => {
        new Track().linkClick("tweeted-tasks");
    };

    render() {
        if (!this.props.tasks) return null;
        const tasks = orderBy(
            orderByDate(this.getTodayTasks(), "desc"),
            "done",
            "asc"
        );

        return (
            <TodayPage
                user={this.props.me}
                focusMode={this.state.focusMode}
                className={"TodayPage container narrow"}
            >
                <div className={"flex col-right v-center mb-em mtGap"}>
                    <div className="stretch">
                        <h3>{this.getTodayTasks().length} done today</h3>
                    </div>
                    <div>
                        <a
                            className="gray-link-with-icon"
                            target={"_blank"}
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                this.generateTweetText()
                            )}`}
                            onClick={this.onTweetClick}
                        >
                            <FontAwesomeIcon icon={["fab", "twitter"]} /> Tweet
                        </a>
                    </div>
                </div>
                <div className="TodayCard card">
                    <div className="today-input">
                        <TaskQueue />
                    </div>
                    <div className={"card-content"}>
                        {tasks.length === 0 && (
                            <div
                                className={
                                    "message-container flex columns center v-center"
                                }
                            >
                                <h3 className={"mt0 has-text-grey"}>
                                    No tasks yet.
                                </h3>
                            </div>
                        )}
                        {tasks.map(task => (
                            <div onClick={e => this.props.markDone(task.id)}>
                                <Tooltip
                                    html={
                                        <span>
                                            <FontAwesomeIcon icon={"check"} />{" "}
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
