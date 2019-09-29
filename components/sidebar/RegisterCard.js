import React from "react";
import Emoji from "../Emoji";
import { Link } from "~/routes";

export default () => (
    <div className={"card"}>
        <div className={"card-content"}>
            <h3 className={"heading"}>
                <Emoji emoji="👋" /> Welcome, guest
            </h3>
            Join Makerlog to post tasks, share your work, and meet fellow
            makers.
            <p>
                <Link className={"btn-primary"} to={"/begin"}>
                    Get started &raquo;
                </Link>
            </p>
        </div>
    </div>
);
