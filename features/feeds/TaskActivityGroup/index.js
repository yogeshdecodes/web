import React from "react";
import PropTypes from "prop-types";
import { groupIntegrationTasksByEvent, groupTasksByDone, integrationsToCollapse, orderByDate } from "~/lib/utils/tasks";
import EntryList from "~/features/stream/components/EntryList";
// import { StreamCard as Card } from "./styled";
import { connect } from "react-redux";
import { mapStateToProps } from "~/ducks/user";
import InlineCollapse from "~/components/ui/InlineCollapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Track } from "~/vendor/ga";

function containsWords(input, words) {
    return words.some(word => input.toLowerCase().includes(word.toLowerCase()));
}

// #health is enabled
const lifeLogTasks = ["#life"];

class TaskActivityGroup extends React.Component {
    state = {
        shareBarOpen: false,
        lifelogsOpen: false
    };

    toggleLifeLogs = () => {
        this.setState({
            lifelogsOpen: !this.state.lifelogsOpen
        });
    };

    getUser = () => {
        return this.props.activities[0].getActorObject();
    };

    getTasks = (tagLifeLogs = false, tagToCollapse = true) => {
        let tasks = this.props.activities
            .filter(o => o.getObjectType() === "task")
            .map(o => o.getObject().object);
        if (tagLifeLogs) tasks = this.tagLifeLogs(tasks);
        if (tagToCollapse) tasks = this.tagToCollapse(tasks);
        return orderByDate(tasks);
    };

    getGroupedTasks = (filterCollapsed = true) => {
        let tasks = this.getTasks();
        if (filterCollapsed)
            tasks = tasks.filter(t => !t.lifelog && !t.integrationCollapsed);
        return groupTasksByDone(tasks);
    };

    getGroupedLifelogs = () => {
        return groupTasksByDone(this.getLifeLogs());
    };

    getLifeLogs = () => {
        return this.getTasks().filter(t => t.lifelog);
    };

    tagLifeLogs = tasks => {
        return tasks.map(t => ({
            ...t,
            lifelog: containsWords(t.content, lifeLogTasks)
        }));
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

    tagToCollapse = tasks => {
        const integrationSpamThreshold = 3;
        const integrationCounter = {};

        return tasks.map(t => {
            if (t.event === null) return t;
            if (!integrationsToCollapse.includes(t.event)) return t;

            if (integrationCounter[t.event] !== undefined) {
                integrationCounter[t.event]++;
            } else {
                integrationCounter[t.event] = 1;
            }

            // if it has comments, do NOT collapse it.
            const integrationCollapsed =
                integrationCounter[t.event] >= integrationSpamThreshold &&
                t.comment_count === 0;

            return {
                ...t,
                integrationCollapsed
            };
        });
    };

    getIntegrationTasksToCollapse = () => {
        return this.getTasks().filter(t => t.integrationCollapsed);
    };

    groupIntegrationTasksToCollapse = () => {
        return groupIntegrationTasksByEvent(
            this.getIntegrationTasksToCollapse()
        );
    };

    getCollapsedTasks = () => {
        return [...this.getIntegrationTasksToCollapse(), ...this.getLifeLogs()];
    };

    hasCollapsedIntegrations = tasks => {
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].integrationCollapsed) {
                return true;
            }
        }
    };

    hasCollapsedLifelog = tasks => {
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].lifelog) {
                return true;
            }
        }
    };

    onTweetClick = () => {
        new Track().linkClick("tweeted-streamcard");
    };

    render() {
        let tasks = this.getGroupedTasks();
        let collapsedTasks = this.getCollapsedTasks();
        let groupedCollapsedTasks = groupTasksByDone(collapsedTasks);
        const hasCollapsedIntegrations = this.hasCollapsedIntegrations(
            collapsedTasks
        );
        const hasCollapsedLifelog = this.hasCollapsedLifelog(collapsedTasks);

        return (
            <div className="TaskActivityGroup">
                {this.getTasks().length > 0 && (
                    <div className={"tasks-container"}>
                        {tasks.in_progress && (
                            <div>
                                <EntryList tasks={tasks.in_progress} />
                            </div>
                        )}
                        {tasks.done && (
                            <div>
                                <EntryList tasks={tasks.done} />
                            </div>
                        )}
                        {tasks.remaining && (
                            <div>
                                <EntryList tasks={tasks.remaining} />
                            </div>
                        )}
                    </div>
                )}

                {this.isCurrentUser() || collapsedTasks.length > 0 ? (
                    <div className="flex toolbar flex-gap">
                        {this.isCurrentUser() ? (
                            <div>
                                <a
                                    className="gray-link-with-icon has-text-grey-light streamcard-tweet-button"
                                    target={"_blank"}
                                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                        this.generateTweetText(
                                            orderByDate(tasks.done)
                                        )
                                    )}`}
                                    onClick={this.onTweetClick}
                                >
                                    <FontAwesomeIcon
                                        icon={["fab", "twitter"]}
                                    />{" "}
                                    Tweet
                                </a>
                            </div>
                        ) : null}
                        {collapsedTasks.length > 0 && (
                            <div className={"lifelogs"}>
                                <InlineCollapse
                                    text={
                                        <small>
                                            <a
                                                className="has-text-grey-light"
                                                onClick={this.toggleLifeLogs}
                                            >
                                                {collapsedTasks.length}{" "}
                                                {hasCollapsedIntegrations &&
                                                    "tasks from integrations "}{" "}
                                                {hasCollapsedIntegrations &&
                                                    hasCollapsedLifelog &&
                                                    "& "}{" "}
                                                {hasCollapsedLifelog &&
                                                    "lifelogs "}
                                                collapsed
                                            </a>
                                        </small>
                                    }
                                >
                                    {groupedCollapsedTasks.in_progress && (
                                        <div>
                                            <EntryList
                                                tasks={
                                                    groupedCollapsedTasks.in_progress
                                                }
                                            />
                                        </div>
                                    )}
                                    {groupedCollapsedTasks.done && (
                                        <div>
                                            <EntryList
                                                tasks={
                                                    groupedCollapsedTasks.done
                                                }
                                            />
                                        </div>
                                    )}
                                    {groupedCollapsedTasks.remaining && (
                                        <div>
                                            <EntryList
                                                tasks={
                                                    groupedCollapsedTasks.remaining
                                                }
                                            />
                                        </div>
                                    )}
                                </InlineCollapse>
                            </div>
                        )}
                    </div>
                ) : null}
            </div>
        );
    }
}

TaskActivityGroup.propTypes = {
    activity: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(TaskActivityGroup);
