import React from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "~/ducks/user";
import { getWorldStats } from "~/lib/stats";
import UserRow from "~/features/users/components/UserRow";
import { getUpcomingEvents } from "~/lib/events";
import EventMedia from "~/features/events/components/EventMedia";
import SmallFooter from "~/components/sidebar/components/SmallFooter";
import AdCard from "~/components/sidebar/components/AdCard";
import SocialCard from "~/components/sidebar/components/SocialCard";
import { isServer } from "~/config";
import DealMedia from "~/features/deals/DealMedia";
import { Link } from "~/routes";

import "./index.scss";
import UserActivityGraph from "../../../features/stats/components/UserActivityGraph";
import UserMediaList from "~/features/users/components/UserMediaList/UserMediaList";
import BlogCard from "../components/BlogCard";
import { getLatestDeals } from "../../../lib/deals";
import { getQuote } from "../../Quote";

const TopStreaksCard = ({ topUsers }) => {
    return (
        <div className="TopStreaksCard sidebar-item">
            <h3>Top streaks</h3>
            <h4 className="subtitle has-text-grey">The highest streaks.</h4>
            <div className="card">
                <div className="card-content">
                    <div style={{ width: "100%" }}>
                        <UserRow users={topUsers} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const RisingCard = ({ risingUsers }) => {
    return (
        <div className="TopStreaksCard sidebar-item">
            <h3>Rising makers</h3>
            <h4 className="subtitle has-text-grey">
                The freshest up-and-coming makers.
            </h4>
            <div className="card">
                <div className="card-content flex-column">
                    <div>
                        <div>
                            <UserMediaList ranked users={risingUsers} />
                        </div>
                        <hr className="mb-em" />
                        <p className="help">
                            <strong>You can be here!</strong> Earn a streak,
                            comment on posts, help other makers in discussions —
                            you'll rise up the ranks quick!{" "}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UpcomingEventsCard = ({ upcomingEvents }) => {
    return (
        <div className="UpcomingEventsCard sidebar-item">
            <h3>Upcoming events</h3>
            <h4 className="subtitle has-text-grey">
                Attend meetups and make new friends!
            </h4>
            <div className="card">
                <div className="card-content">
                    <div
                        className="flex flex-column flex-v-gap"
                        style={{ width: "100%" }}
                    >
                        {upcomingEvents.map(event => (
                            <div>
                                <EventMedia withBar={false} event={event} />
                            </div>
                        ))}
                        {upcomingEvents.length === 0 && (
                            <div>
                                <button className="btn-light">
                                    Host an event
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const LatestDealsCard = ({ latestDeals }) => {
    if (!latestDeals) return null;
    if (latestDeals && latestDeals.length === 0) return null;
    return (
        <div className="UpcomingEventsCard sidebar-item">
            <h3>Latest deals</h3>
            <h4 className="subtitle has-text-grey">
                Earn fantastic indie deals by being productive!
            </h4>
            <div className="card">
                <div className="card-content">
                    <div className="flex flex-column flex-v-gap">
                        {latestDeals.slice(0, 4).map(deal => (
                            <div>
                                <Link to="deals">
                                    <a
                                        className="a-unstyled"
                                        style={{ color: "var(--c-text)" }}
                                    >
                                        <DealMedia small deal={deal} />
                                    </a>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const UserCard = ({ me }) => {
    const quote = getQuote();
    return (
        <div className="UserCard sidebar-item">
            <h3>Hi, {me.first_name || me.username}</h3>
            {!isServer && (
                <h4 className="subtitle has-text-grey">
                    "{quote.text}"{" "}
                    {
                        //  - {quote.from}}
                    }
                </h4>
            )}
            <div className="card">
                <div className="card-content">
                    <div>
                        <UserActivityGraph user={me} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ExploreSidebar = ({ isLoggedIn, me, data }) => {
    if (!data || data.failed) return null;

    return (
        <div className="Sidebar mb-em">
            {isLoggedIn && <UserCard me={me} />}
            {isLoggedIn && <AdCard />}
            <TopStreaksCard topUsers={data.topUsers} />
            {!isLoggedIn && <AdCard />}
            <RisingCard risingUsers={data.risingUsers} />
            <UpcomingEventsCard upcomingEvents={data.upcomingEvents} />
            <LatestDealsCard latestDeals={data.latestDeals} />
            <BlogCard />
            <SocialCard />
            <SmallFooter />
        </div>
    );
};

export async function prefetchData() {
    try {
        let worldStats = await getWorldStats();
        let upcomingEvents = await getUpcomingEvents();
        let latestDeals = await getLatestDeals();
        let topUsers = worldStats.top_users;
        let newUsers = worldStats.new_users;
        let risingUsers = worldStats.rising_makers || worldStats.rising_users;

        return {
            data: {
                topUsers,
                newUsers,
                risingUsers,
                upcomingEvents,
                latestDeals
            }
        };
    } catch (e) {
        return {
            data: {
                failed: true
            }
        };
    }
}

export default connect(mapStateToProps)(ExploreSidebar);
