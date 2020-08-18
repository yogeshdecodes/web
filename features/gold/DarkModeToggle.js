import React, { Component } from "react";
import Switch from "react-switch";
import { connect } from "react-redux";
import { actions as userActions } from "~/ducks/user";
import Emoji from "~/components/Emoji";

class DarkModeToggle extends Component {
    onChangeDarkMode = async e => {
        this.props.setDark(!this.props.userDark);
    };

    render() {
        return (
            <div className="DarkModeToggle">
                <Switch
                    checkedIcon={
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                                fontSize: 15,
                                paddingRight: 2
                            }}
                        >
                            <Emoji emoji="🌑" />
                        </div>
                    }
                    uncheckedIcon={
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                                fontSize: 15,
                                paddingRight: 2
                            }}
                        >
                            <Emoji emoji="🔆" />
                        </div>
                    }
                    disabled={!this.props.hasGold}
                    onColor="#47E0A0"
                    height={30}
                    width={60}
                    handleDiameter={20}
                    checked={this.props.userDark}
                    onChange={this.onChangeDarkMode}
                />
            </div>
        );
    }
}

export default connect(
    state => ({
        hasGold: state.user.me ? state.user.me.gold : false,
        userDark: state.user.me ? state.user.me.dark_mode : false
    }),
    dispatch => ({
        setDark: dark => {
            dispatch(userActions.updateUser({ dark_mode: dark }, true)); // patch.
        }
    })
)(DarkModeToggle);
