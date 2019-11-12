import React from "react";
import PropTypes from "prop-types";
import Spinner from "~/components/Spinner";
import ErrorMessageList from "~/components/forms/ErrorMessageList";
import { Button, Control, Field, Input, Level } from "~/vendor/bulma";
import { validateEmail } from "~/lib/utils/random";
import { Tooltip } from "react-tippy";
import { connect } from "react-redux";
import { actions as authActions } from "~/ducks/auth";
import { Link } from "~/routes";

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
                <Spinner text="Go change the world." />
            </center>
        );
    }

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                props.onClickLogin(props.username, props.password);
            }}
        >
            {props.errorMessages && (
                <ErrorMessageList errorMessages={props.errorMessages} />
            )}

            <Field>
                <Control>
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
                        <Input
                            value={props.username}
                            onChange={props.onUsernameChange}
                            placeholder="Username"
                        />
                    </Tooltip>
                </Control>
            </Field>
            <Field>
                <Control>
                    <Input
                        type="password"
                        value={props.password}
                        onChange={props.onPasswordChange}
                        placeholder="Password"
                    />
                </Control>
            </Field>
            <Level>
                <Level.Left>
                    <Link route={"forgot"}>Forgot?</Link>
                </Level.Left>
                <Level.Right>
                    <Control>
                        <Button
                            className={"is-rounded"}
                            onClick={() =>
                                props.onClickLogin(
                                    props.username,
                                    props.password
                                )
                            }
                            type="submit"
                            loading={props.isLoading}
                            primary
                        >
                            Login
                        </Button>
                    </Control>
                </Level.Right>
            </Level>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);
