import "./index.scss";

import React, { Component } from "react";
import { format, toDate } from "date-fns-tz";
import { hasClosed, hasEnded, isOcurring } from "~/lib/utils/events";

import DueCountdown from "~/components/DueCountdown";
import Emoji from "~/components/Emoji";
import EventFaces from "../EventFaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "~/routes";

function getCss(event) {
    if (event.header) {
        return {
            background: `linear-gradient(90deg, rgba(255, 255, 255, 1) 30%, rgba(255, 255, 255, 0.46262254901960786) 100%), url('${event.header}')`,
            backgroundSize: "cover",
            backgroundPosition: "center center"
        };
    } else {
        return {};
    }
}

const EventToolbar = ({ event }) => {
    return (
        <nav className="EventToolbar level">
            <div className="level-left">
                {event.user_joined && (
                    <div className="level-item">
                        <p>
                            <FontAwesomeIcon color="gray" icon="check-circle" />{" "}
                            <strong>You're registered</strong>
                        </p>
                    </div>
                )}
                {!isOcurring(event) ? (
                    hasEnded(event) ? (
                        <div className="level-item">
                            <p>
                                <FontAwesomeIcon
                                    color="gray"
                                    icon="calendar-check"
                                />{" "}
                                <strong>Ended</strong>
                            </p>
                        </div>
                    ) : (
                        <div className="level-item">
                            <p>
                                <FontAwesomeIcon
                                    color="gray"
                                    icon="calendar-check"
                                />{" "}
                                Closes{" "}
                                <DueCountdown date={toDate(event.closes_at)} />
                            </p>
                        </div>
                    )
                ) : (
                    <div className="level-item">
                        <p>
                            <Emoji emoji="🔴" /> LIVE NOW
                        </p>
                    </div>
                )}
                <div className="level-item">
                    <p>
                        <FontAwesomeIcon color="gray" icon="users" />{" "}
                        {event.participant_count} people
                    </p>
                </div>

                {event.starts_at && (
                    <div className="level-item">
                        <span>
                            <p>
                                <FontAwesomeIcon color="gray" icon="clock" />{" "}
                                {format(
                                    toDate(event.starts_at),
                                    "MMMM d, yyyy h:m",
                                    { awareOfUnicodeTokens: true }
                                ).toString()}{" "}
                                UTC
                            </p>
                        </span>
                    </div>
                )}
            </div>
        </nav>
    );
};

class EventMedia extends Component {
    render() {
        const { large, small, event } = this.props;

        if (small)
            return (
                <Link route={"event-page"} params={{ slug: event.slug }}>
                    <div className="EventMedia">
                        <div className="flex flex-gap v-center">
                            <div>
                                <figure className=" img-32">
                                    <img src={event.icon} />
                                </figure>
                            </div>
                            <div className="flex-grow">
                                <h5>{event.title}</h5>
                                <p>{event.description}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            );

        return (
            <Link route={"event-page"} params={{ slug: event.slug }}>
                <a
                    style={getCss(event)}
                    className={"EventMedia card" + (large ? " large" : "")}
                >
                    <div className="card-content">
                        <div className="flex flex-gap">
                            {event.icon && (
                                <div>
                                    <figure class={"img-48"}>
                                        <img src={event.icon} />
                                    </figure>
                                </div>
                            )}
                            <div>
                                <h1>{event.title}</h1>
                                <p>{event.description}</p>

                                <div className="join-bar">
                                    <nav className="EventToolbar level">
                                        <div className="level-left">
                                            {!isOcurring(event) &&
                                                !hasClosed(event) && (
                                                    <>
                                                        <div className="level-item">
                                                            <button className="button is-primary is-rounded">
                                                                <span className="icon">
                                                                    {event.user_joined ? (
                                                                        <FontAwesomeIcon icon="calendar-check" />
                                                                    ) : (
                                                                        <FontAwesomeIcon icon="users" />
                                                                    )}
                                                                </span>{" "}
                                                                &nbsp;
                                                                {event.user_joined ? (
                                                                    <span>
                                                                        Attendee
                                                                        panel
                                                                    </span>
                                                                ) : (
                                                                    <span>
                                                                        Join
                                                                        this
                                                                        event
                                                                    </span>
                                                                )}
                                                            </button>
                                                        </div>

                                                        <div className="level-item">
                                                            <EventFaces
                                                                size={32}
                                                                slug={
                                                                    event.slug
                                                                }
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                        </div>
                                    </nav>
                                </div>

                                <EventToolbar event={event} />
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
        );
    }
}

EventMedia.defaultProps = {
    large: false
};

export default EventMedia;
