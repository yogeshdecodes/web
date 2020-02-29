import "./index.scss";

import { Link as NavLink, Link } from "~/routes";
import LoggedInMenu from "./components/LoggedInMenu";
import LoggedOutMenu from "./components/LoggedOutMenu";
import React from "react";
import { actions as authActions } from "~/ducks/auth";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "next/router";
import { actions as editorActions } from "~/ducks/editor";
import UserChip from "./components/UserChip";

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };
    }

    onToggleExpand = () => {
        if (this.state.expanded) {
            this.setState({ expanded: !this.state.expanded });
        }
    };

    render() {
        return (
            <nav
                className={
                    "navbar " +
                    (this.props.transparent ? "transparent-navbar" : "") +
                    (this.props.translucent ? "translucent-navbar" : "")
                }
                id="main-navbar"
            >
                <div className="container">
                    <div className="navbar-brand">
                        <NavLink route="home">
                            <a className="brand">
                                <svg
                                    id="brand-gradient-parent"
                                    aria-hidden="true"
                                    focusable="false"
                                >
                                    <linearGradient
                                        id="brand-gradient"
                                        x1="100.37%"
                                        y1="99.62%"
                                        x2="-0.37%"
                                        y2="0.38%"
                                    >
                                        <stop stop-color="#00ad71" />
                                        <stop
                                            offset="1.24"
                                            stop-color="#47e0a0"
                                        />
                                    </linearGradient>
                                </svg>
                                <FontAwesomeIcon icon="check-circle" />
                            </a>
                        </NavLink>
                    </div>
                    {this.props.isLoggedIn ? (
                        <div className="navbar-menu is-hidden-desktop">
                            <div className="navbar-start"></div>
                            <div className="navbar-end">
                                <UserChip {...this.props} />
                            </div>
                        </div>
                    ) : (
                        <div className="navbar-menu is-hidden-desktop">
                            <div className="navbar-start"></div>
                            <div className="navbar-end">
                                <div className="navbar-item">
                                    <Link route="begin">
                                        <button className="has-text-bold is-rounded is-primary">
                                            Get started
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {!this.props.isLoggedIn && (
                        <LoggedOutMenu
                            expanded={this.state.expanded}
                            toggleAuthModal={this.props.onToggleAuthModal}
                            onToggleExpand={this.onToggleExpand}
                            authModalOpen={this.props.authModalOpen}
                            authModalType={this.props.authModalType}
                            onToggleAuthModal={this.props.onToggleAuthModal}
                        />
                    )}

                    {this.props.isLoggedIn && (
                        <LoggedInMenu
                            onToggleEditor={this.props.toggleEditor}
                            expanded={this.state.expanded}
                            onToggleExpand={this.onToggleExpand}
                            user={this.props.user}
                            isSyncing={this.props.isSyncing}
                            onClickLogout={this.props.onClickLogout}
                        />
                    )}
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.loggedIn,
        user: state.user.me,
        isSyncing: state.tasks.isSyncing || state.projects.isSyncing,
        authModalType: state.auth.authModalType,
        authModalOpen: state.auth.authModalOpen
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleEditor: () => {
            dispatch(editorActions.toggleEditor());
        },
        onClickLogout: () => {
            dispatch(authActions.logout());
        },
        onToggleAuthModal: (type = "login") => {
            dispatch(authActions.toggleModal(type));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
