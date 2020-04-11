import "./index.scss";

import EventMedia from "~/features/events/components/EventMedia";
import InfiniteResults from "~/components/InfiniteResults";
import React from "react";
import { hasEnded } from "~/lib/utils/events";
import orderBy from "lodash/orderBy";
import { Link } from "~/routes";
import EventsPageLayout from "../../layouts/EventsPage";

const EventsPage = () => {
    return (
        <EventsPageLayout>
            <div className={"flex col-right v-center mbGap"}>
                <div>
                    <h2>Latest events</h2>
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
                            orderBy(data, "closes_at", "asc").filter(
                                e => !hasEnded(e)
                            )
                        }
                        component={({ items }) =>
                            items.map(event => <EventMedia event={event} />)
                        }
                    />
                </div>
            </div>
            <div className={"flex col-right v-center mbGap"}>
                <div>
                    <h2>Past events</h2>
                </div>
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
