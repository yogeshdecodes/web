import React, { Component } from "react";
import { connect } from "react-redux";
import { actions as tasksActions } from "~/ducks/tasks";
import differenceInHours from "date-fns/differenceInHours";
import { actions as editorActions } from "~/ducks/editor";
import Spinner from "~/components/Spinner";
import EntryList from "~/features/stream/components/EntryList";
import Emoji from "../../../components/Emoji";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { orderByDate } from "../../../lib/utils/tasks";

class TodayCard extends Component {
    getTasks = () => {
        return this.props.tasks.filter(
            task =>
                differenceInHours(new Date(), new Date(task.created_at)) <= 24
        );
    };

    getUser = () => {
        return this.props.me;
    };

    isCurrentUser = () => {
        return this.props.me && this.props.me.id === this.getUser().id;
    };

    generateTweetText = doneTasks => {
        let name = this.getUser().twitter_handle
            ? `@${this.getUser().twitter_handle}`
            : this.getUser().username;
        let text = `Done today by ${name} on @GetMakerlog:\n`;

        if (this.props.me && this.props.me.id === this.getUser().id) {
            text = `Done today on @GetMakerlog:\n`;
        }

        orderByDate(doneTasks, "asc").map(task => {
            text = text + `\n✅ ${task.content}`;
            return true;
        });

        return text;
    };

    render() {
        if (!this.props.tasks) return null;
        const tasks = this.getTasks();

        return (
            <div>
                <h3 className="mb-em">Your day</h3>
                <div className="card">
                    <div className="card-content">
                        {this.props.isSyncing ? (
                            <center>
                                <Spinner small text="Loading tasks..." />
                            </center>
                        ) : (
                            <EntryList tasks={tasks} />
                        )}
                        {!this.props.isSyncing && this.getTasks().length === 0 && (
                            <center>
                                <div className="has-text-grey">
                                    <Emoji emoji="🥭" /> No tasks yet.
                                </div>
                            </center>
                        )}
                        {this.getTasks().length > 0 ? (
                            <div style={{ paddingTop: 10 }}>
                                <a
                                    className="gray-link-with-icon has-text-grey-light streamcard-tweet-button"
                                    target={"_blank"}
                                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                        this.generateTweetText(this.getTasks())
                                    )}`}
                                    onClick={this.onTweetClick}
                                >
                                    <FontAwesomeIcon
                                        icon={["fab", "twitter"]}
                                    />{" "}
                                    Tweet your day
                                </a>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks.tasks,
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

export default connect(mapStateToProps, mapDispatchToProps)(TodayCard);
