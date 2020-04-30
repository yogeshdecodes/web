import React from "react";
import PropTypes from "prop-types";
import Spinner from "~/components/Spinner";
import ErrorMessageList from "~/components/forms/ErrorMessageList";
import { loadingClass, validateEmail } from "~/lib/utils/random";
import { Tooltip } from "react-tippy";
import { connect } from "react-redux";
import { actions as authActions } from "~/ducks/auth";
import { Link } from "~/routes";

function getSpinnerText() {
    const strs = [
        "Go change the world.",
        "It's mango time. 🥭",
        "Loading the makerness..."
    ];
    var randomIndex = Math.floor(Math.random() * strs.length);
    return strs[randomIndex];
}

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

const LoginForm = props => {
    if (props.isLoading) {
        return (
            <center>
                <Spinner text={getSpinnerText()} />
            </center>
        );
    }

    if (props.token) {
        return <center>Taking you to the log page...</center>;
    }

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                props.onClickLogin(props.username, props.password);
            }}
        >
            <h1>Sign in</h1>
            {props.errorMessages && (
                <ErrorMessageList errorMessages={props.errorMessages} />
            )}

            <section>
                <div className="control">
                    <Tooltip
                        // options
                        open={validateEmail(props.username)}
                        html={
                            <small className={"has-text-white"}>
                                <strong className={"is-brand-green"}>
                                    Heads up!
                                </strong>
                                <br /> This field is your{" "}
                                <strong>username</strong>, not email.
                            </small>
                        }
                        position="bottom"
                        trigger="click"
                    >
                        <input
                            type="text"
                            value={props.username}
                            onChange={props.onUsernameChange}
                            placeholder="Username"
                        />
                    </Tooltip>
                </div>
                <div className="control">
                    <input
                        type="password"
                        value={props.password}
                        onChange={props.onPasswordChange}
                        placeholder="Password"
                    />
                </div>
            </section>
            <div className="control flex">
                <div className="v-center">
                    <Link route={"forgot"}>Forgot?</Link>
                </div>
                <div className="stretch"></div>
                <div>
                    <button
                        className={loadingClass(
                            "btn is-secondary",
                            props.isLoading
                        )}
                        onClick={() =>
                            props.onClickLogin(props.username, props.password)
                        }
                        type="submit"
                    >
                        Login
                    </button>
                </div>
            </div>
        </form>
    );
};

LoginForm.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    errorMessages: PropTypes.any,
    username: PropTypes.string.isRequired,
    onUsernameChange: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    onPasswordChange: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
