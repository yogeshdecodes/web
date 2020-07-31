import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Emoji from "~/components/Emoji";
import MakerDefinition from "../../components/MakerDefinition";
import WallOfLove from "../../components/WallOfLove";
import config from "../../config";
import OutboundLink from "~/components/OutboundLink";
import Spinner from "~/components/Spinner";
import {
    loginWithTwitterToken,
    loginWithFacebookToken
} from "../../lib/auth";
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
import { setCookie } from "nookies";

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
                if (!query.oauth_token || !query.oauth_verifier) return null;
                return {
                    method: loginWithTwitterToken,
                    params: [query.oauth_token, query.oauth_verifier]
                };
                break;

            case "facebook":
                if (!query.code) return null;
                return {
                    method: loginWithFacebookToken,
                    params: [query.code, `${config.API_URL}/complete/facebook/`]
                };
                break;
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
