import React from "react";
import PropTypes from "prop-types";
import { Link } from "~/routes";
import Emoji from "~/components/Emoji";
import { Entry } from "~/features/stream";
import TimeAgo from "react-timeago";
import { Product } from "~/features/products";
import uniqBy from "lodash/uniqBy";
import MilestoneMedia from "../../milestones/components/MilestoneMedia";
import orderBy from "lodash/orderBy";
import InlineCollapse from "../../../components/InlineCollapse";
import { imageUrl } from "../../../lib/utils/img";

function renderPolymorphicPraise(n, withComments = true) {
    if (n.target_type === "task")
        return (
            <Entry
                plain={!withComments}
                withAttachment={false}
                task={n.target}
            />
        );
    if (n.target_type === "milestone")
        return (
            <MilestoneMedia
                plain={!withComments}
                xs
                withIcon={false}
                milestone={n.target}
            />
        );
}

function intersperse(arr, sep) {
    if (arr.length === 0) {
        return [];
    }

    return arr.slice(1).reduce(
        function(xs, x, i) {
            return xs.concat([sep, x]);
        },
        [arr[0]]
    );
}

function renderNotificationVerb(key, notification, grouped = false) {
    let Container = ({ children, timeAgo = null }) => {
        return (
            <>
                <h4 className="verb">{children}</h4>
                <small className="has-text-grey">
                    {timeAgo !== null && "latest "}
                    <TimeAgo date={timeAgo ? timeAgo : notification.created} />
                </small>
            </>
        );
    };

    switch (key) {
        case "received_praise":
            if (grouped) {
                let praiseCount = 0;
                notification = notification.filter(n => n.target !== null);
                notification = uniqBy(notification, n => n.target.id);
                notification.map(n => {
                    if (n.target) {
                        praiseCount += n.target.praise;
                    }
                    return true;
                });
                const people = notification.map(n => n.actor);
                let peopleNames = uniqBy(people, "username").map(function(
                    person,
                    i
                ) {
                    return (
                        <Link
                            key={i}
                            route="profile-page"
                            params={{ username: person.username }}
                        >
                            <a>{person.first_name || person.username}</a>
                        </Link>
                    );
                });
                peopleNames = intersperse(peopleNames, ", ");
                const latest = orderBy(notification, "created", "desc");

                return (
                    <Container timeAgo={latest[0].created}>
                        You've received {praiseCount} praise from {peopleNames}.
                    </Container>
                );
            } else {
                return (
                    <Container>
                        <Link
                            route={"profile-page"}
                            params={{
                                username: notification.actor.username
                            }}
                        >
                            <a>@{notification.actor.username}</a>
                        </Link>{" "}
                        {notification.verb}
                    </Container>
                );
            }

        // These are simple verb ones.
        case "followed":
            return (
                <Container>
                    <Link
                        route={"profile-page"}
                        params={{
                            username: notification.actor.username
                        }}
                    >
                        <a>@{notification.actor.username}</a>
                    </Link>{" "}
                    {notification.verb}
                </Container>
            );

        case "user_joined":
            return (
                <Container>
                    We're glad to have you here. Here's a few links to get you
                    started.
                </Container>
            );

        case "broadcast":
            return <Container>{notification.verb}</Container>;

        case "thread_created":
            return (
                <Container>
                    <Link
                        route="profile-page"
                        params={{ username: notification.actor.username }}
                    >
                        <a>@{notification.actor.username}</a>
                    </Link>{" "}
                    posted a topic titled "{notification.target.title}".
                </Container>
            );

        case "thread_replied":
            return (
                <Container>
                    <Link
                        route="profile-page"
                        params={{ username: notification.actor.username }}
                    >
                        <a>@{notification.actor.username}</a>
                    </Link>{" "}
                    replied to{" "}
                    <Link
                        route={"discussion-page"}
                        params={{ slug: notification.target.slug }}
                    >
                        <a>{notification.target.title}</a>
                    </Link>
                    .
                </Container>
            );

        case "task_commented":
            return (
                <Container>
                    <Link
                        route="profile-page"
                        params={{ username: notification.actor.username }}
                    >
                        <a>@{notification.actor.username}</a>
                    </Link>{" "}
                    replied to{" "}
                    <Link
                        route={"task-page"}
                        params={{ id: notification.target.id }}
                    >
                        <a>a task.</a>
                    </Link>{" "}
                </Container>
            );

        case "milestone_commented":
            return (
                <Container>
                    <Link
                        route="profile-page"
                        params={{ username: notification.actor.username }}
                    >
                        <a>@{notification.actor.username}</a>
                    </Link>{" "}
                    replied to{" "}
                    <Link
                        route={"milestone-page"}
                        params={{ slug: notification.target.slug }}
                    >
                        <a>a milestone.</a>
                    </Link>{" "}
                </Container>
            );

        case "product_launched":
            return (
                <Container>
                    <Link
                        route="profile-page"
                        params={{ username: notification.actor.username }}
                    >
                        <a>@{notification.actor.username}</a>
                    </Link>{" "}
                    launched{" "}
                    <Link
                        route={"product-page"}
                        params={{ slug: notification.target.slug }}
                    >
                        <a> a product.</a>
                    </Link>
                </Container>
            );

        case "product_created":
            return (
                <Container>
                    <Link
                        route="profile-page"
                        params={{ username: notification.actor.username }}
                    >
                        <a>@{notification.actor.username}</a>
                    </Link>{" "}
                    added{" "}
                    <Link
                        route={"product-page"}
                        params={{ slug: notification.target.slug }}
                    >
                        <a>a product.</a>
                    </Link>
                </Container>
            );

        case "user_mentioned":
            return (
                <Container>
                    <Link
                        route="profile-page"
                        params={{ username: notification.actor.username }}
                    >
                        <a>@{notification.actor.username}</a>
                    </Link>{" "}
                    mentioned you.
                </Container>
            );

        case "mention_discussion":
            return (
                <Container>
                    <Link
                        route="profile-page"
                        params={{ username: notification.actor.username }}
                    >
                        <a>@{notification.actor.username}</a>
                    </Link>{" "}
                    mentioned you in{" "}
                    <Link
                        route={"discussion-page"}
                        params={{ slug: notification.target.slug }}
                    >
                        <a>{notification.target.title}</a>
                    </Link>
                    .
                </Container>
            );

        case "due_tomorrow":
            return (
                <Container>
                    <Emoji emoji={"✅"} /> You have tasks due tomorrow.
                </Container>
            );

        default:
            return <Container>No verb configured.</Container>;
    }
}

const Notification = ({
    notification,
    grouped = false,
    onClose = () => {}
}) => {
    let notificationImage = null;
    let notificationHtml = "Error parsing notification.";
    // DO NOT MESS WITH THE TRY CATCH
    // YOU WILL BREAK THE SITE
    // EVERYTHING MUST BE UNDER IT
    try {
        let key = "";

        if (grouped && notification.length > 0) {
            key = notification[0].key;
        } else {
            key = notification.key;
        }
        const verb = renderNotificationVerb(key, notification, grouped);

        switch (key) {
            case "received_praise":
                if (grouped) {
                    notificationImage = "/icons/praise-icon.png";
                    let praiseCount = 0;
                    notification = notification.filter(n => n.target !== null);
                    notification = uniqBy(notification, n => n.target.id);
                    notification.map(n => {
                        if (n.target) {
                            praiseCount += n.target.praise;
                        }
                        return true;
                    });
                    let tasks = notification.filter(
                        n => n.target_type === "task"
                    );
                    let milestones = notification.filter(
                        n => n.target_type === "milestone"
                    );

                    let collapsedTasks = [];
                    const taskMax = 3;
                    if (tasks.length >= taskMax) {
                        collapsedTasks = tasks.slice(taskMax - 1);
                        tasks = tasks.slice(0, taskMax - 1);
                    }
                    notificationHtml = (
                        <div>
                            {renderNotificationVerb(key, notification, true)}
                            <div className="content-case">
                                {" "}
                                {tasks.map(n =>
                                    renderPolymorphicPraise(n, false)
                                )}
                                {collapsedTasks.length > 0 && (
                                    <InlineCollapse
                                        text={`${collapsedTasks.length} tasks collapsed`}
                                    >
                                        {collapsedTasks.map(n =>
                                            renderPolymorphicPraise(n, false)
                                        )}
                                    </InlineCollapse>
                                )}
                                {milestones.map(n =>
                                    renderPolymorphicPraise(n, false)
                                )}
                            </div>
                        </div>
                    );
                } else {
                    notificationImage = notification.actor.avatar;
                    notificationHtml = (
                        <div>
                            {renderNotificationVerb(key, notification)}
                            <div className="content-case">
                                {renderPolymorphicPraise(notification)}
                            </div>
                        </div>
                    );
                }
                break;

            case "followed":
                notificationImage = notification.actor.avatar;
                notificationHtml = (
                    <div>{renderNotificationVerb(key, notification)}</div>
                );
                break;

            case "user_joined":
                notificationImage = "/icons/android-chrome-192x192.png";
                notificationHtml = (
                    <div>
                        {renderNotificationVerb(key, notification)}

                        <div className="content-case">
                            <div className={"flex flex-gap"}>
                                <a
                                    className={"btn btn-light btn-small"}
                                    target={"_blank"}
                                    rel="noopener noreferrer"
                                    href={"https://t.me/makerlog"}
                                >
                                    Join Telegram
                                </a>
                                <Link route={"settings"}>
                                    <a className={"btn btn-light btn-small"}>
                                        Edit your profile
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                );
                break;

            case "broadcast":
                notificationImage = "/assets/img/icon.jpg";
                notificationHtml = (
                    <div>
                        <h3>
                            <Emoji emoji={"📡"} /> Message from Makerlog
                        </h3>
                        {renderNotificationVerb(key, notification)}
                        {notification.broadcast_link && (
                            <div className="actions">
                                <a
                                    className={"btn btn-small"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={notification.broadcast_link}
                                >
                                    View link
                                </a>
                            </div>
                        )}
                    </div>
                );
                break;

            case "thread_created":
                notificationImage = notification.actor.avatar;
                notificationHtml = (
                    <div onClick={onClose}>
                        {renderNotificationVerb(key, notification)}
                        <div className="actions">
                            <Link
                                route={"discussion-page"}
                                params={{ slug: notification.target.slug }}
                            >
                                <a className={"btn btn-small btn-light"}>
                                    View thread
                                </a>
                            </Link>
                        </div>
                    </div>
                );
                break;

            case "thread_replied":
                notificationImage = notification.actor.avatar;
                notificationHtml = (
                    <div onClick={onClose}>
                        {renderNotificationVerb(key, notification)}
                    </div>
                );
                break;

            case "task_commented":
                notificationImage = notification.actor.avatar;
                notificationHtml = (
                    <div>
                        {renderNotificationVerb(key, notification)}
                        <div className="content-case">
                            <Entry task={notification.target} />
                        </div>
                    </div>
                );
                break;

            case "milestone_commented":
                notificationImage = notification.actor.avatar;
                notificationHtml = (
                    <div>
                        {renderNotificationVerb(key, notification)}
                        <div className="content-case">
                            <MilestoneMedia
                                xs
                                withIcon={false}
                                milestone={notification.target}
                            />
                        </div>
                    </div>
                );
                break;

            case "product_launched":
                notificationImage = notification.actor.avatar;
                notificationHtml = (
                    <div>
                        {renderNotificationVerb(key, notification)}
                        <p>
                            <Product media product={notification.target} />
                        </p>
                    </div>
                );
                break;

            case "product_created":
                notificationImage = notification.actor.avatar;
                notificationHtml = (
                    <div>
                        {renderNotificationVerb(key, notification)}
                        <p>
                            <Product media product={notification.target} />
                        </p>
                    </div>
                );
                break;

            case "user_mentioned":
                notificationImage = notification.actor.avatar;
                notificationHtml = (
                    <div>
                        {renderNotificationVerb(key, notification)}

                        <div className="content-case">
                            {renderPolymorphicPraise(notification)}
                        </div>
                    </div>
                );
                break;

            case "mention_discussion":
                notificationImage = notification.actor.avatar;
                notificationHtml = (
                    <div onClick={onClose}>
                        {renderNotificationVerb(key, notification)}
                    </div>
                );
                break;

            case "due_tomorrow":
                notificationImage = "/assets/img/icon.jpg";
                notificationHtml = (
                    <div>
                        {renderNotificationVerb(key, notification)}
                        <div className="actions">
                            <Link route={`tasks`}>
                                <a className="btn btn-small btn-light">
                                    Check your tasks
                                </a>
                            </Link>
                        </div>
                    </div>
                );
                break;

            default:
                notificationImage = "/icons/android-chrome-192x192.png";
                notificationHtml = notification.verb;
        }
    } catch (e) {
        console.log(e);
        notificationImage = "/icons/android-chrome-192x192.png";
        notificationHtml = "Content deleted.";
    }

    return (
        <div
            className={
                notification.read
                    ? "Notification-new read flex"
                    : "Notification-new  flex"
            }
        >
            <div>
                <figure className="img-avatar img-48">
                    <img
                        className="img-circle"
                        src={imageUrl(notificationImage, 48)}
                    />
                </figure>
            </div>
            <div className="flex-grow">{notificationHtml}</div>
        </div>
    );
};

Notification.propTypes = {
    notification: PropTypes.object.isRequired
};

export default Notification;
