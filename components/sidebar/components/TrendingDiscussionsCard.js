import React from "react";
import TrendingDiscussionList from "~/features/discussions/TrendingDiscussionList";
import Emoji from "../../Emoji";

export default () => (
    <div className={"card"}>
        <div className={"card-content"}>
            <h3 className={"heading"}>
                <Emoji emoji="💬 " /> Trending discussions
            </h3>
            <TrendingDiscussionList />
        </div>
    </div>
);
