import "./index.scss";

import EventMedia from "~/features/events/components/EventMedia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfiniteResults from "~/components/InfiniteResults";
import LiveEventsList from "~/features/events/components/LiveEventsList";
import React from "react";
import Sidebar from "~/components/sidebar/components/HomeSidebar";
import { isOcurring, hasClosed, hasEnded } from "~/lib/utils/events";
import orderBy from "lodash/orderBy";
import { Link } from "~/routes";
import StdPageLayout from "~/layouts/StdPage";
import NavLink from "~/components/ActiveLink";
import EventsPageLayout from "../../layouts/EventsPage";

const EventsPage = () => {
    return (
        <EventsPageLayout>
            <div className={"flex col-right v-center mbGap"}>
                <div>
                    <h2>Past events</h2>
                </div>
                <Link route="events-host">
                    <button className="btn is-secondary">
                        <span>Host an event</span>
                    </button>
                </Link>
            </div>

            <div className="card">
                <div className="card-content">
                    <InfiniteResults
                        url={"/events/"}
                        orderBy={data =>
                            orderBy(data, "closes_at", "asc").filter(e =>
                                hasEnded(e)
                            )
                        }
                        component={({ items }) =>
                            items.map(event => <EventMedia event={event} />)
                        }
                    />
                </div>
            </div>
        </EventsPageLayout>
    );
};

export default EventsPage;
