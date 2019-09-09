import PropTypes from "prop-types";
import React from "react";

export const getFullNameOrUsername = (user, prepend) => {
    return user.first_name
        ? `${user.first_name} ${user.last_name}`
        : prepend
        ? `@${user.username}`
        : user.username;
};

const FullName = ({ user, prependUsername = false }) => (
    <span>{getFullNameOrUsername(user, prependUsername)}</span>
);

FullName.propTypes = {
    user: PropTypes.object.isRequired,
    prependUsername: PropTypes.bool
};

export default FullName;
