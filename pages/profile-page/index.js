import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Streak from "~/components/Streak";
import Tda from "~/components/Tda";
import { connect } from "react-redux";
import { getByUsername } from "~/lib/user";
import { getUserStats } from "~/lib/stats";
import Emoji from "~/components/Emoji";
import { FollowButton as GatedFollowButton, FullName } from "~/features/users";
import { UserStream } from "~/features/stream";
import { ProductList, ProductsContainer } from "~/features/products";
import Linkify from "react-linkify";
import { UserActivityGraph } from "~/features/stats";
import OutboundLink from "~/components/OutboundLink";
import { getHostname } from "~/lib/utils/products";
import { Avatar } from "~/features/users";
import { Link } from "~/routes";
import Head from "~/components/Head";
import "./index.scss";

const SocialStatsBadges = ({ children }) => (
    <div className={"social-count"}>{children}</div>
);

const TwitterSocialStats = ({ followers }) => (
    <FontAwesomeIcon size={"lg"} icon={["fab", "twitter"]} color={"#1DA1F2"} />
);

const GitHubSocialStats = ({ followers }) => (
    <FontAwesomeIcon size={"lg"} icon={["fab", "github"]} color={"black"} />
);

const InstagramSocialStats = ({ followers }) => (
    <FontAwesomeIcon
        size={"lg"}
        icon={["fab", "instagram"]}
        color={"#8a3ab9"}
    />
);

const ProductHuntSocialStats = ({ followers }) => (
    <FontAwesomeIcon
        size={"lg"}
        icon={["fab", "product-hunt"]}
        color={"#f07810"}
    />
);

const TelegramIcon = ({ followers }) => (
    <FontAwesomeIcon size={"lg"} icon={["fab", "telegram"]} color={"#0088cc"} />
);

const TwitchIcon = ({ followers }) => (
    <FontAwesomeIcon size={"lg"} icon={["fab", "twitch"]} color={"#6441a5"} />
);

const BuyMeACoffeeIcon = () => (
    <FontAwesomeIcon size={"lg"} icon={"mug-hot"} color={"#FF813F"} />
);

class SocialStatsContainer extends React.Component {
    render() {
        if (!this.props.user) return null;

        if (
            !this.props.user.twitter_handle &&
            !this.props.user.github_handle &&
            !this.props.user.instagram_handle &&
            !this.props.user.telegram_handle &&
            !this.props.user.shipstreams_handle &&
            !this.props.user.bmc_handle &&
            !this.props.user.product_hunt_handle
        )
            return null;

        return (
            <SocialStatsBadges>
                {this.props.user.twitter_handle && (
                    <a
                        href={`https://twitter.com/${this.props.user.twitter_handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <TwitterSocialStats />
                    </a>
                )}
                {this.props.user.github_handle && (
                    <a
                        href={`https://github.com/${this.props.user.github_handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <GitHubSocialStats />
                    </a>
                )}
                {this.props.user.instagram_handle && (
                    <a
                        href={`https://instagram.com/${this.props.user.instagram_handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <InstagramSocialStats />
                    </a>
                )}
                {this.props.user.product_hunt_handle && (
                    <a
                        href={`https://producthunt.com/@${this.props.user.product_hunt_handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <ProductHuntSocialStats />
                    </a>
                )}
                {this.props.user.telegram_handle && (
                    <a
                        href={`https://t.me/${this.props.user.telegram_handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <TelegramIcon />
                    </a>
                )}
                {this.props.user.shipstreams_handle && (
                    <a
                        href={`https://twitch.tv/${this.props.user.shipstreams_handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <TwitchIcon />
                    </a>
                )}
                {this.props.user.bmc_handle && (
                    <a
                        href={`https://buymeacoffee.com/${this.props.user.bmc_handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <BuyMeACoffeeIcon />
                    </a>
                )}
            </SocialStatsBadges>
        );
    }
}

const ProfileActions = ({ user }) => {
    if (!user.bmc_handle && !user.telegram_handle && !user.website) return null;

    return (
        <div className={"card ProfileActions"}>
            <div className={"card-content"}>
                {user.website && (
                    <OutboundLink
                        className={"btn btn-primary"}
                        to={user.website}
                    >
                        <FontAwesomeIcon icon={"external-link-alt"} />
                        <strong>{getHostname(user.website)}</strong>
                    </OutboundLink>
                )}
                {user.bmc_handle && (
                    <OutboundLink
                        className={"btn btn-primary bmc-button"}
                        to={`https://buymeacoffee.com/${user.bmc_handle}`}
                    >
                        <FontAwesomeIcon icon={"mug-hot"} />
                        <strong>Donate</strong>
                    </OutboundLink>
                )}
                {user.telegram_handle && (
                    <OutboundLink
                        className={"btn btn-primary telegram-button"}
                        to={`https://t.me/${user.telegram_handle}`}
                    >
                        <FontAwesomeIcon icon={["fab", "telegram"]} />
                        <strong>Send message</strong>
                    </OutboundLink>
                )}
            </div>
        </div>
    );
};

export const UserCard = ({ user, withProfilePicture = false }) => (
    <div
        className={"card user-box" + (withProfilePicture ? " standalone" : "")}
    >
        <div className={"card-content"}>
            {withProfilePicture && (
                <Link
                    route={"profile-page"}
                    params={{ username: user.username }}
                >
                    <a className={"profile-picture"}>
                        <Avatar is={128} user={user} />
                    </a>
                </Link>
            )}
            <p className={"bio"}>
                <Linkify
                    properties={{
                        target: "_blank",
                        rel: "nofollow noopener noreferrer"
                    }}
                >
                    {user.description
                        ? user.description
                        : "I have no bio... yet!"}
                </Linkify>
                <SocialStatsContainer user={user} />
            </p>
            <p>
                <GatedFollowButton
                    userId={user.id}
                    className={"is-fullwidth"}
                />
            </p>
        </div>
    </div>
);

class ProfileBarStats extends React.Component {
    render() {
        const stats = this.props.stats;

        return (
            <div className={"ProfileBarStats flex end is-hidden-mobile"}>
                <div className={"hero-item"}>
                    <p>Streak</p>
                    <Streak days={stats.streak} />
                </div>
                <div className={"hero-item"}>
                    <p>Maker Score</p>
                    <Emoji emoji={"🏆"} /> {stats.maker_score}
                </div>
                <div className={"hero-item"}>
                    <p>Tasks/day</p>
                    <Tda tda={stats.tda} />
                </div>
                <div className={"hero-item"}>
                    <p>Followers</p>
                    <Emoji emoji={"👥"} /> {stats.follower_count}
                </div>
            </div>
        );
    }
}

const ProfileBar = ({ user, stats }) => (
    <React.Fragment>
        <div className={"blur-container"}>
            <div className={"blur"} />
        </div>
        <section className={"container"}>
            <div className={"grid-s-c"}>
                <div className={"user-card-container"}>
                    <figure>
                        <img src={user.avatar} alt={user.username} />
                    </figure>
                </div>
                <div className={"stats-bar flex col-right"}>
                    <div>
                        <h1 className={"is-brand-green"}>
                            <FullName user={user} />
                        </h1>
                    </div>
                    <ProfileBarStats stats={stats} />
                </div>
            </div>
        </section>
    </React.Fragment>
);

class ProfilePage extends React.Component {
    static async getInitialProps({ query: { username } }) {
        const layout = { className: "UserPage" };

        try {
            const user = await getByUsername(username);
            const stats = await getUserStats(user.id);
            return { user, stats, layout: { ...layout } };
        } catch (e) {
            if (e.status_code && e.status_code === 404) {
                return { statusCode: 404 };
            } else {
                return { statusCode: 500 };
            }
        }
    }

    render() {
        const { user, stats } = this.props;

        return (
            <>
                <Head
                    title={`@${user.username}`}
                    description={`${user.username} is on Makerlog, the world's most supportive community of makers shipping together.`}
                    ogImage={user.avatar || null}
                />
                <section
                    className="hero UserHero"
                    style={
                        user.header && {
                            backgroundImage: `url(${user.header})`
                        }
                    }
                >
                    <ProfileBar stats={stats} user={user} />
                </section>

                <section className={"container grid-s-c"}>
                    <div>
                        <UserCard user={user} />

                        {user && <ProfileActions user={user} />}

                        <div className="card">
                            <div className={"card-content"}>
                                {user && (
                                    <div>
                                        <UserActivityGraph user={user} />
                                    </div>
                                )}
                                <ProductsContainer
                                    user={user.id}
                                    component={({ products }) => {
                                        if (!products.length) return null;

                                        return (
                                            <div>
                                                <hr />
                                                <div
                                                    className={
                                                        "grid-thumbnails"
                                                    }
                                                >
                                                    <ProductList
                                                        thumbnail
                                                        products={products}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={"is-hidden-tablet"}>
                            <UserCard user={user} />
                        </div>
                        <UserStream userId={user.id} />
                    </div>
                </section>
            </>
        );
    }
}

ProfilePage.propTypes = {};

const mapStateToProps = state => ({
    me: state.user.me,
    isLoggedIn: state.auth.loggedIn
});

export default connect(mapStateToProps)(ProfilePage);
