import Emoji from "~/components/Emoji";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Lightbox } from "react-modal-image";
import { Link } from "~/routes";
import Linkify from "react-linkify";
import { Praisable } from "./components/Praise";
import PropTypes from "prop-types";
import React from "react";
import { getAppIcon } from "~/lib/apps";
import { processTaskString } from "~/lib/utils/parsers";
import startsWith from "lodash/startsWith";
import { CommentsBox } from "~/features/comments";
import TaskDetail from "./components/TaskDetail";
import { imageUrl } from "../../../../lib/utils/img";
import YouTube from "react-youtube";
import {
    DoneStates,
    getDeltaFromDoneState,
    getHumanStateFromTask
} from "../../../../lib/utils/tasks";
import { actions as tasksActions } from "~/ducks/tasks";
import { connect } from "react-redux";

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

function findVideoId(str) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = str.match(regExp);
    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return null;
    }
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
            hover: false,
            deleted: false,
            task: this.props.task
        };
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.task.updated_at !== prevProps.task.updated_at) {
            this.setState({ task: this.props.task });
        }
    }

    onDelete = () => {
        this.setState({ deleted: true });
    };

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
        let baseClass = "Task";
        const task = this.state.task;

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

    onTaskIconClick = () => {
        if (this.isOwnedByCurrentUser()) {
            if (!this.state.task.done) {
                console.log(getDeltaFromDoneState(DoneStates.DONE));
                this.setState({
                    task: {
                        ...this.state.task,
                        ...getDeltaFromDoneState(DoneStates.DONE)
                    }
                });
                this.props.markDone(this.props.task.id);
            } else {
                this.setState({
                    task: {
                        ...this.state.task,
                        ...getDeltaFromDoneState(DoneStates.REMAINING)
                    }
                });
                this.props.markRemaining(this.props.task.id);
            }
        }
    };

    isOwnedByCurrentUser = () => {
        if (!this.props.user) return;
        return this.props.user.id === this.props.task.user.id;
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

        return (
            <div
                className={
                    "task-icon" +
                    (this.isOwnedByCurrentUser() ? " is-user" : "")
                }
                style={{ display: "inline-block" }}
                onClick={this.onTaskIconClick}
            >
                {this.state.task.done ? (
                    <FontAwesomeIcon icon={doneIcon} color={doneColor} />
                ) : this.state.task.in_progress ? (
                    <FontAwesomeIcon
                        icon={remainingIcon}
                        color={remainingColor}
                    />
                ) : (
                    <FontAwesomeIcon
                        icon={["far", "circle"]}
                        color={remainingColor}
                    />
                )}
            </div>
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
                            Click to view image
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
        } else if (findVideoId(this.props.task.content)) {
            return (
                <div className="attachments-container ">
                    <div className="youtube-preview">
                        <YouTube
                            opts={{ height: "300" }}
                            videoId={findVideoId(this.props.task.content)}
                        />
                    </div>
                </div>
            );
        } else {
            return null;
        }
    };

    renderCounts = (force = false) => {
        if (!this.props.withCounts) return null;

        let hover = this.state.hover;
        if (force) hover = true;

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
                            expanded={hover}
                            item={this.props.task}
                        />{" "}
                        &nbsp;
                    </>
                )}
                {hover ? (
                    <button
                        className={"btn-light btn-small"}
                        onClick={this.toggleDetails}
                    >
                        <span className="mr-qt">
                            <FontAwesomeIcon icon={"comments"} />
                        </span>{" "}
                        {this.props.task.comment_count}
                    </button>
                ) : this.props.task.comment_count > 0 ? (
                    <span>
                        <span className="mr-qt">
                            <FontAwesomeIcon icon={"comments"} />
                        </span>
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

    renderLargeItemCounts = () => {
        return (
            <span
                style={{ display: "inline-block" }}
                className={"PraiseIndicator has-text-grey-light flex flex-gap"}
            >
                <div>
                    <Praisable
                        indexUrl={`/tasks/${this.props.task.id}`}
                        initialAmount={this.props.task.praise}
                        button={true}
                        item={this.props.task}
                    />
                </div>
                <div>
                    <span>
                        <Emoji emoji={"💬"} />
                        {this.props.task.comment_count}
                    </span>
                </div>
            </span>
        );
    };

    renderExtras = () => {
        return (
            <>
                <div className="task-details">
                    {this.props.task.description !== null && (
                        <div className="description-text">
                            {this.props.task.description}
                        </div>
                    )}
                    {this.props.task.user.is_live &&
                        this.props.task.in_progress &&
                        this.props.task.event === "shipstreams" && (
                            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                                <div
                                    className="twitchWrapper"
                                    style={{
                                        paddingTop: 10,
                                        paddingBottom: 10
                                    }}
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
                    {!this.props.plain && this.state.detailsOpen && (
                        <div className="action-bar">
                            <TaskDetail
                                task={this.props.task}
                                onDelete={this.onDelete}
                            />
                        </div>
                    )}
                    {!this.props.plain &&
                        (this.state.detailsOpen ||
                            this.props.task.comment_count > 0) && (
                            <CommentsBox
                                initialCommentCount={
                                    this.props.task.comment_count
                                }
                                task={this.props.task}
                            />
                        )}
                </div>
            </>
        );
    };

    renderLiveButton = () => {
        return null;
    };

    render() {
        if (!this.props.task || this.state.deleted) {
            return null;
        }

        if (this.props.plain) {
            return (
                <div className={this.getClassNames()}>
                    {this.renderIcon()}{" "}
                    <Link route="task-page" params={{ id: this.props.task.id }}>
                        <span className={"task-content"}>
                            {this.renderContent()}
                        </span>
                    </Link>
                    {this.renderExtras()}
                    {this.props.withAttachment && this.renderAttachments()}
                </div>
            );
        }

        if (false && this.props.task.description) {
            // This is a prototype for a larger card.
            return (
                <div className={this.getClassNames() + " large"}>
                    <div className="task-container">
                        <h3>
                            <span className={"task-content"}>
                                <p className="heading">
                                    {this.renderIcon()}
                                    {getHumanStateFromTask(
                                        this.props.task
                                    )}{" "}
                                    task
                                </p>
                                {this.renderContent()}
                            </span>
                        </h3>
                        <p style={{ marginBottom: "1rem" }}>
                            {this.props.task.description}
                        </p>
                        {this.props.withAttachment && this.renderAttachments()}
                        <div>{this.renderLargeItemCounts(true)}</div>
                    </div>
                    <div className="task-details">
                        <div className="action-bar">
                            <TaskDetail
                                task={this.props.task}
                                onDelete={this.onDelete}
                            />
                        </div>
                        <CommentsBox
                            initialCommentCount={this.props.task.comment_count}
                            task={this.props.task}
                        />
                    </div>
                </div>
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
                {this.renderExtras()}
                {this.props.withAttachment && this.renderAttachments()}
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
    plain: false
};

export default connect(
    state => ({
        user: state.user.me
    }),
    dispatch => ({
        markDone: id => dispatch(tasksActions.markDone(id)),
        markRemaining: id => dispatch(tasksActions.markRemaining(id))
    })
)(Task);
