import React from "react";
import styled from "styled-components";
import {Avatar} from "~/features/users";
import "./FaceStack.scss";

const FaceStack = styled.div``;

export default ({ users, is = 24, limit = 5 }) => (
    <FaceStack className={"FaceStack"}>
        {users.slice(0, limit).map(u => (
            <Avatar is={is ? is : 24} user={u} withAura={false} />
        ))}
    </FaceStack>
);
