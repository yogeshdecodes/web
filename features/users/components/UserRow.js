import React from "react";
import Avatar from "./Avatar/index";
import {Link} from "~/routes";
import "./UserRow.scss";
import Streak from "../../../components/Streak";

export const UserRow = ({ users }) => {
    return users ? (
        <div className={"grid-thumbnails"}>
            {users.map(u => (
                <div key={u.id}>
                    <Link
                        route="profile-page"
                        params={{ username: u.username }}
                    >
                        <span>
                            <Avatar user={u} is={48} />
                            <span className={"streak"}>
                                <Streak days={u.streak} />
                            </span>
                        </span>
                    </Link>
                </div>
            ))}
        </div>
    ) : null;
};

export default UserRow;
