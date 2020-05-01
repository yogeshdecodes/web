import React from "react";
import { Avatar, FullName } from "~/features/users";
import Head from "~/components/Head";
import PageNavigation from "~/components/ui/PageNavigation";
import ProfileSidebar from "~/components/sidebar/profile-page";
import "./index.scss";
import { connect } from "react-redux";
import NavLink from "~/components/ActiveLink";
import { Link } from "~/routes";

import OutboundLink from "~/components/OutboundLink";
import { normalizeUrl } from "~/lib/utils/products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function getAccentStyle(user, isBackdrop = false) {
    if (user.accent)
        return {
            background: `${user.accent}`
        };

    return { background: "#00a676" };
}

function getContrastYIQ(hexcolor) {
    hexcolor = hexcolor.replace("#", "");
    var r = parseInt(hexcolor.substr(0, 2), 16);
    var g = parseInt(hexcolor.substr(2, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "var(--c-title)" : "var(--c-lightest)";
}

const mapStateToProps = state => ({
    me: state.user.me ? state.user.me : {}
});

export default connect(mapStateToProps)(
    ({ user, achievements = [], me = {}, ...props }) => {
        return (
            <>
                <Head
                    title={`@${user.username} on Makerlog`}
                    description={`${user.username} is on Makerlog, the home of the maker community.`}
                    ogImage={user.og_image || user.avatar || null}
                    ogLargeImage={user.og_image ? true : false}
                />

                <div
                    className="hero-media"
                    style={{
                        ...getAccentStyle(user),
                        color: getContrastYIQ(getAccentStyle(user).background)
                    }}
                >
                    <div className="container">
                        <div className="flex flex-gap">
                            <div>
                                <Avatar user={user} is={64} />
                            </div>
                            <div className="flex flex-column flex-v-gap">
                                <div>
                                    <h2 style={{ color: "inherit" }}>
                                        <FullName user={user} />
                                    </h2>
                                    <p>{user.description}</p>
                                </div>
                                <div>
                                    <div className="flex links-flex">
                                        {user.website && (
                                            <div>
                                                {" "}
                                                <OutboundLink
                                                    className="btn btn-link btn-small"
                                                    to={normalizeUrl(
                                                        user.website
                                                    )}
                                                >
                                                    <FontAwesomeIcon icon="globe" />{" "}
                                                    {normalizeUrl(user.website)
                                                        .replace("http://", "")
                                                        .replace(
                                                            "https://",
                                                            ""
                                                        )}
                                                </OutboundLink>
                                            </div>
                                        )}
                                        {user.twitter_handle && (
                                            <div>
                                                <OutboundLink
                                                    className="btn btn-link btn-small"
                                                    to={`https://twitter.com/${user.twitter_handle}`}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={[
                                                            "fab",
                                                            "twitter"
                                                        ]}
                                                    />{" "}
                                                    <span className="is-hidden-mobile">
                                                        {user.twitter_handle}
                                                    </span>
                                                </OutboundLink>
                                            </div>
                                        )}

                                        {user.shipstreams_handle && (
                                            <div>
                                                <OutboundLink
                                                    className="btn btn-link btn-small"
                                                    to={`https://twitch.tv/${user.shipstreams_handle}`}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={["fab", "twitch"]}
                                                    />{" "}
                                                    <span className="is-hidden-mobile">
                                                        {
                                                            user.shipstreams_handle
                                                        }
                                                    </span>
                                                </OutboundLink>
                                            </div>
                                        )}

                                        {user.github_handle && (
                                            <div>
                                                <OutboundLink
                                                    className="btn btn-link btn-small"
                                                    to={`https://github.com/${user.github_handle}`}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={["fab", "github"]}
                                                    />{" "}
                                                    <span className="is-hidden-mobile">
                                                        {user.github_handle}
                                                    </span>
                                                </OutboundLink>
                                            </div>
                                        )}

                                        {user.bmc_handle && (
                                            <div>
                                                <OutboundLink
                                                    className="btn btn-link btn-small"
                                                    to={`https://buymeacoffee.com/${user.bmc_handle}`}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={"mug-hot"}
                                                    />{" "}
                                                    <span className="is-hidden-mobile">
                                                        {user.bmc_handle}
                                                    </span>
                                                </OutboundLink>
                                            </div>
                                        )}

                                        {user.telegram_handle && (
                                            <div>
                                                <OutboundLink
                                                    className="btn btn-link btn-small"
                                                    to={`https://t.me/${user.telegram_handle}`}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={[
                                                            "fab",
                                                            "telegram"
                                                        ]}
                                                    />{" "}
                                                    <span className="is-hidden-mobile">
                                                        {user.telegram_handle}
                                                    </span>
                                                </OutboundLink>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <PageNavigation
                    end={
                        me.id === user.id ? (
                            <div className="navbar-item">
                                <Link route="settings">
                                    <a className="btn btn-light">Edit</a>
                                </Link>
                            </div>
                        ) : null
                    }
                >
                    <NavLink
                        activeClassName="is-active"
                        route="profile-page"
                        params={{ username: user.username }}
                    >
                        <a className={"navbar-item"}>Activity</a>
                    </NavLink>
                    <NavLink
                        activeClassName="is-active"
                        route="profile-page-updates"
                        params={{ username: user.username }}
                    >
                        <a className={"navbar-item disabled"}>
                            Updates <span className="tag">soon</span>
                        </a>
                    </NavLink>
                    <NavLink
                        activeClassName="is-active"
                        route="profile-page-products"
                        params={{ username: user.username }}
                    >
                        <a className={"navbar-item"}>Products</a>
                    </NavLink>
                    <NavLink
                        activeClassName="is-active"
                        route="profile-page-discussions"
                        params={{ username: user.username }}
                    >
                        <a className={"navbar-item"}>Discussions</a>
                    </NavLink>
                </PageNavigation>

                <div className="container ">
                    <div className="mtGap grid-c-s">
                        <div>{props.children}</div>
                        <div>
                            <ProfileSidebar
                                achievements={achievements}
                                key={user.id}
                                user={user}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
);
