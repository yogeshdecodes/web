import React from "react";
import PropTypes from "prop-types";
import { UserMedia } from "~/features/users";

const UserMediaList = ({ users, large = false }) => (
    <div className={"UserMediaList flex flex-column flex-v-gap"}>
        {users.map(user => (
            <div key={user.id}>
                <UserMedia large={large} user={user} />
            </div>
        ))}
    </div>
);

UserMediaList.propTypes = {
    users: PropTypes.object.isRequired
};

export default UserMediaList;
