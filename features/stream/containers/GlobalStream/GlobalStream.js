import React from "react";
import WeeklyStream from "../WeeklyStream";

class GlobalStream extends React.Component {
    render() {
        return (
            <WeeklyStream
                tasksIndexUrl={`/explore/stream/`}
                milestonesIndexUrl={`/explore/stream/milestones/`}
            />
        );
    }
}

GlobalStream.propTypes = {};

export default GlobalStream;
