import React from "react";
import Emoji from "../../components/Emoji";

export default ({ user }) => {
    if (user.username === "schatzi" || user.username == "kpavlovsky_pro") {
        return (
            <li>
                <Emoji emoji="🤪" /> <strong>Found a bad bug</strong>
            </li>
        );
    } else return null;
};
