import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import GlobalSearchBar from "~/features/search/components/GlobalSearchBar/index";
import {Link as NavLink} from "~/routes";
import {NavbarDropdown} from "~/components/Dropdown";
import React from "react";

const LoggedOutMenu = props => (
    <div
        className={props.expanded ? "navbar-menu is-active" : "navbar-menu"}
        onClick={props.onToggleExpand}
        id="navMenu"
    >
        <div className="navbar-start">
            <NavLink activeClassName="is-active" route="home">
                <a className="navbar-item">
                    <FontAwesomeIcon icon={"home"} />
                    Home
                </a>
            </NavLink>

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
            <NavLink activeClassName="is-active" route="begin">
                <a className="navbar-item is-brand-green">
                    <FontAwesomeIcon icon={"rocket"} />
                    Join us
                </a>
            </NavLink>

            <NavLink activeClassName="is-active" route="login">
                <a className="navbar-item">
                    <FontAwesomeIcon icon={"sign-in-alt"} />
                    Log in
                </a>
            </NavLink>
        </div>
    </div>
);

export default LoggedOutMenu;
