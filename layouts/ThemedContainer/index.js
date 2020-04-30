import React, { Component } from "react";
import { connect } from "react-redux";
import { checkDarkMode } from "../../lib/utils/random";

export default connect(state => ({
    darkMode: checkDarkMode(state.user.me) || state.app.darkModeOverride
}))(
    class ThemedContainer extends Component {
        state = {
            darkModeDemo: false
        };

        componentDidMount() {
            this.checkDemoMode();
        }

        checkDemoMode = () => {
            if (window.location.search.includes("dark-mode-demo")) {
                this.setState({ darkModeDemo: true });
                this.timer = setTimeout(() => {
                    this.setState({ darkModeDemo: false });
                }, 10000);
            }
        };

        getTheme = () => {
            if (this.state.darkModeDemo) return "dark";
            if (this.props.darkMode) {
                return "dark";
            }

            return "light";
        };

        render() {
            return (
                <div data-theme={this.getTheme()}>{this.props.children}</div>
            );
        }
    }
);
