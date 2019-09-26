import "./index.scss";

import React, { Component } from "react";
import { format, toDate } from "date-fns-tz";
import { hasClosed, hasEnded, isOcurring } from "../../../../lib/utils/events";

import DueCountdown from "../../../../components/DueCountdown";
import Emoji from "components/Emoji";
import EventFaces from "../EventFaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function getCss(event) {
    if (event.header) {
        return {
            background: `linear-gradient(90deg, rgba(255, 255, 255, 1) 30%, rgba(255, 255, 255, 0.46262254901960786) 100%), url('${
                event.header
            }')`,
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
                                    "MMMM d, YYYY h:m",
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
                <Link to={`/events/${event.slug}`}>
                    <div className="media">
                        <div className="media-left">
                            <figure className="image is-square is-32x32">
                                <img src={event.icon} />
                            </figure>
                        </div>
                        <div className="media-content">
                            <h3 className="title is-6">{event.title}</h3>
                            <h3 className="subtitle is-7">
                                {event.description}
                            </h3>
                        </div>
                    </div>
                </Link>
            );

        return (
            <Link
                to={`/events/${event.slug}`}
                className={"EventMedia card" + (large ? " large" : "")}
                style={getCss(event)}
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
                                                                    Join this
                                                                    event
                                                                </span>
                                                            )}
                                                        </button>
                                                    </div>

                                                    <div className="level-item">
                                                        <EventFaces
                                                            size={32}
                                                            slug={event.slug}
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
            </Link>
        );
    }
}

EventMedia.defaultProps = {
    large: false
};

export default EventMedia;
