import "react-phone-number-input/style.css";

import Emoji from "~/components/Emoji";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OutboundLink from "~/components/OutboundLink";
import PhoneInput from "react-phone-number-input";
import ReCaptcha from "react-google-recaptcha";
import React from "react";
import Spinner from "~/components/Spinner";
import { actions as appActions } from "~/ducks/app";
import { actions as authActions } from "~/ducks/auth";
import axios from "~/lib/axios";
import config from "~/config";
import { connect } from "react-redux";
import { validateEmail } from "~/lib/utils/random";
import "./index.scss";
import { Router } from "~/routes";
import styled from "styled-components";
import ErrorMessageList from "~/components/forms/ErrorMessageList";

const RegisterPageLayout = styled.div`
    .columns {
        min-height: 100vh;
        margin: 0;
        height: 100%;
    }
    .card {
        border: none !important;
    }

    .card-footer {
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }
`;

const mapDispatchToProps = dispatch => {
    return {
        onConfirm: (token, next = null) => {
            dispatch(authActions.login("", "", token));
            if (next) {
                if (
                    next.includes("fixathon") &&
                    new URL(next).hostname === "fixathon.io"
                ) {
                    window.location.replace(next);
                } else {
                    dispatch(Router.pushRoute(next));
                }
            } else {
                dispatch(appActions.toggleNewUser());
            }
        }
    };
};

class AccountActivator extends React.Component {
    state = {
        activating: false,
        smsActivationCode: "",
        failed: false
    };

    componentDidMount() {
        if (this.props.uid && this.props.token) {
            this.activate();
        }
    }

    activate = async () => {
        try {
            console.log(
                "Activating...",
                this.state.smsActivationCode.length !== 6
            );
            this.setState({ activating: true });
            let response = null;
            if (this.props.sms) {
                if (this.state.smsActivationCode.length !== 6) {
                    this.setState({ activating: false });
                    return false;
                }

                response = await axios.post(`/accounts/sms_activate/`, {
                    token: this.state.smsActivationCode
                });
            } else {
                response = await axios.get(
                    `/accounts/email_activate/${this.props.uid}/${this.props.token}/`
                );
            }
            console.log("Activated", response.data);
            console.log(this.props.next);
            this.props.onConfirm(response.data.token, this.props.next);
        } catch (e) {
            this.setState({ failed: true, activating: false });
        }
    };

    onSmsChange = e => {
        this.setState(
            {
                smsActivationCode: e.target.value.toUpperCase()
            },
            e => {
                if (this.state.smsActivationCode.length === 6) {
                    this.activate();
                }
            }
        );
    };

    renderSmsForm = () => {
        return (
            <div className={"flex text-center flex-column center"}>
                <h3>
                    One last thing... <Emoji emoji={"📱"} />
                </h3>
                <div className={"form-row"}>
                    <div className={"control"}>
                        <input
                            type={"text"}
                            placeholder="6-digit code"
                            value={this.state.smsActivationCode}
                            onChange={this.onSmsChange}
                        />
                    </div>
                </div>
                <p className={"help"}>
                    I sent you a text. <br /> If it takes too long to arrive,
                    don't hesitate to message me through the chat button.
                </p>
            </div>
        );
    };

    render() {
        return (
            <div className="card" style={{ width: "100%" }}>
                <div className={"card-content"}>
                    {this.props.sms &&
                        !this.state.activating &&
                        this.renderSmsForm()}
                    {!this.state.failed && this.state.activating && (
                        <div className={"center"}>
                            <Spinner text={"Activating your account..."} />
                        </div>
                    )}
                    {this.state.failed && (
                        <div className={"panel-message danger"}>
                            Could not activate your account. Message us for more
                            information.
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

AccountActivator = connect(null, mapDispatchToProps)(AccountActivator);

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: this.props.preflight ? false : true,
            failedPreflight: false,
            registered: false,
            email: "",
            emailPrefilled: false,
            code: "",
            username: "",
            password: "",
            showPassword: false,
            repeat_password: "",
            recaptchaToken: "",
            showAdvanced: false,
            isRegistering: false,
            errorMessages: null,
            joinSlack: true,
            registrationsOpen: true,
            smsMode: false,
            phone_number: "",
            sms_validation: ""
        };
    }

    componentDidMount() {
        this.getPreflight();
    }

    getPreflight = async () => {
        if (!this.props.preflight) {
            this.setState({
                loading: true,
                failedPreflight: false
            });
        }

        try {
            let data = null;
            if (!this.props.preflight) {
                data = await axios.get("/accounts/register_preflight/");
                data = data.data;
            } else {
                data = this.props.preflight;
            }
            this.setState({
                smsMode: data.method === "sms",
                registrationsOpen: data.registrations_open,
                failed: false,
                loading: false
            });

            if (data.method === "email" && this.captcha) {
                this.captcha.execute();
            }
        } catch (e) {
            console.log(e);
            this.setState({
                failedPreflight: true
            });
        }
    };

    arePasswordsEqual = () => {
        return this.state.password === this.state.repeat_password;
    };

    toggleShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        });
    };

    isFormValid = () => {
        if (!this.arePasswordsEqual()) {
            return false;
        }

        if (
            this.state.email.length === 0 ||
            this.state.username.length === 0 ||
            this.state.password.length === 0 ||
            this.state.repeat_password.length === 0 ||
            (this.state.smsMode && this.state.phone_number === 0)
        )
            return false;

        return true;
    };

    submitForm = async () => {
        this.setState({ isRegistering: true });
        const data = {
            email: this.state.email,
            invite_code: this.state.code,
            username: this.state.username,
            password: this.state.password,
            repeat_password: this.state.repeat_password,
            join_slack: this.state.joinSlack,
            recaptcha_token: this.state.recaptchaToken
        };
        console.log(this.props, !this.state.smsMode);
        if (this.props.next && !this.state.smsMode) {
            data["next"] = this.props.next;
        }

        if (this.state.phone_number !== "") {
            data["phone_number"] = this.state.phone_number;
        }

        try {
            // also try logging user in right away
            const response = await axios.post("/accounts/register/", data);
            if (response.data.success) {
                this.setState({
                    registered: true
                });
            }

            if (this.state.smsMode && this.props.onSmsActivation) {
                this.props.onSmsActivation();
            }
        } catch (e) {
            if (e.response && e.response.data && e.response.status === 400) {
                this.setState({
                    registered: false,
                    isRegistering: false,
                    errorMessages: e.response.data
                });
            } else {
                this.setState({
                    isRegistering: false
                });
            }
        }
    };

    verifyCallback = recaptchaToken => {
        // Here you will get the final recaptchaToken!!!
        this.setState({
            recaptchaToken: recaptchaToken
        });
    };

    checkStrictMode = () => {};

    // auto check available username

    renderForm = () => (
        <div>
            <ErrorMessageList fieldErrors={this.state.errorMessages} />
            <div className={"form-row"}>
                <label className="label">Username</label>
                <div className="control has-icons-left">
                    <input
                        type={"text"}
                        value={this.state.username}
                        onChange={e =>
                            this.setState({
                                username: e.target.value.toLowerCase()
                            })
                        }
                        placeholder="@username"
                    />
                </div>
                <p className="help  has-text-danger">
                    {this.state.errorMessages &&
                    this.state.errorMessages.username
                        ? this.state.errorMessages.username
                        : null}
                </p>
            </div>
            {!this.state.emailPrefilled && (
                <div className={"form-row"}>
                    <label className="label">Email</label>
                    <div className={"control"}>
                        <input
                            type="email"
                            danger={
                                this.state.errorMessages &&
                                this.state.errorMessages.email
                            }
                            value={this.state.email}
                            onChange={e =>
                                this.setState({ email: e.target.value })
                            }
                            placeholder="Email"
                        />
                    </div>
                    {this.state.errorMessages &&
                    this.state.errorMessages.email ? (
                        <p className="help has-text-danger">
                            {this.state.errorMessages.email}
                        </p>
                    ) : null}
                </div>
            )}
            <div className={"form-row"}>
                <label className="label">Password</label>
                <div className={"control"}>
                    <input
                        value={this.state.password}
                        onChange={e =>
                            this.setState({
                                password: e.target.value,
                                repeat_password: e.target.value
                            })
                        }
                        type={this.state.showPassword ? null : "password"}
                        danger={
                            this.state.errorMessages &&
                            this.state.errorMessages.password
                        }
                        placeholder="Password"
                    />
                    <p className="help">
                        {
                            // eslint-disable-next-line
                        }{" "}
                        <a onClick={this.toggleShowPassword}>
                            {this.state.showPassword
                                ? "Hide password"
                                : "Show password"}
                        </a>
                    </p>
                </div>
                {this.state.errorMessages &&
                this.state.errorMessages.password ? (
                    <p className="help has-text-danger">
                        {this.state.errorMessages.password}
                    </p>
                ) : null}
            </div>

            {this.state.smsMode && (
                <div className={"form-row"}>
                    <label className="label">Phone number</label>
                    <div className={"control"}>
                        <PhoneInput
                            placeholder="Enter phone number"
                            value={this.state.phone_number}
                            onChange={phone_number =>
                                this.setState({ phone_number })
                            }
                        />
                    </div>
                    <p className="help" style={{ marginTop: 10 }}>
                        <strong>
                            We only store its irreversible SHA-512 hash.
                        </strong>
                    </p>
                </div>
            )}

            {!this.state.smsMode && this.isFormValid() && this.renderCaptcha()}
        </div>
    );

    onSMSCode = e => {};

    renderTweetButton = () => {
        const text = `I just joined @getmakerlog! #TogetherWeMake`;
        const url = `${config.BASE_URL}/@${this.state.username.toLowerCase()}`;

        return (
            <OutboundLink
                href={`https://twitter.com/share?text=${encodeURIComponent(
                    text
                )}&url=${url}`}
                className="btn btn-twitter"
                style={{ backgroundColor: "#1b95e0", color: "white" }}
                target="_blank"
            >
                <FontAwesomeIcon icon={["fab", "twitter"]} /> Tweet
            </OutboundLink>
        );
    };

    renderCaptcha = () => (
        <div className={"form-row"}>
            <label className="label">Show you're human</label>
            <div className={"control"}>
                <div className={"captcha-container"}>
                    <ReCaptcha
                        ref={el => {
                            this.captcha = el;
                        }}
                        size={"normal"}
                        sitekey="6LfiJoQUAAAAAD-OhK2h2iy8cgnx3Qk5s9kqeLmb"
                        onChange={this.verifyCallback}
                    />
                </div>
            </div>
        </div>
    );

    renderFinishedStep = () => (
        <center>
            <div className={"flex flex-column"}>
                <h3>
                    The activation email is on the way! <Emoji emoji={"💌"} />
                </h3>
                <p className={"help"}>
                    It was sent to {this.state.email}. <br /> If it takes too
                    long to arrive, don't hesitate to message me through the
                    chat button.
                </p>
                <br />
                {this.renderTweetButton()}
            </div>
        </center>
    );

    shouldRenderForm = () =>
        this.state.registrationsOpen &&
        !this.state.loading &&
        !this.state.failedPreflight &&
        !this.state.registered;

    render() {
        if (this.state.loading && !this.state.failedPreflight)
            return <Spinner text={"Getting ready..."} />;

        return (
            <>
                {!this.state.registered && <h1>Let's get started.</h1>}
                {this.state.failedPreflight && (
                    <div className="has-text-centered">
                        Oops, I didn't work.{" "}
                        <button onClick={this.getPreflight}>Retry</button>
                    </div>
                )}
                <section>
                    {this.shouldRenderForm() && this.renderForm()}
                </section>
                {!this.state.registrationsOpen && (
                    <div className="has-text-centered">
                        Sorry, registrations aren't open right now. <br />{" "}
                        <OutboundLink to={"https://twitter.com/getmakerlog"}>
                            DM @GetMakerlog on Twitter
                        </OutboundLink>{" "}
                        to request an account.
                    </div>
                )}
                {this.state.registered &&
                    !this.state.smsMode &&
                    this.renderFinishedStep()}

                {this.state.smsMode && (
                    <ReCaptcha
                        ref={el => {
                            this.captcha = el;
                        }}
                        size={"invisible"}
                        sitekey="6LfiJoQUAAAAAD-OhK2h2iy8cgnx3Qk5s9kqeLmb"
                        onChange={this.verifyCallback}
                    />
                )}
                {this.shouldRenderForm() && (
                    <div className={"flex v-center"}>
                        <div>
                            {this.state.smsMode && (
                                <button
                                    className={"btn-small btn-link"}
                                    onClick={this.props.onSmsActivation}
                                >
                                    <FontAwesomeIcon icon={"lock"} /> Have a
                                    code?
                                </button>
                            )}
                        </div>
                        <div className="stretch"></div>
                        <div>
                            <button
                                className={
                                    "btn-secondary" +
                                    (this.state.isRegistering
                                        ? " is-loading"
                                        : "")
                                }
                                disabled={!this.isFormValid()}
                                onClick={this.submitForm}
                            >
                                <FontAwesomeIcon icon={"arrow-circle-right"} />
                                <strong>Create account</strong>
                            </button>
                        </div>
                    </div>
                )}
            </>
        );
    }
}

class RegisterPath extends React.Component {
    state = {
        confirming: false,
        sms: false,
        inviteRequested: false,
        isSubmitting: false,
        bio: "",
        email: "",
        errorMessages: null,
        params: {}
    };

    componentDidMount() {
        if (this.props.uid && this.props.token) {
            this.setState({ confirming: true });
        }
    }

    onSmsActivation = () => {
        this.setState({ confirming: true, sms: true });
    };

    isValidEmail = () => {
        if (this.state.email.length === 0) {
            return false;
        }

        if (!validateEmail(this.state.email)) {
            return false;
        }

        return true;
    };

    isValidBio = () => {
        // not obligatory for now.
        return true;
    };

    render() {
        return this.state.confirming ? (
            <AccountActivator
                next={this.props.next}
                sms={this.state.sms}
                uid={this.props.uid}
                token={this.props.token}
            />
        ) : (
            <RegisterForm
                next={this.props.next}
                onSmsActivation={this.onSmsActivation}
                preflight={this.props.preflight}
            />
        );
    }
}

export default RegisterPath;
