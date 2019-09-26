import React from "react";
import Avatar from "./Avatar/index";
import { Link } from "react-router-dom";
import "./UserRow.scss";
import Streak from "../../../components/Streak";

export const UserRow = ({ users }) => {
    return users ? (
        <div className={"grid-thumbnails"}>
            {users.map(u => (
                <div key={u.id}>
                    <Link to={`/@${u.username}`}>
                        <Avatar user={u} is={48} />
                        <span className={"streak"}>
                            <Streak days={u.streak} />
                        </span>
                    </Link>
                </div>
            ))}
        </div>
    ) : null;
};

export default UserRow;
