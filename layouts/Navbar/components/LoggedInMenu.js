//import { Link as NavLink } from "~/routes";
import NavLink from "~/components/ActiveLink";

import Chip from "~/components/Chip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GlobalSearchBar from "~/features/search/components/GlobalSearchBar";
import { NavbarDropdown } from "~/components/Dropdown";
import { NotificationsLink } from "~/features/notifications";
import PropTypes from "prop-types";
import React from "react";
import Streak from "~/components/Streak";
import OutboundLink from "../../../components/OutboundLink";

const LoggedInMenu = props => (
    <div
        className={props.expanded ? "navbar-menu is-active" : "navbar-menu"}
        onClick={props.onToggleExpand}
    >
        <div className="navbar-start">
            <NavLink route="log" activeClassName="is-active">
                <a className="navbar-item">
                    <span>Log</span>
                </a>
            </NavLink>

            <NavLink route="discussions" activeClassName="is-active">
                <a className="navbar-item">
                    <span>Talk</span>
                </a>
            </NavLink>
            <NavLink route="products" activeClassName="is-active">
                <a className="navbar-item">
                    <span>Products</span>
                </a>
            </NavLink>
            <NavLink route="makers" activeClassName="is-active">
                <a className="navbar-item">
                    <span>Makers</span>
                </a>
            </NavLink>
            <NavLink route="events" activeClassName="is-active">
                <a className="navbar-item">
                    <span>Events</span>
                </a>
            </NavLink>

            <NavbarDropdown
                hoverable
                link={() => (
                    <>
                        <FontAwesomeIcon icon="ellipsis-v" />
                    </>
                )}
            >
                <NavLink route="tasks" activeClassName="is-active">
                    <a className="navbar-item">
                        <span>Tasks</span>
                    </a>
                </NavLink>
                <NavLink route="apps" activeClassName="is-active">
                    <a className="navbar-item">
                        <span>Integrations</span>
                    </a>
                </NavLink>

                <NavLink route="wellness" activeClassName="is-active">
                    <a className="navbar-item">
                        <span>Wellness</span>
                    </a>
                </NavLink>
            </NavbarDropdown>
        </div>
        <div className="navbar-end">
            <GlobalSearchBar />

            <a className="TodoLink navbar-item">
                <FontAwesomeIcon icon="check-square" />
            </a>

            <NotificationsLink />

            <div className="navbar-item has-dropdown is-hoverable">
                {
                    // eslint-disable-next-line
                }{" "}
                <a className="navbar-link">
                    <Chip id={"navbarUserChip"}>
                        <img
                            alt={props.user.username}
                            src={props.user.avatar}
                        />
                        <div>
                            <Streak days={props.user.streak} />
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
                            <FontAwesomeIcon icon={"check-circle"} /> Get Gold
                            &raquo;
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

                    <OutboundLink
                        className="navbar-item"
                        href="https://t.me/makerlog"
                    >
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
        </div>
    </div>
);

LoggedInMenu.propTypes = {
    onClickLogout: PropTypes.func.isRequired,
    isSyncing: PropTypes.bool.isRequired,
    user: PropTypes.shape({
        avatar: PropTypes.string
    })
};

export default LoggedInMenu;
