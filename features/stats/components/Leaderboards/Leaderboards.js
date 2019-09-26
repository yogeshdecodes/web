import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Emoji from "../../../../components/Emoji";
import FullName from "../../../users/components/FullName";
import Streak from "../../../../components/Streak";
import Tda from "../../../../components/Tda";
import withProfileModal from "../../../users/containers/ProfileModalAction/withProfileModal";
import UserActivityGraph from "../UserActivityGraph";

const LeaderboardsRow = withProfileModal(
    ({ user, rank, expand, isCurrentUser }) => (
        <div className={"Leaderboards-Row"} onClick={expand}>
            <div className={isCurrentUser ? "is-selected" : null}>
                {rank ? `#${rank}` : 'n/a'}
            </div>
            <div className={"Leaderboards-Content"}>
                <div className={"flex"}>
                    <div>
                        <img className="img-avatar img-32" src={user.avatar} />
                    </div>
                    <div>
                        <strong><FullName user={user} prependUsername={true} /></strong>
                    </div>
                </div>
            </div>

            <div className={"Leaderboards-Content is-hidden-mobile"}>
                <UserActivityGraph user={user} />
            </div>
            <div className={"Leaderboards-Content"}>
                <Streak days={user.streak} />
            </div>
            <div className={"Leaderboards-Content"}>
                <Tda tda={user.week_tda} />
            </div>
        </div>
    )
)

class Leaderboards extends React.Component {
    getUserPosition = (id) => {
        const userIndex = this.props.topUsers.findIndex(
            user => user.id === id
        );

        if (userIndex === -1) {
            return null
        } else {
            return userIndex + 1
        }
    }

    renderUsers = () => {
        const users = this.props.topUsers.map(
            (user, pos) => (
                <LeaderboardsRow user={user} rank={pos + 1} isCurrentUser={this.props.me && user.id === this.props.me.id} />
            )
        );

        if (this.props.isLoggedIn && this.props.me && this.getUserPosition(this.props.me.id) === null) {
            users.push(
                <LeaderboardsRow user={this.props.me} rank={null} isCurrentUser={true} />
            )
        }

        return users
    }

    render() {
        return (
            <section className={"is-fullwidth is-hoverable Leaderboards"}>
                <header className={"Leaderboards-Row"}>
                    <div>Rank</div>
                    <div>Name</div>
                    <div className={"is-hidden-mobile"}><Emoji emoji="📊" /> Activity</div>
                    <div><Emoji emoji="🔥" /> Streak</div>
                    <div><Emoji emoji="🏁" /> Tasks/day</div>
                </header>

                {this.renderUsers()}
            </section>
        )
    }
}

Leaderboards.propTypes = {
    topUsers: PropTypes.array.isRequired,
}


const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        isLoading: state.stats.isLoading || state.user.isLoading,
        failed: state.stats.failed || state.user.failed,
        me: state.user.me,
        tda: state.stats.user.tda,
        streak: state.stats.user.streak,
        trend: state.stats.user.activity_trend,
    }
}

export default connect(
    mapStateToProps
)(Leaderboards);