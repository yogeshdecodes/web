//import { Link as NavLink } from "~/routes";
import NavLink from "~/components/ActiveLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GlobalSearchBar from "~/features/search/components/GlobalSearchBar";
import { NavbarDropdown } from "~/components/Dropdown";
import { NotificationsLink } from "~/features/notifications";
import PropTypes from "prop-types";
import React from "react";
import OutboundLink from "../../../components/OutboundLink";
import UserChip from "./UserChip";
import Spinner from "~/components/Spinner";
import ChatLink from "../../../features/chat/ChatLink";
import AchievementsLink from "../../../features/achievements/AchievementsLink";

const LoggedInMenu = props => (
    <div className={"navbar-menu"} onClick={props.onToggleExpand}>
        <div className="navbar-start">
            <NavLink route="log" activeClassName="is-active">
                <a className="navbar-item">
                    <span>Explore</span>
                </a>
            </NavLink>

            <NavLink route="discussions-top" iexact activeClassName="is-active">
                <a className="navbar-item">
                    <span>Discuss</span>
                </a>
            </NavLink>
            <NavLink route="products" iexact activeClassName="is-active">
                <a className="navbar-item">
                    <span>Products</span>
                </a>
            </NavLink>
            <NavLink route="tasks" iexact activeClassName="is-active">
                <a className="navbar-item">
                    <span>Tasks</span>
                </a>
            </NavLink>

            <NavLink route="deals" activeClassName="is-active">
                <a className="navbar-item">
                    <span>Deals</span>
                    <span className="tag-up has-text-grey-light">New!</span>
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
                <NavLink route="events" activeClassName="is-active">
                    <a className="navbar-item">
                        <span>Events</span>
                    </a>
                </NavLink>
                <NavLink route="apps" activeClassName="is-active">
                    <a className="navbar-item">
                        <span>Integrations</span>
                    </a>
                </NavLink>

                <OutboundLink
                    to="https://open.getmakerlog.com"
                    className="navbar-item"
                >
                    <span>Open Startup</span>
                </OutboundLink>
            </NavbarDropdown>
        </div>
        <div className="navbar-end">
            {props.isSyncing && (
                <div className="navbar-item">
                    <Spinner small text="Syncing tasks..." />
                </div>
            )}
            <div className="navbar-item">
                <button
                    onClick={props.onToggleEditor}
                    className="has-text-bold is-small is-rounded is-primary"
                >
                    New
                </button>
            </div>

            <NotificationsLink />

            {
                // <AchievementsLink />
            }

            <ChatLink />

            <GlobalSearchBar />

            <UserChip {...props} />
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
