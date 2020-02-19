import "./index.scss";

import React, { Component } from "react";
import { format, toDate } from "date-fns-tz";
import { hasClosed, hasEnded, isOcurring } from "~/lib/utils/events";

import DueCountdown from "~/components/DueCountdown";
import Emoji from "~/components/Emoji";
import EventFaces from "../EventFaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "~/routes";
import config from "../../../../config";
import { imageUrl } from "../../../../lib/utils/img";

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
        <small className="h-list flex center spaced v-center has-text-grey-light">
            {event.user_joined && (
                <div className="has-text-grey">
                    <FontAwesomeIcon color="gray" icon="check-circle" />{" "}
                    <strong>You're registered</strong>
                </div>
            )}
            {event.starts_at && (
                <div>
                    {format(toDate(event.starts_at), "MMMM d, yyyy h:m", {
                        awareOfUnicodeTokens: true
                    }).toString()}{" "}
                    UTC
                </div>
            )}
            {!isOcurring(event) ? (
                hasEnded(event) ? (
                    <div>
                        <strong>Ended</strong>
                    </div>
                ) : (
                    <div>
                        Registrations close{" "}
                        <DueCountdown date={toDate(event.closes_at)} />
                    </div>
                )
            ) : (
                <p>
                    <Emoji emoji="🔴" /> LIVE NOW
                </p>
            )}
        </small>
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
                                    <img src={imageUrl(event.icon, 32)} />
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
                <div className="EventMedia flex flex-gap">
                    {event.icon && (
                        <div>
                            <figure class={"img-48"}>
                                <img src={imageUrl(event.icon, 48)} />
                            </figure>
                        </div>
                    )}
                    <div className="flex flex-column">
                        <h4>{event.title}</h4>
                        <p>{event.description}</p>
                        {!isOcurring(event) && !hasClosed(event) && (
                            <div className="join-bar flex">
                                <div>
                                    <button className="btn btn-light">
                                        {event.user_joined ? (
                                            <span>Attendee panel</span>
                                        ) : (
                                            <span>Join this event</span>
                                        )}
                                    </button>
                                </div>

                                <div className="level-item">
                                    <EventFaces size={32} slug={event.slug} />
                                </div>
                            </div>
                        )}

                        <EventToolbar event={event} />
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
