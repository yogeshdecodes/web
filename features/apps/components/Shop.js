import React from "react";
import AppList from "./AppList";
import IntegrationMedia from "./IntegrationMedia";

/*

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
                            <h3></h3>
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

*/

const Shop = props => {
    return (
        <>
            <div className={"flex col-right v-center mbGap"}>
                <div>
                    <h2>Featured community integrations</h2>
                    <p>Makerlog has an awesome bunch of devs!</p>
                </div>
            </div>
            <div className="card">
                <div className="card-content">
                    <IntegrationMedia
                        name="Makerlog Menubar"
                        description="A super fast menubar app for macOS."
                        outboundUrl="https://menubar.getmakerlog.com/"
                        icon="https://ik.imagekit.io/makerlog/media/uploads/2019/09/18/twitter.png"
                    />
                    <IntegrationMedia
                        name="Today for Makerlog"
                        description="A simple task manager for Makerlog."
                        icon="https://today.jipfr.nl/apple-touch-icon.png"
                        outboundUrl="https://today.jipfr.nl/"
                    />
                    <IntegrationMedia
                        name="Makerlog CLI"
                        description="Log straight from Terminal. It's seamless."
                        icon="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/terminal-icon.png"
                        outboundUrl="https://github.com/MihaiVoinea/makerlog-cli/"
                    />
                    <IntegrationMedia
                        name="Logger for Makerlog"
                        description="An unofficial mobile app for Makerlog"
                        icon="https://lh3.googleusercontent.com/252TmJBOGuK9gNiubt1D0Q0VgqczU36LaEq-1JFBIL-d_D0wwBYdUOaYZfNUOW9w6Mg=s180-rw"
                        outboundUrl="https://play.google.com/store/apps/details?id=com.brownfingers.getmakerlog"
                    />
                    <IntegrationMedia
                        name="Alfred Workflow for Makerlog"
                        description="A simple Alfred workflow for Makerlog."
                        icon="https://www.alfredapp.com/media/logo4.png"
                        outboundUrl="https://github.com/meSingh/alfred-makerlog"
                    />
                    <IntegrationMedia
                        name="BuyMeACoffee for Makerlog"
                        description="A simple BMC integration for Makerlog."
                        icon="https://buymeacoffee.netlify.com/assets/coffeebot.png"
                        outboundUrl="https://buymeacoffee.netlify.com/"
                    />
                </div>
            </div>
            <div className={"flex col-right v-center mbGap"}>
                <div>
                    <h2>Official integrations</h2>
                    <p>We also make some awesome first-party ones too!</p>
                </div>
            </div>
            <div className="card">
                <div className="card-content">
                    <AppList />
                </div>
            </div>
        </>
    );
};

export default Shop;
