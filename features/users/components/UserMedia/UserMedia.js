import React from "react";
import PropTypes from "prop-types";
import FullName from "../FullName";
import Streak from "../../../../components/Streak";
import "./UserMedia.scss";
import Emoji from "~/components/Emoji";
import Avatar from "../Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "~/routes";
import { imageUrl } from "../../../../lib/utils/img";
import GoldIcon from "~/components/icons/GoldIcon";
import { Tooltip } from "react-tippy";
import OutboundLink from "~/components/OutboundLink";
import VerifiedIcon from "../../../../components/icons/VerifiedIcon";

function isNewUser(user) {
    if (user.date_joined) {
        const joined = new Date(user.date_joined);
        return Math.round((new Date() - joined) / (1000 * 60 * 60 * 24)) <= 1;
    }
}

const Badge = props => (
    <span
        className={`Badge tag is-rounded ${
            props.className ? props.className : null
        }`}
        style={{
            backgroundColor: props.backgroundColor
                ? props.backgroundColor
                : null
        }}
    >
        {props.children}
    </span>
);

const GoldBadge = props => (
    <Badge className={"gold"}>
        <FontAwesomeIcon icon={"check-circle"} color="white" />
        <strong>Gold</strong>
    </Badge>
);

const DonorBadge = props => (
    <Badge className={"donor"}>
        <Emoji emoji={"✌️"} /> Donor
    </Badge>
);

const StaffBadge = props => (
    <Badge className={"staff"}>
        <Emoji emoji={"🛠"} /> Staff
    </Badge>
);

const AwesomeBadge = props => (
    <Badge className={"awesome"}>
        <Emoji emoji={"💫"} /> Awesome
    </Badge>
);

const InlineLevel = props => (
    <div className={"flex inline"}>{props.children}</div>
);

const UserBadges = ({ user }) => {
    return (
        <>
            {user.gold && <GoldBadge />}
            {(user.username.toLowerCase() === "booligoosh" ||
                user.username.toLowerCase() === "tomaswoksepp") && (
                <AwesomeBadge />
            )}
            {user.is_staff && <StaffBadge />}
            {user.donor && <DonorBadge />}
        </>
    );
};

const StatBar = ({ user, showUsername = false }) => (
    <div>
        {showUsername && <small>@{user.username}</small>}
        <div className={"tag"}>
            <Streak days={user.streak} />
        </div>
        <UserBadges user={user} />
    </div>
);

class UserMedia extends React.Component {
    render() {
        let { user } = this.props;
        if (this.props.large) {
            return (
                <div style={this.props.style}>
                    <Link
                        route="profile-page"
                        params={{ username: user.username }}
                    >
                        <a target="_blank">
                            <div className={"card"}>
                                <div className={"card-content"}>
                                    <div className={"flex"}>
                                        <div>
                                            <img
                                                className={"img-48"}
                                                src={imageUrl(
                                                    this.props.user.avatar,
                                                    48
                                                )}
                                                alt="User avatar"
                                            />
                                        </div>
                                        <div>
                                            <h4>
                                                <FullName
                                                    user={this.props.user}
                                                />
                                            </h4>
                                            <h3>@{this.props.user.username}</h3>
                                        </div>
                                    </div>
                                    <div>
                                        {this.props.user.description
                                            ? this.props.user.description
                                            : "This user has no bio."}
                                    </div>
                                </div>
                                <footer className="card-footer">
                                    <StatBar user={this.props.user} />
                                </footer>
                            </div>
                        </a>
                    </Link>
                </div>
            );
        }

        if (this.props.xs) {
            return (
                <Link route="profile-page" params={{ username: user.username }}>
                    <a target="_blank">
                        <div
                            className={
                                "flex flex-gap UserMedia xs" +
                                (!this.props.user.streak ||
                                !this.props.user.week_tda
                                    ? "lazy"
                                    : "")
                            }
                        >
                            <div>
                                <Avatar is={32} user={this.props.user} />
                            </div>
                            <div>
                                <strong>
                                    <FullName user={this.props.user} />
                                </strong>
                            </div>
                        </div>
                    </a>
                </Link>
            );
        }

        if (this.props.medium) {
            return (
                <Link route="profile-page" params={{ username: user.username }}>
                    <a target="_blank">
                        <div
                            className={
                                "a-unstyled grid-streamcard UserMedia " +
                                (!this.props.user.streak ||
                                !this.props.user.week_tda
                                    ? "lazy"
                                    : "")
                            }
                        >
                            <div>
                                <Avatar is={48} user={this.props.user} />
                            </div>
                            <div>
                                <h5>
                                    <FullName user={user} />
                                </h5>
                                <span className={"note"}>
                                    {user.description}
                                </span>
                            </div>
                            <div className={"stats-case"}>
                                {user.streak > 0 && (
                                    <Streak days={user.streak} />
                                )}
                                {user.streak === 100 && <Emoji emoji={"🎉"} />}
                                <Tda tda={user.week_tda} />
                                {isNewUser(user) && (
                                    <span className="new-user">
                                        NEW <Emoji emoji="👋" />
                                    </span>
                                )}
                            </div>
                        </div>
                    </a>
                </Link>
            );
        }

        return (
            <Link route="profile-page" params={{ username: user.username }}>
                <a target="_blank">
                    <div
                        className={
                            "grid-streamcard UserMedia " +
                            (!this.props.user.streak ||
                            !this.props.user.week_tda
                                ? "lazy"
                                : "")
                        }
                    >
                        <div>
                            <Avatar is={32} user={this.props.user} />
                        </div>
                        <div>
                            <span className="name">
                                <FullName user={user} />{" "}
                            </span>
                            {user.verified ? (
                                <>
                                    &nbsp;
                                    <Tooltip
                                        html={"Verified"}
                                        animateFill={false}
                                        delay={200}
                                        position={"top"}
                                        size={"small"}
                                    >
                                        <VerifiedIcon />
                                    </Tooltip>
                                </>
                            ) : (
                                user.gold && (
                                    <Tooltip
                                        interactive
                                        html={
                                            <OutboundLink to="https://gold.getmakerlog.com">
                                                <a
                                                    style={{
                                                        color: "white",
                                                        textDecoration:
                                                            "underline"
                                                    }}
                                                >
                                                    Makerlog Gold Subscriber
                                                </a>
                                            </OutboundLink>
                                        }
                                        animateFill={false}
                                        delay={200}
                                        position={"top"}
                                        size={"small"}
                                    >
                                        &nbsp;
                                        <GoldIcon />
                                    </Tooltip>
                                )
                            )}

                            {this.props.extra ? (
                                <>&nbsp;{this.props.extra}</>
                            ) : null}
                        </div>
                        <div className={"stats-case has-text-grey-light"}>
                            <span className="username">@{user.username}</span>
                            {isNewUser(user) && (
                                <span className="new-user">
                                    <Emoji emoji="👋" />
                                    &nbsp;
                                    <strong>NEW</strong>
                                </span>
                            )}
                            &nbsp;
                            {user.streak !== null && (
                                <span>
                                    <Streak days={user.streak} />
                                </span>
                            )}
                            {user.streak === 100 && (
                                <span>
                                    <Emoji emoji={"🎉"} />
                                </span>
                            )}
                            &nbsp;
                            {user.is_live && (
                                <span>
                                    <Emoji emoji={"🔴"} />{" "}
                                    <span className={"has-text-danger"}>
                                        LIVE
                                    </span>
                                </span>
                            )}
                            {this.props.extraSmall ? (
                                <>&nbsp;{this.props.extraSmall}</>
                            ) : null}
                        </div>
                    </div>
                </a>
            </Link>
        );
    }
}

UserMedia.propTypes = {
    user: PropTypes.shape({
        first_name: PropTypes.string,
        username: PropTypes.string.isRequired,
        last_name: PropTypes.string,
        streak: PropTypes.number
    })
};

export default UserMedia;
