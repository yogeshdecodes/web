import React from "react";
import PropTypes from "prop-types";

const FullName = ({ user, prependUsername = false }) => (
    <>
        {user.first_name
            ? `${user.first_name} ${user.last_name}`
            : prependUsername
            ? `@${user.username}`
            : user.username}
    </>
);

FullName.propTypes = {
    user: PropTypes.object.isRequired,
    prependUsername: PropTypes.bool
};

export default FullName;
