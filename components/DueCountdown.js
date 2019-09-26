import * as pluralize from "pluralize";

import React from "react";
import TimeAgo from "react-timeago";

const formatter = function(time, unit, suffix) {
    unit = pluralize(unit, time);
    if (suffix != "ago") {
        return `in ${time} ${unit}`;
    } else {
        return `${time} ${unit} ${suffix}`;
    }
};

export default ({ date }) => (
    <span className={"due-at has-text-grey-light"}>
        <TimeAgo formatter={formatter} live={true} date={date} />
    </span>
);
