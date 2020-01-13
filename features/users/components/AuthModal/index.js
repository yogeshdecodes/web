import React from "react";
import "./index.scss";
import LoginForm from "../LoginForm";
import { connect } from "react-redux";
import { requireUnauthed } from "~/lib/auth";
import Spinner from "~/components/Spinner";
import { Link } from "~/routes";
import RegisterForm from "../RegisterForm";
import Modal from "~/components/Modal";
import { TwitterTweetEmbed, TwitterTimelineEmbed } from "react-twitter-embed";

function getLoveTweetId() {
    const strs = [
        "1213503558227595266",
        "1213510774821441536",
        "1213509362611826688",
        "1208132962690224128",
        "1207689746517872641",
        //"1207688319456415745",
        "1213597639159275521"
    ];
    var randomIndex = Math.floor(Math.random() * strs.length);
    return strs[randomIndex];
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

const AuthModalCard = connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class extends React.Component {
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
                        <div className="is-hidden-touch"></div>
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
                        <div>
                            <h3 className="has-text-white">
                                Here's what the community is saying about
                                Makerlog...
                            </h3>
                            <TwitterTweetEmbed
                                options={{ conversation: "none" }}
                                tweetId={getLoveTweetId()}
                                placeholder={<Spinner color="white" small />}
                            />
                        </div>
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
                    <div className="is-hidden-touch"></div>
                </div>
            );
        }
    }
);

const AuthModal = props => {
    return (
        <Modal
            open={props.open}
            onClose={props.onClose}
            background={"transparent"}
            flexDirection={"column"}
            percentWidth={60}
            style={{
                width: "100%"
            }}
            modalStyles={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
            className="AuthModalContainer"
        >
            <Modal.Content verticallyCentered={true} flexRatio={2}>
                <AuthModalCard login={props.login} begin={props.begin} />
            </Modal.Content>
        </Modal>
    );
};

export { AuthModalCard };
export default AuthModal;
