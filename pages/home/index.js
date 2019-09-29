import React from "react";
import Page from "~/layouts/Page";
import { Link } from "~/routes";
import { GlobalStream } from "~/features/stream";
import Sidebar from "./Sidebar";
import "./index.scss";

export default () => (
    <div>
        <div className={"hero"}>
            <div className="ThumbnailCover" />
            <div className="ThumbnailGrid" />
            <div className={"container"}>
                <h2>Get things done with us.</h2>
                <h3>
                    Makerlog is the collaborative task log that helps over
                    2,000+ creators get things done.
                </h3>
                <div>
                    <Link to="/begin">Get started</Link>
                </div>
            </div>
        </div>
        <section className={"container"}>
            <div className="grid-c-s">
                <div>
                    <GlobalStream />
                </div>
                <div className={"sidebar"}>
                    <Sidebar />
                </div>
            </div>
        </section>
    </div>
);
