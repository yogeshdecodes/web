import React from "react";
import GlobalStream, { prefetch as prefetchStream } from "~/features/stream/containers/GlobalStream";
import ExploreSidebar, { prefetchData } from "~/components/sidebar/explore";
import "./index.scss";
import { requireUnauthed } from "~/lib/auth";
import DiscussionSection, { prefetchData as prefetchThreads } from "~/features/discussions/DiscussionSection";
import HomeHero from "../../components/marketing/HomeHero";

function Home(props) {
    return (
        <div className="HomePage">
            <section className={"container"}>
                <div className="grid-c-s">
                    <div>
                        <div className="mbGap">
                            <HomeHero />
                        </div>
                        <h3>Top threads this week</h3>
                        <h4 className="subtitle has-text-grey mb-em">
                            Discuss indie hacking and help other makers in their
                            journey!
                        </h4>
                        <div className="card">
                            <div className="card-content">
                                <DiscussionSection
                                    top
                                    {...props.discussionPrefetch}
                                />
                            </div>
                        </div>
                        <h3>Today's log</h3>
                        <h4 className="subtitle has-text-grey mb-em">
                            Here's what the community is building...
                        </h4>
                        <GlobalStream {...props.streamPrefetch} />
                    </div>
                    <div className={"sidebar"}>
                        <ExploreSidebar data={props.data} />
                    </div>
                </div>
            </section>
        </div>
    );
}

Home.getInitialProps = async () => {
    return {
        ...(await prefetchData()),
        streamPrefetch: await prefetchStream(),
        discussionPrefetch: await prefetchThreads(true)
    };
};

export default requireUnauthed(Home);
