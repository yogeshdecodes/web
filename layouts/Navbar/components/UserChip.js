//import { Link as NavLink } from "~/routes";
import NavLink from "~/components/ActiveLink";

import Chip from "~/components/Chip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Streak from "~/components/Streak";
import RestDays from "~/components/RestDays";
import OutboundLink from "../../../components/OutboundLink";

const UserChip = props => (
    <div className="navbar-item has-dropdown is-hoverable">
        {
            // eslint-disable-next-line
        }{" "}
        <a className="navbar-link">
            <Chip id={"navbarUserChip"}>
                <img alt={props.user.username} src={props.user.avatar} />
                <div>
                    <div>
                        <Streak days={props.user.streak} />
                    </div>
                    <div>
                        <RestDays days={props.restDayBalance} />
                    </div>
                </div>
            </Chip>
        </a>
        <div className="navbar-dropdown is-right">
            {!props.user.gold && (
                <a
                    className={"navbar-item is-gold"}
                    href={"https://makerlog.io/gold"}
                    target={"_blank"}
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={"check-circle"} /> Get Gold &raquo;
                </a>
            )}
            <NavLink
                route="profile-page"
                params={{ username: props.user.username }}
            >
                <a className="navbar-item">
                    <FontAwesomeIcon icon={"user-circle"} /> You
                </a>
            </NavLink>

            <OutboundLink className="navbar-item" href="https://t.me/makerlog">
                <FontAwesomeIcon icon={["fab", "telegram"]} /> Chat
            </OutboundLink>

            <a
                className={"navbar-item"}
                href={"https://pm.mattei.dev/projects/makerlog/issues"}
                target={"_blank"}
                rel="noopener noreferrer"
            >
                <FontAwesomeIcon icon={"info-circle"} /> Feedback
            </a>

            <NavLink route={`settings`}>
                <a className="navbar-item">
                    <FontAwesomeIcon icon={"cog"} /> Settings
                </a>
            </NavLink>

            <a
                className="navbar-item"
                href={"/logout"}
                onClick={e => {
                    e.preventDefault();
                    props.onClickLogout();
                }}
            >
                <FontAwesomeIcon icon={"sign-out-alt"} /> Sign out
            </a>
        </div>
    </div>
);

export default UserChip;
