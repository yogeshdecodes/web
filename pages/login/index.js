import React from "react";
import "./index.scss";
import LoginForm from "../../features/users/components/LoginForm";
import { requireUnauthed } from "~/lib/auth";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };
    }

    static async getInitialProps() {
        const layout = { className: "LoginPage" };

        return { layout };
    }

    render() {
        return (
            <div className="container">
                <div className="form-card">
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
        );
    }
}

export default requireUnauthed(LoginPage);
