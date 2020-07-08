import React, { Component } from "react";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Emoji from "~/components/Emoji";
import MakerDefinition from "../../components/MakerDefinition";
import WallOfLove from "../../components/WallOfLove";
import config, { isServer } from "../../config";
import OutboundLink from "~/components/OutboundLink";
import Spinner from "~/components/Spinner";
import { getPreflightConfig, loginWithTwitterToken } from "../../lib/accounts";
import { StdErrorCollection } from "../../lib/utils/error";
import StdErrorMessages from "~/components/forms/StdErrorMessages";
import { Track } from "../../vendor/ga";
import { actions as userActions } from "~/ducks/user";
import { actions as appActions } from "~/ducks/app";
import { connect } from "react-redux";
import { actions as authActions } from "~/ducks/auth";

import omit from "lodash/omit";
import Dropzone from "react-dropzone";
import {
    handleChange,
    validateEmail,
    loadingClass
} from "../../lib/utils/random";
import { updatePrivilegedSettings } from "~/lib/user";
import { getPrivilegedUser } from "../../lib/user";
import { Router } from "~/routes";
import { requireAuthed } from "~/lib/auth";

import { setCookie } from "nookies";

class ProfileSetupPage extends React.Component {
    static async getInitialProps({ query }) {
        const layout = { className: "StartPage", footer: false };
        let preflight = null;
        try {
            //preflight = await getPreflightConfig();
        } catch (e) {
            console.log(e);
        }
        return { layout, query, preflight };
    }

    state = {
        saved: false,
        loading: false,
        first_name: "",
        last_name: "",
        description: "",
        header: null,
        avatar: null,
        avatarUploading: false,
        avatarPreviewUrl: null,
        failed: false,
        errorMessages: null
    };

    fieldsToExclude = [
        "loading",
        "failed",
        "errorMessages",
        "avatarPreviewUrl",
        "headerPreviewUrl"
    ];

    componentDidMount() {
        this.prefillFields();
    }

    onSubmit = async event => {
        event.preventDefault();
        if (this.state.description.length >= 50) {
            this.setState({
                failed: false,
                errorMessages: new StdErrorCollection(
                    "Bio is maximum 50 characters."
                )
            });
            return null;
        }

        if (this.state.email.length === 0 || !validateEmail(this.state.email)) {
            this.setState({
                failed: false,
                errorMessages: new StdErrorCollection(
                    "Invalid or missing email."
                )
            });
            return null;
        }

        this.setState({ loading: true });
        try {
            const formData = omit(this.state, this.fieldsToExclude);
            const user = await updatePrivilegedSettings(formData);
            if (this.props.updateUser) {
                this.props.updateUser(user);
            }
            if (this.props.setNewUser) {
                this.props.setNewUser(false);
            }
            this.setState({ loading: false, saved: true, errorMessages: null });
        } catch (e) {
            this.setState({
                loading: false,
                errorMessages: new StdErrorCollection(e),
                saved: false
            });
        }
    };

    onAvatarUpload = (acceptedFiles, rejectedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        this.setState({
            avatarUploading: true
        });

        reader.onloadend = e => {
            this.setState({
                avatar: file,
                avatarPreviewUrl: reader.result,
                avatarUploading: false
            });
        };
        reader.readAsDataURL(file);
    };

    prefillFields = async () => {
        if (!this.props.me) return;
        try {
            this.setState({ initializing: true });
            const data = this.props.me;
            this.setState({
                initializing: false,
                first_name: data.first_name || "",
                last_name: data.last_name || "",
                description: data.description || "",
                website: data.website || "",
                avatarPreviewUrl: data.avatar,
                email: data.email || ""
            });
        } catch (e) {}
    };

    handleChange = e => handleChange(e, this);

    renderForm = () => {
        return (
            <div className="ProfileSetupForm">
                <h1>One last thing...</h1>
                <p className="mbGap">
                    We need a couple of details to finish up your profile!
                </p>
                <div className="flex flex-gap">
                    <div>
                        <Dropzone
                            maxSize={2 * 1024 * 1024}
                            className={"dropzone user-icon large"}
                            accept="image/*"
                            multiple={false}
                            onDrop={this.onAvatarUpload}
                        >
                            {this.state.avatarPreviewUrl ? (
                                <figure className="is-square is-64x64">
                                    <img
                                        style={{ height: 64, width: 64 }}
                                        className={"image"}
                                        src={this.state.avatarPreviewUrl}
                                    />
                                </figure>
                            ) : this.state.avatarUploading ? (
                                <Spinner small />
                            ) : (
                                <FontAwesomeIcon icon={"camera"} />
                            )}
                        </Dropzone>
                    </div>
                    <div className="form" style={{ maxWidth: "75%" }}>
                        <div className="field">
                            <label className="label">First name</label>
                            <div className="control">
                                <input
                                    onChange={this.handleChange}
                                    name="first_name"
                                    value={this.state.first_name}
                                    type="text"
                                    placeholder="John"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Last name</label>
                            <div className="control">
                                <input
                                    onChange={this.handleChange}
                                    name="last_name"
                                    value={this.state.last_name}
                                    type="text"
                                    placeholder="May Kerr"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Bio</label>
                            <div className="control">
                                <input
                                    onChange={this.handleChange}
                                    placeholder="Keep it short and sweet!"
                                    name="description"
                                    value={this.state.description}
                                    id=""
                                    type="text"
                                    rows="2"
                                ></input>
                            </div>
                        </div>
                        {!this.props.me || !this.props.me.email ? (
                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control">
                                    <input
                                        onChange={this.handleChange}
                                        name="email"
                                        value={this.state.email}
                                        type="text"
                                        placeholder="me@hi.com"
                                    />
                                </div>
                                <p className="help">
                                    This won't be displayed anywhere.
                                </p>
                            </div>
                        ) : null}
                        <hr />

                        {this.state.errorMessages && (
                            <div className={"mbGap"}>
                                <StdErrorMessages
                                    error={this.state.errorMessages}
                                />
                            </div>
                        )}
                        <div className="flex flex-gap">
                            <div className="flex-grow"></div>
                            <div>
                                <button
                                    className={loadingClass(
                                        "btn btn-secondary",
                                        this.state.loading
                                    )}
                                    onClick={this.onSubmit}
                                    type="submit"
                                >
                                    Finish →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    render() {
        if (!this.props.isNewUser && !isServer) {
            Router.pushRoute("log");
        }

        return (
            <div>
                <div className="FullHeightOnboarding fullpage">
                    <div className="bg-container">
                        <div className="actionable-section-bg"></div>
                        <div className="copy-section-bg"></div>
                    </div>
                    <div className="container dual-column">
                        <div>
                            {!this.props.isNewUser ? (
                                <Spinner text="Setting up your account... 🥭" />
                            ) : (
                                <div>{this.renderForm()}</div>
                            )}
                        </div>
                        <div className="is-hidden-mobile"></div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapInitDispatchToProps = dispatch => ({
    fetchUser: () => dispatch(userActions.loadUser()),
    updateUser: user => dispatch(userActions.updateUser(user)),
    setNewUser: n => dispatch(appActions.setNewUser(n))
});

export default requireAuthed(
    connect(
        state => ({
            me: state.user.me,
            isNewUser: state.app.isNewUser
        }),
        mapInitDispatchToProps
    )(ProfileSetupPage)
);
