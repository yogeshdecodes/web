import React from "react";
import Emoji from "../../components/Emoji";

export default ({ user }) => {
    if (user.username === "schatzi") {
        return (
            <li>
                <Emoji emoji="🤪" /> <strong>Found a bad bug</strong>
            </li>
        );
    } else return null;
};
