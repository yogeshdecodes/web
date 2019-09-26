import React from "react";
import Emoji from "./Emoji";

export default ({ withEmoji = true }) => {
    let greeting = "Hello";
    let emoji = <Emoji emoji={"👋"} />;
    var today = new Date();
    var curHr = today.getHours();

    if (curHr < 12) {
        emoji = <Emoji emoji={"☀️️"} />;
        greeting = "Good morning";
    } else if (curHr < 18) {
        emoji = <Emoji emoji={"🌻"} />;
        greeting = "Good afternoon";
    } else {
        emoji = <Emoji emoji={"🌙"} />;
        greeting = "Good evening";
    }

    return (
        <>
            {withEmoji && emoji} {greeting}
        </>
    );
};
