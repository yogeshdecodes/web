import React from "react";
import PropTypes from "prop-types";
import FullName from "../FullName";
import Tda from "../../../../components/Tda";
import Streak from "../../../../components/Streak";
import "./UserMedia.scss";
import Emoji from "components/Emoji";
import Avatar from "../Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileModalAction from "../../containers/ProfileModalAction";
import MakerScore from "../../../../components/MakerScore";
import { Link } from "react-router-dom";

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

const VerifiedIcon = props => (
    <FontAwesomeIcon icon={"check-circle"} color="#47E0A0" />
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
        <div className={"tag"}>
            <Tda tda={user.week_tda} />
        </div>
        <UserBadges user={user} />
    </div>
);
const StatText = ({ user }) => (
    <div className={"flex inline"}>
        <div className={"tag"}>
            <Streak days={user.streak} />
        </div>
        <div className={"tag"}>
            <Tda tda={user.week_tda} />
        </div>
    </div>
);

class UserMedia extends React.Component {
    render() {
        let { user } = this.props;
        if (this.props.large) {
            return (
                <div style={this.props.style}>
                    <ProfileModalAction user={this.props.user}>
                        <div className={"card"}>
                            <div className={"card-content"}>
                                <div className={"flex"}>
                                    <div>
                                        <img
                                            className={"img-48"}
                                            src={this.props.user.avatar}
                                            alt="User avatar"
                                        />
                                    </div>
                                    <div>
                                        <h4>
                                            <FullName user={this.props.user} />
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
                    </ProfileModalAction>
                </div>
            );
        }

        if (this.props.xs) {
            return (
                <Link to={`@${user.username}`}>
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
                            <h4>
                                <FullName user={this.props.user} />
                            </h4>
                        </div>
                    </div>
                </Link>
            );
        }

        if (this.props.medium) {
            return (
                <Link
                    to={`@${user.username}`}
                    className={
                        "grid-streamcard UserMedia " +
                        (!this.props.user.streak || !this.props.user.week_tda
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
                        <span className={"note"}>{user.description}</span>
                    </div>
                    <div className={"stats-case"}>
                        {user.streak > 0 && <Streak days={user.streak} />}
                        {user.streak === 100 && <Emoji emoji={"🎉"} />}
                        <MakerScore score={user.maker_score} />
                        <Tda tda={user.week_tda} />
                    </div>
                </Link>
            );
        }

        return (
            <Link
                to={`/@${user.username}`}
                className={
                    "grid-streamcard UserMedia " +
                    (!this.props.user.streak || !this.props.user.week_tda
                        ? "lazy"
                        : "")
                }
            >
                <div>
                    <Avatar is={32} user={this.props.user} />
                </div>
                <div className={"flex v-center"}>
                    <h4>
                        <FullName user={user} />
                    </h4>{" "}
                    {user.verified && <VerifiedIcon />}
                </div>
                <div className={"stats-case"}>
                    {user.is_live && (
                        <span>
                            <Emoji emoji={"🔴"} />{" "}
                            <span className={"has-text-danger"}>LIVE</span>
                        </span>
                    )}
                    {user.streak > 0 && <Streak days={user.streak} />}
                    {user.streak === 100 && <Emoji emoji={"🎉"} />}
                    <MakerScore score={user.maker_score} />
                    <Tda tda={user.week_tda} />
                </div>
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
