import React, { Component } from "react";
import config from "../../config";
import Spinner from "~/components/Spinner";
import { loginWithFacebookToken, loginWithTwitterToken } from "../../lib/auth";
import { StdErrorCollection } from "../../lib/utils/error";
import StdErrorMessages from "~/components/forms/StdErrorMessages";
import { Track } from "../../vendor/ga";
import { connect } from "react-redux";
import { actions as authActions } from "~/ducks/auth";

class SocialActivationForm extends React.Component {
    state = {
        loading: true,
        failed: false,
        errorMessages: null
    };

    componentDidMount() {
        this.authenticate();
    }

    authenticate = async () => {
        try {
            this.setState({
                loading: true,
                failed: false,
                errorMessages: null
            });
            const { method, params } = this.getAuthProvider();
            if (!method) {
                throw new Error("No method found for this provider.");
            }
            const { token } = await method(...params);
            if (this.props.onToken) {
                this.props.onToken(token);
            }
            new Track().event("sign_up");
            this.setState({
                registered: true,
                loading: false,
                failed: false,
                errorMessages: null
            });
        } catch (e) {
            this.setState({
                loading: false,
                failed: true,
                errorMessages: new StdErrorCollection(e)
            });
        }
    };

    getAuthProvider = () => {
        const query = this.props.query;
        switch (query.provider) {
            case "twitter":
                if (!query.oauth_token || !query.oauth_verifier) return {};
                return {
                    method: loginWithTwitterToken,
                    params: [query.oauth_token, query.oauth_verifier]
                };
                break;

            case "facebook":
                if (!query.code) return {};
                return {
                    method: loginWithFacebookToken,
                    params: [query.code, `${config.API_URL}/complete/facebook/`]
                };
                break;

            default:
                return {};
        }
    };

    render() {
        if (this.state.registered) {
            return (
                <div className="SocialActivationForm">
                    <Spinner centered={false} text="Signing you in... 🥭" />
                </div>
            );
        }

        if (this.state.failed) {
            return (
                <div>
                    <h1>Get started</h1>
                    <StdErrorMessages error={this.state.errorMessages} />
                    <div>
                        <p className="help">
                            Psst! Get help by checking out the live chat icon on
                            the bottom right corner.
                        </p>
                    </div>
                </div>
            );
        }

        if (!this.getAuthProvider()) {
            return (
                <div>
                    <h1>Get started</h1>
                    <div className="alert is-danger">
                        <div className="alert-body">
                            Oops! Something went wrong. (provider-misconfigured)
                        </div>
                    </div>
                    <div>
                        <p className="help">
                            Psst! Get help by checking out the live chat icon on
                            the bottom right corner.
                        </p>
                    </div>
                </div>
            );
        }

        return (
            <div className="SocialActivationForm">
                {this.state.loading ? (
                    <Spinner centered={false} text="Signing you in... 🥭" />
                ) : null}
            </div>
        );
    }
}

class SocialPage extends Component {
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

    render() {
        return (
            <div>
                <div className="FullHeightOnboarding fullpage">
                    <div className="bg-container">
                        <div className="actionable-section-bg"></div>
                        <div className="copy-section-bg"></div>
                    </div>
                    <div className="container dual-column">
                        <div>
                            <div>
                                <SocialActivationForm
                                    query={this.props.query}
                                    onToken={this.props.onToken}
                                />
                            </div>
                        </div>
                        <div className="is-hidden-mobile"></div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onToken: (token, next = null) => {
            dispatch(authActions.login("", "", token));
        }
    };
};

export default connect(null, mapDispatchToProps)(SocialPage);
