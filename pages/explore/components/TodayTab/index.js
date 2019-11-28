import React from "react";
import LoggedOutMessage from "~/components/LoggedOutMessage";

import { GlobalStream } from "~/features/stream";
import Sidebar from "~/pages/home/Sidebar";
import "./index.scss";

const TodayTab = props => (
    <section className={"container TodayTab"}>
        <LoggedOutMessage />
        <div className={"columns"}>
            <div className={"column"}>
                <GlobalStream />
            </div>
            <div
                className={"column sidebar is-hidden-mobile"}
                style={{ marginTop: 54 }}
            >
                <Sidebar />
            </div>
        </div>
    </section>
);

TodayTab.propTypes = {};

export default TodayTab;
