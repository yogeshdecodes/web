import React from "react";
import PropTypes from "prop-types";
import {
    groupTasksByDone,
    orderByDate,
    groupIntegrationTasksByEvent,
    integrationsToCollapse
} from "~/lib/utils/tasks";
import EntryList from "../../../EntryList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "react-tippy";
// import { StreamCard as Card } from "./styled";
import { UserMedia } from "~/features/users";
import { UserBadges } from "~/components/badges";
import OutboundLink from "~/components/OutboundLink";
import { MilestoneMedia } from "~/features/milestones";
import { connect } from "react-redux";
import { mapStateToProps } from "~/ducks/user";
import Avatar from "~/features/users/components/Avatar";
import Streak from "~/components/Streak";
import FullName from "~/components/FullName";
import InlineCollapse from "../../../../../../components/InlineCollapse";

function containsWords(input, words) {
    return words.some(word => input.toLowerCase().includes(word.toLowerCase()));
}

// #health is enabled
const lifeLogTasks = ["#life"];

class StreamCard extends React.Component {
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
        return this.props.activity[0].user;
    };

    getTasks = (tagLifeLogs = true, tagToCollapse = true) => {
        let tasks = this.props.activity.filter(o => o.type === "tasks");
        if (tagLifeLogs) tasks = this.tagLifeLogs(tasks);
        if (tagToCollapse) tasks = this.tagToCollapse(tasks);
        return orderByDate(tasks);
    };

    getMilestones = () => {
        return this.props.activity.filter(o => o.type === "milestones");
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

    render() {
        let tasks = this.getGroupedTasks();
        let milestones = this.getMilestones();
        let user = this.getUser();
        let collapsedTasks = this.getCollapsedTasks();
        let groupedCollapsedTasks = groupTasksByDone(collapsedTasks);
        const hasCollapsedIntegrations = this.hasCollapsedIntegrations(
            collapsedTasks
        );
        const hasCollapsedLifelog = this.hasCollapsedLifelog(collapsedTasks);

        return (
            <div className="StreamCard flex">
                <div className="flex-grow">
                    <div className="user-info-container">
                        <UserMedia user={user} />
                    </div>

                    {milestones.map(m => (
                        <MilestoneMedia
                            key={m.id}
                            linked={false}
                            stream
                            milestone={m}
                        />
                    ))}

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
                                            {hasCollapsedLifelog && "lifelogs "}
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
                                            tasks={groupedCollapsedTasks.done}
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
            </div>
        );
    }
}

/**
 * 
                    <header>
                        <div className={"flex col-right"}>
                            <div>
                                <UserMedia user={user} />
                            </div>

                            <UserBadges user={user} />

                            <div className={"flex v-center cardHeaderOptions"}>
                                <Tooltip
                                    interactive
                                    useContext
                                    html={<span>Tweet these tasks</span>}
                                    position={"top"}
                                    size={"small"}
                                >
                                    <a
                                        target={"_blank"}
                                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                            this.generateTweetText(
                                                orderByDate(tasks.done)
                                            )
                                        )}`}
                                    >
                                        <FontAwesomeIcon
                                            icon={["fab", "twitter"]}
                                            color={"lightgray"}
                                        />
                                    </a>
                                </Tooltip>
                                {this.props.me && this.props.me.is_staff && (
                                    <div>
                                        <OutboundLink
                                            to={`https://api.getmakerlog.com/admin/accounts/user/${user.id}`}
                                        >
                                            <FontAwesomeIcon
                                                icon={"shield-alt"}
                                                color={"lightgray"}
                                            />
                                        </OutboundLink>
                                    </div>
                                )}
                            </div>
                        </div>
                    </header>
 */

StreamCard.propTypes = {
    activity: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(StreamCard);
