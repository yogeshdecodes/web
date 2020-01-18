import React, { Component } from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import Spinner from "~/components/Spinner";
import "./index.scss";

/*
<TwitterTweetEmbed
    options={{ conversation: "none" }}
    tweetId={getLoveTweetId()}
    placeholder={
        <div className="card">
        <div className="card-content">
        <Spinner color="white" small />
        </div>
        </div>
    }
/>
*/

const Tweet = ({ id }) => (
    <TwitterTweetEmbed
        options={{ conversation: "none" }}
        tweetId={id}
        placeholder={
            <div className="card">
                <div className="card-content">
                    <Spinner small />
                </div>
            </div>
        }
    />
);

export default class WallOfLove extends Component {
    render() {
        return (
            <section id="wall-of-love">
                <div>
                    <Tweet id={"1126918454676561920"} />
                </div>
                <div>
                    <Tweet id={"1126890085901844485"} />
                </div>
                <div>
                    <Tweet id={"1126890046408278016"} />
                </div>
                <div>
                    <Tweet id={"1126928446557499392"} />
                </div>
                <div>
                    <Tweet id={"1126895968010539008"} />
                </div>
                <div>
                    <Tweet id={"1102240619903307777"} />
                </div>
                <div>
                    <Tweet id={"1126888924687863808"} />
                </div>
                <div>
                    <Tweet id={"1084009233593450496"} />
                </div>
                <div>
                    <Tweet id={"1056781294640582657"} />
                </div>
                <div>
                    <Tweet id={"1126889825284567040"} />
                </div>
                <div>
                    <Tweet id={"1126888933663444992"} />
                </div>
                <div>
                    <Tweet id={"1126889745219559424"} />
                </div>
                <div>
                    <Tweet id={"1126908356206186497"} />
                </div>
                <div>
                    <Tweet id={"1126903221694476288"} />
                </div>
            </section>
        );
    }
}
