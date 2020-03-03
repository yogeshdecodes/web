import React from "react";
import axios from "~/lib/axios";
import ErrorMessageList from "~/components/forms/ErrorMessageList";
import { prettyAxiosError } from "~/lib/utils/error";
import { requireUnauthed } from "~/lib/auth";
import "./index.scss";
import { Router } from "~/routes";

class ResetForm extends React.Component {
    state = {
        password: "",
        repeatPassword: "",
        success: false,
        loading: false,
        failed: false,
        errorMessages: null
    };

    onSubmit = e => {
        e.preventDefault();
        this.resetPassword();
    };

    resetPassword = async () => {
        try {
            this.setState({ success: false, failed: false, loading: true });
            const uid = this.props.uid;
            const token = this.props.token;

            await axios.post("/accounts/reset/", {
                uidb64: uid,
                token: token,
                repeat_password: this.state.repeatPassword,
                password: this.state.password
            });
            this.setState({ success: true, failed: false, loading: false });

            // NextJS redirect to login page
            Router.pushRoute("login");
        } catch (e) {
            try {
                prettyAxiosError(e);
            } catch (e) {
                if (e.field_errors) {
                    this.setState({
                        failed: true,
                        success: false,
                        loading: false,
                        errorMessages: e.field_errors
                    });
                } else {
                    this.setState({
                        failed: true,
                        success: false,
                        loading: false,
                        errorMessages: null
                    });
                }
            }
        }
    };

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                {this.state.failed && this.state.errorMessages && (
                    <ErrorMessageList fieldErrors={this.state.errorMessages} />
                )}
                <div className={"form-row"}>
                    <label className="label">Password</label>
                    <input
                        type={"password"}
                        value={this.state.password}
                        onChange={e =>
                            this.setState({ password: e.target.value })
                        }
                        placeholder="Password"
                    />
                </div>
                <div className={"form-row"}>
                    <label className="label">Password</label>
                    <input
                        type={"password"}
                        value={this.state.repeatPassword}
                        onChange={e =>
                            this.setState({ repeatPassword: e.target.value })
                        }
                        placeholder="Confirm password"
                    />
                </div>
                <div className={"flex stretch"}>
                    <div />
                    <div>
                        <button
                            className={
                                this.state.loading
                                    ? "button is-primary"
                                    : "button is-primary is-loading"
                            }
                            onClick={this.onSubmit}
                            type="submit"
                        >
                            Change password
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

class ForgotForm extends React.Component {
    state = {
        email: "",
        success: false,
        loading: false,
        failed: false
    };

    onSubmit = async e => {
        e.preventDefault();
        try {
            this.setState({
                loading: true,
                success: false,
                failed: false
            });
            await axios.post("/accounts/forgot/", {
                email: this.state.email
            });
            this.setState({
                email: "",
                success: true,
                loading: false,
                failed: false
            });
        } catch (e) {
            this.setState({
                success: false,
                loading: false,
                failed: true
            });
        }
    };

    render() {
        if (this.state.success || this.state.failed) {
            return (
                <p>
                    If an email with this address exists, we've sent an email.
                </p>
            );
        }

        return (
            <form onSubmit={this.onSubmit}>
                <div className={"form-row"}>
                    <label className="label">Email</label>
                    <input
                        type={"email"}
                        value={this.state.email}
                        onChange={e => this.setState({ email: e.target.value })}
                        placeholder="Email"
                    />
                </div>
                <div className={"flex stretch"}>
                    <div />
                    <div>
                        <button
                            className={
                                this.state.loading
                                    ? "button is-primary"
                                    : "button is-primary is-loading"
                            }
                            onClick={this.onSubmit}
                            type="submit"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

class ForgotPage extends React.Component {
    static async getInitialProps({ query }) {
        return {
            layout: {
                className: "ForgotPage"
            },
            uid: query.uid,
            token: query.token
        };
    }

    render() {
        return (
            <section>
                <div className="flex column center">
                    <h1>Forgot?</h1>
                    <div className={"card"}>
                        <div className={"card-content"}>
                            {this.props.uid && this.props.token ? (
                                <ResetForm
                                    uid={this.props.uid}
                                    token={this.props.token}
                                />
                            ) : (
                                <ForgotForm />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

ForgotPage.propTypes = {};

export default requireUnauthed(ForgotPage);
