import React from "react";
import ExploreSidebar, { prefetchData } from "~/components/sidebar/explore";
import "./index.scss";
import { requireUnauthed } from "~/lib/auth";
import DiscussionSection, {
    prefetchData as prefetchThreads
} from "~/features/discussions/DiscussionSection";
import KeyActivityFeed, {
    prefetchActivity
} from "../../features/feeds/KeyActivityFeed";
import { Link } from "~/routes";

function Home(props) {
    return (
        <div className="HomePage">
            <section className={"container"}>
                <div className="grid-c-s">
                    <div>
                        <div className="mbGap">
                            <div className="HomeHero hero">
                                <h1>Home of the maker community</h1>
                                <h3 className="subtitle mb-em">
                                    Makerlog is where 5,000+ indie hackers &
                                    makers get things done together.
                                </h3>
                                <Link route={"start"}>
                                    <a>Get started</a>
                                </Link>
                            </div>
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
                        <KeyActivityFeed userId={-1} feed="timeline" />
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
        layout: {
            footer: false
        },
        ...(await prefetchData()),
        discussionPrefetch: await prefetchThreads(true)
    };
};

export default requireUnauthed(Home);
