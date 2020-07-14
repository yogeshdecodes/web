import React, { Component } from "react";
import { connect } from "react-redux";
import { actions as tasksActions } from "~/ducks/tasks";
import { applySearchTerms } from "~/lib/utils/tasks";
import differenceInHours from "date-fns/differenceInHours";
import { Task } from "~/features/stream";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "react-tippy";
import { actions as editorActions } from "~/ducks/editor";
import "./index.scss";
import Emoji from "~/components/Emoji";
import { orderByDate, groupTasksByDone } from "../../../../lib/utils/tasks";
import InlineCollapse from "../../../../components/InlineCollapse";

class TodayList extends Component {
    renderEmpty = () => {
        if (
            this.getDoneToday().length == 0 &&
            this.getRemainingToday().length == 0
        ) {
            // User has added nothing.
            return (
                <div className="empty-state">
                    <div className="text">
                        <strong>Add some tasks and kick off your day!</strong>
                        &nbsp;
                        <Emoji emoji="✨" />
                    </div>
                </div>
            );
        } else {
            // User has completed all tasks.
            return (
                <div className="empty-state">
                    <div className="text">
                        <strong>All clear today!</strong>&nbsp;
                        <Emoji emoji="🔥" />
                    </div>
                    <div className="tweet">{this.renderTweetButton()}</div>
                </div>
            );
        }
    };

    renderTasks = () => {
        const grouped = groupTasksByDone(this.props.tasks);

        return (
            <div>
                {grouped.in_progress && grouped.in_progress.length > 0 && (
                    <div className="TaskGroup in-progress">
                        <div className="top flex flex-gap">
                            <div>
                                <p className="heading">
                                    {grouped.in_progress.length} in-progress
                                </p>
                            </div>
                            <div className="flex-grow">
                                <hr />
                            </div>
                        </div>
                        <div className="tasks">
                            {grouped.in_progress.map(t => (
                                <Task key={t.id} task={t} />
                            ))}
                        </div>
                    </div>
                )}
                {grouped.remaining && grouped.remaining.length > 0 && (
                    <div className="TaskGroup remaining">
                        <div className="top flex flex-gap">
                            <div>
                                <p className="heading">
                                    {grouped.remaining.length} remaining
                                </p>
                            </div>
                            <div className="flex-grow">
                                <hr />
                            </div>
                        </div>
                        <div className="tasks">
                            {grouped.remaining.map(t => (
                                <Task key={t.id} task={t} />
                            ))}
                        </div>
                    </div>
                )}

                {grouped.done && grouped.done.length > 0 && (
                    <div className="TaskGroup done">
                        <div className="tasks">
                            <InlineCollapse
                                hr
                                text={`${grouped.done.length} done`}
                            >
                                {grouped.done.map(t => (
                                    <Task key={t.id} task={t} />
                                ))}
                            </InlineCollapse>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    getDoneToday = () => {
        return this.props.tasks.filter(t => t.done);
    };

    getRemainingToday = () => {
        return this.props.tasks.filter(t => !t.done);
    };

    generateTweetText = () => {
        let text = `Done today on @GetMakerlog:\n`;

        orderByDate(
            this.getDoneToday().filter(t => t.done),
            "asc"
        ).map(task => {
            text = text + `\n✅ ${task.content}`;
            return true;
        });

        return text;
    };

    renderTweetButton = () => {
        return (
            <a
                className="btn btn-light btn-small"
                target={"_blank"}
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    this.generateTweetText()
                )}`}
            >
                <FontAwesomeIcon icon={["fab", "twitter"]} /> Tweet your tasks
            </a>
        );
    };

    render() {
        return (
            <div className="TodayList">
                {!this.props.tasks || this.getRemainingToday().length === 0
                    ? this.renderEmpty()
                    : this.renderTasks()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks.tasks.filter(
            task =>
                differenceInHours(new Date(), new Date(task.created_at)) <= 24
        ),
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

export default connect(mapStateToProps, mapDispatchToProps)(TodayList);
