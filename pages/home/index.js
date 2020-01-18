import React from "react";
import { Link } from "~/routes";
import { GlobalStream } from "~/features/stream";
import HomeSidebar from "../../components/sidebar/HomeSidebar";
import "./index.scss";
import { requireUnauthed } from "~/lib/auth";
import GetStartedLink from "~/components/GetStartedLink";

export default requireUnauthed(() => (
    <div className="HomePage">
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
