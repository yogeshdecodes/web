import CommentFaces from "../../../comments/components/CommentFaces";
import DueCountdown from "../../../../components/DueCountdown";
import Emoji from "~/components/Emoji";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Lightbox } from "react-modal-image";
import { Link } from "~/routes";
import Linkify from "react-linkify";
import { Praisable } from "./components/Praise";
import PropTypes from "prop-types";
import React from "react";
import TaskDetailModal from "./components/TaskDetailModal";
import { getAppIcon } from "~/lib/apps";
import { processTaskString } from "~/lib/utils/parsers";
import startsWith from "lodash/startsWith";
import Avatar from "../../../users/components/Avatar";
import FullName from "../../../users/components/FullName";
import CommentsBox from "~/features/comments/components/CommentsBox";
import TaskDetail from "./components/TaskDetailModal/TaskDetail";
import config from "../../../../config";
import { imageUrl } from "../../../../lib/utils/img";

function findWord(word, str) {
    return str
        .split(/\s+|\./) // split words based on whitespace or a '.'
        .includes(word);
}

function isProductLaunch(task) {
    // Tests for "launched #launched", #launched, or "launched".
    return (
        (findWord("launched", task.content.toLowerCase()) &&
            !task.content.toLowerCase().includes("#launched") &&
            task.project_set.length > 0) ||
        (findWord("launched", task.content.toLowerCase()) &&
            task.content.toLowerCase().includes("#launched") &&
            task.project_set.length > 0)
    );
}

/*

function isRecentTask(task) {
    const LAUNCH_HOUR_THRESHOLD = 60 * 60 * 1000;
    return ((new Date) - (Date.parse(task.done_at))) < LAUNCH_HOUR_THRESHOLD
}

*/

class Task extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            attachmentOpen: false,
            detailsOpen: this.props.defaultOpen
                ? this.props.defaultOpen
                : false,
            hover: false
        };
    }

    onMouseEnter = e => {
        this.setState({
            hover: true
        });
    };

    onMouseLeave = e => {
        this.setState({
            hover: false
        });
    };

    toggleAttachment = () => {
        this.setState({ attachmentOpen: !this.state.attachmentOpen });
    };

    toggleDetails = () => {
        this.setState({ detailsOpen: !this.state.detailsOpen });
    };

    getClassNames = () => {
        let baseClass = "Entry";
        const task = this.props.task;

        if (task.done) {
            baseClass += " done";
        } else if (task.in_progress) {
            baseClass += " in-progress";
        } else {
            baseClass += " remaining";
        }

        if (isProductLaunch(this.props.task)) {
            baseClass += " launch";
        }

        return baseClass;
    };

    renderIcon = () => {
        let doneIcon = "check-circle";
        let remainingIcon = "dot-circle";
        let doneColor = "#27ae60";
        let remainingColor = "#f39c12";

        if (this.props.task.event) {
            doneIcon = getAppIcon(this.props.task.event);
            remainingIcon = getAppIcon(this.props.task.event);
        }

        if (isProductLaunch(this.props.task)) {
            return <Emoji emoji={"🚀"} />;
        }

        return this.props.task.done ? (
            <FontAwesomeIcon icon={doneIcon} color={doneColor} />
        ) : this.props.task.in_progress ? (
            <FontAwesomeIcon icon={"dot-circle"} color="#f39c12" />
        ) : (
            <FontAwesomeIcon icon={["far", "circle"]} color="#f39c12" />
        );
    };

    renderContent = () => {
        let task = processTaskString(this.props.task);
        if (this.props.contentWrapper) {
            let Wrapper = this.props.contentWrapper;
            task = <Wrapper>{task}</Wrapper>;
        }
        if (this.props.withDetailModal) {
            task = <span onClick={this.toggleDetails}>{task}</span>;
        }

        if (this.props.withDueDates) {
            task = (
                <>
                    {task}{" "}
                    {this.props.task.due_at && (
                        <DueCountdown date={this.props.task.due_at} />
                    )}
                </>
            );
        }

        task = (
            <Linkify
                properties={{
                    target: "_blank",
                    rel: "nofollow noopener noreferrer"
                }}
            >
                {task}
            </Linkify>
        );
        if (this.props.withTooltip) {
            // task = <HelpTooltip>{task}</HelpTooltip>
        }
        return task;
    };

    renderAttachments = () => {
        if (
            this.props.task.attachment &&
            startsWith(this.props.task.attachment, "http")
        ) {
            //to-imgoptim
            return (
                <div className="attachments-container">
                    <div
                        onClick={this.toggleAttachment}
                        className="image-preview"
                        style={{
                            backgroundImage: `url(${imageUrl(
                                this.props.task.attachment,
                                null,
                                true
                            )})`
                        }}
                    >
                        <div className="attachment-overlay">
                            Click to open image
                        </div>
                    </div>
                    {this.state.attachmentOpen && (
                        <Lightbox
                            small={imageUrl(
                                this.props.task.attachment,
                                null,
                                true
                            )}
                            large={this.props.task.attachment}
                            alt={this.props.task.content}
                            onClose={this.toggleAttachment}
                        />
                    )}
                </div>
            );
        } else {
            return null;
        }
    };

    renderCounts = () => {
        if (!this.props.withCounts) return null;

        return (
            <span
                style={{ display: "inline-block" }}
                className={"PraiseIndicator has-text-grey-light"}
            >
                {this.props.withPraise && (
                    <>
                        <Praisable
                            indexUrl={`/tasks/${this.props.task.id}`}
                            initialAmount={this.props.task.praise}
                            expanded={this.state.hover}
                            item={this.props.task}
                        />{" "}
                        &nbsp;
                    </>
                )}
                {this.state.hover ? (
                    <button
                        className={"btn-praise btn-gray"}
                        onClick={this.toggleDetails}
                    >
                        <Emoji emoji={"💬"} /> {this.props.task.comment_count}
                    </button>
                ) : this.props.task.comment_count > 0 ? (
                    <span>
                        <Emoji emoji={"💬"} />
                        {this.props.task.comment_count}
                    </span>
                ) : null}
            </span>
        );
    };

    /**
     * 
                {this.props.task.comment_count > 0 && (
                    <span>
                        <CommentFaces
                            indexUrl={`/tasks/${this.props.task.id}/`}
                        />
                    </span>
                )}
     */

    renderExtras = () => {
        return (
            <>
                {this.props.task.user.is_live &&
                    this.props.task.in_progress &&
                    this.props.task.event === "shipstreams" && (
                        <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                            <div
                                className="twitchWrapper"
                                style={{ paddingTop: 10, paddingBottom: 10 }}
                            >
                                <div className="twitchStream">
                                    <iframe
                                        title={
                                            this.props.task.user
                                                .shipstreams_handle
                                        }
                                        src={`https://player.twitch.tv/?channel=${this.props.task.user.shipstreams_handle}&autoplay=false`}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                <div className="task-details">
                    {this.state.detailsOpen && (
                        <div className="action-bar">
                            <TaskDetail task={this.props.task} />
                        </div>
                    )}
                    {(this.state.detailsOpen ||
                        this.props.task.comment_count > 0) && (
                        <CommentsBox
                            initialCommentCount={this.props.task.comment_count}
                            task={this.props.task}
                        />
                    )}
                </div>
            </>
        );
    };

    renderLiveButton = () => {
        if (
            this.props.task.user.is_live &&
            this.props.task.in_progress &&
            this.props.task.event === "shipstreams"
        ) {
            return (
                <span style={{ marginLeft: 5, marginRight: 5 }}>
                    <Link route={"live"}>
                        <a className={"button is-small is-primary is-rounded"}>
                            <FontAwesomeIcon icon={"play"} />{" "}
                            <span>Watch on Makerlog Live</span>
                        </a>
                    </Link>
                </span>
            );
        } else {
            return null;
        }
    };

    render() {
        if (!this.props.task) {
            return null;
        }

        if (this.props.plain) {
            return (
                <Link route="task-page" params={{ id: this.props.task.id }}>
                    <div className={this.getClassNames()}>
                        {this.renderIcon()}{" "}
                        <span className={"task-content"}>
                            {this.renderContent()}
                        </span>{" "}
                        {this.props.withAttachment && this.renderAttachments()}
                    </div>
                </Link>
            );
        }

        return (
            <div
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                className={this.getClassNames()}
            >
                {this.renderIcon()}{" "}
                <span className={"task-content"}>{this.renderContent()}</span>{" "}
                {this.renderLiveButton()} {this.renderCounts()}
                {this.props.withAttachment && this.renderAttachments()}
                {this.renderExtras()}
            </div>
        );
    }
}

Task.propTypes = {
    task: PropTypes.object
};

Task.defaultProps = {
    withDetailModal: true,
    withTooltip: true,
    withCounts: true,
    withPraise: true,
    withAttachment: true,
    withDueDates: true,
    plain: false
};

export default Task;
