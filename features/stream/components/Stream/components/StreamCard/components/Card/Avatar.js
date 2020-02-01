import React from "react";
import PropTypes from "prop-types";
import { imageUrl } from "../../../../../../../../lib/utils/img";

const Avatar = ({ url }) => (
    <div>
        <img className="img-round img-48" src={imageUrl(url, 48)} alt="User" />
    </div>
);

Avatar.propTypes = {
    url: PropTypes.string.isRequired
};

export default Avatar;
