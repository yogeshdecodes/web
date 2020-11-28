import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavLink from "~/components/ActiveLink";
import { NavbarDropdown } from "~/components/ui/Dropdown";
import React from "react";
import { Link } from "~/routes";
import OutboundLink from "~/components/OutboundLink";

const LoggedOutMenu = props => (
    <div
        className={props.expanded ? "navbar-menu is-active" : "navbar-menu"}
        onClick={props.onToggleExpand}
        id="navMenu"
    >
        <div className="navbar-start">
            <NavLink activeClassName="is-active" route="home">
                <a className="navbar-item">Explore</a>
            </NavLink>

            <NavLink iexact activeClassName="is-active" route="gold">
                <a className="navbar-item">Gold</a>
            </NavLink>

            <NavLink route="blog" iexact activeClassName="is-active">
                <a className="navbar-item">
                    <span>Stories</span>
                </a>
            </NavLink>

            <NavLink iexact activeClassName="is-active" route="discussions-top">
                <a className="navbar-item">Discuss</a>
            </NavLink>

            <NavbarDropdown
                hoverable
                link={() => <FontAwesomeIcon icon="ellipsis-v" />}
            >
                <NavLink activeClassName="is-active" route="events">
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
            <NavLink activeClassName="is-active" route="login">
                <a className="navbar-item">Sign in</a>
            </NavLink>
            <div className="navbar-item">
                <Link route="start">
                    <button className="has-text-bold is-rounded is-primary">
                        Get started
                    </button>
                </Link>
            </div>
        </div>
    </div>
);

export default LoggedOutMenu;
