import React from "react";
import PropTypes from "prop-types";
import { UserMedia } from "~/features/users";

const UserMediaList = ({ users, large = false }) => (
    <ul className={"UserMediaList"}>
        {users.map(user => (
            <li key={user.id}>
                <UserMedia large={large} user={user} />
            </li>
        ))}
    </ul>
);

UserMediaList.propTypes = {
    users: PropTypes.object.isRequired
};

export default UserMediaList;
