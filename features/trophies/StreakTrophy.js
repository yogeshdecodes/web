import React, { Component } from "react";
import Streak from "~/components/Streak";
import Emoji from "../../components/Emoji";

export default ({ user }) => {
    if (user.streak === 0)
        return (
            <li>
                <strong>
                    <Emoji emoji="😔" /> 0 day streak
                </strong>
            </li>
        );

    return (
        <li>
            <strong>
                <Streak days={user.streak} /> day streak
            </strong>
        </li>
    );
};
