import React from "react";
import WeeklyStream, { prefetchStream } from "../WeeklyStream";

const tasksIndexUrl = `/explore/stream/`;

class GlobalStream extends React.Component {
    render() {
        return <WeeklyStream tasksIndexUrl={tasksIndexUrl} {...this.props} />;
    }
}

export async function prefetch() {
    return await prefetchStream(tasksIndexUrl);
}

GlobalStream.propTypes = {};

export default GlobalStream;
