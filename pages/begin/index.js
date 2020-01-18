import React from "react";
import "./index.scss";
import { AuthModalCard } from "../../features/users/components/AuthModal";
import { requireUnauthed } from "~/lib/auth";
import RegisterForm from "~/features/users/components/RegisterForm";
import { TwitterTweetEmbed, TwitterTimelineEmbed } from "react-twitter-embed";
import Spinner from "~/components/Spinner";
import WallOfLove from "../../components/WallOfLove";

function getLoveTweetId() {
    const strs = [
        "1213503558227595266",
        "1213510774821441536",
        "1213509362611826688",
        "1208132962690224128",
        "1207689746517872641",
        //"1207688319456415745",
        "1213597639159275521"
    ];
    var randomIndex = Math.floor(Math.random() * strs.length);
    return strs[randomIndex];
}

class RegisterPage extends React.Component {
    static async getInitialProps({ query }) {
        const layout = { className: "RegisterPage" };

        return { layout, query };
    }

    render() {
        return (
            <>
                <div className="form-section">
                    <div className="container">
                        <div className="form-card">
                            <div className="card">
                                <div className="card-content">
                                    <RegisterForm {...this.props.query} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pitch">
                    <div className="container">
                        <center>
                            <h2>Still not convinced?</h2>
                            <h3 className="subtitle">
                                Here's what the community is saying about
                                Makerlog...{" "}
                            </h3>
                        </center>
                        <WallOfLove />
                    </div>
                </div>

                <div className="bottom-cta">
                    <center>
                        <h2>What are you waiting for?</h2>
                        <a href="#main-navbar" className="btn-primary btn-xl">
                            Get started
                        </a>
                    </center>
                </div>
            </>
        );
    }
}

export default requireUnauthed(RegisterPage);
