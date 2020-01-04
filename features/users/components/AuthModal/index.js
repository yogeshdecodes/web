import React from "react";
import "./index.scss";
import LoginForm from "../LoginForm";
import { connect } from "react-redux";
import { requireUnauthed } from "~/lib/auth";
import Spinner from "~/components/Spinner";
import { Link } from "~/routes";
import RegisterForm from "../RegisterForm";

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

class AuthModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            username: "",
            password: ""
        };
    }

    render() {
        if (this.props.login) {
            return (
                <div className="AuthModal login">
                    <div>
                        <h1>Welcome back.</h1>
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
                    <div></div>
                </div>
            );
        }

        if (this.props.begin) {
            return (
                <div className="AuthModal begin">
                    <div>
                        {this.props.params ? (
                            <RegisterForm {...this.props.params} />
                        ) : (
                            <RegisterForm />
                        )}
                    </div>
                    <div></div>
                </div>
            );
        }

        return (
            <div className="AuthModal splash">
                <div>
                    <div>
                        <Link to="begin">
                            <button className="btn-primary btn-xl btn-block">
                                Sign up
                            </button>
                        </Link>
                    </div>
                    <div className="or">or</div>
                    <div>
                        <Link to="login">
                            <button className="btn-light btn-xl btn-block">
                                Sign in
                            </button>
                        </Link>
                    </div>
                </div>
                <div></div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);
