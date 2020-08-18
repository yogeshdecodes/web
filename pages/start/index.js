import React, { Component } from "react";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Emoji from "~/components/Emoji";
import WallOfLove from "../../components/WallOfLove";
import config from "../../config";
import FaceStack from "~/features/users/components/FaceStack";
import { requireUnauthed } from "~/lib/auth";

class RegisterForm extends React.Component {
    render() {
        return (
            <div className="RegisterForm">
                <div className="flex flex-column flex-v-gap-half">
                    <div>
                        <a
                            href={`${config.API_URL}/login/twitter/`}
                            className="btn btn-lg btn-twitter"
                        >
                            <FontAwesomeIcon icon={["fab", "twitter"]} /> Sign
                            in with Twitter
                        </a>
                    </div>
                    <div>
                        <a
                            href={`${config.API_URL}/login/facebook/`}
                            className="btn btn-lg btn-facebook"
                        >
                            <FontAwesomeIcon icon={["fab", "facebook"]} /> Sign
                            in with Facebook
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

class StartPage extends Component {
    static async getInitialProps({ query }) {
        const layout = { className: "StartPage" };
        let preflight = null;
        try {
            //preflight = await getPreflightConfig();
        } catch (e) {
            console.log(e);
        }
        return { layout, query, preflight };
    }

    render() {
        return (
            <div>
                <div className="FullHeightOnboarding">
                    <div className="bg-container">
                        <div className="actionable-section-bg"></div>
                        <div className="copy-section-bg"></div>
                    </div>
                    <div className="container dual-column">
                        <div>
                            <div>
                                <h1>Get started</h1>
                                <p className="mb-em">
                                    Let's start your maker journey now.
                                </p>
                                <RegisterForm />
                            </div>
                        </div>
                        <div>
                            <div className="card RegisterCard">
                                <div className="card-content flex flex-gap">
                                    <div className="register-copy">
                                        <h3>
                                            It's never too late to get started.
                                        </h3>
                                        <FaceStack
                                            is={32}
                                            limit={6}
                                            users={[
                                                {
                                                    id: 750,
                                                    username: "basilesamel",
                                                    first_name: "Basile",
                                                    last_name: "Samel",
                                                    status:
                                                        "making #200wordsaday",
                                                    description:
                                                        "writing/making/coding shokunin",
                                                    verified: false,
                                                    private: false,
                                                    avatar:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/03/02/pp2.jpg",
                                                    streak: 603,
                                                    timezone: "Europe/Paris",
                                                    week_tda: 5,
                                                    twitter_handle:
                                                        "BasileSamel",
                                                    instagram_handle:
                                                        "BasileSamel",
                                                    product_hunt_handle:
                                                        "bsamel",
                                                    github_handle:
                                                        "BasileSamel",
                                                    telegram_handle:
                                                        "BasileSamel",
                                                    nomadlist_handle: "",
                                                    bmc_handle: "BasileSamel",
                                                    header:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/headers/2020/01/06/81395045_10221987034213483_7386071403713265664_o.jpg",
                                                    is_staff: false,
                                                    donor: false,
                                                    shipstreams_handle: "",
                                                    website:
                                                        "https://basilesamel.com",
                                                    tester: false,
                                                    is_live: false,
                                                    digest: true,
                                                    gold: true,
                                                    accent: "#47E0A0",
                                                    maker_score: 1812,
                                                    dark_mode: true,
                                                    weekends_off: false,
                                                    hardcore_mode: true,
                                                    email_notifications: true,
                                                    og_image:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/07/95c35604-e000-4864-b4bd-fcc805821c5d.jpg"
                                                },
                                                {
                                                    id: 495,
                                                    username: "jasonleow",
                                                    first_name: "Jason",
                                                    last_name: "Leow",
                                                    status: null,
                                                    description:
                                                        "design + public good + indie maker + mindfulness",
                                                    verified: false,
                                                    private: false,
                                                    avatar:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/avatars/2018/11/23/A94B66C0-E66C-4440-BAFF-BB568FF04604.jpeg",
                                                    streak: 575,
                                                    timezone: "Asia/Singapore",
                                                    week_tda: 2,
                                                    twitter_handle:
                                                        "jasonleowsg",
                                                    instagram_handle:
                                                        "jasonleow",
                                                    product_hunt_handle:
                                                        "jasonleowsg",
                                                    github_handle: "",
                                                    telegram_handle: "",
                                                    nomadlist_handle: "",
                                                    bmc_handle: "jasonleowsg",
                                                    header:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/headers/2019/01/13/Teal_Love.jpg",
                                                    is_staff: false,
                                                    donor: false,
                                                    shipstreams_handle: "",
                                                    website:
                                                        "https://sweetjamsites.com",
                                                    tester: false,
                                                    is_live: false,
                                                    digest: false,
                                                    gold: false,
                                                    accent: "#47E0A0",
                                                    maker_score: 1226,
                                                    dark_mode: false,
                                                    weekends_off: false,
                                                    hardcore_mode: false,
                                                    email_notifications: true,
                                                    og_image:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/07/55d3abfa-971c-486c-ac45-409508a6f71a.jpg"
                                                },
                                                {
                                                    id: 720,
                                                    username: "helengriffinjr",
                                                    first_name: "Helen",
                                                    last_name: "",
                                                    status: null,
                                                    description:
                                                        "Warrior Goddess for awesome developers.",
                                                    verified: false,
                                                    private: false,
                                                    avatar:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/avatars/2018/10/30/helen_rYjl9Iu.jpg",
                                                    streak: 561,
                                                    timezone:
                                                        "America/New_York",
                                                    week_tda: 3,
                                                    twitter_handle:
                                                        "helengriffinjr",
                                                    instagram_handle:
                                                        "helengriffinjr",
                                                    product_hunt_handle:
                                                        "helengriffinjr",
                                                    github_handle:
                                                        "helengriffinjr",
                                                    telegram_handle: "",
                                                    nomadlist_handle: "",
                                                    bmc_handle:
                                                        "helengriffinjr",
                                                    header: null,
                                                    is_staff: false,
                                                    donor: false,
                                                    shipstreams_handle:
                                                        "helengriffinjr",
                                                    website:
                                                        "http://jovial.is/",
                                                    tester: false,
                                                    is_live: false,
                                                    digest: true,
                                                    gold: false,
                                                    accent: "#47E0A0",
                                                    maker_score: 1491,
                                                    dark_mode: false,
                                                    weekends_off: false,
                                                    hardcore_mode: false,
                                                    email_notifications: true,
                                                    og_image:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/07/d1a472bf-7449-4516-95a5-84fd6ac14dc9.jpg"
                                                },
                                                {
                                                    id: 834,
                                                    username: "jip",
                                                    first_name: "Jip",
                                                    last_name: "Fr",
                                                    status:
                                                        "making a new mvlist",
                                                    description: "133 jumps",
                                                    verified: false,
                                                    private: false,
                                                    avatar:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/avatars/2019/01/11/844C712E-9153-4D00-943B-D3E24F75BCCE_Tno9ivx.jpeg",
                                                    streak: 552,
                                                    timezone:
                                                        "Europe/Amsterdam",
                                                    week_tda: 3,
                                                    twitter_handle: "JipFr",
                                                    instagram_handle:
                                                        "jipprogamer2006",
                                                    product_hunt_handle:
                                                        "jipfr",
                                                    github_handle: "JipFr",
                                                    telegram_handle:
                                                        "CommandCoder",
                                                    nomadlist_handle: null,
                                                    bmc_handle: "",
                                                    header:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/headers/2019/11/08/4869468F-7F56-42C2-A0A1-C85A5AAD162A.jpeg",
                                                    is_staff: false,
                                                    donor: true,
                                                    shipstreams_handle: "jipfr",
                                                    website: "https://jipfr.nl",
                                                    tester: false,
                                                    is_live: false,
                                                    digest: false,
                                                    gold: true,
                                                    accent: "#457461",
                                                    maker_score: 1997,
                                                    dark_mode: false,
                                                    weekends_off: false,
                                                    hardcore_mode: false,
                                                    email_notifications: false,
                                                    og_image:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/07/e0c2c285-ae17-4e67-b5c0-11564dc31e68.jpg"
                                                },
                                                {
                                                    id: 892,
                                                    username: "dehenne",
                                                    first_name: "Obi Hen",
                                                    last_name: "Kenobi",
                                                    status: null,
                                                    description: "Devpreneur",
                                                    verified: false,
                                                    private: false,
                                                    avatar:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/02/24/Q_super.png",
                                                    streak: 543,
                                                    timezone: "Europe/Berlin",
                                                    week_tda: 14,
                                                    twitter_handle: "de_henne",
                                                    instagram_handle: "",
                                                    product_hunt_handle:
                                                        "de_henne",
                                                    github_handle: "dehenne",
                                                    telegram_handle: "",
                                                    nomadlist_handle: "",
                                                    bmc_handle: "quiqqer",
                                                    header:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/headers/2019/02/01/ai-artificial-intelligence-automation-makerlog.jpg",
                                                    is_staff: false,
                                                    donor: false,
                                                    shipstreams_handle: "",
                                                    website:
                                                        "https://github.com/dehenne/dehenne",
                                                    tester: false,
                                                    is_live: false,
                                                    digest: true,
                                                    gold: false,
                                                    accent: "#47E0A0",
                                                    maker_score: 2808,
                                                    dark_mode: false,
                                                    weekends_off: false,
                                                    hardcore_mode: false,
                                                    email_notifications: true,
                                                    og_image:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/07/55317115-a37e-4204-adca-1795b75baf24.jpg"
                                                },
                                                {
                                                    id: 1719,
                                                    username: "saud",
                                                    first_name: "saud",
                                                    last_name: "",
                                                    status: null,
                                                    description:
                                                        "I make to learn!",
                                                    verified: false,
                                                    private: false,
                                                    avatar:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/avatars/2019/01/14/saud.png",
                                                    streak: 535,
                                                    timezone: "Asia/Riyadh",
                                                    week_tda: 1,
                                                    twitter_handle: "samaphp",
                                                    instagram_handle: "",
                                                    product_hunt_handle: "",
                                                    github_handle: "samaphp",
                                                    telegram_handle: "",
                                                    nomadlist_handle: null,
                                                    bmc_handle: "",
                                                    header:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/headers/2019/02/22/code-wallpaper-2.jpg",
                                                    is_staff: false,
                                                    donor: false,
                                                    shipstreams_handle: "",
                                                    website:
                                                        "https://samaphp.com",
                                                    tester: false,
                                                    is_live: false,
                                                    digest: true,
                                                    gold: true,
                                                    accent: "#bce886",
                                                    maker_score: 1295,
                                                    dark_mode: true,
                                                    weekends_off: false,
                                                    hardcore_mode: false,
                                                    email_notifications: true,
                                                    og_image:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/07/1b121f30-3c2b-45b4-9208-2b5ce015dedb.jpg"
                                                },
                                                {
                                                    id: 1544,
                                                    username: "greg",
                                                    first_name: "Subculture",
                                                    last_name: "Laboratories",
                                                    status: null,
                                                    description: "",
                                                    verified: false,
                                                    private: false,
                                                    avatar:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/03/24/Frame_1_1.png",
                                                    streak: 520,
                                                    timezone: "Europe/London",
                                                    week_tda: 1,
                                                    twitter_handle: "sub_labs",
                                                    instagram_handle: "",
                                                    product_hunt_handle: "",
                                                    github_handle: "",
                                                    telegram_handle: "",
                                                    nomadlist_handle: "",
                                                    bmc_handle: "",
                                                    header:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/headers/2020/03/03/5de2c8395f17628a2a33be30_Jacuzzi_copy.jpg",
                                                    is_staff: false,
                                                    donor: false,
                                                    shipstreams_handle: "",
                                                    website:
                                                        "https://twitter.com/sub_labs",
                                                    tester: false,
                                                    is_live: false,
                                                    digest: true,
                                                    gold: false,
                                                    accent: "#47E0A0",
                                                    maker_score: 1665,
                                                    dark_mode: false,
                                                    weekends_off: false,
                                                    hardcore_mode: true,
                                                    email_notifications: true,
                                                    og_image:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/07/0a994a49-f797-4b2a-9881-ee568fb03836.jpg"
                                                },
                                                {
                                                    id: 312,
                                                    username: "napoleon039",
                                                    first_name: "Nihar",
                                                    last_name: "Raote",
                                                    status: null,
                                                    description:
                                                        "Front-end web developer",
                                                    verified: false,
                                                    private: false,
                                                    avatar:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/avatars/2018/12/02/You_Can_Do_It.png",
                                                    streak: 493,
                                                    timezone: "Asia/Kolkata",
                                                    week_tda: 3,
                                                    twitter_handle:
                                                        "NAPOLEON_COC",
                                                    instagram_handle: "",
                                                    product_hunt_handle: "",
                                                    github_handle:
                                                        "NAPOLEON039",
                                                    telegram_handle: "",
                                                    nomadlist_handle: null,
                                                    bmc_handle: null,
                                                    header: null,
                                                    is_staff: false,
                                                    donor: false,
                                                    shipstreams_handle: null,
                                                    website: null,
                                                    tester: true,
                                                    is_live: false,
                                                    digest: true,
                                                    gold: false,
                                                    accent: "#47E0A0",
                                                    maker_score: 1271,
                                                    dark_mode: false,
                                                    weekends_off: false,
                                                    hardcore_mode: false,
                                                    email_notifications: true,
                                                    og_image:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/07/84190867-eee9-4752-a81e-75bf81ee8339.jpg"
                                                },
                                                {
                                                    id: 1684,
                                                    username: "josephmxm",
                                                    first_name: "Joseph",
                                                    last_name: "Maxim",
                                                    status: null,
                                                    description:
                                                        "Full stack dev & trader",
                                                    verified: false,
                                                    private: false,
                                                    avatar:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/05/03/profile.jpg",
                                                    streak: 490,
                                                    timezone: "America/Toronto",
                                                    week_tda: 4,
                                                    twitter_handle: "josephmxm",
                                                    instagram_handle: "",
                                                    product_hunt_handle:
                                                        "josephmaxim",
                                                    github_handle:
                                                        "josephmaxim",
                                                    telegram_handle:
                                                        "josephmxm",
                                                    nomadlist_handle: "",
                                                    bmc_handle: "",
                                                    header:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/headers/2019/04/08/astronomy-backlit-constellation-1421903.jpg",
                                                    is_staff: false,
                                                    donor: false,
                                                    shipstreams_handle: "",
                                                    website:
                                                        "https://josephmaxim.com",
                                                    tester: false,
                                                    is_live: false,
                                                    digest: false,
                                                    gold: false,
                                                    accent: "#47E0A0",
                                                    maker_score: 1358,
                                                    dark_mode: false,
                                                    weekends_off: false,
                                                    hardcore_mode: false,
                                                    email_notifications: true,
                                                    og_image:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/07/a53ed5a6-9acb-4f5a-afb0-1ab097ece596.jpg"
                                                },
                                                {
                                                    id: 1387,
                                                    username: "fabiorosado",
                                                    first_name: "Fabio",
                                                    last_name: "Rosado",
                                                    status: null,
                                                    description:
                                                        "My time is divided between flying and coding",
                                                    verified: false,
                                                    private: false,
                                                    avatar:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/06/09/FabioRosado2.png",
                                                    streak: 481,
                                                    timezone: "Europe/London",
                                                    week_tda: 2,
                                                    twitter_handle:
                                                        "FabioRosado_",
                                                    instagram_handle:
                                                        "FabioRosado",
                                                    product_hunt_handle:
                                                        "FabioRosado",
                                                    github_handle:
                                                        "FabioRosado",
                                                    telegram_handle:
                                                        "FabioRosado",
                                                    nomadlist_handle: "",
                                                    bmc_handle: "FabioRosado",
                                                    header: null,
                                                    is_staff: false,
                                                    donor: false,
                                                    shipstreams_handle:
                                                        "TheFlyingDev",
                                                    website:
                                                        "https://fabiorosado.dev",
                                                    tester: false,
                                                    is_live: false,
                                                    digest: true,
                                                    gold: false,
                                                    accent: "#f78f05",
                                                    maker_score: 1577,
                                                    dark_mode: true,
                                                    weekends_off: false,
                                                    hardcore_mode: false,
                                                    email_notifications: true,
                                                    og_image:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/07/a0d6a927-610d-47d8-b523-3f476ff9d793.jpg"
                                                },
                                                {
                                                    id: 2489,
                                                    username: "efran",
                                                    first_name: "Emil",
                                                    last_name: "",
                                                    status: null,
                                                    description:
                                                        "make and shake https://nocodemag.com/",
                                                    verified: false,
                                                    private: false,
                                                    avatar:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/01/25/profilePic.jpg",
                                                    streak: 452,
                                                    timezone: "Europe/Prague",
                                                    week_tda: 1,
                                                    twitter_handle:
                                                        "EfranMakes",
                                                    instagram_handle: "",
                                                    product_hunt_handle: "",
                                                    github_handle: "",
                                                    telegram_handle: "",
                                                    nomadlist_handle: "",
                                                    bmc_handle: "",
                                                    header:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/headers/2019/07/16/Twitter-banner-nocodemag.png",
                                                    is_staff: false,
                                                    donor: false,
                                                    shipstreams_handle: "",
                                                    website:
                                                        "https://www.worktravelenjoy.com/",
                                                    tester: false,
                                                    is_live: false,
                                                    digest: false,
                                                    gold: false,
                                                    accent: "#47E0A0",
                                                    maker_score: 1191,
                                                    dark_mode: false,
                                                    weekends_off: false,
                                                    hardcore_mode: false,
                                                    email_notifications: false,
                                                    og_image:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/07/c0a0693d-05ff-41ae-8e55-677f521bb683.jpg"
                                                },
                                                {
                                                    id: 1872,
                                                    username: "supremerumham",
                                                    first_name: "Alex",
                                                    last_name: "Edmonds",
                                                    status: null,
                                                    description:
                                                        "forum.openpodcast.xyz",
                                                    verified: false,
                                                    private: false,
                                                    avatar:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/avatars/2019/09/20/IMG_2258.jpg",
                                                    streak: 449,
                                                    timezone:
                                                        "America/Los_Angeles",
                                                    week_tda: 1,
                                                    twitter_handle:
                                                        "supremerumham",
                                                    instagram_handle: "",
                                                    product_hunt_handle: "",
                                                    github_handle: "",
                                                    telegram_handle:
                                                        "supremerumham",
                                                    nomadlist_handle: "",
                                                    bmc_handle: "BMK7xEkoG",
                                                    header:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/headers/2020/03/07/srht.png",
                                                    is_staff: false,
                                                    donor: false,
                                                    shipstreams_handle:
                                                        "supremerumham",
                                                    website:
                                                        "https://gumroad.com/l/gaMxO",
                                                    tester: false,
                                                    is_live: false,
                                                    digest: true,
                                                    gold: false,
                                                    accent: "#47E0A0",
                                                    maker_score: 1236,
                                                    dark_mode: false,
                                                    weekends_off: false,
                                                    hardcore_mode: false,
                                                    email_notifications: true,
                                                    og_image:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/07/d59ec80f-16ad-4e3e-8f7b-98a1c027f44e.jpg"
                                                },
                                                {
                                                    id: 2336,
                                                    username: "altafino",
                                                    first_name: "Stefan",
                                                    last_name: "Wüthrich",
                                                    status: null,
                                                    description:
                                                        "Solutions for Real Problems",
                                                    verified: false,
                                                    private: false,
                                                    avatar:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/avatars/2019/04/24/bw.jpg",
                                                    streak: 446,
                                                    timezone: "Europe/Belgrade",
                                                    week_tda: 2,
                                                    twitter_handle: "golangch",
                                                    instagram_handle: "",
                                                    product_hunt_handle:
                                                        "golangch",
                                                    github_handle: "altafino",
                                                    telegram_handle: "altafino",
                                                    nomadlist_handle:
                                                        "danielstef",
                                                    bmc_handle: "",
                                                    header: null,
                                                    is_staff: false,
                                                    donor: true,
                                                    shipstreams_handle: "",
                                                    website:
                                                        "https://www.altafino.com",
                                                    tester: false,
                                                    is_live: false,
                                                    digest: false,
                                                    gold: true,
                                                    accent: "#BF721D",
                                                    maker_score: 1811,
                                                    dark_mode: true,
                                                    weekends_off: false,
                                                    hardcore_mode: false,
                                                    email_notifications: false,
                                                    og_image:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/07/b115cff6-10fa-44ff-a970-abace3d21df5.jpg"
                                                },
                                                {
                                                    id: 2463,
                                                    username: "saifadin",
                                                    first_name: "Osamah",
                                                    last_name: "Aldoaiss",
                                                    status: null,
                                                    description:
                                                        "Developing great experiences",
                                                    verified: false,
                                                    private: false,
                                                    avatar:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/avatars/2019/08/07/profile.png",
                                                    streak: 415,
                                                    timezone: "Europe/Berlin",
                                                    week_tda: 2,
                                                    twitter_handle: "saifadin",
                                                    instagram_handle:
                                                        "saifadin",
                                                    product_hunt_handle:
                                                        "osamah_aldoaiss",
                                                    github_handle: "saifadin",
                                                    telegram_handle: "aldoaiss",
                                                    nomadlist_handle: null,
                                                    bmc_handle: "aldoaiss",
                                                    header: null,
                                                    is_staff: false,
                                                    donor: false,
                                                    shipstreams_handle: "",
                                                    website: "",
                                                    tester: false,
                                                    is_live: false,
                                                    digest: true,
                                                    gold: true,
                                                    accent: "#ff7900",
                                                    maker_score: 2114,
                                                    dark_mode: true,
                                                    weekends_off: false,
                                                    hardcore_mode: false,
                                                    email_notifications: true,
                                                    og_image:
                                                        "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/06/4b906177-00aa-48d0-be1b-d1440e133818.jpg"
                                                }
                                            ]}
                                        />
                                        <p className="mb-em">
                                            Join{" "}
                                            <span>over 5,000 creators</span> on
                                            a journey to ship products in tech
                                            and stay productive — together.
                                        </p>
                                        <ul>
                                            <li>
                                                <Emoji emoji="✅" />{" "}
                                                <strong>
                                                    Stay accountable
                                                </strong>{" "}
                                                by building your projects in
                                                public alongside other makers.
                                            </li>
                                            <li>
                                                <Emoji emoji="🔥" />{" "}
                                                <strong>Stay motivated</strong>{" "}
                                                by earning streaks, consecutive
                                                days of working on your
                                                projects.
                                            </li>
                                            <li>
                                                <Emoji emoji="🌎" />{" "}
                                                <strong>Share your work</strong>{" "}
                                                and get great feedback from our
                                                incredibly supportive community.
                                            </li>
                                            <li>
                                                <Emoji emoji="🥰" />{" "}
                                                <strong>Get inspired</strong>{" "}
                                                with our weekly newsletter and
                                                awesome founder interviews.
                                            </li>
                                        </ul>
                                    </div>
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
            </div>
        );
    }
}

export default requireUnauthed(StartPage);
