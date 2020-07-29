import React from "react";
import { connect } from "react-redux";
import { actions as appActions } from "~/ducks/app";
import GoldIcon from "~/components/icons/GoldIcon";
import Avatar from "~/features/users/components/Avatar";
import "./index.scss";
import shuffle from "lodash/shuffle";
import WallOfLove from "~/components/WallOfLove";
import ProductIcon from "~features/products/components/ProductIcon";
import orderBy from "lodash/orderBy";

import FullName from "~/components/FullName";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OutboundLink from "~/components/OutboundLink";
import Streak from "~/components/Streak";
import { Link } from "~/routes";
import config from "../../config";

const items = {
    products: [
        {
            id: 27,
            name: "IronMic",
            slug: "ironmic",
            user: 17,
            team: [],
            product_hunt: "https://www.producthunt.com/posts/ironmic",
            twitter: "ironmicfm",
            website: "ironmic.fm",
            projects: [
                {
                    id: 267,
                    name: "ironmic",
                    private: false,
                    user: 17
                }
            ],
            launched: true,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/08/26/avatar.png",
            description: "Podcasting websites made simple",
            accent: "#47E0A0",
            created_at: "2018-08-26T14:43:05.587316-04:00",
            launched_at: "2018-08-26T14:43:05.582303-04:00"
        },
        {
            id: 11,
            name: "Code The Web",
            slug: "code-the-web",
            user: 26,
            team: [],
            product_hunt: "",
            twitter: "https://twitter.com/CodeTheWebBlog",
            website: "https://codetheweb.blog",
            projects: [
                {
                    id: 100,
                    name: "CodeTheWeb",
                    private: false,
                    user: 26
                }
            ],
            launched: true,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/08/24/icon1.png",
            description: "Web development explained for normal people",
            accent: "#47E0A0",
            created_at: "2018-08-24T19:51:40.920744-04:00",
            launched_at: "2018-08-24T19:51:40.916938-04:00"
        },
        {
            id: 855,
            name: "DotConfig",
            slug: "dotconfig",
            user: 584,
            team: [],
            product_hunt: "https://www.producthunt.com/posts/dotconfig",
            twitter: "DotConfigXYZ",
            website: "https://dotconfig.xyz",
            projects: [
                {
                    id: 3007,
                    name: "devtools",
                    private: false,
                    user: 584
                },
                {
                    id: 3033,
                    name: "DotConfig",
                    private: false,
                    user: 584
                }
            ],
            launched: true,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2019/01/23/DotConfig_2.png",
            description:
                "Super simple configuration wizard for Webpack projects.",
            accent: "#47E0A0",
            created_at: "2019-01-23T19:38:46.357737-04:00",
            launched_at: "2019-03-04T07:14:09.902631-04:00"
        },
        {
            id: 13,
            name: "NodeHost",
            slug: "nodehost",
            user: 5,
            team: [],
            product_hunt: "",
            twitter: "nodehost",
            website: "https://www.nodehost.ca",
            projects: [
                {
                    id: 16,
                    name: "nodehost",
                    private: false,
                    user: 5
                },
                {
                    id: 20,
                    name: "nodehost_panel",
                    private: false,
                    user: 5
                },
                {
                    id: 78,
                    name: "nodehost_api",
                    private: false,
                    user: 5
                }
            ],
            launched: true,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/08/25/logo.png",
            description: "A web hosting service that is next generation.",
            accent: "#47E0A0",
            created_at: "2018-08-24T22:29:25.593683-04:00",
            launched_at: "2018-09-02T04:45:19.966014-04:00"
        },
        {
            id: 2349,
            name: "WIP",
            slug: "wip-2",
            user: 1719,
            team: [],
            product_hunt: null,
            twitter: null,
            website: null,
            projects: [
                {
                    id: 8726,
                    name: "work",
                    private: false,
                    user: 1719
                }
            ],
            launched: false,
            icon: null,
            description: "Exploring. This project is for random tasks.",
            accent: "#47E0A0",
            created_at: "2019-08-29T12:43:18.357251-04:00",
            launched_at: null
        },
        {
            id: 75,
            name: "Colin",
            slug: "colin",
            user: 587,
            team: [],
            product_hunt: "",
            twitter: "squarecatwebdev",
            website: "https://www.producthunt.com/upcoming/colin",
            projects: [
                {
                    id: 457,
                    name: "cryptocolin",
                    private: false,
                    user: 587
                }
            ],
            launched: false,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/09/22/logo.png",
            description:
                "A Telegram Bot that keeps your crypto portfolio balanced",
            accent: "#47E0A0",
            created_at: "2018-09-22T06:04:26.445948-04:00",
            launched_at: null
        },
        {
            id: 69,
            name: "UptimeBar",
            slug: "uptimebar",
            user: 587,
            team: [],
            product_hunt: "",
            twitter: "squarecatwebdev",
            website: "https://uptimebar.app",
            projects: [
                {
                    id: 458,
                    name: "uptimebar",
                    private: false,
                    user: 587
                }
            ],
            launched: true,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/09/20/appicon.png",
            description:
                "A simple OS X menu bar app that notifies you if any of your websites are down.",
            accent: "#47E0A0",
            created_at: "2018-09-20T06:46:00.720552-04:00",
            launched_at: "2018-09-22T06:05:40.146437-04:00"
        },
        {
            id: 103,
            name: "Squarecat",
            slug: "squarecat",
            user: 587,
            team: [],
            product_hunt: "",
            twitter: "SquarecatWebDev",
            website: "https://squarecat.io",
            projects: [
                {
                    id: 512,
                    name: "squarecat",
                    private: false,
                    user: 587
                }
            ],
            launched: true,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/10/01/colin-yellow.png",
            description:
                "Squarecat is collectively @jivings and @dinkydani 👫 We write software to help people because it's rewarding and we love doing it, which we think is a good reason to do just about anything ❤️",
            accent: "#47E0A0",
            created_at: "2018-10-01T04:06:00.103143-04:00",
            launched_at: "2018-10-01T04:06:00.100250-04:00"
        },
        {
            id: 116,
            name: "Design Tool Time Machine",
            slug: "design-tool-time-machine",
            user: 78,
            team: [],
            product_hunt: "",
            twitter: "@prototyprio",
            website:
                "https://www.producthunt.com/posts/design-tool-time-machine",
            projects: [
                {
                    id: 545,
                    name: "design",
                    private: false,
                    user: 78
                },
                {
                    id: 546,
                    name: "prototyping",
                    private: false,
                    user: 78
                }
            ],
            launched: true,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/10/05/pf_7.2018-10-04_22_13_53.gif",
            description:
                "Travel back in time, revisit 12 months of design tool news 🕰",
            accent: "#47E0A0",
            created_at: "2018-10-05T03:31:20.278472-04:00",
            launched_at: "2018-10-05T03:33:31.199417-04:00"
        },
        {
            id: 1030,
            name: "basilesamel.com",
            slug: "basilesamelcom",
            user: 750,
            team: [],
            product_hunt: null,
            twitter: "basilesamel",
            website: "https://basilesamel.com",
            projects: [
                {
                    id: 3848,
                    name: "basilesamel",
                    private: false,
                    user: 750
                },
                {
                    id: 8296,
                    name: "me",
                    private: false,
                    user: 750
                }
            ],
            launched: false,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2019/02/24/favicon.ico",
            description: "personal website",
            accent: "#47E0A0",
            created_at: "2019-02-24T17:08:30.565095-04:00",
            launched_at: null
        },
        {
            id: 159,
            name: "MyNext.team",
            slug: "mynextteam",
            user: 687,
            team: [],
            product_hunt: "",
            twitter: "MyNextTeam",
            website: "mynext.team",
            projects: [
                {
                    id: 672,
                    name: "freelance",
                    private: false,
                    user: 687
                },
                {
                    id: 673,
                    name: "remote",
                    private: false,
                    user: 687
                },
                {
                    id: 670,
                    name: "jobs",
                    private: false,
                    user: 687
                },
                {
                    id: 671,
                    name: "jobboard",
                    private: false,
                    user: 687
                },
                {
                    id: 753,
                    name: "mynextteam",
                    private: false,
                    user: 687
                }
            ],
            launched: true,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/10/23/My_Next_Team_Social.png",
            description:
                "Discover full-time, part-time, freelance and remote jobs across all sizes of US companies in 30+ industries. We're just getting started so come back often to discover additional jobs.",
            accent: "#47E0A0",
            created_at: "2018-10-23T00:31:54.157845-04:00",
            launched_at: "2018-10-29T14:52:33.361666-04:00"
        },
        {
            id: 136,
            name: "Tutors Central",
            slug: "tutors-central",
            user: 442,
            team: [],
            product_hunt: "",
            twitter: "tutorscentral",
            website: "tutorscentral.org",
            projects: [
                {
                    id: 596,
                    name: "tutorscentral",
                    private: false,
                    user: 442
                }
            ],
            launched: false,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/10/14/tutorscentralFB.jpg",
            description:
                "A community of teachers from across the world who are working towards success of their students.",
            accent: "#47E0A0",
            created_at: "2018-10-14T07:15:43.646239-04:00",
            launched_at: null
        },
        {
            id: 142,
            name: "RemoteStandups",
            slug: "remotestandups",
            user: 489,
            team: [],
            product_hunt: "",
            twitter: "",
            website: "http://remotestandups.com",
            projects: [
                {
                    id: 613,
                    name: "remotestandups",
                    private: false,
                    user: 489
                }
            ],
            launched: true,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/10/15/Screen_Shot_2018-10-16_at_00.05.14.png",
            description: "Join stanup groups and keep yourself accountable",
            accent: "#47E0A0",
            created_at: "2018-10-15T18:05:59.736708-04:00",
            launched_at: "2018-10-17T17:01:21.565116-04:00"
        },
        {
            id: 158,
            name: "First 100 Influencers",
            slug: "first-100-influencers",
            user: 687,
            team: [],
            product_hunt: "producthunt.com/posts/first-100-influencers",
            twitter: "100_Influencers",
            website: "first100influencers.com",
            projects: [
                {
                    id: 669,
                    name: "influencers",
                    private: false,
                    user: 687
                }
            ],
            launched: true,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/10/23/First_100_Social_Logo.jpg",
            description:
                "Increase your brand influence and get discovered by new fans, followers and potential clients by adding a profile on First 100 Influencers.",
            accent: "#47E0A0",
            created_at: "2018-10-23T00:29:52.254580-04:00",
            launched_at: "2018-10-23T00:32:39.055550-04:00"
        },
        {
            id: 160,
            name: "BugFeedr",
            slug: "bugfeedr",
            user: 687,
            team: [],
            product_hunt: "producthunt.com/posts/bugfeedr",
            twitter: "krazierinc",
            website: "bugfeedr.com",
            projects: [
                {
                    id: 674,
                    name: "bugs",
                    private: false,
                    user: 687
                },
                {
                    id: 675,
                    name: "feedback",
                    private: false,
                    user: 687
                }
            ],
            launched: true,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/10/23/bugFeedr_Logo_Bug.png",
            description:
                "Collect feedback from your clients & customers without the need for them to create yet another account. Easily send that data into other tools like Slack, Trello, Asana, Jira and Visual Studio Team Services.",
            accent: "#47E0A0",
            created_at: "2018-10-23T00:40:12.148983-04:00",
            launched_at: "2018-10-23T00:40:12.139452-04:00"
        },
        {
            id: 161,
            name: "Retrospect.team",
            slug: "retrospectteam",
            user: 687,
            team: [],
            product_hunt: "producthunt.com/posts/retrospect-team",
            twitter: "krazierinc",
            website: "retrospect.team",
            projects: [
                {
                    id: 676,
                    name: "kanban",
                    private: false,
                    user: 687
                },
                {
                    id: 677,
                    name: "retrospective",
                    private: false,
                    user: 687
                }
            ],
            launched: true,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/10/23/Retrospect_Team_Social.jpg",
            description:
                "Simple Kanban styled Retrospective Tool for teams to quickly collaborate on post sprints and project feedback.",
            accent: "#47E0A0",
            created_at: "2018-10-23T00:41:35.320978-04:00",
            launched_at: "2018-10-23T00:41:35.316679-04:00"
        },
        {
            id: 146,
            name: "UserMetrics",
            slug: "usermetrics",
            user: 587,
            team: [],
            product_hunt: "",
            twitter: "",
            website: "https://usermetrics.xyz",
            projects: [
                {
                    id: 630,
                    name: "usermetrics",
                    private: false,
                    user: 587
                }
            ],
            launched: false,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/10/29/Technologist_Emoji.png",
            description:
                "Stop user frustration with better website monitoring!",
            accent: "#47E0A0",
            created_at: "2018-10-18T13:24:18.158540-04:00",
            launched_at: null
        },
        {
            id: 162,
            name: "Surface Pixel",
            slug: "surface-pixel",
            user: 687,
            team: [],
            product_hunt: "producthunt.com/posts/surface-pixel",
            twitter: "surfacepixel",
            website: "surfacepixel.com",
            projects: [
                {
                    id: 678,
                    name: "windows10",
                    private: false,
                    user: 687
                },
                {
                    id: 679,
                    name: "artists",
                    private: false,
                    user: 687
                },
                {
                    id: 680,
                    name: "portfolio",
                    private: false,
                    user: 687
                }
            ],
            launched: true,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/10/23/Surface_Pixel_Logo_Square.png",
            description:
                "Windows 10 app for artists to showcase their portfolio of work, create storyboards & receive feedback through pen & ink annotations.",
            accent: "#47E0A0",
            created_at: "2018-10-23T00:43:17.140359-04:00",
            launched_at: "2018-10-26T01:05:06.566636-04:00"
        },
        {
            id: 858,
            name: "drs",
            slug: "drs",
            user: 1719,
            team: [],
            product_hunt: "",
            twitter: "",
            website: null,
            projects: [
                {
                    id: 3025,
                    name: "drs",
                    private: false,
                    user: 1719
                }
            ],
            launched: false,
            icon: null,
            description: "drs",
            accent: "#47E0A0",
            created_at: "2019-01-24T09:41:31.853323-04:00",
            launched_at: null
        },
        {
            id: 232,
            name: "FlagMe",
            slug: "flagme",
            user: 587,
            team: [],
            product_hunt: "",
            twitter: "",
            website: "flagme.xyz",
            projects: [
                {
                    id: 878,
                    name: "flagme",
                    private: false,
                    user: 587
                }
            ],
            launched: false,
            icon: null,
            description:
                "Update your social media display names to show your current location 🇦🇩🇦🇪🇦🇫🇦🇬🇦🇮🇦🇱🇦🇲🇦🇴🇦🇶🇦🇷🇦🇸🇦🇹🇦🇺🇦🇼🇦🇽🇦🇿🇧🇦🇧🇧🇧🇩🇧🇪",
            accent: "#47E0A0",
            created_at: "2018-11-07T20:26:59.171390-04:00",
            launched_at: null
        },
        {
            id: 242,
            name: "maker.rocks",
            slug: "makerrocks",
            user: 26,
            team: [],
            product_hunt: "https://www.producthunt.com/posts/maker-rocks",
            twitter: "@MakerDotRocks",
            website: "https://maker.rocks",
            projects: [
                {
                    id: 900,
                    name: "MakerDotRocks",
                    private: false,
                    user: 26
                }
            ],
            launched: true,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/11/18/gif.gif",
            description: "One page that sums you up as a maker",
            accent: "#47E0A0",
            created_at: "2018-11-09T23:35:54.130446-04:00",
            launched_at: "2018-11-18T04:38:56.312141-04:00"
        },
        {
            id: 313,
            name: "Leave Me Alone",
            slug: "leavemealone",
            user: 587,
            team: [608],
            product_hunt: "https://www.producthunt.com/posts/leave-me-alone-3",
            twitter: "LeaveMeAloneApp",
            website: "https://leavemealone.app",
            projects: [
                {
                    id: 1101,
                    name: "leavemealone",
                    private: false,
                    user: 587
                },
                {
                    id: 7217,
                    name: "leavemealone",
                    private: false,
                    user: 608
                }
            ],
            launched: true,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2019/07/08/envelope-logo-big.png",
            description: "Easily unsubscribe from spam emails 💌",
            accent: "#47E0A0",
            created_at: "2018-11-21T12:17:12.392855-04:00",
            launched_at: "2019-07-08T05:12:21.547178-04:00"
        },
        {
            id: 298,
            name: "Colivingly",
            slug: "colivingly",
            user: 78,
            team: [],
            product_hunt: "",
            twitter: "graeme_fulton",
            website: "coliving.ly",
            projects: [
                {
                    id: 1505,
                    name: "coliving",
                    private: false,
                    user: 78
                }
            ],
            launched: false,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/11/19/Screen_Shot_2018-11-19_at_10.48.50.png",
            description: "Find like minded people to live with",
            accent: "#47E0A0",
            created_at: "2018-11-19T05:49:32.626872-04:00",
            launched_at: null
        },
        {
            id: 311,
            name: "Little Lingua",
            slug: "little-lingua",
            user: 78,
            team: [],
            product_hunt: "https://www.producthunt.com/posts/little-lingua",
            twitter: "littlelingua",
            website: "https://littlelingua.eu",
            projects: [
                {
                    id: 1098,
                    name: "littlelingua",
                    private: false,
                    user: 78
                }
            ],
            launched: true,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/11/21/giffy_1.gif",
            description: "Find your next language learning tool.",
            accent: "#47E0A0",
            created_at: "2018-11-21T07:47:39.467002-04:00",
            launched_at: "2018-11-30T04:44:09.825522-04:00"
        },
        {
            id: 2474,
            name: "Bull Shit Overflow",
            slug: "bull-shit-overflow",
            user: 2336,
            team: [],
            product_hunt: null,
            twitter: null,
            website: "https://bullshitoverflow.com",
            projects: [
                {
                    id: 9164,
                    name: "bsoverflow",
                    private: false,
                    user: 2336
                }
            ],
            launched: false,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2019/09/17/Screenshot_from_2019-09-17_13-22-17.png",
            description:
                "Helping to handle the shit is blown out daily, mostly not from Bulls..........",
            accent: "#47E0A0",
            created_at: "2019-09-17T07:31:02.065529-04:00",
            launched_at: null
        },
        {
            id: 206,
            name: "Prototypr.io",
            slug: "prototypr-v3-and-community",
            user: 78,
            team: [],
            product_hunt: "",
            twitter: "graeme_fulton",
            website: "prototypr.io",
            projects: [
                {
                    id: 823,
                    name: "prototypr",
                    private: false,
                    user: 78
                }
            ],
            launched: false,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/11/03/cropped-fb-logo.png",
            description: "Design tool community",
            accent: "#47E0A0",
            created_at: "2018-11-03T16:34:07.153520-04:00",
            launched_at: null
        },
        {
            id: 352,
            name: "BrandSearch",
            slug: "brandsearch",
            user: 17,
            team: [],
            product_hunt: "producthunt.com/posts/brandsearch",
            twitter: "branddotsh",
            website: "brand.sh",
            projects: [
                {
                    id: 1237,
                    name: "brandsearch",
                    private: false,
                    user: 17
                }
            ],
            launched: false,
            icon: null,
            description: "idk yet",
            accent: "#47E0A0",
            created_at: "2018-11-28T21:32:48.021348-04:00",
            launched_at: null
        },
        {
            id: 243,
            name: "IdeaScratch",
            slug: "ideascratch",
            user: 17,
            team: [],
            product_hunt: "",
            twitter: "ideascratch",
            website: "ideascratch.com",
            projects: [
                {
                    id: 899,
                    name: "ideascratch",
                    private: false,
                    user: 17
                }
            ],
            launched: false,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/11/27/icon-big.png",
            description: "Ask your audience what to build next",
            accent: "#47E0A0",
            created_at: "2018-11-10T01:37:29.065662-04:00",
            launched_at: null
        },
        {
            id: 337,
            name: "CoderStory",
            slug: "coderstory",
            user: 537,
            team: [],
            product_hunt: "https://www.producthunt.com/posts/coderstory",
            twitter: "coder_story",
            website: "https://www.coderstory.io/",
            projects: [
                {
                    id: 1185,
                    name: "coderstory",
                    private: false,
                    user: 537
                },
                {
                    id: 1186,
                    name: "24hrstartup",
                    private: false,
                    user: 537
                }
            ],
            launched: true,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2019/02/02/cs-dark.png",
            description:
                "Everyone has a story to tell, and you can find or start yours here.",
            accent: "#47E0A0",
            created_at: "2018-11-26T17:23:55.714388-04:00",
            launched_at: "2019-02-04T04:24:53.037360-04:00"
        },
        {
            id: 371,
            name: "MakersBattle",
            slug: "makersbattle",
            user: 17,
            team: [],
            product_hunt: "",
            twitter: "",
            website: "makersbattle.com",
            projects: [
                {
                    id: 1302,
                    name: "makersbattle",
                    private: false,
                    user: 17
                }
            ],
            launched: false,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/12/02/avatar.png",
            description: "Maker vs Maker Battles",
            accent: "#47E0A0",
            created_at: "2018-12-02T01:44:07.272479-04:00",
            launched_at: null
        },
        {
            id: 373,
            name: "Snaptier",
            slug: "snaptier",
            user: 969,
            team: [],
            product_hunt: "",
            twitter: "snaptier",
            website: "snaptier.co",
            projects: [
                {
                    id: 1310,
                    name: "snaptier",
                    private: false,
                    user: 969
                }
            ],
            launched: false,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/12/02/logo-transparent.png",
            description: "Automating repetitive code changes",
            accent: "#47E0A0",
            created_at: "2018-12-02T12:11:43.143150-04:00",
            launched_at: null
        },
        {
            id: 374,
            name: "UnMarkDocs",
            slug: "unmarkdocs",
            user: 969,
            team: [],
            product_hunt: "producthunt.com/posts/unmarkdocs",
            twitter: "unmarkdocs",
            website: "unmarkdocs.co",
            projects: [
                {
                    id: 1311,
                    name: "unmarkdocs",
                    private: false,
                    user: 969
                }
            ],
            launched: true,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/12/02/colorful-logo.png",
            description:
                "Generate beautiful documentation pages with super-powered Markdown from your GitHub repository",
            accent: "#47E0A0",
            created_at: "2018-12-02T12:15:50.290226-04:00",
            launched_at: "2018-12-02T12:15:50.287209-04:00"
        },
        {
            id: 375,
            name: "Miguel Piedrafita's blog",
            slug: "miguel-piedrafitas-blog",
            user: 969,
            team: [],
            product_hunt: "",
            twitter: "m1guelpf",
            website: "miguelpiedrafita.com",
            projects: [
                {
                    id: 1312,
                    name: "blog",
                    private: false,
                    user: 969
                }
            ],
            launched: false,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/12/02/logo.png",
            description: "My personal blog",
            accent: "#47E0A0",
            created_at: "2018-12-02T12:20:39.513234-04:00",
            launched_at: null
        },
        {
            id: 380,
            name: "OrgManager",
            slug: "orgmanager",
            user: 969,
            team: [],
            product_hunt: "https://www.producthunt.com/posts/orgmanager",
            twitter: "",
            website: "github.com/orgmanager/orgmanager",
            projects: [
                {
                    id: 1332,
                    name: "orgmanager",
                    private: false,
                    user: 969
                }
            ],
            launched: true,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/12/03/Avatar.png",
            description: "Invite System for GitHub Organizations",
            accent: "#47E0A0",
            created_at: "2018-12-03T07:17:35.780137-04:00",
            launched_at: "2018-12-03T07:17:35.777446-04:00"
        },
        {
            id: 381,
            name: "CoderYouth",
            slug: "coderyouth",
            user: 969,
            team: [],
            product_hunt: "https://www.producthunt.com/posts/coderyouth-v2-0",
            twitter: "",
            website: "coderyouth.club",
            projects: [
                {
                    id: 1333,
                    name: "coderyouth",
                    private: false,
                    user: 969
                }
            ],
            launched: true,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/12/03/producthunt_icon.png",
            description: "A code community for teenagers",
            accent: "#47E0A0",
            created_at: "2018-12-03T07:19:44.655529-04:00",
            launched_at: "2018-12-03T07:19:44.652796-04:00"
        },
        {
            id: 394,
            name: "Maker Army",
            slug: "maker-army",
            user: 969,
            team: [],
            product_hunt: "",
            twitter: "MakerArmyHQ",
            website: "https://maker.army",
            projects: [
                {
                    id: 1374,
                    name: "makerarmy",
                    private: false,
                    user: 969
                }
            ],
            launched: false,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/12/08/logo.jpg",
            description:
                "䷂ Providing makers with financial stability and overall, bettering the future of digital creativity. ䷂",
            accent: "#47E0A0",
            created_at: "2018-12-06T08:31:25.738562-04:00",
            launched_at: null
        },
        {
            id: 403,
            name: "Unstyler",
            slug: "unstyler",
            user: 969,
            team: [],
            product_hunt: "https://www.producthunt.com/posts/unstyler",
            twitter: "",
            website:
                "https://chrome.google.com/webstore/detail/unstyler/iniahmhgmcmkimliphhbgfkmichgccjd",
            projects: [
                {
                    id: 1406,
                    name: "unstyler",
                    private: false,
                    user: 969
                }
            ],
            launched: true,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/12/06/logo_El4lmWF.png",
            description: "Chrome extension to toggle a website's styling",
            accent: "#47E0A0",
            created_at: "2018-12-06T15:20:25.867933-04:00",
            launched_at: "2018-12-07T04:13:27.335366-04:00"
        },
        {
            id: 418,
            name: "mvlist",
            slug: "mvlist",
            user: 834,
            team: [],
            product_hunt: "",
            twitter: "",
            website: "https://mvlist.jipfr.nl",
            projects: [
                {
                    id: 1458,
                    name: "mvlist",
                    private: false,
                    user: 834
                }
            ],
            launched: false,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2019/01/13/apple-touch-icon.png",
            description: "Easily keep track of movies you love (or hate).",
            accent: "#47E0A0",
            created_at: "2018-12-08T09:56:05.818349-04:00",
            launched_at: null
        },
        {
            id: 463,
            name: "MakerlogApp",
            slug: "makerlogapp",
            user: 442,
            team: [],
            product_hunt: "",
            twitter: "",
            website: "https://app.getmakerlog.com",
            projects: [
                {
                    id: 1262,
                    name: "MakerLogApp",
                    private: false,
                    user: 442
                }
            ],
            launched: false,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/12/20/Icon-App-1024x10241x.png",
            description: "Android and iOS client for Makerlog",
            accent: "#47E0A0",
            created_at: "2018-12-20T03:14:27.697807-04:00",
            launched_at: null
        },
        {
            id: 441,
            name: "Daily Podcast Club",
            slug: "dailypodcast",
            user: 969,
            team: [],
            product_hunt: "",
            twitter: "",
            website: "https://dailypodcast.club",
            projects: [
                {
                    id: 1574,
                    name: "dailypodcast",
                    private: false,
                    user: 969
                }
            ],
            launched: false,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/12/17/headphone_1f3a7.png",
            description:
                "Speak for two minutes every day. Get into the habit of podcasting and share your thoughts with others. WIP",
            accent: "#47E0A0",
            created_at: "2018-12-12T19:50:10.017453-04:00",
            launched_at: null
        },
        {
            id: 437,
            name: "XKCDifier",
            slug: "xkcdifier",
            user: 969,
            team: [],
            product_hunt: "",
            twitter: "",
            website:
                "https://chrome.google.com/webstore/detail/xkcdifier/ifffgpmdoijopclnjhfgdecgnaiibjja",
            projects: [
                {
                    id: 1561,
                    name: "xkcdifier",
                    private: false,
                    user: 969
                }
            ],
            launched: false,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/12/11/logo.png",
            description:
                "Replace strings in websites with other that make more sense (not really, it just applies the XKCD replacement comics to everything you visit)",
            accent: "#47E0A0",
            created_at: "2018-12-11T18:32:29.783707-04:00",
            launched_at: null
        },
        {
            id: 491,
            name: "Use MakerLog Redesign",
            slug: "use-makerlog-redesign",
            user: 969,
            team: [],
            product_hunt: "",
            twitter: "",
            website:
                "https://chrome.google.com/webstore/detail/use-makerlog-redesign/akaahjlnjlcdjkpfhkfdbihndmkcjgki",
            projects: [
                {
                    id: 1766,
                    name: "usemakerlogredesign",
                    private: false,
                    user: 969
                }
            ],
            launched: false,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/12/23/apple-icon-180x180.png",
            description:
                "A Chrome extension to force yourself to use the new, redesigned MakerLog",
            accent: "#47E0A0",
            created_at: "2018-12-23T10:54:06.358020-04:00",
            launched_at: null
        },
        {
            id: 490,
            name: "MakerAds",
            slug: "makerads",
            user: 587,
            team: [],
            product_hunt: "",
            twitter: "",
            website: "https://makerads.xyz",
            projects: [
                {
                    id: 1765,
                    name: "makerads",
                    private: false,
                    user: 587
                }
            ],
            launched: true,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/12/23/logo.png",
            description: "Unobtrusive adverts for makers",
            accent: "#47E0A0",
            created_at: "2018-12-23T10:51:28.496148-04:00",
            launched_at: "2018-12-23T13:48:42.215341-04:00"
        },
        {
            id: 488,
            name: "UI Sounds 🎵",
            slug: "ui-sounds",
            user: 78,
            team: [],
            product_hunt: "https://www.producthunt.com/posts/ui-sounds",
            twitter: "",
            website: "https://uisounds.prototypr.io",
            projects: [
                {
                    id: 1757,
                    name: "uisounds",
                    private: false,
                    user: 78
                }
            ],
            launched: true,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/12/30/ezgif-3-7db31892745a.gif",
            description: "UI Sound inspiration from popular apps",
            accent: "#47E0A0",
            created_at: "2018-12-23T07:47:30.971827-04:00",
            launched_at: "2018-12-30T02:43:13.160740-04:00"
        },
        {
            id: 581,
            name: "UI Soundkit 1",
            slug: "ui-soundkit-1",
            user: 78,
            team: [],
            product_hunt: "",
            twitter: "graeme_fulton",
            website: null,
            projects: [
                {
                    id: 1757,
                    name: "uisounds",
                    private: false,
                    user: 78
                }
            ],
            launched: false,
            icon: null,
            description: "A soundkit for app developers and designers",
            accent: "#47E0A0",
            created_at: "2019-01-01T11:54:19.026102-04:00",
            launched_at: null
        },
        {
            id: 572,
            name: "Stories",
            slug: "stories",
            user: 834,
            team: [],
            product_hunt: "",
            twitter: "",
            website: "https://stories.jipfr.nl",
            projects: [
                {
                    id: 2012,
                    name: "stories",
                    private: false,
                    user: 834
                }
            ],
            launched: true,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2019/01/13/apple-touch-icon_ngNTylq.png",
            description: "Write a story every day",
            accent: "#47E0A0",
            created_at: "2018-12-31T18:04:28.895582-04:00",
            launched_at: "2018-12-31T18:04:28.892526-04:00"
        },
        {
            id: 594,
            name: "Diagnode",
            slug: "diagnode",
            user: 584,
            team: [],
            product_hunt: "",
            twitter: "",
            website: null,
            projects: [
                {
                    id: 2120,
                    name: "dev",
                    private: false,
                    user: 584
                }
            ],
            launched: false,
            icon: null,
            description: "Super simple Node.js logging and live monitoring",
            accent: "#47E0A0",
            created_at: "2019-01-02T01:52:54.038672-04:00",
            launched_at: null
        },
        {
            id: 668,
            name: "Life",
            slug: "life",
            user: 1514,
            team: [],
            product_hunt: "",
            twitter: "",
            website: null,
            projects: [
                {
                    id: 2358,
                    name: "kglife",
                    private: false,
                    user: 1514
                }
            ],
            launched: true,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2019/04/16/slice-of-pizza_1f355.png",
            description: "My Life",
            accent: "#47E0A0",
            created_at: "2019-01-10T21:51:27.098848-04:00",
            launched_at: "2019-04-16T14:28:59.608178-04:00"
        },
        {
            id: 624,
            name: "Makerlog Search",
            slug: "makerlog-search",
            user: 969,
            team: [],
            product_hunt: "",
            twitter: "",
            website: "https://makerlog-search.netlify.com",
            projects: [
                {
                    id: 2191,
                    name: "MakerlogSearch",
                    private: false,
                    user: 969
                }
            ],
            launched: false,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2019/01/05/makerlog-search_5D723Se.png",
            description: "Search for Makerlog!",
            accent: "#47E0A0",
            created_at: "2019-01-05T04:28:41.083289-04:00",
            launched_at: null
        },
        {
            id: 406,
            name: "Selldom.IO",
            slug: "selldomio",
            user: 687,
            team: [],
            product_hunt: "https://www.producthunt.com/posts/selldom",
            twitter: "selldom_io",
            website: "https://selldom.io",
            projects: [
                {
                    id: 793,
                    name: "Selldom",
                    private: false,
                    user: 687
                },
                {
                    id: 977,
                    name: "SelldomIO",
                    private: false,
                    user: 687
                }
            ],
            launched: true,
            icon:
                "https://ik.imagekit.io/makerlog/media/uploads/2018/12/07/Selldom_Social.jpg",
            description:
                "Selldom.io is a marketplace to buy and sell your unused domains that are collecting dust at your registrar after your 100th side-project and startup pivot.",
            accent: "#47E0A0",
            created_at: "2018-12-07T00:31:24.783341-04:00",
            launched_at: "2018-12-07T00:31:24.781170-04:00"
        }
    ],
    users: [
        {
            id: 1514,
            username: "kg756",
            first_name: "Ross",
            last_name: "Boss",
            status: null,
            description: "Building Fun things :)",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2019/05/28/4JZHifA_C8rWaRm.jpg",
            streak: 512,
            timezone: "America/New_York",
            week_tda: 1,
            twitter_handle: "rbossk757",
            instagram_handle: "",
            product_hunt_handle: "Ask me :)",
            github_handle: "",
            telegram_handle: "Kg757",
            nomadlist_handle: null,
            bmc_handle: "rossbossk",
            header:
                "https://ik.imagekit.io/makerlog/media/uploads/headers/2019/02/02/4292771.jpg",
            is_staff: false,
            donor: false,
            shipstreams_handle: "",
            website: "http://www.rovikisolutions.com",
            tester: false,
            is_live: false,
            digest: false,
            gold: true,
            accent: "#07960b",
            maker_score: 3292,
            dark_mode: false,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: false,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/27/4185095f-6b03-47d1-8f00-3e73440190e4.jpg",
            date_joined: "2019-01-10T21:10:09-04:00"
        },
        {
            id: 834,
            username: "jip",
            first_name: "Jip",
            last_name: "Fr",
            status: "making a new mvlist",
            description: "133 jumps",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2019/01/11/844C712E-9153-4D00-943B-D3E24F75BCCE_Tno9ivx.jpeg",
            streak: 571,
            timezone: "Europe/Amsterdam",
            week_tda: 5,
            twitter_handle: "JipFr",
            instagram_handle: "jipprogamer2006",
            product_hunt_handle: "jipfr",
            github_handle: "JipFr",
            telegram_handle: "CommandCoder",
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
            maker_score: 1972,
            dark_mode: false,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: false,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/27/904d9136-f975-4150-b218-6488985d7ea1.jpg",
            date_joined: "2018-11-18T04:41:09-04:00"
        },
        {
            id: 17,
            username: "kylemcd",
            first_name: "Kyle",
            last_name: "McDonald",
            status: null,
            description: "Developer & Designer",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2019/07/10/avatarnewedited.png",
            streak: 14,
            timezone: "America/Chicago",
            week_tda: 1,
            twitter_handle: "designbykyle",
            instagram_handle: "designbykyle",
            product_hunt_handle: "hustlinhack",
            github_handle: "",
            telegram_handle: "",
            nomadlist_handle: "",
            bmc_handle: "",
            header: null,
            is_staff: false,
            donor: true,
            shipstreams_handle: "kylemcd27",
            website: "",
            tester: true,
            is_live: false,
            digest: false,
            gold: true,
            accent: "#47E0A0",
            maker_score: 84,
            dark_mode: false,
            weekends_off: true,
            hardcore_mode: false,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/05/01/4c475226-edaa-4407-b360-94096397822e.jpg",
            date_joined: "2018-07-06T06:10:05-04:00"
        },
        {
            id: 78,
            username: "gray",
            first_name: "Graeme",
            last_name: "",
            status: null,
            description: "Prototypr.io && Letter.so 💙",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2018/10/05/1_SIrnt9i79nrXhzF7N2Cj5Q.jpeg",
            streak: 0,
            timezone: "Europe/London",
            week_tda: 1,
            twitter_handle: "graeme_fulton",
            instagram_handle: "",
            product_hunt_handle: "graeme_fulton",
            github_handle: "",
            telegram_handle: "",
            nomadlist_handle: null,
            bmc_handle: "",
            header:
                "https://ik.imagekit.io/makerlog/media/uploads/headers/2019/05/28/22770875_1488936581185205_8553922437721300691_o_2.png",
            is_staff: false,
            donor: false,
            shipstreams_handle: "",
            website: "",
            tester: false,
            is_live: false,
            digest: true,
            gold: true,
            accent: "#47E0A0",
            maker_score: 463,
            dark_mode: false,
            weekends_off: true,
            hardcore_mode: false,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/27/f1f7a702-a11e-405d-9fb2-a146509d84a4.jpg",
            date_joined: "2018-07-24T06:42:38.796451-04:00"
        },
        {
            id: 489,
            username: "depomoty",
            first_name: "Raz",
            last_name: "",
            status: "working on ChartBrew ☕",
            description: "Software engineer - maker of things",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/01/01/5342321.jpg",
            streak: 216,
            timezone: "Asia/Singapore",
            week_tda: 5,
            twitter_handle: "razvanilin",
            instagram_handle: "razvanilin",
            product_hunt_handle: "razvanilin",
            github_handle: "razvanilin",
            telegram_handle: "",
            nomadlist_handle: "",
            bmc_handle: "c6TY4uqWr",
            header:
                "https://ik.imagekit.io/makerlog/media/uploads/headers/2018/08/10/FWY_2560x1440.jpg",
            is_staff: false,
            donor: true,
            shipstreams_handle: "razvanilin",
            website: "https://chartbrew.com",
            tester: true,
            is_live: false,
            digest: false,
            gold: true,
            accent: "#1a7fa0",
            maker_score: 579,
            dark_mode: true,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: false,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/27/ef705527-1d10-441f-9380-3edc330e1d4d.jpg",
            date_joined: "2018-08-07T03:18:47-04:00"
        },
        {
            id: 2336,
            username: "altafino",
            first_name: "Stefan",
            last_name: "Wüthrich",
            status: null,
            description: "Solutions for Real Problems",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2019/04/24/bw.jpg",
            streak: 466,
            timezone: "Europe/Belgrade",
            week_tda: 5,
            twitter_handle: "golangch",
            instagram_handle: "",
            product_hunt_handle: "golangch",
            github_handle: "altafino",
            telegram_handle: "altafino",
            nomadlist_handle: "danielstef",
            bmc_handle: "",
            header: null,
            is_staff: false,
            donor: true,
            shipstreams_handle: "",
            website: "https://www.altafino.com",
            tester: false,
            is_live: false,
            digest: false,
            gold: true,
            accent: "#BF721D",
            maker_score: 1794,
            dark_mode: true,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: false,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/27/b8e43a07-dae1-435f-9277-a43728574b1d.jpg",
            date_joined: "2019-03-26T14:07:08-04:00"
        },
        {
            id: 1407,
            username: "ian",
            first_name: "Ian",
            last_name: "Fortier",
            status: null,
            description: "Web Artisan",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/07/27/profile_picture_business.png",
            streak: 340,
            timezone: "America/Toronto",
            week_tda: 1,
            twitter_handle: "ianfortier",
            instagram_handle: "",
            product_hunt_handle: "",
            github_handle: "ianfortier",
            telegram_handle: "ianfortier",
            nomadlist_handle: "",
            bmc_handle: "",
            header:
                "https://ik.imagekit.io/makerlog/media/uploads/headers/2019/06/10/photo-1549119246-cf57ef8a17b2.jpg",
            is_staff: false,
            donor: false,
            shipstreams_handle: "",
            website: "https://twitter.com/ianfortier",
            tester: false,
            is_live: false,
            digest: true,
            gold: true,
            accent: "#303f9f",
            maker_score: 1026,
            dark_mode: false,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/28/c8a6abbf-635e-4e2e-b83d-38eb9e88f77c.jpg",
            date_joined: "2019-01-04T14:00:14.466753-04:00"
        },
        {
            id: 135,
            username: "gadgick",
            first_name: "Nick",
            last_name: "Coates",
            status: "making Drafty",
            description: "Building Forward",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/05/28/New_Profile_copy.jpg",
            streak: 3,
            timezone: "Europe/London",
            week_tda: 6,
            twitter_handle: "gadgick",
            instagram_handle: "",
            product_hunt_handle: "gadgick",
            github_handle: "nickcoates",
            telegram_handle: "",
            nomadlist_handle: "",
            bmc_handle: "",
            header:
                "https://ik.imagekit.io/makerlog/media/uploads/headers/2020/04/02/Twitter_cover_copy.png",
            is_staff: false,
            donor: true,
            shipstreams_handle: "",
            website: "https://fwd.so",
            tester: false,
            is_live: false,
            digest: true,
            gold: true,
            accent: "#a20038",
            maker_score: 130,
            dark_mode: false,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/27/f7c57b36-9d6d-4b4e-88a8-d6c052ef1a92.jpg",
            date_joined: "2018-07-24T05:14:42-04:00"
        },
        {
            id: 5,
            username: "anthony",
            first_name: "Anthony",
            last_name: "Lee",
            status: "making a web browser called Blaze!",
            description: "I guess I am a spacey guy... Oh dam that was bad.",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/03/03/8321AD01-EB9E-4ACB-BBBB-E8DE19BE3364.jpeg",
            streak: 1,
            timezone: "America/Vancouver",
            week_tda: 5,
            twitter_handle: "justanthonylee",
            instagram_handle: "anthonyrossbach",
            product_hunt_handle: "anthonyrossbach",
            github_handle: "",
            telegram_handle: "",
            nomadlist_handle: "",
            bmc_handle: "",
            header: null,
            is_staff: false,
            donor: true,
            shipstreams_handle: "",
            website: "",
            tester: false,
            is_live: false,
            digest: true,
            gold: true,
            accent: "#cbf1ff",
            maker_score: 1171,
            dark_mode: false,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/06/26/35d1476d-33c0-4fa2-8bdf-7290b3033ac4.jpg",
            date_joined: "2018-03-20T01:10:56-04:00"
        },
        {
            id: 26,
            username: "Booligoosh",
            first_name: "Ethan",
            last_name: "",
            status: "making KanbanMail & Code The Web",
            description: "Making products people love 🔥🚀",
            verified: false,
            private: false,
            avatar:
                "https://gravatar.com/avatar/82dc3398f58928df3d42ffb3b400b2b9?s=150&d=mm&r=pg",
            streak: 0,
            timezone: "Australia/Sydney",
            week_tda: 3,
            twitter_handle: "Booligoosh",
            instagram_handle: "",
            product_hunt_handle: "Booligoosh",
            github_handle: "Booligoosh",
            telegram_handle: "Booligoosh",
            nomadlist_handle: "",
            bmc_handle: "Booligoosh",
            header:
                "https://ik.imagekit.io/makerlog/media/uploads/headers/2018/08/10/Mojave_Night_smallER.jpg",
            is_staff: false,
            donor: false,
            shipstreams_handle: "ethan_the_maker",
            website: "https://ethan.link",
            tester: true,
            is_live: false,
            digest: false,
            gold: true,
            accent: "#b452f7",
            maker_score: 1011,
            dark_mode: false,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: false,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/06/15/973fe3d2-6d2d-494e-8515-74e2af7d057b.jpg",
            date_joined: "2018-07-17T05:15:27-04:00"
        },
        {
            id: 750,
            username: "basilesamel",
            first_name: "Basile",
            last_name: "Samel",
            status: "making #200wordsaday",
            description: "writing/making/coding shokunin",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/03/02/pp2.jpg",
            streak: 623,
            timezone: "Europe/Paris",
            week_tda: 2,
            twitter_handle: "BasileSamel",
            instagram_handle: "BasileSamel",
            product_hunt_handle: "bsamel",
            github_handle: "BasileSamel",
            telegram_handle: "BasileSamel",
            nomadlist_handle: "",
            bmc_handle: "BasileSamel",
            header:
                "https://ik.imagekit.io/makerlog/media/uploads/headers/2020/01/06/81395045_10221987034213483_7386071403713265664_o.jpg",
            is_staff: false,
            donor: false,
            shipstreams_handle: "",
            website: "https://basilesamel.com",
            tester: false,
            is_live: false,
            digest: true,
            gold: true,
            accent: "#47E0A0",
            maker_score: 1770,
            dark_mode: true,
            weekends_off: false,
            hardcore_mode: true,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/27/5deb3530-238f-41cc-bd4f-2b907f8baaaa.jpg",
            date_joined: "2018-11-06T03:50:58-04:00"
        },
        {
            id: 1525,
            username: "alina",
            first_name: "Alina",
            last_name: "Sava",
            status: null,
            description: "Designer, dev, grinch",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/01/19/alina-sava-square.jpg",
            streak: 1,
            timezone: "Europe/Berlin",
            week_tda: 1,
            twitter_handle: "alinacsava",
            instagram_handle: "",
            product_hunt_handle: "alinacsava",
            github_handle: "alinacsava",
            telegram_handle: "",
            nomadlist_handle: null,
            bmc_handle: "alina",
            header:
                "https://ik.imagekit.io/makerlog/media/uploads/headers/2019/12/20/b.png",
            is_staff: false,
            donor: true,
            shipstreams_handle: "",
            website: "https://sava.io",
            tester: true,
            is_live: false,
            digest: false,
            gold: true,
            accent: "#282828",
            maker_score: 53,
            dark_mode: false,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/27/f0f3edaa-745a-48c4-ba2c-7626e971311a.jpg",
            date_joined: "2019-01-12T07:17:25-04:00"
        },
        {
            id: 1719,
            username: "saud",
            first_name: "saud",
            last_name: "",
            status: null,
            description: "I make to learn!",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2019/01/14/saud.png",
            streak: 556,
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
            website: "https://samaphp.com",
            tester: false,
            is_live: false,
            digest: true,
            gold: true,
            accent: "#bce886",
            maker_score: 1271,
            dark_mode: true,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/27/807357f5-1979-465e-a2db-1714aa3bd68e.jpg",
            date_joined: "2019-01-14T16:06:50-04:00"
        },
        {
            id: 815,
            username: "otexas",
            first_name: "Marcellus",
            last_name: "Spears",
            status: "making NonStopFlightList",
            description: "Building with Bootstraps!",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2018/11/16/IMG_4967_BuTHU4t.jpg",
            streak: 1,
            timezone: "America/Chicago",
            week_tda: 1,
            twitter_handle: "marcellusspears",
            instagram_handle: "marcellusspears",
            product_hunt_handle: "",
            github_handle: "plaidpizazz",
            telegram_handle: "OTexas",
            nomadlist_handle: "",
            bmc_handle: "otexas",
            header: null,
            is_staff: false,
            donor: false,
            shipstreams_handle: "marcellusspears",
            website: "",
            tester: false,
            is_live: false,
            digest: true,
            gold: true,
            accent: "#7664e6",
            maker_score: 55,
            dark_mode: false,
            weekends_off: true,
            hardcore_mode: false,
            email_notifications: true,
            og_image: null,
            date_joined: "2018-11-16T15:38:06.927582-04:00"
        },
        {
            id: 2066,
            username: "jamesmkenny",
            first_name: "James",
            last_name: "Kenny",
            status: null,
            description: "FullStack developer, Nomad, Building things",
            verified: false,
            private: false,
            avatar:
                "https://gravatar.com/avatar/f473d512f052a36a0f12edaace2f1f9a?s=150&d=mm&r=pg",
            streak: 362,
            timezone: "Europe/Dublin",
            week_tda: 2,
            twitter_handle: "jamesmkenny",
            instagram_handle: "jamesmkenny",
            product_hunt_handle: "jamesmkenny",
            github_handle: "james-kenny",
            telegram_handle: "",
            nomadlist_handle: null,
            bmc_handle: "jamesmkenny",
            header: null,
            is_staff: false,
            donor: false,
            shipstreams_handle: "",
            website: "https://jameskenny.dev",
            tester: false,
            is_live: false,
            digest: true,
            gold: true,
            accent: "#0ec2fe",
            maker_score: 1391,
            dark_mode: false,
            weekends_off: true,
            hardcore_mode: false,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/27/460775b8-a6ba-45fc-be72-9097552e1cbd.jpg",
            date_joined: "2019-02-20T09:49:41.919803-04:00"
        },
        {
            id: 484,
            username: "alisalahio",
            first_name: "Ali",
            last_name: "𝘧𝘳𝘰𝘮 Instatus",
            status: null,
            description: "If you didn't log it, did you even do it?",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/05/22/makerlog.jpg",
            streak: 72,
            timezone: "Africa/Cairo",
            week_tda: 2,
            twitter_handle: "alisalahio",
            instagram_handle: "",
            product_hunt_handle: "alisalahio",
            github_handle: "alisalahio",
            telegram_handle: "alisalahio",
            nomadlist_handle: "",
            bmc_handle: "",
            header:
                "https://ik.imagekit.io/makerlog/media/uploads/headers/2019/08/23/794438.jpg",
            is_staff: false,
            donor: false,
            shipstreams_handle: "",
            website: "https://ali.salah.io",
            tester: false,
            is_live: false,
            digest: false,
            gold: true,
            accent: "#47E0A0",
            maker_score: 325,
            dark_mode: false,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/27/58607aff-8bc4-4e57-b507-fb2634eca7f4.jpg",
            date_joined: "2018-08-04T15:23:49-04:00"
        },
        {
            id: 947,
            username: "shylands",
            first_name: "Steven",
            last_name: "Hylands",
            status: "learning Javascript",
            description: "Designer / Maker of Lowdown",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/05/14/shylands-avatar-photographer_copy.jpg",
            streak: 0,
            timezone: "Europe/London",
            week_tda: 1,
            twitter_handle: "shylands",
            instagram_handle: "shylands",
            product_hunt_handle: "shylands",
            github_handle: "shylands",
            telegram_handle: "shylands",
            nomadlist_handle: "shylands",
            bmc_handle: "shylands",
            header: null,
            is_staff: false,
            donor: true,
            shipstreams_handle: "sjhylands",
            website: "https://shylands.com",
            tester: false,
            is_live: false,
            digest: false,
            gold: true,
            accent: "#5ac599",
            maker_score: 41,
            dark_mode: false,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: false,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/06/26/ca0b1313-f011-4da3-8120-f973ae6f8dfa.jpg",
            date_joined: "2018-11-29T08:55:22-04:00"
        },
        {
            id: 584,
            username: "ilangorajagopal",
            first_name: "Ilango",
            last_name: "Rajagopal",
            status: "building MLtube",
            description: "I make web stuff.",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2018/09/19/IMG_20160813_185227.jpg",
            streak: 0,
            timezone: "Asia/Kolkata",
            week_tda: 1,
            twitter_handle: "_ilango",
            instagram_handle: "",
            product_hunt_handle: "rajagopalilango",
            github_handle: "ilangorajagopal",
            telegram_handle: "ilangorajagopal",
            nomadlist_handle: null,
            bmc_handle: "",
            header:
                "https://ik.imagekit.io/makerlog/media/uploads/headers/2019/01/24/1500x500.jpeg",
            is_staff: false,
            donor: false,
            shipstreams_handle: "ilangorajagopal",
            website: "",
            tester: false,
            is_live: false,
            digest: true,
            gold: true,
            accent: "#47E0A0",
            maker_score: 124,
            dark_mode: true,
            weekends_off: true,
            hardcore_mode: false,
            email_notifications: true,
            og_image: null,
            date_joined: "2018-09-18T03:27:58-04:00"
        },
        {
            id: 2026,
            username: "zodman",
            first_name: "zodman",
            last_name: "- Andres Vargas",
            status: null,
            description: "python ninja and otaku frustated",
            verified: false,
            private: false,
            avatar:
                "https://gravatar.com/avatar/a1c5fdec1dd6e17d609f21033fdf122e?s=150&d=mm&r=pg",
            streak: 0,
            timezone: "America/Mexico_City",
            week_tda: 2,
            twitter_handle: "zodman",
            instagram_handle: "zodman",
            product_hunt_handle: "zodman",
            github_handle: "zodman",
            telegram_handle: "z0dman",
            nomadlist_handle: null,
            bmc_handle: "",
            header:
                "https://ik.imagekit.io/makerlog/media/uploads/headers/2019/05/14/code_wins_arguments_by_paran0ide_d4t0vku-fullview.jpg",
            is_staff: false,
            donor: false,
            shipstreams_handle: "",
            website: "https://opensrc.mx",
            tester: false,
            is_live: false,
            digest: true,
            gold: true,
            accent: "#053d26",
            maker_score: 127,
            dark_mode: false,
            weekends_off: true,
            hardcore_mode: false,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/26/7fdaa3c6-cbdc-42c6-a6e3-e4ef5e033751.jpg",
            date_joined: "2019-02-14T11:58:53.646511-04:00"
        },
        {
            id: 969,
            username: "m1guelpf",
            first_name: "Miguel",
            last_name: "Piedrafita",
            status: "working on too many projects",
            description: "18-year-old maker",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/06/14/02._Render.jpg",
            streak: 0,
            timezone: "Europe/Madrid",
            week_tda: 2,
            twitter_handle: "m1guelpf",
            instagram_handle: "",
            product_hunt_handle: "m1guelpf",
            github_handle: "m1guelpf",
            telegram_handle: "m1guelpf",
            nomadlist_handle: "",
            bmc_handle: "m1guelpf",
            header:
                "https://ik.imagekit.io/makerlog/media/uploads/headers/2018/12/02/background.jpg",
            is_staff: false,
            donor: true,
            shipstreams_handle: "m1guelpf",
            website: "https://miguelpiedrafita.com",
            tester: false,
            is_live: false,
            digest: false,
            gold: true,
            accent: "#47E0A0",
            maker_score: 469,
            dark_mode: true,
            weekends_off: false,
            hardcore_mode: true,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/27/4569c4fe-93c0-4cc4-8b6c-a907a935f731.jpg",
            date_joined: "2018-12-02T10:29:27-04:00"
        },
        {
            id: 1351,
            username: "ricard",
            first_name: "._.",
            last_name: "",
            status: null,
            description: "",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2019/06/19/a.png",
            streak: 9,
            timezone: "Asia/Tokyo",
            week_tda: 1,
            twitter_handle: "",
            instagram_handle: "",
            product_hunt_handle: "",
            github_handle: "",
            telegram_handle: "",
            nomadlist_handle: null,
            bmc_handle: "",
            header:
                "https://ik.imagekit.io/makerlog/media/uploads/headers/2019/04/07/Artboard.png",
            is_staff: false,
            donor: true,
            shipstreams_handle: "",
            website: "",
            tester: false,
            is_live: false,
            digest: false,
            gold: true,
            accent: "#83ff98",
            maker_score: 1259,
            dark_mode: true,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: true,
            og_image: null,
            date_joined: "2019-01-01T10:05:03-04:00"
        },
        {
            id: 1070,
            username: "lori",
            first_name: "Lori",
            last_name: "Karikari",
            status: null,
            description: "web dev and ops",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/02/29/IMG_20200210_131130_4055221726763142286.jpg",
            streak: 134,
            timezone: "Europe/Paris",
            week_tda: 2,
            twitter_handle: "LoriKarikari",
            instagram_handle: "lorikarikari",
            product_hunt_handle: "lorikarikari",
            github_handle: "lorikarikari",
            telegram_handle: "lorikarikari",
            nomadlist_handle: null,
            bmc_handle: "",
            header: null,
            is_staff: false,
            donor: false,
            shipstreams_handle: "",
            website: "",
            tester: false,
            is_live: false,
            digest: false,
            gold: true,
            accent: "#9a35ce",
            maker_score: 639,
            dark_mode: true,
            weekends_off: true,
            hardcore_mode: false,
            email_notifications: false,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/27/56a71db0-00b9-470e-9be0-86e29a4c34b8.jpg",
            date_joined: "2018-12-12T08:49:09.353972-04:00"
        },
        {
            id: 3593,
            username: "keni",
            first_name: "Keni",
            last_name: "",
            status: null,
            description: "Under Construction",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2019/09/01/15525_2.jpg",
            streak: 0,
            timezone: "America/New_York",
            week_tda: 2,
            twitter_handle: "",
            instagram_handle: "",
            product_hunt_handle: "",
            github_handle: "",
            telegram_handle: "https://t.me/QeniD",
            nomadlist_handle: null,
            bmc_handle: "",
            header: null,
            is_staff: false,
            donor: false,
            shipstreams_handle: "",
            website: "",
            tester: false,
            is_live: false,
            digest: true,
            gold: true,
            accent: "#47E0A0",
            maker_score: 98,
            dark_mode: false,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: true,
            og_image: null,
            date_joined: "2019-08-07T15:40:09.173843-04:00"
        },
        {
            id: 537,
            username: "jess",
            first_name: "Jess",
            last_name: "Wallace",
            status: null,
            description: "Full Time Job. Part Time Maker 💻",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2018/08/25/1_jG7OUdsX2eHKYxzTWtZXAg_1.jpeg",
            streak: 0,
            timezone: "Europe/London",
            week_tda: 4,
            twitter_handle: "jesswallaceuk",
            instagram_handle: "jesswallaceuk",
            product_hunt_handle: "jesswallaceuk",
            github_handle: "jesswallace94",
            telegram_handle: "jesswallace",
            nomadlist_handle: null,
            bmc_handle: null,
            header:
                "https://ik.imagekit.io/makerlog/media/uploads/headers/2018/08/25/tanvi-malik-449-unsplash.jpg",
            is_staff: false,
            donor: true,
            shipstreams_handle: "jesswallaceuk",
            website: null,
            tester: false,
            is_live: false,
            digest: true,
            gold: true,
            accent: "#7f54f5",
            maker_score: 0,
            dark_mode: true,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: true,
            og_image: null,
            date_joined: "2018-08-25T03:58:24-04:00"
        },
        {
            id: 1011,
            username: "brandonfearing",
            first_name: "Brandon",
            last_name: "Fearing",
            status: null,
            description: "Making it work.",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2019/10/15/Engineering-FearingBrandon-vert_jUD9K5K.jpg",
            streak: 0,
            timezone: "America/New_York",
            week_tda: 1,
            twitter_handle: "brfearing",
            instagram_handle: "",
            product_hunt_handle: "brandonfearing",
            github_handle: "bfearing18",
            telegram_handle: "",
            nomadlist_handle: null,
            bmc_handle: "DpaBfFQ",
            header:
                "https://ik.imagekit.io/makerlog/media/uploads/headers/2019/10/15/banner_uKRG9e0.jpeg",
            is_staff: false,
            donor: false,
            shipstreams_handle: "bfearing",
            website: "https://brandonfearing.com",
            tester: false,
            is_live: false,
            digest: true,
            gold: true,
            accent: "#47E0A0",
            maker_score: 0,
            dark_mode: false,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: true,
            og_image: null,
            date_joined: "2018-12-06T12:52:13.144350-04:00"
        },
        {
            id: 5812,
            username: "jorgesworld",
            first_name: "",
            last_name: "",
            status: null,
            description: "",
            verified: false,
            private: false,
            avatar:
                "https://gravatar.com/avatar/2b36aa889673c4214787530fdd0ec7eb?s=150&d=mm&r=pg",
            streak: 0,
            timezone: "America/Puerto_Rico",
            week_tda: 1,
            twitter_handle: null,
            instagram_handle: null,
            product_hunt_handle: null,
            github_handle: null,
            telegram_handle: null,
            nomadlist_handle: null,
            bmc_handle: null,
            header: null,
            is_staff: false,
            donor: false,
            shipstreams_handle: null,
            website: null,
            tester: false,
            is_live: false,
            digest: true,
            gold: true,
            accent: "#00A676",
            maker_score: 0,
            dark_mode: false,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/06/09/d57b7feb-06c6-4072-96c0-2b916d6f6d9c.jpg",
            date_joined: "2020-06-05T14:15:16-04:00"
        },
        {
            id: 1018,
            username: "pradipcloud",
            first_name: "Pradip",
            last_name: "Khakhar",
            status: null,
            description: "Founder - The Product Angle",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2019/01/15/Photo_CLEAR_Pradip_Profile_Nov18.png",
            streak: 0,
            timezone: "America/New_York",
            week_tda: 0,
            twitter_handle: "pradipcloud",
            instagram_handle: "pradipcloud",
            product_hunt_handle: "pradipcloud",
            github_handle: "",
            telegram_handle: "Pradipcloud",
            nomadlist_handle: "",
            bmc_handle: "",
            header:
                "https://ik.imagekit.io/makerlog/media/uploads/headers/2020/03/09/Linkedin_header_1.png",
            is_staff: false,
            donor: false,
            shipstreams_handle: "",
            website: "https://theproductangle.com",
            tester: false,
            is_live: false,
            digest: true,
            gold: true,
            accent: "#47E0A0",
            maker_score: 0,
            dark_mode: false,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/06/01/239916c9-3c2b-4005-9a3d-81cbfd82356c.jpg",
            date_joined: "2018-12-06T21:20:45.344767-04:00"
        },
        {
            id: 442,
            username: "arnavpuri",
            first_name: "Arnav",
            last_name: "Puri",
            status: null,
            description: "Love to try new things while building something",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2018/10/13/IMG_2258_FpjPdne.JPG",
            streak: 0,
            timezone: "Asia/Calcutta",
            week_tda: 1,
            twitter_handle: "arnavpuri",
            instagram_handle: "arnav_puri",
            product_hunt_handle: null,
            github_handle: "arnavpuri",
            telegram_handle: null,
            nomadlist_handle: null,
            bmc_handle: null,
            header:
                "https://ik.imagekit.io/makerlog/media/uploads/headers/2019/01/19/undraw_programming_2svr.png",
            is_staff: false,
            donor: false,
            shipstreams_handle: "arnavpuri",
            website: null,
            tester: false,
            is_live: false,
            digest: true,
            gold: true,
            accent: "#FFCE83",
            maker_score: 124,
            dark_mode: false,
            weekends_off: true,
            hardcore_mode: false,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/05/30/3a401605-0690-445e-ba22-6cc1a635bf11.jpg",
            date_joined: "2018-07-29T05:48:39-04:00"
        },
        {
            id: 5865,
            username: "moul",
            first_name: "Manfred",
            last_name: "Touron",
            status: null,
            description: "Coding every day since 2014",
            verified: false,
            private: false,
            avatar:
                "https://gravatar.com/avatar/da14d5cef42c8142d3d40286f28f29bd?s=150&d=mm&r=pg",
            streak: 20,
            timezone: "Europe/Paris",
            week_tda: 5,
            twitter_handle: "moul",
            instagram_handle: "",
            product_hunt_handle: "m42am",
            github_handle: "moul",
            telegram_handle: "",
            nomadlist_handle: "moul",
            bmc_handle: "moul",
            header: null,
            is_staff: false,
            donor: false,
            shipstreams_handle: "moul42",
            website: "https://manfred.life",
            tester: false,
            is_live: false,
            digest: true,
            gold: true,
            accent: "#ff00e8",
            maker_score: 652,
            dark_mode: false,
            weekends_off: false,
            hardcore_mode: true,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/28/f93dce71-8d38-40b7-bce4-41bbd869afe4.jpg",
            date_joined: "2020-06-15T08:18:59.081300-04:00"
        },
        {
            id: 1290,
            username: "pixelbart",
            first_name: "Kevin",
            last_name: "",
            status: null,
            description: "german php developer",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2019/07/15/Kevin_Avatar_DpOJ8zW.png",
            streak: 187,
            timezone: "Europe/Berlin",
            week_tda: 3,
            twitter_handle: "randlocher",
            instagram_handle: "",
            product_hunt_handle: "",
            github_handle: "pixelbart",
            telegram_handle: "B34rd",
            nomadlist_handle: "",
            bmc_handle: "pixelbart",
            header:
                "https://ik.imagekit.io/makerlog/media/uploads/headers/2019/07/15/no-mans-sky-vector-landscape-4k-ea.jpg",
            is_staff: false,
            donor: false,
            shipstreams_handle: "",
            website: "https://en.pixelbart.de/",
            tester: false,
            is_live: false,
            digest: false,
            gold: true,
            accent: "#47E0A0",
            maker_score: 669,
            dark_mode: false,
            weekends_off: true,
            hardcore_mode: false,
            email_notifications: false,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/09/7c1f75f5-28a5-4ac9-896f-f667595b80bc.jpg",
            date_joined: "2018-12-31T04:29:49-04:00"
        },
        {
            id: 5475,
            username: "damon",
            first_name: "Damon",
            last_name: "Chen",
            status: null,
            description: "A lonely dev at lonely.dev",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/04/30/IMG_8B54AD0F8DA3-1.jpeg",
            streak: 1,
            timezone: "America/Los_Angeles",
            week_tda: 1,
            twitter_handle: "xianmingchen",
            instagram_handle: null,
            product_hunt_handle: "xianmingchen",
            github_handle: null,
            telegram_handle: null,
            nomadlist_handle: null,
            bmc_handle: null,
            header: null,
            is_staff: false,
            donor: false,
            shipstreams_handle: null,
            website: "https://lonely.dev",
            tester: false,
            is_live: false,
            digest: true,
            gold: true,
            accent: "#00A676",
            maker_score: 54,
            dark_mode: false,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/22/d1b85663-d05f-49b3-b897-720f01b38853.jpg",
            date_joined: "2020-04-30T00:42:06-04:00"
        },
        {
            id: 2086,
            username: "andrey_torus",
            first_name: "Torus",
            last_name: "Andrey",
            status: null,
            description: "Work on my side project oneclicktest.com",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2019/02/23/1130f80f-6073-48c4-b1d7-73b5ecae02c7-profile_image-300x300_keMHXPr.png",
            streak: 291,
            timezone: "Europe/Moscow",
            week_tda: 1,
            twitter_handle: "torus_andrey",
            instagram_handle: "",
            product_hunt_handle: "andrey_torus",
            github_handle: "",
            telegram_handle: "",
            nomadlist_handle: null,
            bmc_handle: "torus",
            header:
                "https://ik.imagekit.io/makerlog/media/uploads/headers/2019/03/23/Bitmap88.png",
            is_staff: false,
            donor: false,
            shipstreams_handle: "",
            website: "https://oneclicktest.com",
            tester: false,
            is_live: false,
            digest: false,
            gold: true,
            accent: "#ffd600",
            maker_score: 1157,
            dark_mode: false,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/05/01/03632f0b-7411-436a-a34b-5ecd7676afc7.jpg",
            date_joined: "2019-02-23T09:17:24.012365-04:00"
        },
        {
            id: 1542,
            username: "sjm",
            first_name: "Sebastian",
            last_name: "",
            status: null,
            description: "",
            verified: false,
            private: false,
            avatar:
                "https://gravatar.com/avatar/1b5932cc7e2636fad9671535433c34eb?s=150&d=mm&r=pg",
            streak: 1,
            timezone: "Europe/Berlin",
            week_tda: 1,
            twitter_handle: "buk",
            instagram_handle: "",
            product_hunt_handle: "buk",
            github_handle: "sebastianbachmann",
            telegram_handle: "",
            nomadlist_handle: null,
            bmc_handle: null,
            header: null,
            is_staff: false,
            donor: false,
            shipstreams_handle: null,
            website: null,
            tester: false,
            is_live: false,
            digest: false,
            gold: true,
            accent: "#47E0A0",
            maker_score: 17,
            dark_mode: false,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: true,
            og_image: null,
            date_joined: "2019-01-12T06:44:41-04:00"
        },
        {
            id: 3919,
            username: "panphora",
            first_name: "David",
            last_name: "Miranda",
            status: null,
            description: "Build, Rebuild, Edit, Review, Refine",
            verified: false,
            private: false,
            avatar:
                "https://gravatar.com/avatar/2ae31b20104111afcdc07eecb97d1490?s=150&d=mm&r=pg",
            streak: 0,
            timezone: "America/New_York",
            week_tda: 1,
            twitter_handle: "panphora",
            instagram_handle: null,
            product_hunt_handle: "panphora",
            github_handle: "panphora",
            telegram_handle: null,
            nomadlist_handle: null,
            bmc_handle: null,
            header: null,
            is_staff: false,
            donor: false,
            shipstreams_handle: "panphora",
            website: "https://remaketheweb.com",
            tester: false,
            is_live: false,
            digest: false,
            gold: true,
            accent: "#47E0A0",
            maker_score: 46,
            dark_mode: true,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: false,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/02/dae3e4df-a7b4-4ef9-a7bc-83e860a0724a.jpg",
            date_joined: "2019-09-30T11:21:24-04:00"
        },
        {
            id: 2332,
            username: "madeindetroit",
            first_name: "Dylan",
            last_name: "Tanner",
            status: null,
            description: "Dev + soon-to-be digital maker | Made in Detroit",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2019/05/02/profile.jpg",
            streak: 0,
            timezone: "America/Toronto",
            week_tda: 2,
            twitter_handle: "DylanLTanner",
            instagram_handle: "",
            product_hunt_handle: "",
            github_handle: "",
            telegram_handle: "DylanLTanner",
            nomadlist_handle: null,
            bmc_handle: null,
            header:
                "https://ik.imagekit.io/makerlog/media/uploads/headers/2019/04/06/20140810-IMG_6783.jpg",
            is_staff: false,
            donor: false,
            shipstreams_handle: null,
            website: null,
            tester: false,
            is_live: false,
            digest: true,
            gold: true,
            accent: "#4cb33f",
            maker_score: 0,
            dark_mode: false,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: true,
            og_image: null,
            date_joined: "2019-03-26T00:26:59.014349-04:00"
        },
        {
            id: 2718,
            username: "hector",
            first_name: "Héctor M.",
            last_name: "Soto-Fortuño",
            status: null,
            description: "A generalist.",
            verified: true,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/03/04/78695310_10220163520099672_7787104457329737728_n.jpg",
            streak: 92,
            timezone: "America/Puerto_Rico",
            week_tda: 6,
            twitter_handle: "hsotofortuno",
            instagram_handle: "hectormanuelsoto",
            product_hunt_handle: "",
            github_handle: "",
            telegram_handle: "",
            nomadlist_handle: "",
            bmc_handle: "",
            header: null,
            is_staff: false,
            donor: false,
            shipstreams_handle: "",
            website: "",
            tester: false,
            is_live: false,
            digest: true,
            gold: true,
            accent: "#ffffff",
            maker_score: 337,
            dark_mode: true,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/27/13a837d0-5379-45d5-b1f0-67e1f6a3c37d.jpg",
            date_joined: "2019-05-15T13:07:27-04:00"
        },
        {
            id: 5337,
            username: "baadier",
            first_name: "Baadier",
            last_name: "Sydow",
            status: null,
            description: "",
            verified: false,
            private: false,
            avatar:
                "https://gravatar.com/avatar/6c0254a267386813d654c5bbf046429e?s=150&d=mm&r=pg",
            streak: 0,
            timezone: "Africa/Johannesburg",
            week_tda: 1,
            twitter_handle: "baadier",
            instagram_handle: "",
            product_hunt_handle: "",
            github_handle: "",
            telegram_handle: "",
            nomadlist_handle: "",
            bmc_handle: "",
            header: null,
            is_staff: false,
            donor: false,
            shipstreams_handle: "",
            website: "",
            tester: false,
            is_live: false,
            digest: true,
            gold: true,
            accent: "#00a676",
            maker_score: 0,
            dark_mode: true,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/11/50b42798-d129-461a-8599-c95b2f011ae3.jpg",
            date_joined: "2020-04-12T20:31:31.817538-04:00"
        },
        {
            id: 2453,
            username: "kamban",
            first_name: "Kamban",
            last_name: "S",
            status: null,
            description: "Bars are illusion",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2019/04/28/myAvatar2.png",
            streak: 0,
            timezone: "Asia/Calcutta",
            week_tda: 1,
            twitter_handle: "kambanthemaker",
            instagram_handle: "",
            product_hunt_handle: "",
            github_handle: "",
            telegram_handle: "",
            nomadlist_handle: "",
            bmc_handle: "",
            header: null,
            is_staff: false,
            donor: false,
            shipstreams_handle: "",
            website: "",
            tester: false,
            is_live: false,
            digest: true,
            gold: true,
            accent: "#47E0A0",
            maker_score: 32,
            dark_mode: false,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/06/be96f24e-b010-41fd-bda8-dbfb91153c72.jpg",
            date_joined: "2019-04-06T11:35:37-04:00"
        },
        {
            id: 4300,
            username: "veitpro",
            first_name: "Veit",
            last_name: "Progl",
            status: null,
            description: "developer of LogBot - Indie web / App dev",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/03/11/icon-512x512.png",
            streak: 173,
            timezone: "Europe/Berlin",
            week_tda: 2,
            twitter_handle: "VoxelVoxels",
            instagram_handle: "veit.pro",
            product_hunt_handle: "",
            github_handle: "Veeit",
            telegram_handle: "Veitpro",
            nomadlist_handle: "",
            bmc_handle: "veit",
            header: null,
            is_staff: false,
            donor: false,
            shipstreams_handle: "",
            website: "https://www.veit.pro",
            tester: false,
            is_live: false,
            digest: true,
            gold: true,
            accent: "#b6ff54",
            maker_score: 1055,
            dark_mode: false,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/27/55cd635c-5587-4b9c-8a0d-bd8aad61ed34.jpg",
            date_joined: "2020-01-01T04:55:34.454192-04:00"
        },
        {
            id: 587,
            username: "jivings",
            first_name: "James",
            last_name: "Ivings",
            status: null,
            description: "Writing stuff to help people with @dinkydani21 ❤️",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2018/09/25/4_JKON2r_400x400.jpg",
            streak: 0,
            timezone: "UTC",
            week_tda: 1,
            twitter_handle: "jamesivings",
            instagram_handle: "jamesivings",
            product_hunt_handle: "jamesivings",
            github_handle: "Jivings",
            telegram_handle: "jivings",
            nomadlist_handle: null,
            bmc_handle: null,
            header:
                "https://ik.imagekit.io/makerlog/media/uploads/headers/2018/09/20/cover2.png",
            is_staff: false,
            donor: false,
            shipstreams_handle: null,
            website: null,
            tester: true,
            is_live: false,
            digest: true,
            gold: true,
            accent: "#c826d2",
            maker_score: 189,
            dark_mode: false,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/05/29/4065d8d3-cc75-4e2d-aed0-0fa7062cb0e9.jpg",
            date_joined: "2018-09-20T10:13:16-04:00"
        },
        {
            id: 2463,
            username: "saifadin",
            first_name: "Osamah",
            last_name: "Aldoaiss",
            status: null,
            description: "Developing great experiences",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2019/08/07/profile.png",
            streak: 427,
            timezone: "Europe/Berlin",
            week_tda: 1,
            twitter_handle: "saifadin",
            instagram_handle: "saifadin",
            product_hunt_handle: "osamah_aldoaiss",
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
            maker_score: 2046,
            dark_mode: true,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/25/741a5e36-2f9e-47b2-92cf-d02a83aa7d1a.jpg",
            date_joined: "2019-04-07T11:40:50.802524-04:00"
        },
        {
            id: 737,
            username: "joshmanders",
            first_name: "Josh",
            last_name: "Manders",
            status: "making appmetrics.co",
            description: "Developing simple solutions to complex problems",
            verified: false,
            private: false,
            avatar:
                "https://gravatar.com/avatar/683b295c5aa896e68c4ea23c8668113e?s=150&d=mm&r=pg",
            streak: 16,
            timezone: "America/Chicago",
            week_tda: 1,
            twitter_handle: "joshmanders",
            instagram_handle: null,
            product_hunt_handle: "joshmanders",
            github_handle: "joshmanders",
            telegram_handle: "joshmanders",
            nomadlist_handle: null,
            bmc_handle: "joshmanders",
            header:
                "https://ik.imagekit.io/makerlog/media/uploads/headers/2020/03/03/Dubuque_Facebook.png",
            is_staff: false,
            donor: true,
            shipstreams_handle: "joshmanders",
            website: "https://joshmanders.com",
            tester: false,
            is_live: false,
            digest: true,
            gold: true,
            accent: "#47E0A0",
            maker_score: 157,
            dark_mode: true,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/28/87f18bc5-71b4-4df6-8011-a7b2174148aa.jpg",
            date_joined: "2018-11-01T18:43:52-04:00"
        },
        {
            id: 3599,
            username: "ibnu",
            first_name: "Ibnu",
            last_name: "Masud",
            status: null,
            description: "UX/UI Designer",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2019/09/02/6F_q4ZNu_400x400.jpg",
            streak: 3,
            timezone: "Asia/Jakarta",
            week_tda: 1,
            twitter_handle: "sudutlancip",
            instagram_handle: "sudutlancip",
            product_hunt_handle: "ibnu",
            github_handle: null,
            telegram_handle: "sudutlancip",
            nomadlist_handle: null,
            bmc_handle: null,
            header:
                "https://ik.imagekit.io/makerlog/media/uploads/headers/2019/08/08/5_d8dRGPo.png",
            is_staff: false,
            donor: false,
            shipstreams_handle: null,
            website: "http://sebostudio.com",
            tester: false,
            is_live: false,
            digest: false,
            gold: true,
            accent: "#3429d1",
            maker_score: 47,
            dark_mode: true,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/21/6bdc1869-c917-4165-98b3-9373723ee821.jpg",
            date_joined: "2019-08-08T13:47:04-04:00"
        },
        {
            id: 5411,
            username: "typebuilder",
            first_name: "",
            last_name: "",
            status: null,
            description: "",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/04/24/twitter.png",
            streak: 0,
            timezone: "America/Chicago",
            week_tda: 1,
            twitter_handle: "typebuilder",
            instagram_handle: "",
            product_hunt_handle: "",
            github_handle: "",
            telegram_handle: "",
            nomadlist_handle: "",
            bmc_handle: "",
            header: null,
            is_staff: false,
            donor: false,
            shipstreams_handle: "",
            website: "",
            tester: false,
            is_live: false,
            digest: false,
            gold: true,
            accent: "#00a676",
            maker_score: 17,
            dark_mode: false,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/06/30/274bd16a-6d6e-4620-9a11-f8c3674d1860.jpg",
            date_joined: "2020-04-21T09:59:55.175838-04:00"
        },
        {
            id: 2525,
            username: "gera",
            first_name: "Oleg",
            last_name: "Gera",
            status: null,
            description: "Building products - one commit at a time",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2019/04/13/profile-bw.jpg",
            streak: 89,
            timezone: "Europe/Riga",
            week_tda: 2,
            twitter_handle: "gerlv",
            instagram_handle: "",
            product_hunt_handle: "",
            github_handle: "",
            telegram_handle: "gerlv",
            nomadlist_handle: "",
            bmc_handle: "OlegGera",
            header:
                "https://ik.imagekit.io/makerlog/media/uploads/headers/2019/04/13/photo-1462007361476-49e695345154.jpeg",
            is_staff: false,
            donor: false,
            shipstreams_handle: "",
            website: "https://oleggera.com",
            tester: false,
            is_live: false,
            digest: true,
            gold: true,
            accent: "#47E0A0",
            maker_score: 274,
            dark_mode: false,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/27/e936bed4-23b9-4966-98cf-124fd47e4699.jpg",
            date_joined: "2019-04-12T15:15:58.550958-04:00"
        },
        {
            id: 2555,
            username: "nickyhajal",
            first_name: "Nicky",
            last_name: "Hajal",
            status: null,
            description: "",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2019/11/01/nicky-sq.png",
            streak: 20,
            timezone: "Europe/Madrid",
            week_tda: 1,
            twitter_handle: "nickyhajal",
            instagram_handle: "nickyhajal",
            product_hunt_handle: "nickyhajal",
            github_handle: "nickyhajal",
            telegram_handle: "nickyhajal",
            nomadlist_handle: null,
            bmc_handle: "",
            header: null,
            is_staff: false,
            donor: false,
            shipstreams_handle: "nickyhajal",
            website: "https://nickyhajal.com",
            tester: false,
            is_live: false,
            digest: true,
            gold: true,
            accent: "#47E0A0",
            maker_score: 304,
            dark_mode: false,
            weekends_off: true,
            hardcore_mode: false,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/27/72604540-df1e-4ee1-9fcf-b53537dddd94.jpg",
            date_joined: "2019-04-18T23:43:16.851087-04:00"
        },
        {
            id: 2581,
            username: "bmweinstein7",
            first_name: "Brendan",
            last_name: "Weinstein",
            status: null,
            description: "",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2019/07/08/BMW_PIC_2019_06_12_22_22_41_UTC_qhzsC8R.png",
            streak: 0,
            timezone: "America/New_York",
            week_tda: 2,
            twitter_handle: "bmweinstein7",
            instagram_handle: "bmweinstein7",
            product_hunt_handle: "bmweinstein",
            github_handle: "bmweinstein7",
            telegram_handle: "bmweinstein",
            nomadlist_handle: "bmweinstein7",
            bmc_handle: "bmweinstein",
            header: null,
            is_staff: false,
            donor: false,
            shipstreams_handle: "beemer777",
            website: "https://www.linkedin.com/in/brendanweinstein",
            tester: false,
            is_live: false,
            digest: true,
            gold: true,
            accent: "#1ac7b2",
            maker_score: 44,
            dark_mode: true,
            weekends_off: true,
            hardcore_mode: false,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/14/6030cfcf-750c-466d-b14e-edea0f21fe98.jpg",
            date_joined: "2019-04-23T03:24:27.064371-04:00"
        },
        {
            id: 1916,
            username: "narrvv",
            first_name: "Arav",
            last_name: "Narula",
            status: null,
            description: "Your Average Neighborhood Arav!",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/07/09/21000033.jfif",
            streak: 131,
            timezone: "America/Toronto",
            week_tda: 4,
            twitter_handle: "tregsthedev",
            instagram_handle: "IamAravnarula",
            product_hunt_handle: "tregsthedev",
            github_handle: "Iamtregsthedev",
            telegram_handle: "AravWearingaMask",
            nomadlist_handle: "levelsio",
            bmc_handle: "arav",
            header:
                "https://ik.imagekit.io/makerlog/media/uploads/headers/2019/04/26/photo-1550072506-3b89058dbd99.jpeg",
            is_staff: false,
            donor: false,
            shipstreams_handle: "aravnarula1",
            website: "https://aravnarula.design",
            tester: false,
            is_live: false,
            digest: true,
            gold: true,
            accent: "#006eff",
            maker_score: 851,
            dark_mode: true,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/25/f8f4584b-3112-483a-bcc8-90cbe0e5d46f.jpg",
            date_joined: "2019-01-25T18:21:36.680067-04:00"
        },
        {
            id: 2916,
            username: "flabernardez",
            first_name: "Flavia",
            last_name: "Bernárdez",
            status: null,
            description: "Designer becoming a Service/Product Designer",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2020/07/06/avatar_flavia_bernardez_1000px_recortada.jpg",
            streak: 4,
            timezone: "Europe/Madrid",
            week_tda: 1,
            twitter_handle: "flabernardez",
            instagram_handle: "flabernardez",
            product_hunt_handle: "flavia_bernardez",
            github_handle: "flabernardez",
            telegram_handle: "flabernardez",
            nomadlist_handle: "",
            bmc_handle: "flabernardez",
            header:
                "https://ik.imagekit.io/makerlog/media/uploads/headers/2019/08/20/1500x500.jpeg",
            is_staff: false,
            donor: false,
            shipstreams_handle: "flabernardez",
            website: "https://flabernardez.com",
            tester: false,
            is_live: false,
            digest: true,
            gold: true,
            accent: "#eddf87",
            maker_score: 146,
            dark_mode: false,
            weekends_off: true,
            hardcore_mode: false,
            email_notifications: true,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/27/373e9307-ab77-4e56-8f0a-ff8c3e8230e5.jpg",
            date_joined: "2019-06-14T16:47:34.066463-04:00"
        },
        {
            id: 687,
            username: "micahiverson",
            first_name: "Micah",
            last_name: "Iverson",
            status: null,
            description: "Indie Maker / Designer / Developer @ krazier.com",
            verified: false,
            private: false,
            avatar:
                "https://ik.imagekit.io/makerlog/media/uploads/avatars/2019/11/14/Micah_Iverson_Yellow.jpg",
            streak: 405,
            timezone: "America/Denver",
            week_tda: 1,
            twitter_handle: "micahiverson",
            instagram_handle: "",
            product_hunt_handle: "micahiverson",
            github_handle: "micahiverson",
            telegram_handle: "",
            nomadlist_handle: "",
            bmc_handle: "micahiverson",
            header:
                "https://ik.imagekit.io/makerlog/media/uploads/headers/2019/12/19/Dots.jpg",
            is_staff: false,
            donor: true,
            shipstreams_handle: "micah_iverson",
            website: "https://www.krazier.com",
            tester: true,
            is_live: false,
            digest: false,
            gold: true,
            accent: "#47E0A0",
            maker_score: 1143,
            dark_mode: false,
            weekends_off: false,
            hardcore_mode: false,
            email_notifications: false,
            og_image:
                "https://ik.imagekit.io/makerlog/media/uploads/og/2020/07/27/47f25786-caee-42c0-a10d-e53952c0ed6d.jpg",
            date_joined: "2018-10-23T15:21:46-04:00"
        }
    ]
};

class GoldPage extends React.Component {
    componentDidMount() {
        this.props.forceDark(true);
    }

    componentWillUnmount() {
        this.props.forceDark(this.props.userGold);
    }

    onClickBuy = () => {
        Paddle.Checkout.open({
            product: config.PADDLE_PRODUCT,
            email: this.props.email
        });
    };

    getItems = () => {
        return shuffle([
            ...items.users.map(u => {
                u.type = "user";
                return u;
            }),
            ...items.products

                .map(p => {
                    if (!p.icon) return undefined;
                    p.type = "product";
                    return p;
                })
                .filter(p => p !== undefined)
        ]);
    };

    render() {
        return (
            <div className="GoldPage">
                <div className="hero-container">
                    <div className="people-grid-bg">
                        {this.getItems().map(i => {
                            switch (i.type) {
                                case "user":
                                    return (
                                        <div>
                                            <Avatar
                                                key={i.id}
                                                is={128}
                                                user={i}
                                            />
                                        </div>
                                    );

                                case "product":
                                    return (
                                        <div>
                                            <ProductIcon
                                                key={i.slug}
                                                is={128}
                                                product={i}
                                            />
                                        </div>
                                    );
                            }
                        })}
                    </div>
                    <div className="container">
                        <div className="flex">
                            <div className="col">
                                <div className="flex flex-column flex-v-gap">
                                    <div>
                                        <h1 className="gold-color animated fadeInDown">
                                            <GoldIcon /> Gold
                                        </h1>
                                    </div>
                                    <div>
                                        <p>
                                            <strong>
                                                It's time to level up your maker
                                                journey.
                                            </strong>
                                            <br />
                                            Ship faster and get exclusive
                                            features for just $5/mo.
                                        </p>
                                    </div>
                                    <div>
                                        <button
                                            onClick={this.onClickBuy}
                                            className="btn is-gold"
                                        >
                                            Get Gold
                                        </button>
                                    </div>
                                </div>
                                <img
                                    className="real-svg"
                                    style={{
                                        filter: "invert(40%)",
                                        opacity: "1"
                                    }}
                                    src="/img/gold/real-gold.svg"
                                />
                            </div>
                            <div className="col"></div>
                        </div>
                    </div>
                </div>
                <div className="explanation-hero">
                    <div className="container">
                        <div className="top-copy">
                            <center>
                                <h1>Ship better products, faster.</h1>
                                <p>
                                    Makerlog Gold is our exclusive package with
                                    incredible features to help keep you
                                    shippin'.
                                </p>
                            </center>
                        </div>
                        <div className="feature-showcase">
                            <div className="text-case right">
                                <h3>A kickass dark mode.</h3>
                                <p>
                                    Join the dark side with an absolutely
                                    stunning, handcrafted dark mode.
                                </p>
                            </div>
                            <div
                                className="image-case"
                                style={{ paddingBottom: 0 }}
                            >
                                <img src="/img/gold/dark-mode.png" alt="" />
                            </div>
                        </div>

                        <div className="feature-showcase">
                            <div className="image-case">placeholder</div>
                            <div className="text-case left">
                                <h3>Features that empower you.</h3>
                                <p>
                                    Tell your achievements to the community with{" "}
                                    <strong>milestones</strong>.<br /> Reach
                                    more makers by{" "}
                                    <strong>featuring your product</strong>.
                                    <br />
                                    Save time with{" "}
                                    <strong>recurring tasks</strong>.<br />{" "}
                                    Share more with <strong>video</strong>.
                                </p>
                            </div>
                        </div>

                        <div className="feature-showcase">
                            <div className="text-case right">
                                <h3>Supports the maker movement.</h3>
                                <p>
                                    Makerlog is shipped by people just like you.
                                    <br />
                                    Your support helps an indie startup empower
                                    makers from all over the world.
                                </p>
                            </div>
                            <div className="image-case">photographer pic</div>
                        </div>
                    </div>
                </div>

                <div className="explanation-hero bg">
                    <div className="container">
                        <div className="top-copy">
                            <center>
                                <h1 className="has-text-gold">The Gold Club</h1>
                                <p>Our amazing Gold makers are here.</p>
                            </center>
                        </div>

                        <div className="large-user-list flex flex-gap">
                            {orderBy(
                                this.getItems().filter(i => i.type === "user"),
                                "date_joined",
                                "desc"
                            ).map(u => (
                                <div className="user">
                                    <Link
                                        route="profile-page"
                                        params={{ username: u.username }}
                                    >
                                        <a>
                                            <img src={u.avatar} alt="" />
                                        </a>
                                    </Link>
                                    <div>
                                        <h3>
                                            <FullName user={u} />
                                        </h3>
                                        <p>{u.description}</p>
                                        <div className="flex flex-gap-half center v-center">
                                            {u.twitter_handle ? (
                                                <div>
                                                    <OutboundLink
                                                        to={`https://twitter.com/${u.twitter_handle}`}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={[
                                                                "fab",
                                                                "twitter"
                                                            ]}
                                                        />
                                                    </OutboundLink>
                                                </div>
                                            ) : null}
                                            {u.instagram_handle ? (
                                                <div>
                                                    <OutboundLink
                                                        to={`https://twitter.com/${u.instagram_handle}`}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={[
                                                                "fab",
                                                                "instagram"
                                                            ]}
                                                        />
                                                    </OutboundLink>
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="final-cta">
                    <div className="container">
                        <div className="flex flex-column flex-v-gap ">
                            <div>
                                <h2>It's time to start a new journey.</h2>
                                <p>Come ship with us.</p>
                            </div>
                            <div>
                                <button
                                    onClick={this.onClickBuy}
                                    className="btn is-gold"
                                >
                                    Get Gold
                                </button>
                            </div>
                            <div>
                                <p className="help">
                                    <strong>Coming from WIP?</strong>{" "}
                                    <Link route="contact">
                                        <a>Message us</a>
                                    </Link>
                                    , we'll migrate your tasks for free.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        userGold: state.user.me ? state.user.me.dark_mode : false,
        email: state.user.me ? state.user.me.email : null
    }),
    dispatch => ({
        forceDark: dark => dispatch(appActions.forceDark(dark))
    })
)(GoldPage);
