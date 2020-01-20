import React from "react";
import WeeklyStream, { prefetchStream } from "../WeeklyStream";

const tasksIndexUrl = `/explore/stream/`;
const milestonesIndexUrl = `/explore/stream/milestones/`;

class GlobalStream extends React.Component {
    render() {
        return (
            <WeeklyStream
                tasksIndexUrl={tasksIndexUrl}
                milestonesIndexUrl={milestonesIndexUrl}
                {...this.props}
            />
        );
    }
}

export async function prefetch() {
    return await prefetchStream(tasksIndexUrl, milestonesIndexUrl);
}

GlobalStream.propTypes = {};

export default GlobalStream;
