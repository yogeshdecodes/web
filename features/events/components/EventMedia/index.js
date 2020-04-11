import "./index.scss";

import React, { Component } from "react";
import { format, toDate } from "date-fns-tz";
import { hasEnded, isOcurring } from "~/lib/utils/events";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "~/routes";
import { imageUrl } from "../../../../lib/utils/img";

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
                ) : null
            ) : (
                <div>Happening now</div>
            )}
        </small>
    );
};

class EventMedia extends Component {
    render() {
        const { large, small, event } = this.props;

        return (
            <Link route={"event-page"} params={{ slug: event.slug }}>
                <a className="a-unstyled">
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

                            <EventToolbar event={event} />
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
