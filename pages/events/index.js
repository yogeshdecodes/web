import "./index.scss";

import EventMedia from "~/features/events/components/EventMedia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfiniteResults from "~/components/InfiniteResults";
import LiveEventsList from "~/features/events/components/LiveEventsList";
import React from "react";
import Sidebar from "~/components/sidebar/components/HomeSidebar";
import { isOcurring, hasClosed } from "~/lib/utils/events";
import orderBy from "lodash/orderBy";
import { Link } from "~/routes";
import StdPageLayout from "~/layouts/StdPage";
import NavLink from "~/components/ActiveLink";

const EventsPage = () => {
    return (
        <StdPageLayout
            title="Events"
            nav={
                <>
                    <NavLink route="events" activeClassName="is-active">
                        <a className="navbar-item">Soon</a>
                    </NavLink>

                    <NavLink route="products-yours" activeClassName="is-active">
                        <a className="navbar-item">Past</a>
                    </NavLink>

                    <NavLink route="products-yours" activeClassName="is-active">
                        <a className="navbar-item">Host event</a>
                    </NavLink>
                </>
            }
        >
            <div className={"flex col-right v-center mbGap"}>
                <div>
                    <h2>Events coming up</h2>
                </div>
                <Link route="events-host">
                    <button className="btn is-secondary">
                        <span>Host an event</span>
                    </button>
                </Link>
            </div>

            <div className="card">
                <card className="content">
                    <InfiniteResults
                        url={"/events/"}
                        orderBy={data =>
                            orderBy(data, "closes_at", "asc").filter(
                                e => !hasClosed(e) && !isOcurring(e)
                            )
                        }
                        component={({ items }) =>
                            items.map(event => <EventMedia event={event} />)
                        }
                    />
                </card>
            </div>
        </StdPageLayout>
    );
};

export default EventsPage;
