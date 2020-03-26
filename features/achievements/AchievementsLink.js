import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isServer } from "~/config";
import { Track } from "../../vendor/ga";
import { achievementsActions } from "../../ducks/achievements";
import { connect } from "react-redux";

class AchievementsLink extends Component {
    toggle = () => {
        if (isServer) return false;
        new Track().event(
            `achievements-toggled-${!this.state.open ? "open" : "close"}`
        );
        localStorage.setItem("achievements-link-opened", "true");
        this.props.closeHandler();
    };

    render() {
        return (
            <>
                <a
                    className={"AchievementsLink navbar-item is-icon"}
                    onClick={this.props.closeHandler}
                >
                    <FontAwesomeIcon size="lg" icon={["fas", "trophy"]} />
                    {this.props.achievements.length === 0 && (
                        <span className="new-dot"></span>
                    )}
                    {this.props.unreadCount > 0 && (
                        <div className={"count"}>{this.props.unreadCount}</div>
                    )}
                </a>
            </>
        );
    }
}

const mapStateToProps = state => ({
    open: state.achievements.open,
    achievements: state.achievements.achievements,
    unreadCount: state.achievements.achievements.filter(a => !a.read).length
});

const mapDispatchToProps = dispatch => ({
    closeHandler: () => dispatch(achievementsActions.toggleView())
});

export default connect(mapStateToProps, mapDispatchToProps)(AchievementsLink);
