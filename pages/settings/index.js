import React from "react";
import { actions as userActions } from "~/ducks/user";
import { actions as authActions } from "~/ducks/auth";
import { connect } from "react-redux";
import { changePassword, downloadExportedData } from "~/lib/user";
import Embed from "~/components/Embed";
import ProfileTab from "../../features/users/views/ProfileTab";
import GoldTab from "../../features/users/views/GoldTab";
import StreakTab from "../../features/users/views/StreakTab";
import { requireAuthed } from "~/lib/auth";
import "./index.scss";
import PageNavigation from "~/components/ui/PageNavigation";
import { loadingClass } from "~/lib/utils/random";
import { getToken } from "../../lib/admin";
import { deleteAccount } from "../../lib/user";
import { Track } from "../../vendor/ga";
import config from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class NuclearButton extends React.Component {
    state = {
        loading: false,
        username: "",
        stageOpen: false,
        failed: false
    };

    onClick = async () => {
        if (this.state.username.length === 0) {
            this.setState({ stageOpen: true });
            return;
        }
        try {
            this.setState({ loading: true, failed: false });
            new Track().event("account-deleted");
            await deleteAccount(this.state.username);
            this.props.logout();
            this.setState({ loading: false, failed: false });
        } catch (e) {
            this.setState({ loading: false, failed: false, username: "" });
        }
    };

    render() {
        if (this.state.stageOpen) {
            return (
                <div>
                    <div className="mb-5">
                        <strong>Type your username to confirm:</strong>
                    </div>
                    <div className="flex flex-gap">
                        <div>
                            <input
                                type="text"
                                state={this.state.username}
                                onChange={e =>
                                    this.setState({ username: e.target.value })
                                }
                                placeholder="Username"
                            />
                        </div>
                        <div>
                            <button
                                onClick={this.onClick}
                                disabled={
                                    this.state.username !==
                                    this.props.me.username
                                }
                                className={loadingClass(
                                    "btn btn-delete btn-sm",
                                    this.state.loading
                                )}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="control">
                <button
                    onClick={this.onClick}
                    className={loadingClass(
                        "btn btn-delete mb-5",
                        this.state.loading
                    )}
                >
                    Delete account
                </button>
                <p className="help">
                    This is irreversible. Make sure you want it.
                </p>
            </div>
        );
    }
}

NuclearButton = connect(
    state => ({ me: state.user.me }),
    dispatch => {
        return {
            logout: t => dispatch(authActions.logout())
        };
    }
)(NuclearButton);

class SecuritySettings extends React.Component {
    state = {
        isChanging: false,
        failed: false,
        success: false,
        errorMessage: null,
        oldPassword: "",
        newPassword: ""
    };

    onSubmit = async () => {
        this.setState({
            isChanging: true,
            failed: false
        });
        try {
            const success = await changePassword(
                this.state.oldPassword,
                this.state.newPassword
            );

            if (success) {
                this.setState({
                    success: true,
                    isChanging: false,
                    oldPassword: "",
                    newPassword: ""
                });
            } else {
                throw new Error(
                    "Password change failed, and server didn't return why."
                );
            }

            // refresh tokens
            authActions.login(this.props.user, this.state.newPassword);
        } catch (e) {
            this.setState({
                failed: true
            });
        }
    };

    renderErrors = () => {
        if (this.state.failed) {
            return (
                <div className={"panel-message danger"}>
                    Your old password seems incorrect. Please try again.
                </div>
            );
        } else {
            return null;
        }
    };

    renderSuccess = () => {
        if (this.state.success) {
            return (
                <div className={"panel-message success"}>Password changed.</div>
            );
        } else {
            return null;
        }
    };

    render() {
        return (
            <div>
                <div>
                    <h2>Social login</h2>
                    <p className="mbGap">
                        Link your social accounts and authenticate faster.
                    </p>
                    <div className="flex flex-v-gap-half flex-column">
                        <div>
                            <a
                                href={`${config.API_URL}/login/twitter/`}
                                className="btn btn-lg btn-twitter"
                            >
                                <FontAwesomeIcon icon={["fab", "twitter"]} />{" "}
                                Sign in with Twitter
                            </a>
                        </div>
                        <div>
                            <a
                                href={`${config.API_URL}/login/facebook/`}
                                className="btn btn-lg btn-facebook"
                            >
                                <FontAwesomeIcon icon={["fab", "facebook"]} />{" "}
                                Sign in with Facebook
                            </a>
                        </div>
                    </div>
                </div>
                <hr />
                <section className={"settings-header mb-5"}>
                    <h2>Change your password</h2>
                    <p>
                        Note: a password change will revoke all previously
                        issued auth tokens.
                    </p>
                </section>
                {this.renderSuccess()}
                {this.renderErrors()}
                <label className="label">Old password</label>
                <div class={"form-row has-addons"}>
                    <div className={"control"}>
                        <input
                            type="password"
                            onChange={e =>
                                this.setState({ oldPassword: e.target.value })
                            }
                        />
                    </div>
                </div>
                <label className="label">New password</label>
                <div class={"form-row has-addons"}>
                    <div className={"control"}>
                        <input
                            type="password"
                            onChange={e =>
                                this.setState({ newPassword: e.target.value })
                            }
                        />
                    </div>
                </div>
                <button
                    className={loadingClass(
                        "btn btn-secondary",
                        this.state.isChanging
                    )}
                    onClick={this.onSubmit}
                >
                    Change password
                </button>
            </div>
        );
    }
}

class DataSettings extends React.Component {
    state = {
        errored: false
    };

    onSubmit = async () => {
        try {
            await downloadExportedData();
        } catch (e) {
            this.setState({ errored: true });
        }
    };

    renderErrors = () => {
        if (this.state.errored) {
            return (
                <div className={"panel-message danger"}>
                    Couldn't export data. Too many export requests for today,
                    try again tomorrow.
                </div>
            );
        } else {
            return null;
        }
    };

    render() {
        return (
            <div>
                <div className={"content"}>
                    <h3>Data usage policies</h3>
                    <p>
                        <ul>
                            <li>
                                I treat your personal data with utmost respect
                                and attention.
                            </li>
                            <li>
                                Makerlog erases your data once you hit the
                                delete button. No hidden bullcrap. It's always
                                deleted no matter what.
                            </li>
                            <li>
                                You will be notified about breaches as soon as
                                possible, always within the GPDR timeframe (but
                                we will strive to do sooner).
                            </li>
                            <li>
                                In terms of PII, we store your e-mail, full
                                name, hashed password (PBKDF2).
                            </li>
                        </ul>
                    </p>
                </div>
                <br />
                <div className="content mb-em">
                    <h3>Download your data</h3>
                    <p>
                        Click the button below to request a copy of all your
                        data on Makerlog. <br />
                        It'll be serialized in super-simple, easy to read JSON.{" "}
                        <br />
                        No obfuscation. No bullshit.
                        <br />
                        <em>
                            <small>
                                Note: To prevent server load spikes, Makerlog
                                allows you to export your data maximum 3 times a
                                day.
                            </small>
                        </em>
                    </p>
                </div>
                <div className="control">
                    {this.renderErrors()}
                    <button className={"btn"} onClick={this.onSubmit}>
                        Download your data
                    </button>
                </div>

                <br />
                <div className={"content mb-em"}>
                    <h3>Delete your account</h3>
                    <p>
                        We don't keep your data or mark it as hidden: make sure
                        you really want this, because{" "}
                        <strong>there is no going back</strong> - no matter how
                        much you beg via Crisp for your data to be restored from
                        a backup.
                    </p>
                </div>
                <div className="control">
                    {this.renderErrors()}
                    <NuclearButton />
                </div>
            </div>
        );
    }
}

class EmbedSettings extends React.Component {
    render() {
        return (
            <div>
                <section className={"settings-header"}>
                    <h2>Embeds</h2>
                    <p className={"note"}>
                        Here's a few embeds you can plug anywhere to add a
                        little Makerlog spice, and showcase your stats.
                    </p>
                </section>
                <div>
                    <h3>Stats embed:</h3>
                    <div style={{ maxWidth: 500 }}>
                        <Embed
                            stats
                            url={`/users/${this.props.user.id}/stats_embed`}
                        />
                    </div>

                    <h3>Done this week:</h3>
                    <div style={{ maxWidth: 400 }}>
                        <Embed
                            user
                            url={`/users/${this.props.user.id}/embed`}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

class AdminTab extends React.Component {
    state = {
        loading: false,
        u: "",
        failed: false
    };

    onSessionBegin = async () => {
        try {
            this.setState({
                failed: false,
                loading: true
            });
            const res = await getToken(this.state.u);
            this.props.beginSession(res.token);
            this.setState({ loading: false, failed: false });
        } catch (e) {
            this.setState({
                failed: true,
                loading: false
            });
        }
    };

    render() {
        return (
            <div>
                <section className={"settings-header"}>
                    <h2>Admin settings</h2>
                </section>
                <div>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                        }}
                    >
                        <div className={"control"}>
                            <label>Begin debug session</label>
                            <input
                                className="input"
                                value={this.state.e}
                                type="text"
                                onChange={e =>
                                    this.setState({ u: e.target.value })
                                }
                            />
                        </div>
                        <div className="control">
                            <button
                                onClick={this.onSessionBegin}
                                className={loadingClass(
                                    "btn btn-light",
                                    this.state.loading
                                )}
                            >
                                Begin
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

AdminTab = connect(null, dispatch => {
    return {
        beginSession: t => dispatch(authActions.login("", "", t))
    };
})(AdminTab);

const embedStateToProps = state => {
    return {
        user: state.user.me
    };
};

EmbedSettings = connect(embedStateToProps)(EmbedSettings);

class SettingsPage extends React.Component {
    state = {
        activeTab: 1
    };

    componentDidMount() {
        // update user info.
        this.props.fetchUser();
    }

    switchToTab = index => {
        this.setState({
            activeTab: index
        });
    };

    renderTabLink = (name, index, icon = null) => (
        <a
            onClick={() => this.switchToTab(index)}
            className={
                "navbar-item" +
                (this.state.activeTab === index ? " is-active" : "")
            }
        >
            <span>{name}</span>
        </a>
    );

    render() {
        return (
            <div className="SettingsPage">
                <PageNavigation title="Settings">
                    {this.renderTabLink("You", 1)}
                    {this.renderTabLink("Gold", 7)}
                    {this.renderTabLink("Security", 2)}
                    {this.renderTabLink("Streaks", 8)}
                    {this.renderTabLink("Developers", 6)}
                    {this.renderTabLink("Data", 3)}
                    {this.props.user &&
                        this.props.user.is_staff &&
                        this.renderTabLink("Admin", 9)}
                </PageNavigation>
                <section className={"container"}>
                    <div className={"card"}>
                        <div className={"card-content"}>
                            {this.state.activeTab === 1 && (
                                <ProfileTab
                                    updateUser={this.props.updateUser}
                                />
                            )}
                            {this.state.activeTab === 2 && (
                                <SecuritySettings user={this.props.user} />
                            )}
                            {this.state.activeTab === 3 && <DataSettings />}
                            {this.state.activeTab === 5 && (
                                <ExperimentalSettings />
                            )}
                            {this.state.activeTab === 6 && <EmbedSettings />}
                            {this.state.activeTab === 7 && (
                                <GoldTab
                                    user={this.props.user}
                                    updateUser={this.props.updateUser}
                                />
                            )}

                            {this.state.activeTab === 8 && <StreakTab />}

                            {this.state.activeTab === 9 && <AdminTab />}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchUser: () => dispatch(userActions.loadUser()),
    updateUser: user => dispatch(userActions.updateUser(user))
});

const mapStateToProps = state => ({
    isLoading: state.user.isLoading,
    user: state.user.me
});

SettingsPage.propTypes = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(requireAuthed(SettingsPage));
