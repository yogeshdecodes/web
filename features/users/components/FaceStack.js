import React from "react";
import Avatar from "~/features/users/components/Avatar";
import "./FaceStack.scss";

const FaceStack = ({ users, is = 24, limit = 5 }) => (
    <div className={"FaceStack"}>
        {users.slice(0, limit).map(u => (
            <Avatar key={u.id} is={is ? is : 24} user={u} withAura={false} />
        ))}
    </div>
);

export default FaceStack;
