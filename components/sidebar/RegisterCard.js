import React from "react";
import Emoji from "../Emoji";
import { Link } from "~/routes";

export default () => (
    <div className={"card"}>
        <div className={"card-content"}>
            <p className={"heading"}>
                <Emoji emoji="👋" /> Welcome, guest
            </p>
            Join Makerlog to post tasks, share your work, and meet fellow
            makers.
            <Link route="begin">
                <a className={"btn-primary"}>Get started</a>
            </Link>
        </div>
    </div>
);
