import "./index.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavLink from "~/components/ActiveLink";
import { NotificationsLink } from "~/features/notifications";
import React from "react";
import { connect } from "react-redux";
import { actions as editorActions } from "~/ducks/editor";

const LoggedOutLinks = props => (
    <>
        <NavLink activeClassName="is-active" route="home">
            <a className="item">
                <span className={"icon"}>
                    <FontAwesomeIcon icon={"home"} />
                </span>
                <span>Explore</span>
            </a>
        </NavLink>

        <NavLink iexact activeClassName="is-active" route="discussions-top">
            <a className="item">
                <span className={"icon"}>
                    <FontAwesomeIcon icon={"comment"} />
                </span>
                <span>Discuss</span>
            </a>
        </NavLink>

        <NavLink activeClassName="is-active" to="begin">
            <a className="item">
                <span className={"icon"}>
                    <FontAwesomeIcon icon={"rocket"} />
                </span>
                <span>Join</span>
            </a>
        </NavLink>
        <NavLink activeClassName="is-active" to="login">
            <a className="item">
                <span className={"icon"}>
                    <FontAwesomeIcon icon={"sign-in-alt"} />
                </span>
                <span>Sign in</span>
            </a>
        </NavLink>
    </>
);

const LoggedInLinks = props => (
    <>
        <NavLink activeClassName="is-active" to="log">
            <a className="item">
                <span className={"icon"}>
                    <FontAwesomeIcon icon={"check-square"} />
                </span>
                <span>Log</span>
            </a>
        </NavLink>
        <NavLink activeClassName="is-active" to="tasks">
            <a className="item">
                <span className={"icon"}>
                    <FontAwesomeIcon icon={"tasks"} />
                </span>
                <span>Tasks</span>
            </a>
        </NavLink>
        <a className="item">
            <button className="unstyled-btn" onClick={props.toggleEditor}>
                <FontAwesomeIcon icon={"plus"} />
            </button>
        </a>
        <NotificationsLink mobile />
        <NavLink activeClassName="is-active" to="discussions">
            <a className="item">
                <span className={"icon"}>
                    <FontAwesomeIcon icon={"comments"} />
                </span>
                <span>Talk</span>
            </a>
        </NavLink>
    </>
);

const MobileNav = props => {
    return (
        <div className={"MobileNav"}>
            {props.isLoggedIn ? (
                <LoggedInLinks toggleEditor={props.toggleEditor} />
            ) : (
                <LoggedOutLinks />
            )}
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    toggleEditor: () => dispatch(editorActions.toggleEditor())
});

export default connect(
    state => ({
        isLoggedIn: state.auth.loggedIn
    }),
    mapDispatchToProps
)(MobileNav);
