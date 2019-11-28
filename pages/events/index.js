import "./index.scss";

import EventMedia from "~/features/events/components/EventMedia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfiniteResults from "~/components/InfiniteResults";
import LiveEventsList from "~/features/events/components/LiveEventsList";
import React from "react";
import Sidebar from "~/features/events/components/Sidebar";
import { isOcurring } from "~/lib/utils/events";
import orderBy from "lodash/orderBy";
import { Link } from "~/routes";

const EventsPage = () => {
    return (
        <div className="EventsPage">
            <div className="main-hero">
                <div className="container">
                    <h1 className="title is-2">
                        <FontAwesomeIcon color="#3FDB96" icon="check-circle" />{" "}
                        Events
                    </h1>
                    <h2>Find maker events and grow your network.</h2>
                    <div>
                        <Link route="events-host">
                            <button className="button is-medium is-primary is-rounded">
                                <span className="icon">
                                    <FontAwesomeIcon icon="users" />
                                </span>{" "}
                                &nbsp;
                                <span>Host an event</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="grid-c-s">
                    <div>
                        <LiveEventsList />

                        <h1>Events</h1>

                        <InfiniteResults
                            url={"/events/"}
                            orderBy={data =>
                                orderBy(data, "closes_at", "asc").filter(
                                    e => !isOcurring(e)
                                )
                            }
                            component={({ items }) =>
                                items.map(event => (
                                    <EventMedia
                                        large={event.type === "HACKATHON"}
                                        event={event}
                                    />
                                ))
                            }
                        />
                    </div>
                    <div>
                        <Sidebar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventsPage;
