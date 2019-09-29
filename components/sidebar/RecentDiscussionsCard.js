import React from "react";
import Emoji from "../Emoji";
import { RecentDiscussionList } from "~/features/discussions";

export default () => (
    <div className={"card"}>
        <div className={"card-content"}>
            <h3 className={"heading mt0"}>
                <Emoji emoji="💬 " /> Recent discussions
            </h3>
            <RecentDiscussionList />
        </div>
    </div>
);
