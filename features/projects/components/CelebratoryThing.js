import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Emoji from "../../../components/Emoji";
import OutboundLink from "../../../components/OutboundLink";

const renderTweetButton = user => {
    const text = `I completed all my tasks on @getmakerlog! 💪 \n #TogetherWeMake`;
    const url = `${process.env.REACT_APP_BASE_URL}/@${user.username}`;

    return (
        <OutboundLink
            href={`https://twitter.com/share?text=${encodeURIComponent(
                text
            )}&url=${url}`}
            className={"btn-small btn-twitter"}
            target="_blank"
        >
            <FontAwesomeIcon icon={["fab", "twitter"]} /> Tweet your victory
        </OutboundLink>
    );
};

export default ({ me }) => (
    <div className={"has-text-centered message-container"}>
        <h3 className={"mt0"}>
            <Emoji emoji={"🎉"} /> All done!
        </h3>
        {renderTweetButton(me)}
    </div>
);
