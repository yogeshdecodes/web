import React from "react";
import { connect } from "react-redux";
import { actions as appActions } from "~/ducks/app";
import "./index.scss";

class GoldPage extends React.Component {
    componentDidMount() {
        this.props.forceDark(true);
    }

    componentWillUnmount() {
        this.props.forceDark(false);
    }

    render() {
        return (
            <div className="GoldPage">
                <div className="hero-container">
                    <div className="container">
                        <div className="flex flex-column flex-v-gap">
                            <div>
                                <h1>
                                    It's time to level up your maker journey.
                                </h1>
                            </div>
                            <div>
                                <h2>
                                    Support Makerlog and get exclusive perks
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, dispatch => ({
    forceDark: dark => dispatch(appActions.forceDark(dark))
}))(GoldPage);
