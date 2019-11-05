import {Link as NavLink} from "~/routes";

import Chip from "~/components/Chip";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import GlobalSearchBar from "~/features/search/components/GlobalSearchBar";
import {NavbarDropdown} from "~/components/Dropdown";
import {NotificationsLink} from "~/features/notifications";
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
            <NavLink route="log">
                <a className="navbar-item">
                    <FontAwesomeIcon icon={"check-square"} />
                    Log
                </a>
            </NavLink>
            <NavbarDropdown
                to="/tasks"
                link={() => (
                    <a>
                        <FontAwesomeIcon icon={"check"} />
                        Tasks
                    </a>
                )}
            >
                <NavLink route="tasks">
                    <a className="navbar-item">
                        <FontAwesomeIcon icon={"tasks"} />
                        <span>Tasks</span>
                    </a>
                </NavLink>

                <NavLink route="products">
                    <a className="navbar-item">
                        <FontAwesomeIcon icon={"ship"} />
                        <span>Products</span>
                    </a>
                </NavLink>

                <NavLink route="apps">
                    <a className="navbar-item">
                        <FontAwesomeIcon icon={"plug"} />
                        <span>Integrations</span>
                    </a>
                </NavLink>

                <NavLink route="wellness">
                    <a className="navbar-item">
                        <FontAwesomeIcon icon={"fire"} />
                        <span>Wellness</span>
                    </a>
                </NavLink>
            </NavbarDropdown>

            <NavLink activeClassName="is-active" route="discussions">
                <a className="navbar-item">
                    <FontAwesomeIcon icon={"comment"} />
                    Talk
                </a>
            </NavLink>

            <NavbarDropdown
                route="explore"
                link={() => (
                    <a>
                        <FontAwesomeIcon icon={"globe-americas"} />
                        More
                    </a>
                )}
            >
                <NavLink activeClassName="is-active" route="events">
                    <a className="navbar-item">
                        <FontAwesomeIcon icon={"check-circle"} />
                        <span>Events</span>
                    </a>
                </NavLink>
                <NavLink activeClassName="is-active" route="explore">
                    <a className="navbar-item">
                        <FontAwesomeIcon icon={"fire"} />
                        <span>Popular</span>
                    </a>
                </NavLink>
                <NavLink activeClassName="is-active" route="live">
                    <a className="navbar-item">
                        <FontAwesomeIcon icon={"play"} />
                        <span>Live</span>
                    </a>
                </NavLink>
                <NavLink activeClassName="is-active" route="explore-products">
                    <a className="navbar-item">
                        <FontAwesomeIcon icon={"ship"} />
                        <span>Products</span>
                    </a>
                </NavLink>
            </NavbarDropdown>
        </div>
        <div className="navbar-end">
            <GlobalSearchBar />

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
