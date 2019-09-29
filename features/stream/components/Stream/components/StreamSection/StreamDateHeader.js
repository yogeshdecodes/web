import React from "react";
import format from "date-fns/format";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import styled from "styled-components";

const SubheaderButton = styled.a``;

function getRelativeDate(date) {
    const diff = differenceInCalendarDays(new Date(), date);
    const dayOfWeek = format(date, "EEEE");
    window.format = format;

    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    if (diff >= 2 && diff <= 6) return `${dayOfWeek}`;
    if (diff > 6 && diff <= 12) return `Last ${dayOfWeek}`;

    return null;
}

export default ({ date, ...props }) => {
    const mmd = date ? new Date(date) : new Date();
    const humanDate = getRelativeDate(mmd);

    const calendarDate = format(mmd, "MMMM d, yyyy");
    const weekAgo = differenceInCalendarDays(new Date(), mmd) <= 6;

    let strongText = null;

    if (weekAgo) {
        strongText = <strong>{humanDate} </strong>;
    } else {
        strongText = <strong>{calendarDate}</strong>;
    }

    return (
        <h4 className="StreamDateHeader">
            {strongText}
            <span className="has-text-grey">
                {props.onSwitch && humanDate === "Today" && (
                    <SubheaderButton onClick={props.onSwitch}>
                        {!props.isFollowingFeed && "Everyone"}
                        {props.isFollowingFeed && "Following"}
                    </SubheaderButton>
                )}
                {!props.onSwitch && humanDate === "Today" && calendarDate}
                {humanDate !== "Today" && weekAgo && calendarDate}
            </span>
        </h4>
    );
};
