import React, { Component } from "react";
import Streak from "~/components/Streak";
import Emoji from "../../components/Emoji";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default ({ user }) => {
    if (user.is_staff) {
        return (
            <li>
                <span className="is-brand-green">
                    <FontAwesomeIcon color="" icon="check-circle" />
                </span>{" "}
                <strong>Staff</strong>
            </li>
        );
    } else if (user.verified) {
        return (
            <li>
                <Emoji emoji="✅" /> <strong>Verified</strong>
            </li>
        );
    } else return null;
};
