import React from "react";
import PropTypes from "prop-types";
import Trend from "react-trend";

const ActivitySparklines = props => {
    if (!props.trend || props.trend.length <= 1) {
        return (
            <div className={"center"}>
                <h3>No tasks yet.</h3>
            </div>
        );
    }

    return (
        <Trend
            smooth
            autoDraw
            autoDrawDuration={500}
            autoDrawEasing="ease-out"
            data={props.trend}
            gradient={["#67B26F", "#47e0a0", "#38ef7d"]}
            radius={5}
            strokeWidth={props.strokeWidth ? props.strokeWidth : 2.5}
            strokeLinecap={"round"}
            padding={props.padding ? props.padding : 5}
        />
    );
};

ActivitySparklines.propTypes = {
    trend: PropTypes.array
};

export default ActivitySparklines;
