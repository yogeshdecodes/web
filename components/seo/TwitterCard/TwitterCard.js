import React from "react";

const TwitterCard = ({ type = "summary", ...props }) => (
    <div>
        <meta name="twitter:card" content={type} />
        <meta name="twitter:site" content="@getmakerlog" />
        <meta name="twitter:title" content={props.title} />
        <meta name="twitter:description" content={props.description} />
        {props.image && <meta name="twitter:image" content={props.image} />}
    </div>
);

TwitterCard.propTypes = {};

export default TwitterCard;
