import React from "react";
import PropTypes from "prop-types";
import "./ProfileModalAction.scss";
import {Link} from "~/routes";

const ProfileModalAction = ({ user }) => {
    return (
        <Link route="profile-page" params={{ username: user.username }}>
            <a>{this.props.children}</a>
        </Link>
    );
};

ProfileModalAction.propTypes = {
    user: PropTypes.object.isRequired
};

export default ProfileModalAction;
