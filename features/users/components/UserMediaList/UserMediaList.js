import React from "react";
import PropTypes from "prop-types";
import { UserMedia } from "~/features/users";

const UserMediaList = ({ users, large = false, ranked = false }) => (
    <div
        className={"UserMediaList flex flex-column flex-v-gap"}
        style={{ width: "100%" }}
    >
        {users.map((user, idx) => (
            <div className="flex flex-gap" key={user.id}>
                {ranked ? (
                    <div
                        className={
                            "flex has-text-centered v-center " +
                            (idx + 1 <= 3 ? "has-text-weight-bold" : "")
                        }
                    >
                        #{idx + 1}
                    </div>
                ) : null}
                <div>
                    <UserMedia large={large} user={user} />
                </div>
            </div>
        ))}
    </div>
);

UserMediaList.propTypes = {
    users: PropTypes.object.isRequired
};

export default UserMediaList;
