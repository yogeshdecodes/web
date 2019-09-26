import React from 'react';
import WeeklyStream from "../WeeklyStream";

class UserStream extends React.Component {
    render() {
        return <WeeklyStream
            tasksIndexUrl={`/users/${this.props.userId}/stream/`}
            milestonesIndexUrl={`/users/${this.props.userId}/stream/milestones/`}/>
    }
}

UserStream.propTypes = {}

export default UserStream;
