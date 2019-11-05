import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FullName from "../FullName";
import Tda from "~/components/Tda";
import Streak from "~/components/Streak";
import Emoji from "~/components/Emoji";
import SocialMediaLevel from "~/components/SocialMediaLevel";
import {getUserStats} from "~/lib/stats";

class UserHero extends React.Component {
    state = {
        stats: null,
        failed: false
    };

    componentDidMount() {
        this.loadStats();
    }

    loadStats = async () => {
        try {
            const stats = await getUserStats(this.props.user.id);
            this.setState({
                failed: false,
                stats: stats
            });
        } catch (e) {
            this.setState({
                failed: true
            });
        }
    };

    getHeaderCss = (heroBody = false) => {
        const header = this.props.user.header;
        if (header) {
            if (heroBody) return { backgroundColor: "rgba(0, 0, 0, 0.3)" };

            return {
                backgroundImage: `url(${header})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            };
        } else {
            return {};
        }
    };

    render() {
        const props = this.props;

        return (
            <section className="hero UserHero" style={this.getHeaderCss()}>
                <div className="hero-body" style={this.getHeaderCss(true)}>
                    <div className={"container"}>
                        <div className="UserHero-Media">
                            <div className={"flex"}>
                                <div
                                    className={
                                        "UserHero-Avatar is-hidden-mobile"
                                    }
                                >
                                    <img
                                        src={props.user.avatar}
                                        alt={props.user.username}
                                        style={{
                                            maxWidth: 150,
                                            maxHeight: 150,
                                            height: "auto",
                                            width: "100%"
                                        }}
                                    />
                                </div>
                                <div>
                                    {props.featured && (
                                        <strong>
                                            <Emoji emoji={"✨"} /> Featured user
                                        </strong>
                                    )}
                                    {props.user.verified && (
                                        <strong>
                                            <FontAwesomeIcon icon={"check"} />{" "}
                                            Verified
                                        </strong>
                                    )}
                                    <h3>
                                        <FullName user={props.user} />
                                    </h3>
                                    <h4>
                                        {props.user.description
                                            ? props.user.description
                                            : "I have no bio yet."}
                                    </h4>
                                    <SocialMediaLevel
                                        user={props.user}
                                        instagramUser={props.user.instagram}
                                        productHuntUser={
                                            props.user.product_hunt
                                        }
                                        telegramUser={props.user.telegram}
                                        twitterUser={props.user.twitter}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="UserHero-Stats is-hidden-mobile">
                            <div className={"flex has-text-centered"}>
                                <div>
                                    <p>Streak</p>
                                    <Streak days={props.user.streak} />
                                </div>
                                {this.state.stats &&
                                this.state.stats.praise_received ? (
                                    <div>
                                        <p>Praise</p>
                                        {this.state.stats.praise_received}
                                    </div>
                                ) : null}
                                <div>
                                    <p>Tasks/day</p>
                                    <Tda tda={props.user.week_tda} />
                                </div>
                                {this.state.stats &&
                                this.state.stats.done_today !== null ? (
                                    <div>
                                        <p>Done today</p>
                                        {this.state.stats.done_today}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

UserHero.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserHero;
