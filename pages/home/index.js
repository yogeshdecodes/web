import React from "react";
import { Link } from "~/routes";
import { GlobalStream } from "~/features/stream";
import ExploreSidebar, { prefetchData } from "~/components/sidebar/explore";
import "./index.scss";
import { requireUnauthed } from "~/lib/auth";
import GetStartedLink from "~/components/GetStartedLink";

function Home(props) {
    return (
        <div className="HomePage">
            <section className={"container"}>
                <div className="grid-c-s">
                    <div>
                        <GlobalStream />
                    </div>
                    <div className={"sidebar"}>
                        <ExploreSidebar data={props.data} />
                    </div>
                </div>
            </section>
        </div>
    );
}

Home.getInitialProps = prefetchData;

export default requireUnauthed(Home);
