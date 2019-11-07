import React from "react";
import { connect } from "react-redux";
import { actions as authActions } from "~/ducks/auth";
import "./index.scss";
import LoginForm from "./components/LoginForm";
import { requireUnauthed } from "~/lib/auth";

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        ready: state.auth.ready,
        isLoading: state.auth.isLoading,
        errorMessages: state.auth.errorMessages
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onClickLogin: (username, password) => {
            dispatch(authActions.login(username, password));
        }
    };
};

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };
    }

    async componentDidMount() {
        this.injectCss();
    }

    componentWillUnmount() {
        this.removeCss();
    }

    injectCss = () => {
        const nav = document.getElementById("main-navbar");
        nav.classList.add("transparent-navbar");
    };

    removeCss = () => {
        const nav = document.getElementById("main-navbar");
        nav.classList.remove("transparent-navbar");
    };

    render() {
        return (
            <div className="container">
                <div className="columns form-container">
                    <div className={"column is-one-third"}>
                        <h1 className={"title has-text-white"}>Log in</h1>
                        <div className="card">
                            <div className="card-content">
                                <LoginForm
                                    isLoading={this.props.isLoading}
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(requireUnauthed(LoginPage));
