import "./nav.scss";

import { Link as NavLink, Link } from "~/routes";

import Chip from "~/components/Chip";
import LocalOnly from "~/containers/LocalOnly";
import LoggedInMenu from "./components/LoggedInMenu";
import LoggedOutMenu from "./components/LoggedOutMenu";
import React from "react";
import Spinner from "~/components/Spinner";
import Streak from "~/components/Streak";
import { actions as authActions } from "~/ducks/auth";
import { connect } from "react-redux";

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
                                Makerlog <LocalOnly>Dev</LocalOnly>{" "}
                                {this.props.isSyncing && (
                                    <span
                                        style={{ marginTop: 8, marginLeft: 3 }}
                                    >
                                        <Spinner small color={"white"} />
                                    </span>
                                )}
                            </a>
                        </NavLink>
                        <button
                            className="button navbar-burger is-hidden-mobile"
                            onClick={e =>
                                this.setState({
                                    expanded: !this.state.expanded
                                })
                            }
                        >
                            <span />
                            <span />
                            <span />
                        </button>

                        {this.props.isLoggedIn && (
                            <div
                                className={
                                    "user-chip navbar-item is-hidden-desktop"
                                }
                            >
                                <Link
                                    route={"profile-page"}
                                    params={{
                                        username: this.props.user.username
                                    }}
                                >
                                    <a className="navbar-link">
                                        <Chip>
                                            <img
                                                alt={this.props.user.username}
                                                src={this.props.user.avatar}
                                            />
                                            <div>
                                                <Streak
                                                    days={
                                                        this.props.user.streak
                                                    }
                                                />
                                            </div>
                                        </Chip>
                                    </a>
                                </Link>
                            </div>
                        )}
                    </div>

                    {!this.props.isLoggedIn && (
                        <LoggedOutMenu
                            expanded={this.state.expanded}
                            onToggleExpand={this.onToggleExpand}
                        />
                    )}

                    {this.props.isLoggedIn && (
                        <LoggedInMenu
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
        isSyncing: state.tasks.isSyncing || state.projects.isSyncing
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onClickLogout: () => {
            dispatch(authActions.logout());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar);
