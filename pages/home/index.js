import React from "react";
import { Link } from "~/routes";
import { GlobalStream } from "~/features/stream";
import HomeSidebar from "../../components/sidebar/HomeSidebar";
import "./index.scss";
import { requireUnauthed } from "~/lib/auth";

export default requireUnauthed(() => (
    <div className="HomePage">
        <div className={"hero"}>
            <div className="ThumbnailCover" />
            <div className="ThumbnailGrid" />
            <div className={"container"}>
                <h2>Get things done with us.</h2>
                <h3>
                    Makerlog is the collaborative task log that helps over
                    4,000+ creators get things done.
                </h3>
                <div>
                    <Link route="begin">Get started</Link>
                </div>
            </div>
        </div>
        <section className={"container"}>
            <div className="grid-c-s">
                <div>
                    <GlobalStream />
                </div>
                <div className={"sidebar"}>
                    <HomeSidebar />
                </div>
            </div>
        </section>
    </div>
));
