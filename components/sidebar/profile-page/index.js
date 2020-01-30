import React, { Component } from "react";
import SmallFooter from "~/components/sidebar/components/SmallFooter";
import AdCard from "~/components/sidebar/components/AdCard";
import "./index.scss";
import OutboundLink from "~/components/OutboundLink";
import { normalizeUrl } from "~/lib/utils/products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StreakTrophy from "../../../features/trophies/StreakTrophy";
import ClubTrophy from "../../../features/trophies/ClubTrophy";
import StaffTrophy from "../../../features/trophies/StaffTrophy";
import UserActivityGraph from "../../../features/stats/components/UserActivityGraph";

const ActivityCard = ({ user }) => {
    return (
        <div className="ActivityCard sidebar-item">
            <h3>Activity Graph</h3>
            <div className="card">
                <div className="card-content">
                    <UserActivityGraph user={user} />
                </div>
            </div>
        </div>
    );
};

const TrophyCaseCard = ({ user }) => {
    return (
        <div className="TrophyCaseCard sidebar-item">
            <h3>Trophy Case</h3>
            <div className="card">
                <div className="card-content">
                    <ul>
                        <StaffTrophy user={user} />
                        <StreakTrophy user={user} />
                        <ClubTrophy user={user} />
                    </ul>
                </div>
            </div>
        </div>
    );
};

const BioCard = ({ user }) => {
    return (
        <div className="BioCard sidebar-item">
            <h3>About {user.first_name || user.username}</h3>
            <h4 className="subtitle has-text-grey"></h4>
            <div className="card">
                <div className="card-content">
                    <div className="bio">{user.description}</div>
                    <small className="links">
                        <ul>
                            {user.website && (
                                <li>
                                    {" "}
                                    <OutboundLink
                                        to={normalizeUrl(user.website)}
                                    >
                                        <FontAwesomeIcon icon="globe" />{" "}
                                        {normalizeUrl(user.website)
                                            .replace("http://", "")
                                            .replace("https://", "")}
                                    </OutboundLink>
                                </li>
                            )}
                            {user.twitter_handle && (
                                <li>
                                    <OutboundLink
                                        to={`https://twitter.com/${user.twitter_handle}`}
                                    >
                                        <FontAwesomeIcon
                                            icon={["fab", "twitter"]}
                                        />{" "}
                                        {user.twitter_handle}
                                    </OutboundLink>
                                </li>
                            )}

                            {user.shipstreams_handle && (
                                <li>
                                    <OutboundLink
                                        to={`https://twitch.tv/${user.shipstreams_handle}`}
                                    >
                                        <FontAwesomeIcon
                                            icon={["fab", "twitch"]}
                                        />{" "}
                                        {user.shipstreams_handle}
                                    </OutboundLink>
                                </li>
                            )}

                            {user.github_handle && (
                                <li>
                                    <OutboundLink
                                        to={`https://github.com/${user.github_handle}`}
                                    >
                                        <FontAwesomeIcon
                                            icon={["fab", "github"]}
                                        />{" "}
                                        {user.github_handle}
                                    </OutboundLink>
                                </li>
                            )}

                            {user.bmc_handle && (
                                <li>
                                    <OutboundLink
                                        to={`https://buymeacoffee.com/${user.bmc_handle}`}
                                    >
                                        <FontAwesomeIcon icon={"mug-hot"} />{" "}
                                        {user.bmc_handle}
                                    </OutboundLink>
                                </li>
                            )}
                        </ul>
                    </small>
                </div>
            </div>
        </div>
    );
};

const ProfileSidebar = ({ user }) => {
    //if (!data || data.failed) return null;
    if (!user) return null;

    return (
        <div className="ProfileSidebar Sidebar">
            <BioCard user={user} />
            <TrophyCaseCard user={user} />
            <ActivityCard user={user} />

            {!user.gold ? <AdCard /> : null}
            <SmallFooter />
        </div>
    );
};

export async function prefetchData() {
    try {
        return {};
    } catch (e) {
        return {
            data: {
                failed: true
            }
        };
    }
}

export default ProfileSidebar;
