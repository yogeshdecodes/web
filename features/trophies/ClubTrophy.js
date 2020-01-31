import React, { Component } from "react";
import Emoji from "../../components/Emoji";

const MANGO_CLUB = ["fajarsiddiq"];

export default ({ user }) => {
    if (user.streak === 0) return null;

    switch (true) {
        case MANGO_CLUB.includes(user.username):
            return (
                <li>
                    <Emoji emoji="🥭" /> Mango Club
                </li>
            );

        case user.streak >= 365:
            return (
                <li>
                    <Emoji emoji="🏆" /> 1 Year Club
                </li>
            );

        case user.streak >= 100:
            return (
                <li>
                    <Emoji emoji="💯" /> 100 Day Club
                </li>
            );

        case user.streak >= 50:
            return (
                <li>
                    <Emoji emoji="😏" /> 50 Day Club
                </li>
            );

        case user.streak >= 30:
            return (
                <li>
                    <Emoji emoji="📅" /> 1 Month Club
                </li>
            );

        case user.streak >= 10:
            return (
                <li>
                    <Emoji emoji="🐥" /> 10 Day Club
                </li>
            );

        default:
            return null;
    }
};
