import {getLiveEvents, getUpcomingEvents} from "../../../../lib/events";

import Avatar from "../Avatar/Avatar";
import Emoji from "../../../../components/Emoji";
import EventMedia from "../../../events/components/EventMedia";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FullName from "../FullName";
import {Link} from "~/routes";
import OutboundLink from "~/components/OutboundLink";
import ProductList from "../../../products/components/ProductList/ProductList";
import PropTypes from "prop-types";
import React from "react";
import RecentDiscussionList from "../../../discussions/RecentDiscussionList";
import Spinner from "../../../../components/Spinner";
import TrendingDiscussionList from "../../../discussions/TrendingDiscussionList";
import {UserMedia} from "~/features/users";
import UserRow from "../UserRow";
import config from "~/config";
import {fetchStreamers} from "../../../../lib/integrations/shipstreams";
import {getFollowing} from "~/lib/user";
import {getRecentlyLaunched} from "../../../../lib/products";
import {getWorldStats} from "../../../../lib/stats";
import orderBy from "lodash/orderBy";

const WelcomeTweet = ({ user }) => {
    const text = `Welcome to @getmakerlog, @${user.twitter_handle}! #TogetherWeMake`;
    const url = `${config.BASE_URL}/@${user.username.toLowerCase()}`;

    return (
        <OutboundLink
            href={`https://twitter.com/share?text=${encodeURIComponent(
                text
            )}&url=${url}`}
            className="btn-small btn-twitter"
            target="_blank"
        >
            <FontAwesomeIcon icon={["fab", "twitter"]} /> Say hi
        </OutboundLink>
    );
};

class PeopleCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            failed: false,
            following: null,
            topUsers: null,
            newUsers: null,
            streamers: null,
            followingCollapsed: true,
            hasNoFollows: false,
            recentlyLaunched: null
        };
    }

    async componentDidMount() {
        if (this.props.worldStats) {
            await this.setState({
                topUsers: this.props.worldStats.top_users,
                newUsers: this.props.worldStats.new_users,
                loading: false,
                failed: false
            });
        }

        await this.fetchPeople();

        if (this.props.withStreamers) {
            await this.fetchStreamers();
        }

        if (this.props.withEvents) {
            await this.fetchEvents();
        }

        if (this.props.recentlyLaunched) {
            await this.fetchRecentlyLaunched();
        }
    }

    fetchEvents = async () => {
        try {
            this.setState({
                upcomingEvents: await getUpcomingEvents()
            });
            this.setState({
                happeningNow: await getLiveEvents()
            });
        } catch (e) {
            this.setState({ loading: false, failed: true, streamers: null });
        }
    };

    fetchPeople = async () => {
        this.setState({ loading: true });
        if (this.props.withFollowing) {
            await this.fetchFollowing();
        }

        if (!this.state.topUsers || !this.state.newUsers) {
            await this.fetchWorldUsers();
        }

        this.setState({ loading: false });
    };

    fetchStreamers = async () => {
        try {
            const streamers = await fetchStreamers();
            this.setState({ streamers });
        } catch (e) {
            this.setState({ loading: false, failed: true, streamers: null });
        }
    };

    collapseFollowing = () => {
        this.setState({
            followingCollapsed: !this.state.followingCollapsed
        });
    };

    fetchFollowing = async () => {
        try {
            let following = await getFollowing();
            if (following.length > 0) {
                following = following.filter(u => u.week_tda > 0);
                following = orderBy(following, "streak", "desc");
            }
            this.setState({
                following: following
            });
        } catch (e) {
            this.setState({ loading: false, failed: true, following: null });
        }
    };

    fetchWorldUsers = async () => {
        try {
            let worldStats = await getWorldStats();
            let topUsers = worldStats.top_users;
            let newUsers = worldStats.new_users;
            let featuredMaker = worldStats.featured_maker;
            this.setState({
                featuredMaker,
                topUsers,
                newUsers: this.props.newUsers ? newUsers : null
            });
        } catch (e) {
            this.setState({
                loading: false,
                failed: true,
                topUsers: null,
                newUsers: null
            });
        }
    };

    fetchRecentlyLaunched = async () => {
        try {
            let recentlyLaunched = await getRecentlyLaunched();
            this.setState({
                recentlyLaunched
            });
        } catch (e) {
            this.setState({
                loading: false,
                failed: true,
                recentlyLaunched: null
            });
        }
    };

    renderFeaturedMaker = () => {
        if (!this.state.featuredMaker || !this.props.withFeaturedMaker)
            return null;

        return (
            <div>
                <h4 className={"heading mt0"}>
                    <Emoji emoji="🌟" /> Maker of the day
                </h4>
                <div>
                    <UserMedia medium user={this.state.featuredMaker} />
                </div>
            </div>
        );
    };

    renderTopUsers() {
        if (!this.state.topUsers || !this.state.topUsers.length) return null;

        return (
            <div>
                <h4 className={"heading"}>
                    <Emoji emoji="🔥" /> Top streaks
                </h4>
                <UserRow users={this.state.topUsers} />
            </div>
        );
    }

    renderUpcomingEvents() {
        if (!this.state.upcomingEvents || !this.state.upcomingEvents.length)
            return null;

        return (
            <div>
                <p className={"heading"}>
                    <Emoji emoji="🗓" /> Upcoming events
                </p>
                <div style={{ marginBottom: 10, marginTop: 5, padding: 5 }}>
                    {this.state.upcomingEvents.map(event => (
                        <span style={{ marginBottom: 5 }}>
                            <EventMedia small event={event} />
                        </span>
                    ))}
                </div>
            </div>
        );
    }

    renderHappeningNow() {
        if (!this.state.happeningNow || !this.state.happeningNow.length)
            return null;

        return (
            <div>
                <p className={"heading"}>
                    <Emoji emoji="✅" /> Happening now
                </p>
                <div style={{ marginBottom: 10, marginTop: 5, padding: 5 }}>
                    {this.state.happeningNow.map(event => (
                        <span style={{ marginBottom: 5 }}>
                            <EventMedia small event={event} />
                        </span>
                    ))}
                </div>
            </div>
        );
    }

    renderNewUsers() {
        if (!this.state.newUsers || !this.state.newUsers.length) return null;

        const friends = this.state.newUsers.filter(
            u => u.twitter_handle !== null && u.twitter_handle !== ""
        );

        if (friends.length === 0) return null;

        return (
            <div>
                <h4 className={"heading"}>
                    <Emoji emoji="👋" /> New friends
                </h4>
                <>
                    {friends.map(u => (
                        <div className={"flex v-center flex-gap"}>
                            <div className={"flex-grow"}>
                                <UserMedia xs user={u} />
                            </div>
                            {u.twitter_handle && (
                                <div>
                                    <WelcomeTweet user={u} />
                                </div>
                            )}
                        </div>
                    ))}
                </>
            </div>
        );
    }

    renderRecentlyLaunched() {
        if (!this.state.recentlyLaunched || !this.state.recentlyLaunched.length)
            return null;

        return (
            <div>
                <h4 className={"heading"}>
                    <Emoji emoji="🚀" /> Recently launched
                </h4>
                <>
                    <ProductList
                        products={this.state.recentlyLaunched.slice(0, 6)}
                        thumbnail
                    />
                </>
            </div>
        );
    }

    renderStreamers() {
        if (
            !this.state.streamers ||
            !this.state.streamers.length ||
            !this.props.withStreamers
        )
            return null;

        return (
            <div>
                <h4 className={"heading"}>
                    <Emoji emoji="🔴" /> {this.state.streamers.length} live now
                </h4>
                {this.state.streamers.map(user => (
                    <div className={"flex flex-gap"}>
                        <div>
                            <Link
                                route="profile-page"
                                params={{ username: user.username }}
                            >
                                <Avatar is={48} user={user} />
                            </Link>
                        </div>
                        <div>
                            <strong>
                                <FullName user={user} />
                            </strong>
                            <br />
                            <Link route={`live`}>
                                <a className={"btn-small btn-gray"}>
                                    Watch now
                                </a>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    renderDiscussions = () => {
        if (this.props.withDiscussions) {
            return (
                <div>
                    <h4 className={"heading mt0"}>
                        <Emoji emoji="💬 " />{" "}
                        {this.props.trendingDiscussionsOnly
                            ? "Trending"
                            : "Recent"}{" "}
                        discussions
                    </h4>
                    {this.props.trendingDiscussionsOnly ? (
                        <TrendingDiscussionList />
                    ) : (
                        <RecentDiscussionList />
                    )}
                </div>
            );
        } else {
            return null;
        }
    };

    renderBroadcasts = () => {};

    render() {
        if (this.state.loading) {
            return (
                <div className="card">
                    <div className={"card-content"}>
                        <Spinner small={true} />
                    </div>
                </div>
            );
        } else if (this.state.failed) {
            return (
                <div className="card">
                    <div className={"card-content"}>
                        Failed to load people.{" "}
                        <button onClick={this.fetchPeople}>Retry.</button>
                    </div>
                </div>
            );
        }

        return (
            <div className="card">
                <div className={"card-content"}>
                    {this.renderBroadcasts()}
                    {this.renderFeaturedMaker()}
                    {this.renderTopUsers()}
                    {this.renderStreamers()}
                    {this.renderNewUsers()}
                    {this.renderHappeningNow()}
                    {this.renderUpcomingEvents()}
                    {this.renderRecentlyLaunched()}
                    {this.renderDiscussions()}
                </div>
            </div>
        );
    }
}

PeopleCard.propTypes = {
    worldStats: PropTypes.object.isRequired
};

PeopleCard.defaultProps = {
    withFeaturedMaker: true,
    withStreamers: true,
    withEvents: true
};

export default PeopleCard;
