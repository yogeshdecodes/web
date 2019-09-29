import React from "react";
import PropTypes from "prop-types";

const Avatar = ({ url }) => (
    <div>
        <img className="img-round img-48" src={url} alt="User" />
    </div>
);

Avatar.propTypes = {
    url: PropTypes.string.isRequired
};

export default Avatar;
