import React from "react";
import PropTypes from "prop-types";
import { UserMedia } from "~/features/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
                            "flex flex-column has-text-centered v-center " +
                            (idx + 1 <= 3 ? "has-text-weight-bold" : "")
                        }
                        style={{ justifyContent: "center" }}
                    >
                        {user.rising_change && user.rising_change === "up" ? (
                            <div style={{ lineHeight: 0 }}>
                                <FontAwesomeIcon
                                    color="var(--c-up)"
                                    icon="caret-up"
                                />
                            </div>
                        ) : null}
                        {user.rising_change && user.rising_change === "down" ? (
                            <div style={{ lineHeight: 0 }}>
                                <FontAwesomeIcon
                                    color="var(--c-down)"
                                    icon="caret-down"
                                />
                            </div>
                        ) : null}
                        <div>#{idx + 1}</div>
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
