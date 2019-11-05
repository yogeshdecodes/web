import React from "react";
import PropTypes from "prop-types";
import {groupTasksByDone, orderByDate} from "~/lib/utils/tasks";
import EntryList from "../../../EntryList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import withCurrentUser from "~/features/users/containers/withCurrentUser";
import {Tooltip} from "react-tippy";
// import { StreamCard as Card } from "./styled";
import {UserMedia} from "~/features/users";
import {UserBadges} from "~/components/badges";
import OutboundLink from "~/components/OutboundLink";
import {MilestoneMedia} from "~/features/milestones";

class StreamCard extends React.Component {
    state = {
        shareBarOpen: false
    };

    getUser = () => {
        return this.props.activity[0].user;
    };

    getTasks = () => {
        return orderByDate(this.props.activity.filter(o => o.type === "tasks"));
    };

    getMilestones = () => {
        return this.props.activity.filter(o => o.type === "milestones");
    };
    getGroupedTasks = () => {
        return groupTasksByDone(this.getTasks());
    };

    generateTweetText = doneTasks => {
        let name = this.getUser().twitter_handle
            ? `@${this.getUser().twitter_handle}`
            : this.getUser().username;
        let text = `Done today by ${name} on @GetMakerlog:\n`;

        if (this.props.me.id === this.getUser().id) {
            text = `Done today on @GetMakerlog:\n`;
        }

        orderByDate(doneTasks, "asc").map(task => {
            text = text + `\n✅ ${task.content}`;
            return true;
        });

        return text;
    };

    render() {
        let tasks = this.getGroupedTasks();
        let milestones = this.getMilestones();
        let user = this.getUser();

        return (
            <div className={"card StreamCard"}>
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
                                    className="twitter-share-button"
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

                {milestones.map(m => (
                    <MilestoneMedia stream milestone={m} />
                ))}

                {this.getTasks().length > 0 && (
                    <div className={"card-content"}>
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
            </div>
        );
    }
}

StreamCard.propTypes = {
    activity: PropTypes.array.isRequired
};

export default withCurrentUser(StreamCard);
