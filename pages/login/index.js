import React from "react";
import "./index.scss";
import { requireUnauthed } from "~/lib/auth";
import LoginForm from "~/features/users/components/LoginForm";
import { connect } from "react-redux";

class LoginPage extends React.Component {
    state = {
        username: "",
        password: ""
    };

    static async getInitialProps({ query }) {
        const layout = { className: "LoginPage", footer: false };

        return { layout, query };
    }

    render() {
        return (
            <div>
                <div className="FullHeightPage fullpage">
                    <div className="bg-container">
                        <div className="actionable-section-bg"></div>
                        <div className="copy-section-bg"></div>
                    </div>
                    <div className="container dual-column">
                        <div>
                            <LoginForm
                                username={this.state.username}
                                password={this.state.password}
                                onUsernameChange={e =>
                                    this.setState({
                                        username: e.target.value
                                    })
                                }
                                onPasswordChange={e =>
                                    this.setState({
                                        password: e.target.value
                                    })
                                }
                                onClickLogin={this.props.onClickLogin}
                                errorMessages={this.props.errorMessages}
                            />
                        </div>
                        <div className="is-hidden-mobile"></div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        ready: state.auth.ready,
        loading: state.auth.isLoading,
        errorMessages: state.auth.errorMessages
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default requireUnauthed(
    connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);
