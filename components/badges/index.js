import React from "react";
import Tda from "components/Tda";
import Streak from "components/Streak";
import { Tag } from "vendor/bulma";
import Emoji from "components/Emoji";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const Badge = props => (
    <span
        className={`badge ${props.className ? props.className : null}`}
        style={{
            backgroundColor: props.backgroundColor
                ? props.backgroundColor
                : null
        }}
    >
        {props.children}
    </span>
);

export const GoldBadge = props => (
    <a href={"http://gold.getmakerlog.com/"}>
        <Badge className={"gold"}>
            <FontAwesomeIcon icon={"check-circle"} color="white" />
            <strong>Gold</strong>
        </Badge>
    </a>
);

export const DonorBadge = props => (
    <Badge className={"donor"}>
        <Emoji emoji={"✌️"} />
        <span>Donor</span>
    </Badge>
);

export const GTDBadge = props => (
    <Badge className={"gtd"}>
        <Emoji emoji={"🚧"} />
        <span>Ships Fast</span>
    </Badge>
);

export const StaffBadge = props => (
    <Badge className={"staff"}>
        <Emoji emoji={"👋"} />
        <span>Staff</span>
    </Badge>
);

export const AwesomeBadge = props => (
    <Badge className={"awesome"}>
        <Emoji emoji={"💫"} />
        <span>Awesome</span>
    </Badge>
);

export const OofBadge = props => (
    <Badge className={"is-dark"} backgroundColor={"#e86654"}>
        <Emoji emoji={"👹"} />
        <span>Oof</span>
    </Badge>
);

export const FullSnackBadge = props => (
    <Badge className={"is-dark"} backgroundColor={"#2bae60"}>
        <Emoji emoji={"🌯"} />
        <span>Full Snack</span>
    </Badge>
);

export const HundredDayClubBadge = props => (
    <Badge className={"hundred"}>
        <Emoji emoji={"💯"} />
        <span>100 Day Club</span>
    </Badge>
);

export const FiftyDayClubBadge = props => (
    <Badge className={"fifty"}>
        <Emoji emoji={"✳️"} />
        <span>50 Day Club</span>
    </Badge>
);

export const YearClubBadge = props => (
    <Badge className={"year"}>
        <Emoji emoji={"1️⃣"} />
        <span>Year Club</span>
    </Badge>
);

export const InlineLevel = props => (
    <div className={"flex inline"}>{props.children}</div>
);

export const UserBadges = ({ user }) => {
    return (
        <div className={"badges is-hidden-mobile"}>
            {user.gold && <GoldBadge />}
            {(user.username.toLowerCase() === "booligoosh" ||
                user.username.toLowerCase() === "tomaswoksepp" ||
                user.username.toLowerCase() === "fajarsiddiq") && (
                <AwesomeBadge />
            )}
            {user.username.toLowerCase() === "alina" && <OofBadge />}
            {user.username.toLowerCase() === "joshmanders" && (
                <FullSnackBadge />
            )}
            {user.streak >= 365 && <YearClubBadge />}
            {user.streak >= 100 && user.streak < 365 && <HundredDayClubBadge />}
            {user.streak >= 50 && user.streak < 100 && <FiftyDayClubBadge />}
            {user.week_tda >= 10 && <GTDBadge />}
            {user.is_staff && <StaffBadge />}
            {user.donor && <DonorBadge />}
        </div>
    );
};

export const StatBar = ({ user, showUsername = false }) => (
    <div>
        {showUsername && <small>@{user.username}</small>}&nbsp;
        <Streak days={user.streak} />
        &nbsp;
        <Tda tda={user.week_tda} />
        <UserBadges user={user} />
    </div>
);

const StyledStreakBadge = styled.span`
    background-color: ${props =>
        props.user.streak > 0 ? "#e48845" : "#f5f5f5"} !important;
`;

export const StreakBadge = ({ user }) => (
    <StyledStreakBadge className={"is-rounded"} user={user}>
        <Streak days={user.streak} />
    </StyledStreakBadge>
);

export const StatBadges = ({ user }) => (
    <small>
        <div className="tags has-addons">
            {user.streak > 0 && <StreakBadge user={user} />}
            <Tda tda={user.week_tda} />
        </div>
    </small>
);
