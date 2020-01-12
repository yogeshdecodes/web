import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GlobalSearchBar from "~/features/search/components/GlobalSearchBar/index";
import NavLink from "~/components/ActiveLink";
import { NavbarDropdown } from "~/components/Dropdown";
import React from "react";
import { Link } from "~/routes";
import AuthModal from "~/features/users/components/AuthModal";

const LoggedOutMenu = props => (
    <div
        className={props.expanded ? "navbar-menu is-active" : "navbar-menu"}
        onClick={props.onToggleExpand}
        id="navMenu"
    >
        <AuthModal
            login={props.authModalType === "login"}
            begin={props.authModalType === "begin"}
            open={
                props.authModalOpen &&
                (props.authModalType === "login" ||
                    props.authModalType === "begin")
            }
            onClose={props.onToggleAuthModal}
        />
        <div className="navbar-start">
            <NavLink activeClassName="is-active" route="home">
                <a className="navbar-item">Home</a>
            </NavLink>

            <NavLink activeClassName="is-active" route="discussions">
                <a className="navbar-item">Talk</a>
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
                link={() => <FontAwesomeIcon icon="ellipsis-v" />}
            >
                <NavLink activeClassName="is-active" route="events">
                    <a className="navbar-item">
                        <span>Events</span>
                    </a>
                </NavLink>
                <NavLink activeClassName="is-active" route="explore">
                    <a className="navbar-item">
                        <span>Popular</span>
                    </a>
                </NavLink>
                <NavLink activeClassName="is-active" route="live">
                    <a className="navbar-item">
                        <span>Live</span>
                    </a>
                </NavLink>
                <NavLink activeClassName="is-active" route="explore-products">
                    <a className="navbar-item">
                        <span>Products</span>
                    </a>
                </NavLink>
            </NavbarDropdown>
        </div>
        <div className="navbar-end">
            <GlobalSearchBar />

            <a
                onClick={() => {
                    props.onToggleAuthModal("login");
                }}
                className="navbar-item"
            >
                Sign in
            </a>
            <div className="navbar-item">
                <button
                    onClick={() => {
                        props.onToggleAuthModal("begin");
                    }}
                    className="has-text-bold is-rounded is-primary"
                >
                    Get started
                </button>
            </div>
        </div>
    </div>
);

export default LoggedOutMenu;
