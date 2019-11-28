import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Emoji from "~/components/Emoji";
import AppList from "./AppList";
import { Link } from "~/routes";

const Shop = props => {
    return (
        <div className={"AppsPage"}>
            <div className={"hero dark PageHero"}>
                <div className={"container"}>
                    <div>
                        <h2>Apps for Makerlog</h2>
                        <h3>
                            Integrations, apps, community creations, and more!
                        </h3>
                    </div>
                </div>
            </div>

            <section className={"container grid-apps"}>
                <div className={"AppHero"}>
                    <div className={"flex"}>
                        <div>
                            <h3 className={"heading"}>
                                <FontAwesomeIcon icon={["far", "star"]} />{" "}
                                Featured app
                            </h3>
                            <h2>Logger for Makerlog</h2>
                            <h3>
                                The unofficial Makerlog client for Android, by
                                maker{" "}
                                <Link
                                    route="profile-page"
                                    params={{ username: "arnav" }}
                                >
                                    <a>Arnav Puri</a>
                                </Link>
                                .
                            </h3>
                            <div>
                                <a href="https://play.google.com/store/apps/details?id=com.brownfingers.getmakerlog">
                                    <img
                                        alt={"Play Store"}
                                        style={{ height: 40 }}
                                        src="/assets/img/play-store.png"
                                    />
                                </a>
                            </div>
                        </div>
                        <div>
                            <img
                                className="is-hidden-mobile"
                                style={{ height: 200 }}
                                alt="app screenshot"
                                src="/assets/img/makerlog-app.png"
                            />
                        </div>
                    </div>
                </div>

                <div className={"card MenubarCard"}>
                    <div className={"card-content"}>
                        <h2 className="has-text-white">Makerlog Menubar</h2>
                        <h3 className="has-text-white">
                            A super fast menubar app for macOS.
                        </h3>
                        <a
                            href="https://menubar.getmakerlog.com/"
                            className="btn-light"
                        >
                            Get it now
                        </a>
                    </div>
                </div>

                <div className="card GoogleAssistantCard">
                    <div className={"card-content flex"}>
                        <div>
                            <h2>Makerlog for Google Assistant</h2>
                            <h3>Productivity right from your assistant.</h3>
                            <a
                                href="https://assistant.getmakerlog.com/"
                                className="btn-light"
                            >
                                Get it now
                            </a>
                        </div>
                        <div>
                            <img
                                src={"/assets/img/google-assistant.png"}
                                width={80}
                                alt={"Google Assistant"}
                            />
                        </div>
                    </div>
                </div>

                <div className="card TodayForMakerlogCard">
                    <div className={"card-content flex"}>
                        <div>
                            <h2>Today for Makerlog</h2>
                            <h3>A simple task manager for Makerlog.</h3>
                            <a
                                href="https://today.jipfr.nl/"
                                className="btn-light"
                            >
                                Get it now
                            </a>
                        </div>
                        <div>
                            <img
                                src={
                                    "https://today.jipfr.nl/apple-touch-icon.png"
                                }
                                width={80}
                                alt={"Today logo"}
                            />
                        </div>
                    </div>
                </div>

                <div className="card MakerlogSearchCard">
                    <div className={"card-content flex"}>
                        <div>
                            <h2>Makerlog CLI</h2>
                            <h3>Log straight from Terminal. It's seamless.</h3>
                            <a
                                href="https://github.com/MihaiVoinea/makerlog-cli/"
                                className="btn-light"
                            >
                                Get it now
                            </a>
                        </div>
                        <div>
                            <Emoji emoji={"🖥"} />
                        </div>
                    </div>
                </div>

                {
                    // Begin official integrations
                }

                <AppList />
            </section>
        </div>
    );
};

export default Shop;
