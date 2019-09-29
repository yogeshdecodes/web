import React from "react";
import Page from "layouts/Page";
import styled from "styled-components";
import UserContainer from "~/features/users/containers/UserContainer";

const HomeHero = styled.div`
    color: ${props => props.theme.primaryDarker} !important;
`;

const ThumbnailGrid = styled.div`
    display: flex;
    position: absolute;
    right: 0px;
    width: 100%;
    flex-wrap: wrap;
    top: 0px;
    height: 100%;
    z-index: 4;
    background-position: center;
    overflow: hidden;

    .image {
        flex: 1;
        min-height: 40px;
        min-width: 40px;
        max-height: 40px;
        max-width: 40px;
        height: auto;
        overflow: hidden;
    }
    .image > img {
        min-height: 40px;
        min-width: 40px;
        height: auto;
    }
`;

const ThumbnailCover = styled.div`
    display: flex;
    position: absolute;
    right: 0px;
    width: 100%;
    flex-wrap: wrap;
    top: 0px;
    overflow: hidden;
    height: 100%;
    z-index: 6;
    background-color: rgba(83, 175, 135, 0.9);
`;

export default () => (
    <Page nav={false} footer={false} contained={false}>
        <ThumbnailGrid>
            <UserContainer
                all
                component={({ user }) =>
                    user.map(u => {
                        let data = [
                            {
                                id: 151,
                                name: "QaRCode",
                                slug: "qarcode",
                                user: 679,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 645,
                                        name: "QaRCode",
                                        private: false,
                                        user: 679
                                    },
                                    {
                                        id: 646,
                                        name: "SideProject",
                                        private: false,
                                        user: 679
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "Messenger Bot for Car owners",
                                created_at: "2018-10-20T14:56:30.122641+05:30",
                                launched_at: null
                            },
                            {
                                id: 10,
                                name: "Venture Cost",
                                slug: "venture-cost",
                                user: 73,
                                product_hunt: "",
                                twitter: "https://twitter.com/venturecost",
                                website: "https://venturecost.com",
                                projects: [
                                    {
                                        id: 115,
                                        name: "venturecost",
                                        private: false,
                                        user: 73
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/20/logo-800-circle.png",
                                description:
                                    "Track and Explore the Real Cost of Travel",
                                created_at: "2018-08-25T05:20:05.568090+05:30",
                                launched_at: null
                            },
                            {
                                id: 153,
                                name: "DirsApp",
                                slug: "dirsapp",
                                user: 512,
                                product_hunt: "",
                                twitter: "",
                                website: "dirsapp.com",
                                projects: [
                                    {
                                        id: 651,
                                        name: "dirsapp",
                                        private: false,
                                        user: 512
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "Directory of service providers",
                                created_at: "2018-10-21T13:21:26.316718+05:30",
                                launched_at: null
                            },
                            {
                                id: 7,
                                name: "KanbanMail",
                                slug: "kanbanmail",
                                user: 26,
                                product_hunt:
                                    "https://www.producthunt.com/posts/kanbanmail",
                                twitter: "KanbanMail",
                                website: "https://kanbanmail.app",
                                projects: [
                                    {
                                        id: 95,
                                        name: "KanbanMail",
                                        private: false,
                                        user: 26
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/11/logo_9MGj3yz.gif",
                                description:
                                    "A Kanban board for your emails! ✨💌",
                                created_at: "2018-08-25T05:03:00.118489+05:30",
                                launched_at: "2018-10-11T20:09:44.973935+05:30"
                            },
                            {
                                id: 155,
                                name: "Shipmapp",
                                slug: "shipmapp",
                                user: 684,
                                product_hunt: "",
                                twitter: "shipmapp",
                                website: "https://www.shipm.app",
                                projects: [
                                    {
                                        id: 658,
                                        name: "shipmapp",
                                        private: false,
                                        user: 684
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/22/logo-square-768x768.png",
                                description:
                                    "Create and share simple product roadmaps",
                                created_at: "2018-10-22T19:33:01.381432+05:30",
                                launched_at: "2018-10-22T19:33:01.377141+05:30"
                            },
                            {
                                id: 26,
                                name: "BRKR",
                                slug: "brkr",
                                user: 439,
                                product_hunt:
                                    "https://www.producthunt.com/posts/brkr",
                                twitter: "BRKR_xyz",
                                website: "https://brkr.xyz",
                                projects: [
                                    {
                                        id: 232,
                                        name: "brkr",
                                        private: false,
                                        user: 439
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/08/26/38404767_1619550738174333_6254425350319636480_o.png",
                                description:
                                    "It's lot's like your completely own broker.",
                                created_at: "2018-08-26T20:42:48.169036+05:30",
                                launched_at: "2018-08-26T21:18:41.652053+05:30"
                            },
                            {
                                id: 9,
                                name: "Get Shott",
                                slug: "get-shott",
                                user: 439,
                                product_hunt:
                                    "https://www.producthunt.com/posts/shott",
                                twitter: "getShott",
                                website: "https://get.shott.xyz",
                                projects: [
                                    {
                                        id: 288,
                                        name: "shott",
                                        private: false,
                                        user: 439
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/08/24/logo_LTGMRRI.png",
                                description:
                                    "Make the world a prettier place, one image at a time!",
                                created_at: "2018-08-25T05:08:29.302436+05:30",
                                launched_at: "2018-08-26T21:18:46.979919+05:30"
                            },
                            {
                                id: 27,
                                name: "IronMic",
                                slug: "ironmic",
                                user: 17,
                                product_hunt:
                                    "https://www.producthunt.com/posts/ironmic",
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
                                    "https://api.getmakerlog.com/media/uploads/2018/08/26/avatar.png",
                                description: "Podcasting websites made simple",
                                created_at: "2018-08-27T00:13:05.587316+05:30",
                                launched_at: "2018-08-27T00:13:05.582303+05:30"
                            },
                            {
                                id: 28,
                                name: "LinuxJobs.io",
                                slug: "linuxjobsio",
                                user: 543,
                                product_hunt: "",
                                twitter: "linuxjobsio",
                                website: "https://www.linuxjobs.io",
                                projects: [
                                    {
                                        id: 331,
                                        name: "linuxjobsio",
                                        private: false,
                                        user: 543
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/08/27/linuxjobs-io-logo.png",
                                description:
                                    "LinuxJobs.io: Free and Open Source Software Jobs in the US",
                                created_at: "2018-08-27T14:43:26.083163+05:30",
                                launched_at: null
                            },
                            {
                                id: 8,
                                name: "Makerlog",
                                slug: "makerlog",
                                user: 1,
                                product_hunt: "producthunt.com/posts/makerlog",
                                twitter: "getmakerlog",
                                website: "getmakerlog.com",
                                projects: [
                                    {
                                        id: 1,
                                        name: "Makerlog",
                                        private: false,
                                        user: 1
                                    },
                                    {
                                        id: 4,
                                        name: "Makerlog_Bugs",
                                        private: false,
                                        user: 1
                                    },
                                    {
                                        id: 5,
                                        name: "makerlog_ideas",
                                        private: false,
                                        user: 1
                                    },
                                    {
                                        id: 6,
                                        name: "Makerlog_Refactoring",
                                        private: false,
                                        user: 1
                                    },
                                    {
                                        id: 8,
                                        name: "makerlog_performance",
                                        private: false,
                                        user: 1
                                    },
                                    {
                                        id: 21,
                                        name: "Makerlog_After_MVP",
                                        private: false,
                                        user: 1
                                    },
                                    {
                                        id: 22,
                                        name: "makerlog_ux",
                                        private: false,
                                        user: 1
                                    },
                                    {
                                        id: 23,
                                        name: "makerlog_commits",
                                        private: false,
                                        user: 1
                                    },
                                    {
                                        id: 26,
                                        name: "makerlog_this_weekend",
                                        private: false,
                                        user: 1
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/08/24/6595bb6a-9798-4714-8ef0-cb053a41c27a.gif",
                                description: "It helps you get things done. ✌️",
                                created_at: "2018-08-25T05:04:45.992312+05:30",
                                launched_at: "2018-08-25T05:04:45.987730+05:30"
                            },
                            {
                                id: 11,
                                name: "Code The Web",
                                slug: "code-the-web",
                                user: 26,
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
                                    "https://api.getmakerlog.com/media/uploads/2018/08/24/icon1.png",
                                description:
                                    "Web development explained for normal people",
                                created_at: "2018-08-25T05:21:40.920744+05:30",
                                launched_at: "2018-08-25T05:21:40.916938+05:30"
                            },
                            {
                                id: 12,
                                name: "Bookman",
                                slug: "bookman",
                                user: 325,
                                product_hunt:
                                    "https://www.producthunt.com/posts/bookman",
                                twitter: "https://twitter.com/usebookman",
                                website: "https://usebookman.com/",
                                projects: [
                                    {
                                        id: 240,
                                        name: "bookman",
                                        private: false,
                                        user: 325
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/08/25/icon.png",
                                description: "Read books via email",
                                created_at: "2018-08-25T06:45:54.146770+05:30",
                                launched_at: "2018-08-25T06:45:54.142031+05:30"
                            },
                            {
                                id: 16,
                                name: "PlayParty",
                                slug: "playparty",
                                user: 9,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 82,
                                        name: "playparty",
                                        private: false,
                                        user: 9
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/08/25/if_Music-Equalizer_379343.png",
                                description:
                                    "Internet broadcasting system powered by YouTube",
                                created_at: "2018-08-25T11:57:11.862438+05:30",
                                launched_at: null
                            },
                            {
                                id: 14,
                                name: "Halal Vaca",
                                slug: "halal-vaca",
                                user: 534,
                                product_hunt: "",
                                twitter: "",
                                website: "http://m.me/halalvaca",
                                projects: [
                                    {
                                        id: 317,
                                        name: "HalalVaca",
                                        private: false,
                                        user: 534
                                    },
                                    {
                                        id: 318,
                                        name: "MadebyRula",
                                        private: false,
                                        user: 534
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/08/25/halalvaca.PNG",
                                description:
                                    "City guide on Messenger for muslim when travel to foreign city",
                                created_at: "2018-08-25T09:28:08.692118+05:30",
                                launched_at: null
                            },
                            {
                                id: 17,
                                name: "Startup Name Check",
                                slug: "startup-name-check",
                                user: 247,
                                product_hunt:
                                    "producthunt.com/posts/startup-name-check",
                                twitter:
                                    "spekulatius1984/status/988342340711366657",
                                website: "https://startupnamecheck.com",
                                projects: [
                                    {
                                        id: 179,
                                        name: "startupnamecheck",
                                        private: false,
                                        user: 247
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/08/25/fa-list-dark.png",
                                description:
                                    "Startup Name Check does the hard work of checking names for your startup or side project on all platforms you wish. Over 50 domain names and social media networks are supported.",
                                created_at: "2018-08-25T12:24:51.386060+05:30",
                                launched_at: "2018-08-25T12:24:51.382953+05:30"
                            },
                            {
                                id: 19,
                                name: "Attendy",
                                slug: "attendy",
                                user: 284,
                                product_hunt: "",
                                twitter: "GetAttendy",
                                website: "attendy.co",
                                projects: [
                                    {
                                        id: 264,
                                        name: "Attendy",
                                        private: false,
                                        user: 284
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/08/25/attendy.png",
                                description:
                                    "Easily invite people for your events and respond to events you’ve been invited to.",
                                created_at: "2018-08-25T15:08:04.838060+05:30",
                                launched_at: null
                            },
                            {
                                id: 20,
                                name: "esling-config-amanhimself",
                                slug: "esling-config-amanhimself",
                                user: 539,
                                product_hunt: "",
                                twitter: "amanhimself",
                                website:
                                    "https://www.npmjs.com/search?q=eslint-config-amanhimself",
                                projects: [
                                    {
                                        id: 324,
                                        name: "eslintRnApps",
                                        private: false,
                                        user: 539
                                    }
                                ],
                                launched: true,
                                icon: null,
                                description:
                                    "It's a code-lint utility that takes care of linting in your React Native and Expo applications.",
                                created_at: "2018-08-25T17:28:48.653562+05:30",
                                launched_at: "2018-08-25T17:28:48.650225+05:30"
                            },
                            {
                                id: 21,
                                name: "Dripform",
                                slug: "dripform",
                                user: 29,
                                product_hunt:
                                    "https://www.producthunt.com/posts/dripform",
                                twitter: "0xferruccio",
                                website: "dripform.ga",
                                projects: [
                                    {
                                        id: 136,
                                        name: "dripform",
                                        private: false,
                                        user: 29
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/08/25/logo_J4jax2D.png",
                                description: "Feedback forms on Telegram",
                                created_at: "2018-08-25T23:08:30.819866+05:30",
                                launched_at: "2018-08-25T23:08:46.392181+05:30"
                            },
                            {
                                id: 22,
                                name: "Glitch'd",
                                slug: "glitchd",
                                user: 1,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 327,
                                        name: "glitchd",
                                        private: false,
                                        user: 1
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/08/26/giphy_1.gif",
                                description:
                                    "An API for aesthetically pleasing glitch gifs! (still at idea stage)",
                                created_at: "2018-08-26T07:52:46.377482+05:30",
                                launched_at: null
                            },
                            {
                                id: 23,
                                name: "Invincible Tricking",
                                slug: "invincible-tricking",
                                user: 218,
                                product_hunt: "",
                                twitter: "invincibletrick",
                                website: "http://invincibletricking.co/",
                                projects: [
                                    {
                                        id: 194,
                                        name: "invincibletricking",
                                        private: false,
                                        user: 218
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/08/26/makerlog-logo.png",
                                description:
                                    "A clothing and media brand for the sport of tricking",
                                created_at: "2018-08-26T15:52:42.498387+05:30",
                                launched_at: "2018-08-26T15:52:42.495130+05:30"
                            },
                            {
                                id: 25,
                                name: "Glim",
                                slug: "glim",
                                user: 408,
                                product_hunt: "",
                                twitter: "glimapp",
                                website: "https://glim.app",
                                projects: [
                                    {
                                        id: 193,
                                        name: "glim",
                                        private: false,
                                        user: 408
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/08/26/Profile_Mint.png",
                                description:
                                    "The social network for all your ideas 💡",
                                created_at: "2018-08-26T20:37:43.398601+05:30",
                                launched_at: null
                            },
                            {
                                id: 31,
                                name: "Newslettery",
                                slug: "newslettery",
                                user: 537,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 333,
                                        name: "newslettery",
                                        private: false,
                                        user: 537
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "An application to help you find newsletters to add to your daily updates",
                                created_at: "2018-08-27T20:45:41.235200+05:30",
                                launched_at: null
                            },
                            {
                                id: 37,
                                name: "Progress Dashboard",
                                slug: "eternity",
                                user: 23,
                                product_hunt: "",
                                twitter: "progressdash",
                                website: "https://progressdash.com",
                                projects: [
                                    {
                                        id: 97,
                                        name: "eternity",
                                        private: false,
                                        user: 23
                                    },
                                    {
                                        id: 447,
                                        name: "progressdash",
                                        private: false,
                                        user: 23
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/08/29/eternity_1024.png",
                                description:
                                    "Task and Time Progress in Chrome New Tab",
                                created_at: "2018-08-29T15:18:11.153710+05:30",
                                launched_at: null
                            },
                            {
                                id: 35,
                                name: "Milk CMS",
                                slug: "milk-cms",
                                user: 544,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 338,
                                        name: "MilkCMS",
                                        private: false,
                                        user: 544
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "A headless content management system",
                                created_at: "2018-08-29T05:46:23.120542+05:30",
                                launched_at: null
                            },
                            {
                                id: 36,
                                name: "Codemason",
                                slug: "codemason",
                                user: 549,
                                product_hunt:
                                    "https://www.producthunt.com/posts/codemason",
                                twitter: "codemasonhq",
                                website: "codemason.io",
                                projects: [
                                    {
                                        id: 341,
                                        name: "codemason",
                                        private: false,
                                        user: 549
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/08/29/logo-icon.png",
                                description:
                                    "A cloud platform for hosting apps without the hassle.\r\n\r\nWe get you back to what counts - building amazing products!\r\n\r\nInfrastructure, servers, CI/CD, containers, scaling etc are all a distraction when you have a SaaS to build.",
                                created_at: "2018-08-29T08:40:43.926697+05:30",
                                launched_at: "2018-08-29T08:40:43.922991+05:30"
                            },
                            {
                                id: 32,
                                name: "Abnormal Tribe Podcast",
                                slug: "abnormal-tribe-podcast",
                                user: 450,
                                product_hunt: "",
                                twitter: "",
                                website:
                                    "https://soundcloud.com/abnormaltribepodcast",
                                projects: [
                                    {
                                        id: 256,
                                        name: "AbnormalTribePodcast",
                                        private: false,
                                        user: 450
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/08/28/abnormaltribe.jpg",
                                description:
                                    "A podcast following my group of friends, as they quite literally change the world.\r\n\r\nhttps://soundcloud.com/abnormaltribepodcast\r\nAbnormaltribe.com",
                                created_at: "2018-08-28T16:29:03.440868+05:30",
                                launched_at: "2018-08-28T16:30:29.198516+05:30"
                            },
                            {
                                id: 38,
                                name: "Emoji Tweeter",
                                slug: "emoji-tweeter",
                                user: 23,
                                product_hunt:
                                    "https://www.producthunt.com/posts/emoji-tweeter",
                                twitter: "",
                                website: "https://emojitweeter.netlify.com",
                                projects: [
                                    {
                                        id: 237,
                                        name: "claptweeter",
                                        private: false,
                                        user: 23
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/08/29/icon96.png",
                                description: "Tweet with all the emojis",
                                created_at: "2018-08-29T15:20:55.141154+05:30",
                                launched_at: "2018-08-29T15:20:55.138159+05:30"
                            },
                            {
                                id: 30,
                                name: "Harvy",
                                slug: "harvy",
                                user: 22,
                                product_hunt: "",
                                twitter: "getharvy",
                                website: "harvy.app",
                                projects: [
                                    {
                                        id: 224,
                                        name: "harvy",
                                        private: false,
                                        user: 22
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/01/Logo-White-Background.jpg",
                                description:
                                    "Personalized playlists that match your run",
                                created_at: "2018-08-27T18:37:58.055521+05:30",
                                launched_at: null
                            },
                            {
                                id: 44,
                                name: "snipper",
                                slug: "snipper",
                                user: 32,
                                product_hunt:
                                    "https://www.producthunt.com/posts/snipper",
                                twitter: "achuth_hadnoor",
                                website: "snipper.netlify.com",
                                projects: [
                                    {
                                        id: 347,
                                        name: "developer_tools",
                                        private: false,
                                        user: 32
                                    },
                                    {
                                        id: 348,
                                        name: "productivity",
                                        private: false,
                                        user: 32
                                    },
                                    {
                                        id: 349,
                                        name: "code_snippets",
                                        private: false,
                                        user: 32
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/08/31/logo.PNG",
                                description:
                                    "a code snippet manager on menubar",
                                created_at: "2018-08-31T18:54:26.502938+05:30",
                                launched_at: "2018-08-31T18:54:26.499005+05:30"
                            },
                            {
                                id: 43,
                                name: "BicycleList",
                                slug: "bicyclelist",
                                user: 553,
                                product_hunt: "",
                                twitter: "im_nimi",
                                website: "",
                                projects: [
                                    {
                                        id: 345,
                                        name: "bikelist",
                                        private: false,
                                        user: 553
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/08/31/logo.png",
                                description:
                                    "A list of best places to go for long bicycle trips",
                                created_at: "2018-08-31T16:16:46.332516+05:30",
                                launched_at: null
                            },
                            {
                                id: 18,
                                name: "Drafty",
                                slug: "drafty",
                                user: 135,
                                product_hunt:
                                    "https://www.producthunt.com/posts/drafty",
                                twitter: "usedrafty",
                                website: "https://drafty.app",
                                projects: [
                                    {
                                        id: 311,
                                        name: "drafty",
                                        private: false,
                                        user: 135
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/08/27/S052ltzV_400x400.jpeg",
                                description:
                                    "A place to draft content, and then share it.",
                                created_at: "2018-08-25T12:35:25.954873+05:30",
                                launched_at: "2018-09-17T20:58:52.167833+05:30"
                            },
                            {
                                id: 24,
                                name: "Pencil To Pixel",
                                slug: "pencil-to-pixel",
                                user: 218,
                                product_hunt: "",
                                twitter: "",
                                website: "http://penciltopixel.studio/",
                                projects: [
                                    {
                                        id: 325,
                                        name: "PencilToPixel",
                                        private: false,
                                        user: 218
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/08/26/pencil-to-pixel-makerlog-logo.png",
                                description:
                                    "Short, effective video courses on illustration, design, and lettering",
                                created_at: "2018-08-26T16:00:42.404620+05:30",
                                launched_at: "2018-09-23T17:54:02.860688+05:30"
                            },
                            {
                                id: 40,
                                name: "gitbird",
                                slug: "gitbird",
                                user: 439,
                                product_hunt:
                                    "https://www.producthunt.com/posts/gitbird",
                                twitter: "gitbird",
                                website: "gitbird.work",
                                projects: [
                                    {
                                        id: 330,
                                        name: "gitbird",
                                        private: false,
                                        user: 439
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/04/logo-large-round.png",
                                description: "Tweet your commits",
                                created_at: "2018-08-29T20:31:07.728796+05:30",
                                launched_at: "2018-10-04T20:06:17.424662+05:30"
                            },
                            {
                                id: 157,
                                name: "Docsbook",
                                slug: "docsbook",
                                user: 677,
                                product_hunt: "",
                                twitter: "",
                                website: "https://docsbook.co",
                                projects: [
                                    {
                                        id: 667,
                                        name: "Wiki",
                                        private: false,
                                        user: 677
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/22/icon-left-font.png",
                                description: "A google docs powered wiki",
                                created_at: "2018-10-23T01:18:42.963077+05:30",
                                launched_at: null
                            },
                            {
                                id: 66,
                                name: "hellonext",
                                slug: "hellonext",
                                user: 583,
                                product_hunt:
                                    "https://www.producthunt.com/posts/hellonext",
                                twitter: "hellonexthq",
                                website: "hellonext.co",
                                projects: [
                                    {
                                        id: 466,
                                        name: "hellonext",
                                        private: false,
                                        user: 583
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/03/logomark.png",
                                description: "Product Feedback Manager",
                                created_at: "2018-09-18T02:46:38.070601+05:30",
                                launched_at: "2018-09-23T18:37:02.065877+05:30"
                            },
                            {
                                id: 47,
                                name: "FlowTuner",
                                slug: "flowtuner",
                                user: 479,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 355,
                                        name: "flowtuner",
                                        private: false,
                                        user: 479
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "A productivity-focused music player for YouTube",
                                created_at: "2018-09-01T20:02:24.849935+05:30",
                                launched_at: null
                            },
                            {
                                id: 87,
                                name: "Strongify",
                                slug: "strongify",
                                user: 611,
                                product_hunt: "",
                                twitter: "",
                                website: "www.strongify.app",
                                projects: [
                                    {
                                        id: 490,
                                        name: "app",
                                        private: false,
                                        user: 611
                                    },
                                    {
                                        id: 487,
                                        name: "Gym",
                                        private: false,
                                        user: 611
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/09/28/Icon-App-iTunes.png",
                                description: "Workout tracker app",
                                created_at: "2018-09-28T13:13:12.301005+05:30",
                                launched_at: "2018-12-06T02:23:54.322570+05:30"
                            },
                            {
                                id: 13,
                                name: "NodeHost",
                                slug: "nodehost",
                                user: 5,
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
                                    "https://api.getmakerlog.com/media/uploads/2018/08/25/logo.png",
                                description:
                                    "A web hosting service that is next generation.",
                                created_at: "2018-08-25T07:59:25.593683+05:30",
                                launched_at: "2018-09-02T14:15:19.966014+05:30"
                            },
                            {
                                id: 50,
                                name: "sayhenlo",
                                slug: "sayhenlo",
                                user: 30,
                                product_hunt: "",
                                twitter: "sayhenlo",
                                website: "sayhenlo.com",
                                projects: [
                                    {
                                        id: 367,
                                        name: "sh",
                                        private: false,
                                        user: 30
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "100% decentralized social network",
                                created_at: "2018-09-05T00:49:56.395856+05:30",
                                launched_at: null
                            },
                            {
                                id: 51,
                                name: "Rental Boardgame",
                                slug: "rental-boardgame",
                                user: 41,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 374,
                                        name: "rental_bg_commits",
                                        private: false,
                                        user: 41
                                    },
                                    {
                                        id: 375,
                                        name: "rental_boardgames",
                                        private: false,
                                        user: 41
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "A system for boardgames shops show, manage and rent their boardgame library.",
                                created_at: "2018-09-06T17:39:09.332095+05:30",
                                launched_at: null
                            },
                            {
                                id: 52,
                                name: "Ludoteca",
                                slug: "ludoteca",
                                user: 41,
                                product_hunt: "",
                                twitter: "ludotecabgc",
                                website: "www.ludoteca.com.br",
                                projects: [
                                    {
                                        id: 131,
                                        name: "ludoteca",
                                        private: false,
                                        user: 41
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/09/06/22085d3212.png",
                                description:
                                    "A phisical and online enterprise of boardgames.",
                                created_at: "2018-09-06T17:41:33.254116+05:30",
                                launched_at: "2018-09-06T17:41:33.250505+05:30"
                            },
                            {
                                id: 29,
                                name: "Klipped.in",
                                slug: "ccopyme",
                                user: 29,
                                product_hunt:
                                    "https://www.producthunt.com/posts/klipped-in",
                                twitter: "",
                                website: "klipped.in",
                                projects: [
                                    {
                                        id: 332,
                                        name: "ccopyme",
                                        private: false,
                                        user: 29
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/08/27/klipped-icon_qMtFfo9.png",
                                description: "Appear.in for your clipboard",
                                created_at: "2018-08-27T14:57:22.793432+05:30",
                                launched_at: "2018-09-07T12:36:24.158641+05:30"
                            },
                            {
                                id: 53,
                                name: "Al Garete",
                                slug: "al-garete",
                                user: 569,
                                product_hunt: "",
                                twitter: "",
                                website: "https://www.algaretepr.com",
                                projects: [
                                    {
                                        id: 382,
                                        name: "algarete",
                                        private: false,
                                        user: 569
                                    },
                                    {
                                        id: 383,
                                        name: "787",
                                        private: false,
                                        user: 569
                                    },
                                    {
                                        id: 387,
                                        name: "quepapelon",
                                        private: false,
                                        user: 569
                                    },
                                    {
                                        id: 388,
                                        name: "superalo",
                                        private: false,
                                        user: 569
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/09/09/Al_Garete_Logo.png",
                                description:
                                    "Al Garete is a Puerto Rican clothing line.",
                                created_at: "2018-09-09T01:40:08.050158+05:30",
                                launched_at: null
                            },
                            {
                                id: 55,
                                name: "Ecomjet.ru",
                                slug: "ecomjetru",
                                user: 394,
                                product_hunt: "",
                                twitter: "",
                                website: "ecomjet.ru",
                                projects: [
                                    {
                                        id: 390,
                                        name: "ecomjet",
                                        private: false,
                                        user: 394
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Generate static mobile e-commerce site from YML products export",
                                created_at: "2018-09-10T14:33:41.686075+05:30",
                                launched_at: null
                            },
                            {
                                id: 56,
                                name: "xProject",
                                slug: "xproject",
                                user: 522,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 393,
                                        name: "xProject",
                                        private: false,
                                        user: 522
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "Saas",
                                created_at: "2018-09-11T00:50:21.041287+05:30",
                                launched_at: null
                            },
                            {
                                id: 57,
                                name: "jolimail",
                                slug: "jolimail",
                                user: 405,
                                product_hunt: "",
                                twitter: "jolimailsaas",
                                website: "jolimail.io",
                                projects: [
                                    {
                                        id: 354,
                                        name: "catapulte",
                                        private: false,
                                        user: 405
                                    },
                                    {
                                        id: 247,
                                        name: "jolimail",
                                        private: false,
                                        user: 405
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/09/11/Logo.png",
                                description:
                                    "responsive transactional email templates, the easy way",
                                created_at: "2018-09-12T02:12:37.714862+05:30",
                                launched_at: null
                            },
                            {
                                id: 58,
                                name: "YaIP",
                                slug: "yaip",
                                user: 576,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 402,
                                        name: "yaip",
                                        private: false,
                                        user: 576
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Yet another Intranet Portal - an open source Intranet portal for the enterprise because WordPress isn't a portal and SharePoint is a disaster",
                                created_at: "2018-09-13T08:31:36.985884+05:30",
                                launched_at: null
                            },
                            {
                                id: 59,
                                name: "Codename Enki",
                                slug: "codename-enki",
                                user: 8,
                                product_hunt: "",
                                twitter: "enki_project",
                                website: "",
                                projects: [
                                    {
                                        id: 404,
                                        name: "enki",
                                        private: false,
                                        user: 8
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Creating the next-gen social interaction.",
                                created_at: "2018-09-13T08:57:02.251162+05:30",
                                launched_at: null
                            },
                            {
                                id: 63,
                                name: "AdvisorBOB",
                                slug: "advisorbob",
                                user: 578,
                                product_hunt: "",
                                twitter: "",
                                website: "advisorbob.com",
                                projects: [
                                    {
                                        id: 412,
                                        name: "finance",
                                        private: false,
                                        user: 578
                                    },
                                    {
                                        id: 413,
                                        name: "advisors",
                                        private: false,
                                        user: 578
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/09/15/advisor-bob.png",
                                description:
                                    "Manage RIA fees and performance tracking",
                                created_at: "2018-09-15T12:14:14.342478+05:30",
                                launched_at: "2018-09-15T12:14:14.336810+05:30"
                            },
                            {
                                id: 68,
                                name: "Lanes",
                                slug: "lanes",
                                user: 585,
                                product_hunt: "",
                                twitter: "lanestodo",
                                website: "https://lanes.io",
                                projects: [
                                    {
                                        id: 438,
                                        name: "lanes",
                                        private: false,
                                        user: 585
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/09/18/lanes-logo-new-bold.png",
                                description: "Superpower your productivity.",
                                created_at: "2018-09-18T16:34:28.967174+05:30",
                                launched_at: "2018-09-18T16:34:28.963879+05:30"
                            },
                            {
                                id: 67,
                                name: "MLtube",
                                slug: "mltube",
                                user: 584,
                                product_hunt: "",
                                twitter: "",
                                website: "mltube.video",
                                projects: [
                                    {
                                        id: 434,
                                        name: "machinelearning",
                                        private: false,
                                        user: 584
                                    },
                                    {
                                        id: 435,
                                        name: "deeplearning",
                                        private: false,
                                        user: 584
                                    },
                                    {
                                        id: 436,
                                        name: "ai",
                                        private: false,
                                        user: 584
                                    },
                                    {
                                        id: 437,
                                        name: "videos",
                                        private: false,
                                        user: 584
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/09/19/imageedit_2_8229884531.png",
                                description:
                                    "Curates the best videos on Machine Learning, Deep Learning and AI.",
                                created_at: "2018-09-18T13:06:36.098093+05:30",
                                launched_at: null
                            },
                            {
                                id: 70,
                                name: "Upload",
                                slug: "upload",
                                user: 590,
                                product_hunt: "producthunt.com/posts/upload-fm",
                                twitter: "uploadfm",
                                website: "upload.fm",
                                projects: [
                                    {
                                        id: 446,
                                        name: "upload",
                                        private: false,
                                        user: 590
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/09/22/0e3daa22e1b487ec360b99438b436096.png",
                                description: "Post podcasts to social media",
                                created_at: "2018-09-22T08:17:24.328232+05:30",
                                launched_at: "2018-09-22T08:17:24.317900+05:30"
                            },
                            {
                                id: 71,
                                name: "Automaily",
                                slug: "automaily",
                                user: 592,
                                product_hunt: "",
                                twitter: "automaily",
                                website: "automaily.com",
                                projects: [
                                    {
                                        id: 448,
                                        name: "saas",
                                        private: false,
                                        user: 592
                                    },
                                    {
                                        id: 449,
                                        name: "stripe",
                                        private: false,
                                        user: 592
                                    },
                                    {
                                        id: 450,
                                        name: "emails",
                                        private: false,
                                        user: 592
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/09/22/if_19_1236348.png",
                                description:
                                    "Helps SaaS builders sent good onboarding and dunning emails",
                                created_at: "2018-09-22T11:05:12.110742+05:30",
                                launched_at: null
                            },
                            {
                                id: 72,
                                name: "Coven",
                                slug: "coven",
                                user: 593,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 451,
                                        name: "forum",
                                        private: false,
                                        user: 593
                                    },
                                    {
                                        id: 452,
                                        name: "opensource",
                                        private: false,
                                        user: 593
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Embeddable forums for elixir projects",
                                created_at: "2018-09-22T12:21:08.102895+05:30",
                                launched_at: null
                            },
                            {
                                id: 73,
                                name: "Keep all the things",
                                slug: "keep-all-the-things",
                                user: 593,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 453,
                                        name: "books",
                                        private: false,
                                        user: 593
                                    },
                                    {
                                        id: 454,
                                        name: "reading",
                                        private: false,
                                        user: 593
                                    },
                                    {
                                        id: 455,
                                        name: "community",
                                        private: false,
                                        user: 593
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/09/22/katt-256.png",
                                description: "Online book club",
                                created_at: "2018-09-22T12:21:59.034858+05:30",
                                launched_at: null
                            },
                            {
                                id: 74,
                                name: "Task.Async",
                                slug: "taskasync",
                                user: 593,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 452,
                                        name: "opensource",
                                        private: false,
                                        user: 593
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Platform to get more developers involved in open source within the Elixir community",
                                created_at: "2018-09-22T15:20:33.792603+05:30",
                                launched_at: null
                            },
                            {
                                id: 75,
                                name: "Colin",
                                slug: "colin",
                                user: 587,
                                product_hunt: "",
                                twitter: "squarecatwebdev",
                                website:
                                    "https://www.producthunt.com/upcoming/colin",
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
                                    "https://api.getmakerlog.com/media/uploads/2018/09/22/logo.png",
                                description:
                                    "A Telegram Bot that keeps your crypto portfolio balanced",
                                created_at: "2018-09-22T15:34:26.445948+05:30",
                                launched_at: null
                            },
                            {
                                id: 69,
                                name: "UptimeBar",
                                slug: "uptimebar",
                                user: 587,
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
                                    "https://api.getmakerlog.com/media/uploads/2018/09/20/appicon.png",
                                description:
                                    "A simple OS X menu bar app that notifies you if any of your websites are down.",
                                created_at: "2018-09-20T16:16:00.720552+05:30",
                                launched_at: "2018-09-22T15:35:40.146437+05:30"
                            },
                            {
                                id: 76,
                                name: "TeleDone",
                                slug: "teledone",
                                user: 596,
                                product_hunt: "",
                                twitter: "",
                                website: "http://www.teledon.com",
                                projects: [
                                    {
                                        id: 459,
                                        name: "Telegram",
                                        private: false,
                                        user: 596
                                    },
                                    {
                                        id: 460,
                                        name: "Projectmanagement",
                                        private: false,
                                        user: 596
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/09/22/B7DB60AF-8029-460C-81CD-74F7B6DD7924.png",
                                description:
                                    "Add Project Management features to Telegram",
                                created_at: "2018-09-22T18:47:38.550332+05:30",
                                launched_at: null
                            },
                            {
                                id: 78,
                                name: "RemoteFriendly",
                                slug: "remotefriendly",
                                user: 582,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 465,
                                        name: "RemoteFriendly",
                                        private: false,
                                        user: 582
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "TBD",
                                created_at: "2018-09-23T17:40:34.861175+05:30",
                                launched_at: null
                            },
                            {
                                id: 48,
                                name: "House of Movement",
                                slug: "house-of-movement",
                                user: 218,
                                product_hunt: "",
                                twitter: "movement_house",
                                website: "http://houseofmovement.world/",
                                projects: [
                                    {
                                        id: 328,
                                        name: "HouseOfMovement",
                                        private: false,
                                        user: 218
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/09/01/hom-logo-export-v0.2.png",
                                description:
                                    "A community website for parkour, freerunning, and tricking, including a directory of training locations, online academy, and much more.",
                                created_at: "2018-09-02T00:02:53.746257+05:30",
                                launched_at: "2018-09-23T17:54:09.059600+05:30"
                            },
                            {
                                id: 79,
                                name: "Clojure",
                                slug: "clojure",
                                user: 29,
                                product_hunt: "",
                                twitter: "0xferruccio",
                                website: "",
                                projects: [
                                    {
                                        id: 470,
                                        name: "clj",
                                        private: false,
                                        user: 29
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/09/24/Clojure_logo.svg.png",
                                description: "Improving as a clojure developer",
                                created_at: "2018-09-25T01:19:06.572762+05:30",
                                launched_at: null
                            },
                            {
                                id: 80,
                                name: "quickscreen.co",
                                slug: "quickscreenco",
                                user: 601,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 471,
                                        name: "quickscreen",
                                        private: false,
                                        user: 601
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "Screenshots as a service",
                                created_at: "2018-09-25T03:48:03.433029+05:30",
                                launched_at: null
                            },
                            {
                                id: 39,
                                name: "ChartBrew",
                                slug: "chartbrew",
                                user: 489,
                                product_hunt: "",
                                twitter: "razvanilin",
                                website:
                                    "https://chartbrew.com/?utm_source=makerlog",
                                projects: [
                                    {
                                        id: 246,
                                        name: "chartbrew",
                                        private: false,
                                        user: 489
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/09/25/cb_logo_4_square.png",
                                description:
                                    "Stop being a stranger to your data. Connect your database to ChartBrew and visualize your data in a few simple steps.",
                                created_at: "2018-08-29T20:20:19.851434+05:30",
                                launched_at: "2018-09-25T16:19:10.917394+05:30"
                            },
                            {
                                id: 81,
                                name: "roastMe",
                                slug: "roastme",
                                user: 589,
                                product_hunt: "",
                                twitter: "@roastme_app",
                                website: "roastme.xyz",
                                projects: [
                                    {
                                        id: 472,
                                        name: "roastme",
                                        private: false,
                                        user: 589
                                    },
                                    {
                                        id: 473,
                                        name: "feedback",
                                        private: false,
                                        user: 589
                                    },
                                    {
                                        id: 474,
                                        name: "experts",
                                        private: false,
                                        user: 589
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/09/25/roastme.png",
                                description:
                                    "Feedback marketplace - Give & get expert feedback for your app, product, idea or design!",
                                created_at: "2018-09-25T17:24:19.011107+05:30",
                                launched_at: null
                            },
                            {
                                id: 82,
                                name: "youMake",
                                slug: "youmake",
                                user: 589,
                                product_hunt: "",
                                twitter: "",
                                website: "youmake.live",
                                projects: [
                                    {
                                        id: 475,
                                        name: "streaming",
                                        private: false,
                                        user: 589
                                    },
                                    {
                                        id: 476,
                                        name: "live",
                                        private: false,
                                        user: 589
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/09/25/youmake.png",
                                description:
                                    "Live streaming platform for makers, indie hackers & developers - Live stream how you build your products",
                                created_at: "2018-09-25T17:27:13.772029+05:30",
                                launched_at: null
                            },
                            {
                                id: 83,
                                name: "WithMetrics.com",
                                slug: "withmetricscom",
                                user: 394,
                                product_hunt: "",
                                twitter: "withmetrics",
                                website: "withmetrics.com",
                                projects: [
                                    {
                                        id: 480,
                                        name: "withmetrics",
                                        private: false,
                                        user: 394
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/09/26/2018-09-26_19.28.51.jpg",
                                description:
                                    "Collect feedback and product reviews from your e-commerce customers",
                                created_at: "2018-09-26T21:59:57.706348+05:30",
                                launched_at: null
                            },
                            {
                                id: 84,
                                name: "IronMic",
                                slug: "ironmic-2",
                                user: 6,
                                product_hunt:
                                    "https://www.producthunt.com/posts/ironmic",
                                twitter: "ironmicfm",
                                website: "https://ironmic.fm",
                                projects: [
                                    {
                                        id: 482,
                                        name: "ironmic",
                                        private: false,
                                        user: 6
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/09/27/android-chrome-192x192.png",
                                description: "Podcasting websites made simple",
                                created_at: "2018-09-27T05:43:45.859173+05:30",
                                launched_at: "2018-09-27T05:43:45.854023+05:30"
                            },
                            {
                                id: 85,
                                name: "Sunny Commutes Podcast",
                                slug: "sunny-commutes-podcast",
                                user: 6,
                                product_hunt: "",
                                twitter: "sunnycommutes",
                                website: "https://sunnycommutes.fm/",
                                projects: [
                                    {
                                        id: 483,
                                        name: "sunnycommutes",
                                        private: false,
                                        user: 6
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/09/27/sunny-commutes.jpg",
                                description:
                                    "The worlds of web development and business, combined.",
                                created_at: "2018-09-27T05:45:56.689405+05:30",
                                launched_at: "2018-09-27T05:45:56.686877+05:30"
                            },
                            {
                                id: 86,
                                name: "What To Pack App",
                                slug: "what-to-pack-app",
                                user: 609,
                                product_hunt: "",
                                twitter: "",
                                website: "www.whattopack.app",
                                projects: [
                                    {
                                        id: 485,
                                        name: "reactjs",
                                        private: false,
                                        user: 609
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Helps people pack their bags when traveling.",
                                created_at: "2018-09-28T03:36:51.828289+05:30",
                                launched_at: null
                            },
                            {
                                id: 88,
                                name: "hivis.io",
                                slug: "hivisio",
                                user: 612,
                                product_hunt: "",
                                twitter: "",
                                website: "https://hivis.io",
                                projects: [
                                    {
                                        id: 491,
                                        name: "hivisio",
                                        private: false,
                                        user: 612
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/09/28/hivis.png",
                                description:
                                    "Render any HTML into an image. Write your own code or use our pre-generated templates!",
                                created_at: "2018-09-28T20:46:36.068702+05:30",
                                launched_at: "2018-09-28T20:46:36.064455+05:30"
                            },
                            {
                                id: 45,
                                name: "MealGenerator",
                                slug: "mealgenerator",
                                user: 554,
                                product_hunt: "",
                                twitter: "",
                                website: "https://mealgenerator.me",
                                projects: [
                                    {
                                        id: 350,
                                        name: "mealgenerator",
                                        private: false,
                                        user: 554
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/08/31/hamburger_1f354.png",
                                description:
                                    "🍔 Generate weird and wacky food combanations.",
                                created_at: "2018-09-01T02:59:10.246710+05:30",
                                launched_at: "2018-10-01T02:45:50.014496+05:30"
                            },
                            {
                                id: 120,
                                name: "Free My Desktop",
                                slug: "free-my-desktop",
                                user: 454,
                                product_hunt:
                                    "https://www.producthunt.com/posts/free-my-desktop",
                                twitter: "valentinourbano",
                                website:
                                    "http://www.valentinourbano.com/Free-my-desktop-mac-app.html",
                                projects: [
                                    {
                                        id: 560,
                                        name: "mac",
                                        private: false,
                                        user: 454
                                    },
                                    {
                                        id: 588,
                                        name: "freemydesktop",
                                        private: false,
                                        user: 454
                                    }
                                ],
                                launched: true,
                                icon: null,
                                description:
                                    "Hides all the icons from your desktop with a click",
                                created_at: "2018-10-08T02:29:48.881469+05:30",
                                launched_at: "2018-10-12T03:36:21.754633+05:30"
                            },
                            {
                                id: 64,
                                name: "Scrapfly",
                                slug: "scrapfly",
                                user: 304,
                                product_hunt: "",
                                twitter: "",
                                website: "scrapfly.io",
                                projects: [
                                    {
                                        id: 158,
                                        name: "scrapfly",
                                        private: false,
                                        user: 304
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/09/29/icon.png",
                                description: "Scrapping as service",
                                created_at: "2018-09-16T00:12:31.454466+05:30",
                                launched_at: null
                            },
                            {
                                id: 114,
                                name: "Outbound Olga",
                                slug: "outbound-olga",
                                user: 622,
                                product_hunt:
                                    "https://www.producthunt.com/upcoming/outbound-olga",
                                twitter: "",
                                website: "outboundolga.com",
                                projects: [
                                    {
                                        id: 541,
                                        name: "project",
                                        private: false,
                                        user: 622
                                    },
                                    {
                                        id: 542,
                                        name: "prelaunch",
                                        private: false,
                                        user: 622
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/04/olgalogo.png",
                                description:
                                    "Outreach as a service for early stage founders",
                                created_at: "2018-10-04T21:29:52.498961+05:30",
                                launched_at: null
                            },
                            {
                                id: 91,
                                name: "unearth",
                                slug: "unearth",
                                user: 610,
                                product_hunt: "",
                                twitter: "tryunearth",
                                website: "tryunearth.com",
                                projects: [
                                    {
                                        id: 498,
                                        name: "unearth",
                                        private: false,
                                        user: 610
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/09/30/unearth-logo.png",
                                description:
                                    "The original saved posts management tool.",
                                created_at: "2018-09-30T07:59:33.173153+05:30",
                                launched_at: null
                            },
                            {
                                id: 92,
                                name: "Machine Learning Jobs list",
                                slug: "machine-learning-jobs-list",
                                user: 477,
                                product_hunt: "",
                                twitter: "mljobslist",
                                website: "mljobslist.com",
                                projects: [],
                                launched: true,
                                icon: null,
                                description: "Job portal",
                                created_at: "2018-09-30T13:27:34.752652+05:30",
                                launched_at: "2018-09-30T13:27:34.749827+05:30"
                            },
                            {
                                id: 93,
                                name: "Anna Assistant",
                                slug: "anna-assistant",
                                user: 477,
                                product_hunt:
                                    "https://www.producthunt.com/posts/anna-assistant",
                                twitter: "",
                                website: "anna-assistant.github.io",
                                projects: [
                                    {
                                        id: 501,
                                        name: "virtualassistant",
                                        private: false,
                                        user: 477
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/09/30/gradient_icon.png",
                                description:
                                    "Virtual Assistant for Google Chrome",
                                created_at: "2018-09-30T13:29:04.835958+05:30",
                                launched_at: "2018-09-30T13:29:04.833029+05:30"
                            },
                            {
                                id: 149,
                                name: "FrontBots",
                                slug: "frontbots",
                                user: 676,
                                product_hunt: "",
                                twitter: "frontbots",
                                website: "frontbots.com",
                                projects: [
                                    {
                                        id: 636,
                                        name: "bota",
                                        private: false,
                                        user: 676
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/19/logo-white.png",
                                description:
                                    "Easy create chat bots for collecting data on your website.",
                                created_at: "2018-10-20T02:59:16.077783+05:30",
                                launched_at: "2018-10-20T02:59:16.074505+05:30"
                            },
                            {
                                id: 90,
                                name: "Aaron's Mexico",
                                slug: "aarons-mexico",
                                user: 615,
                                product_hunt: "",
                                twitter: "aaronsmexico",
                                website: "https://aaronsmexico.com",
                                projects: [
                                    {
                                        id: 495,
                                        name: "amx",
                                        private: false,
                                        user: 615
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/09/icon.png",
                                description:
                                    "A guide to the best resorts in Mexico.",
                                created_at: "2018-09-29T23:02:24.694467+05:30",
                                launched_at: null
                            },
                            {
                                id: 97,
                                name: "Open Makers Club",
                                slug: "open-makers-club",
                                user: 51,
                                product_hunt: "",
                                twitter: "",
                                website: "https://openmakers.club",
                                projects: [
                                    {
                                        id: 505,
                                        name: "openmakers",
                                        private: false,
                                        user: 51
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/01/image01-2.jpg",
                                description:
                                    "Makers shipping awesome stuff on the www, in the open",
                                created_at: "2018-10-01T13:00:44.335244+05:30",
                                launched_at: "2018-10-01T13:00:44.326603+05:30"
                            },
                            {
                                id: 98,
                                name: "Break The Internet Music",
                                slug: "break-the-internet-music",
                                user: 51,
                                product_hunt: "",
                                twitter: "",
                                website: "https://breaktheinternetmusic.com",
                                projects: [
                                    {
                                        id: 506,
                                        name: "btimusic",
                                        private: false,
                                        user: 51
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/01/btimusic.jpg",
                                description:
                                    "A place where music makers can collaborate",
                                created_at: "2018-10-01T13:03:24.775138+05:30",
                                launched_at: null
                            },
                            {
                                id: 96,
                                name: "AccessThisAbility",
                                slug: "access-this-ability",
                                user: 51,
                                product_hunt:
                                    "www.producthunt.com/posts/accessthisability",
                                twitter: "",
                                website: "https://accessthisability.com",
                                projects: [
                                    {
                                        id: 504,
                                        name: "accessthisability",
                                        private: false,
                                        user: 51
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/01/image01.jpg",
                                description:
                                    "Accessibility consultancy website",
                                created_at: "2018-10-01T12:51:55.714078+05:30",
                                launched_at: "2018-10-01T13:03:39.877361+05:30"
                            },
                            {
                                id: 99,
                                name: "12Startups",
                                slug: "12startups",
                                user: 51,
                                product_hunt: "",
                                twitter: "",
                                website: "https://12startups.com",
                                projects: [
                                    {
                                        id: 507,
                                        name: "12startups",
                                        private: false,
                                        user: 51
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/01/rocket-icon-vector.png",
                                description:
                                    "12Startups is a free skills bartering community for entrepreneurs, built by entrepreneurs.",
                                created_at: "2018-10-01T13:05:11.850830+05:30",
                                launched_at: "2018-10-01T13:05:11.841446+05:30"
                            },
                            {
                                id: 95,
                                name: "BestRestaurants NZ",
                                slug: "bestrestaurantsconz",
                                user: 51,
                                product_hunt: "",
                                twitter: "",
                                website: "https://bestrestaurants.co.nz",
                                projects: [
                                    {
                                        id: 503,
                                        name: "bestrestaurantsnz",
                                        private: false,
                                        user: 51
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/01/icon.png",
                                description:
                                    "A restaurant review system for New Zealand",
                                created_at: "2018-10-01T12:49:42.278128+05:30",
                                launched_at: null
                            },
                            {
                                id: 102,
                                name: "Adobe Community",
                                slug: "adobe-community",
                                user: 51,
                                product_hunt: "",
                                twitter: "",
                                website: "https://adobecommunity.com",
                                projects: [
                                    {
                                        id: 510,
                                        name: "adobecommunity",
                                        private: false,
                                        user: 51
                                    }
                                ],
                                launched: true,
                                icon: null,
                                description: "A community for Adobe Users",
                                created_at: "2018-10-01T13:17:00.208338+05:30",
                                launched_at: "2018-10-01T13:17:00.206324+05:30"
                            },
                            {
                                id: 103,
                                name: "Squarecat",
                                slug: "squarecat",
                                user: 587,
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
                                    "https://api.getmakerlog.com/media/uploads/2018/10/01/colin-yellow.png",
                                description:
                                    "Squarecat is collectively @jivings and @dinkydani 👫 We write software to help people because it's rewarding and we love doing it, which we think is a good reason to do just about anything ❤️",
                                created_at: "2018-10-01T13:36:00.103143+05:30",
                                launched_at: "2018-10-01T13:36:00.100250+05:30"
                            },
                            {
                                id: 104,
                                name: "1MB",
                                slug: "1mb",
                                user: 30,
                                product_hunt: "",
                                twitter: "DaltonEdwards",
                                website: "https://1mb.site",
                                projects: [],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/01/B8798CDD-7855-4679-98E6-6C8A770ED524.jpeg",
                                description:
                                    "Free website hosting and code sharing platform up to 1MB in size.",
                                created_at: "2018-10-02T01:11:09.151115+05:30",
                                launched_at: "2018-10-02T01:11:09.143980+05:30"
                            },
                            {
                                id: 119,
                                name: "DivJoy",
                                slug: "divjoy",
                                user: 631,
                                product_hunt: "",
                                twitter: "",
                                website: "https://divjoy.com",
                                projects: [
                                    {
                                        id: 556,
                                        name: "divjoy",
                                        private: false,
                                        user: 631
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/05/Screen_Shot_2018-10-05_at_10.42.02_AM.png",
                                description:
                                    "Super fast web app builder with React code export",
                                created_at: "2018-10-05T22:41:12.580792+05:30",
                                launched_at: null
                            },
                            {
                                id: 106,
                                name: "hhlist",
                                slug: "hhlist",
                                user: 624,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 523,
                                        name: "hhlist",
                                        private: false,
                                        user: 624
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "NomadList for bars in SF",
                                created_at: "2018-10-03T04:23:57.503341+05:30",
                                launched_at: null
                            },
                            {
                                id: 105,
                                name: "StartBabbling",
                                slug: "startbabbling",
                                user: 620,
                                product_hunt: "",
                                twitter: "",
                                website: "startbabbling.com",
                                projects: [
                                    {
                                        id: 521,
                                        name: "startbabbling",
                                        private: false,
                                        user: 620
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/02/rect881.png",
                                description:
                                    "Puts people in a private room on Discord so they can practice speaking English",
                                created_at: "2018-10-02T20:21:32.630197+05:30",
                                launched_at: null
                            },
                            {
                                id: 107,
                                name: "Product Hunt Link Bot",
                                slug: "product-hunt-link-bot",
                                user: 621,
                                product_hunt: "",
                                twitter: "",
                                website: "phlink.microproducts.xyz",
                                projects: [],
                                launched: false,
                                icon: null,
                                description:
                                    "Replies to Product Hunt's tweets with link to the direct product.",
                                created_at: "2018-10-03T06:23:48.422590+05:30",
                                launched_at: null
                            },
                            {
                                id: 101,
                                name: "Cancer is a Cunt",
                                slug: "cancer-is-a-cunt",
                                user: 51,
                                product_hunt: "",
                                twitter: "",
                                website: "https://cancerisacunt.org",
                                projects: [
                                    {
                                        id: 509,
                                        name: "cancerisacunt",
                                        private: false,
                                        user: 51
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "Raise money for charity",
                                created_at: "2018-10-01T13:15:43.999402+05:30",
                                launched_at: "2018-10-01T13:15:43.996905+05:30"
                            },
                            {
                                id: 108,
                                name: "BEAM Contacts",
                                slug: "beam-contacts",
                                user: 627,
                                product_hunt: "",
                                twitter: "",
                                website: "https://beamcontacts.com",
                                projects: [
                                    {
                                        id: 533,
                                        name: "beam",
                                        private: false,
                                        user: 627
                                    },
                                    {
                                        id: 534,
                                        name: "beamcontacts",
                                        private: false,
                                        user: 627
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/03/150x150bb.png",
                                description:
                                    "Encrypted real-time contact syncing for professionals.",
                                created_at: "2018-10-03T21:15:42.582959+05:30",
                                launched_at: null
                            },
                            {
                                id: 110,
                                name: "Skcript",
                                slug: "skcript",
                                user: 627,
                                product_hunt: "",
                                twitter: "skcripthq",
                                website: "https://www.skcript.com",
                                projects: [
                                    {
                                        id: 536,
                                        name: "skcript",
                                        private: false,
                                        user: 627
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/03/qGJDhOrb_400x400.jpg",
                                description:
                                    "A progressive technology consulting company.",
                                created_at: "2018-10-04T02:27:58.641950+05:30",
                                launched_at: "2018-10-04T02:27:58.638876+05:30"
                            },
                            {
                                id: 111,
                                name: "Campaign Kit",
                                slug: "campaign-kit",
                                user: 629,
                                product_hunt:
                                    "https://www.producthunt.com/upcoming/campaign-kit",
                                twitter: "CampaignKitHQ",
                                website: "https://campaignkit.co",
                                projects: [
                                    {
                                        id: 537,
                                        name: "campaignkit",
                                        private: false,
                                        user: 629
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/04/logo3x.png",
                                description: "Design Tool",
                                created_at: "2018-10-04T06:32:31.463255+05:30",
                                launched_at: "2018-10-04T06:32:31.458944+05:30"
                            },
                            {
                                id: 100,
                                name: "The Journo List",
                                slug: "the-journo-list",
                                user: 51,
                                product_hunt: "",
                                twitter: "",
                                website: "https://thejournolist.com",
                                projects: [
                                    {
                                        id: 508,
                                        name: "journolist",
                                        private: false,
                                        user: 51
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/01/Screen_Shot_2018-10-01_at_8.43.40_PM.png",
                                description:
                                    "A list of PR resources for your startup to get featured",
                                created_at: "2018-10-01T13:14:22.687081+05:30",
                                launched_at: "2018-10-01T13:14:22.678326+05:30"
                            },
                            {
                                id: 154,
                                name: "IPLocation",
                                slug: "iplocation",
                                user: 454,
                                product_hunt:
                                    "https://www.producthunt.com/upcoming/iplocation",
                                twitter: "valentinourbano",
                                website:
                                    "https://itunes.apple.com/us/app/iplocation-2/id1438343930?ls=1&mt=12",
                                projects: [
                                    {
                                        id: 652,
                                        name: "iplocation",
                                        private: false,
                                        user: 454
                                    }
                                ],
                                launched: true,
                                icon: null,
                                description:
                                    "Keep track of the location of your IP address, automatically, from your menubar.",
                                created_at: "2018-10-21T19:33:47.751083+05:30",
                                launched_at: "2018-11-26T16:55:20.567063+05:30"
                            },
                            {
                                id: 118,
                                name: "BuiltByHer",
                                slug: "builtbyher",
                                user: 537,
                                product_hunt: "",
                                twitter: "builtbyher_io",
                                website: "",
                                projects: [
                                    {
                                        id: 555,
                                        name: "builtbyher",
                                        private: false,
                                        user: 537
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Empowering women to celebrate their products online.",
                                created_at: "2018-10-05T17:52:11.975520+05:30",
                                launched_at: null
                            },
                            {
                                id: 116,
                                name: "Design Tool Time Machine",
                                slug: "design-tool-time-machine",
                                user: 78,
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
                                    "https://api.getmakerlog.com/media/uploads/2018/10/05/pf_7.2018-10-04_22_13_53.gif",
                                description:
                                    "Travel back in time, revisit 12 months of design tool news 🕰",
                                created_at: "2018-10-05T13:01:20.278472+05:30",
                                launched_at: "2018-10-05T13:03:31.199417+05:30"
                            },
                            {
                                id: 123,
                                name: "Quadra",
                                slug: "basegrid",
                                user: 637,
                                product_hunt: "",
                                twitter: "",
                                website: "quadra.pm",
                                projects: [
                                    {
                                        id: 561,
                                        name: "project",
                                        private: false,
                                        user: 637
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/11/220.png",
                                description: "idk yet",
                                created_at: "2018-10-08T05:16:03.962082+05:30",
                                launched_at: null
                            },
                            {
                                id: 112,
                                name: "Ghostboard",
                                slug: "ghostboard",
                                user: 493,
                                product_hunt:
                                    "https://www.producthunt.com/posts/ghostboard-io",
                                twitter: "TryGhostboard",
                                website: "ghostboard.io",
                                projects: [
                                    {
                                        id: 539,
                                        name: "ghostboard",
                                        private: false,
                                        user: 493
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/17/logo-icon.jpg",
                                description: "Analytics for your Ghost blog",
                                created_at: "2018-10-04T21:13:20.132792+05:30",
                                launched_at: "2018-10-17T17:11:25.783170+05:30"
                            },
                            {
                                id: 115,
                                name: "Launched",
                                slug: "launched",
                                user: 631,
                                product_hunt: "",
                                twitter: "",
                                website: "https://launched.app",
                                projects: [
                                    {
                                        id: 543,
                                        name: "launched",
                                        private: false,
                                        user: 631
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/04/Screen_Shot_2018-10-04_at_3.49.21_PM.png",
                                description:
                                    "Insightful interviews with founders of bootstrapped profitable businesses",
                                created_at: "2018-10-05T04:20:16.103065+05:30",
                                launched_at: "2018-10-16T23:00:49.533593+05:30"
                            },
                            {
                                id: 124,
                                name: "Endrive",
                                slug: "endrive",
                                user: 93,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 566,
                                        name: "endrive",
                                        private: false,
                                        user: 93
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/08/endrive_Tk1Z8tC.png",
                                description:
                                    "Connects driving instructors to students",
                                created_at: "2018-10-08T17:32:47.800345+05:30",
                                launched_at: null
                            },
                            {
                                id: 125,
                                name: "children-books",
                                slug: "children-books",
                                user: 623,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 568,
                                        name: "children_books",
                                        private: false,
                                        user: 623
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/08/86px-Documents_icon_-_noun_project_5020_-_navy.svg.png",
                                description:
                                    "Website with children books recommended by parents on multiple parenting online communities (FB groups, subreddits, forums).",
                                created_at: "2018-10-09T01:21:52.955467+05:30",
                                launched_at: null
                            },
                            {
                                id: 126,
                                name: "Magehash",
                                slug: "magehash",
                                user: 29,
                                product_hunt: "",
                                twitter: "0xferruccio",
                                website: "magehash.com",
                                projects: [
                                    {
                                        id: 570,
                                        name: "magehash",
                                        private: false,
                                        user: 29
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/09/android-chrome-384x384.png",
                                description:
                                    "Website protection from CDN based attacks on Javascript",
                                created_at: "2018-10-09T14:29:16.803556+05:30",
                                launched_at: null
                            },
                            {
                                id: 113,
                                name: "Glasslytics",
                                slug: "glasslytics",
                                user: 493,
                                product_hunt:
                                    "https://www.producthunt.com/posts/glasslytics",
                                twitter: "",
                                website: "glasslytics.com",
                                projects: [
                                    {
                                        id: 540,
                                        name: "glasslytics",
                                        private: false,
                                        user: 493
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/04/glasslytics-icon.png",
                                description:
                                    "Easy Analytics + Actions tracking for webs & apps",
                                created_at: "2018-10-04T21:14:29.449863+05:30",
                                launched_at: "2018-10-13T00:48:20.092738+05:30"
                            },
                            {
                                id: 117,
                                name: "Cute Pets",
                                slug: "cute-pets",
                                user: 482,
                                product_hunt: "",
                                twitter: "",
                                website: "https://cutepets.app?ref=makerlog",
                                projects: [
                                    {
                                        id: 554,
                                        name: "cutepets",
                                        private: false,
                                        user: 482
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/05/cutePetsLogo.png",
                                description:
                                    "A content feed website for cute or funny pet pictures and gifs.",
                                created_at: "2018-10-05T13:26:06.993740+05:30",
                                launched_at: null
                            },
                            {
                                id: 128,
                                name: "Speaker",
                                slug: "speaker",
                                user: 138,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 573,
                                        name: "speaker",
                                        private: false,
                                        user: 138
                                    },
                                    {
                                        id: 574,
                                        name: "timer",
                                        private: false,
                                        user: 138
                                    },
                                    {
                                        id: 575,
                                        name: "speakertimer",
                                        private: false,
                                        user: 138
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Timer for public speakers / performers",
                                created_at: "2018-10-09T22:01:24.224450+05:30",
                                launched_at: null
                            },
                            {
                                id: 129,
                                name: "Stacker",
                                slug: "stacker",
                                user: 138,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 576,
                                        name: "stacker",
                                        private: false,
                                        user: 138
                                    },
                                    {
                                        id: 577,
                                        name: "memory",
                                        private: false,
                                        user: 138
                                    },
                                    {
                                        id: 578,
                                        name: "cards",
                                        private: false,
                                        user: 138
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Memorize a playing cards stack in 60 days",
                                created_at: "2018-10-09T22:02:56.762926+05:30",
                                launched_at: null
                            },
                            {
                                id: 130,
                                name: "Memorizer",
                                slug: "memorizer",
                                user: 138,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 579,
                                        name: "memorizer",
                                        private: false,
                                        user: 138
                                    },
                                    {
                                        id: 580,
                                        name: "training",
                                        private: false,
                                        user: 138
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "Practice quick memorization",
                                created_at: "2018-10-09T22:06:21.621077+05:30",
                                launched_at: null
                            },
                            {
                                id: 131,
                                name: "Echothread",
                                slug: "echothread",
                                user: 615,
                                product_hunt: "",
                                twitter: "echothread",
                                website: "https://echothread.com",
                                projects: [
                                    {
                                        id: 581,
                                        name: "echothread",
                                        private: false,
                                        user: 615
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/09/echothread-icon.png",
                                description:
                                    "Turn a Slack channel into a public liveblog.",
                                created_at: "2018-10-10T02:44:29.008692+05:30",
                                launched_at: null
                            },
                            {
                                id: 159,
                                name: "MyNext.team",
                                slug: "mynextteam",
                                user: 687,
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
                                    "https://api.getmakerlog.com/media/uploads/2018/10/23/My_Next_Team_Social.png",
                                description:
                                    "Discover full-time, part-time, freelance and remote jobs across all sizes of US companies in 30+ industries. We're just getting started so come back often to discover additional jobs.",
                                created_at: "2018-10-23T10:01:54.157845+05:30",
                                launched_at: "2018-10-30T00:22:33.361666+05:30"
                            },
                            {
                                id: 164,
                                name: "otto",
                                slug: "otto",
                                user: 688,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 684,
                                        name: "ottocars",
                                        private: false,
                                        user: 688
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/23/Logo.png",
                                description:
                                    "Flexible, seamless car rental subscription.",
                                created_at: "2018-10-23T18:59:32.631198+05:30",
                                launched_at: null
                            },
                            {
                                id: 133,
                                name: "Oidator",
                                slug: "oidator",
                                user: 595,
                                product_hunt: "",
                                twitter: "",
                                website: "oidator.com",
                                projects: [
                                    {
                                        id: 589,
                                        name: "oidator",
                                        private: false,
                                        user: 595
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/12/idea2.png",
                                description: "Validates your idea",
                                created_at: "2018-10-12T08:50:41.933244+05:30",
                                launched_at: null
                            },
                            {
                                id: 135,
                                name: "klick2buy Office Admin",
                                slug: "klick2buy-office-admin",
                                user: 442,
                                product_hunt: "",
                                twitter: "",
                                website: "klick2buy.in",
                                projects: [
                                    {
                                        id: 592,
                                        name: "klick2buy",
                                        private: false,
                                        user: 442
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/13/k2blogo.png",
                                description:
                                    "A B2B company which deals with FMCG products in India",
                                created_at: "2018-10-13T10:59:22.481515+05:30",
                                launched_at: null
                            },
                            {
                                id: 136,
                                name: "Tutors Central",
                                slug: "tutors-central",
                                user: 442,
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
                                    "https://api.getmakerlog.com/media/uploads/2018/10/14/tutorscentralFB.jpg",
                                description:
                                    "A community of teachers from across the world who are working towards success of their students.",
                                created_at: "2018-10-14T16:45:43.646239+05:30",
                                launched_at: null
                            },
                            {
                                id: 137,
                                name: "GetAgile",
                                slug: "getagile",
                                user: 51,
                                product_hunt: "",
                                twitter: "",
                                website: "https://getagile.co",
                                projects: [
                                    {
                                        id: 558,
                                        name: "getagile",
                                        private: false,
                                        user: 51
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/15/getagile.png",
                                description:
                                    "Voice assistant for backlog management",
                                created_at: "2018-10-15T12:09:03.160599+05:30",
                                launched_at: null
                            },
                            {
                                id: 138,
                                name: "Ruboris",
                                slug: "ruboris",
                                user: 51,
                                product_hunt: "",
                                twitter: "",
                                website: "https://ruboris.com",
                                projects: [
                                    {
                                        id: 597,
                                        name: "ruboris",
                                        private: false,
                                        user: 51
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/15/Lauging.png",
                                description:
                                    "Shame your family & friends. Like Snapchat but permanent",
                                created_at: "2018-10-15T12:13:38.413360+05:30",
                                launched_at: null
                            },
                            {
                                id: 139,
                                name: "Hassle Free Travel",
                                slug: "hassle-free-travel",
                                user: 51,
                                product_hunt: "",
                                twitter: "",
                                website: "http://hasslefreetravel.com",
                                projects: [
                                    {
                                        id: 598,
                                        name: "hassle",
                                        private: false,
                                        user: 51
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/15/hftravel.png",
                                description:
                                    "Takes the stress out of travel bookings. Get others to look for you",
                                created_at: "2018-10-15T12:32:46.375635+05:30",
                                launched_at: null
                            },
                            {
                                id: 140,
                                name: "yogalife",
                                slug: "yogalife",
                                user: 51,
                                product_hunt: "",
                                twitter: "",
                                website: "https://yogalife.app",
                                projects: [
                                    {
                                        id: 599,
                                        name: "yogalife",
                                        private: false,
                                        user: 51
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/15/icon-left-font.png",
                                description:
                                    "Find the best yoga studios near you",
                                created_at: "2018-10-15T12:34:48.340642+05:30",
                                launched_at: null
                            },
                            {
                                id: 141,
                                name: "Press Kite",
                                slug: "press-kite",
                                user: 658,
                                product_hunt: "",
                                twitter: "presskite",
                                website: "presskite.com",
                                projects: [
                                    {
                                        id: 610,
                                        name: "make",
                                        private: false,
                                        user: 658
                                    },
                                    {
                                        id: 611,
                                        name: "press",
                                        private: false,
                                        user: 658
                                    },
                                    {
                                        id: 612,
                                        name: "marketing",
                                        private: false,
                                        user: 658
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/15/PressKiteLogo.png",
                                description:
                                    "Create a press kit for your startup!",
                                created_at: "2018-10-16T01:53:03.538550+05:30",
                                launched_at: "2018-10-16T01:53:03.534673+05:30"
                            },
                            {
                                id: 250,
                                name: "prodabc",
                                slug: "prodabc",
                                user: 770,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 916,
                                        name: "doesthat",
                                        private: false,
                                        user: 770
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "it does that",
                                created_at: "2018-11-11T17:25:15.560429+05:30",
                                launched_at: null
                            },
                            {
                                id: 143,
                                name: "Default Digital",
                                slug: "default-digital",
                                user: 51,
                                product_hunt: "",
                                twitter: "",
                                website: "http://defaultdigital.com",
                                projects: [
                                    {
                                        id: 620,
                                        name: "defaultdigital",
                                        private: false,
                                        user: 51
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/17/defaultdigital.png",
                                description:
                                    "A collection of simple extensions & scripts to make like easier",
                                created_at: "2018-10-17T12:13:31.758022+05:30",
                                launched_at: null
                            },
                            {
                                id: 144,
                                name: "Eat. Sleep. Digital",
                                slug: "eat-sleep-digital",
                                user: 51,
                                product_hunt: "",
                                twitter: "",
                                website: "eatsleepdigital.com",
                                projects: [
                                    {
                                        id: 622,
                                        name: "eatsleep",
                                        private: false,
                                        user: 51
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/17/EatSleepDigital.png",
                                description: "Digital Consultancy",
                                created_at: "2018-10-17T12:21:52.709723+05:30",
                                launched_at: null
                            },
                            {
                                id: 142,
                                name: "RemoteStandups",
                                slug: "remotestandups",
                                user: 489,
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
                                    "https://api.getmakerlog.com/media/uploads/2018/10/15/Screen_Shot_2018-10-16_at_00.05.14.png",
                                description:
                                    "Join stanup groups and keep yourself accountable",
                                created_at: "2018-10-16T03:35:59.736708+05:30",
                                launched_at: "2018-10-18T02:31:21.565116+05:30"
                            },
                            {
                                id: 147,
                                name: "Team Reporter",
                                slug: "team-reporter",
                                user: 670,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 631,
                                        name: "trapp",
                                        private: false,
                                        user: 670
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Automates team reporting and report creation for O365 users",
                                created_at: "2018-10-19T17:48:13.183438+05:30",
                                launched_at: null
                            },
                            {
                                id: 156,
                                name: "Art Shield",
                                slug: "art-shield",
                                user: 685,
                                product_hunt: "",
                                twitter: "",
                                website: "artshield.co",
                                projects: [
                                    {
                                        id: 661,
                                        name: "design",
                                        private: false,
                                        user: 685
                                    },
                                    {
                                        id: 662,
                                        name: "copyright",
                                        private: false,
                                        user: 685
                                    },
                                    {
                                        id: 663,
                                        name: "trademarks",
                                        private: false,
                                        user: 685
                                    },
                                    {
                                        id: 664,
                                        name: "logos",
                                        private: false,
                                        user: 685
                                    },
                                    {
                                        id: 665,
                                        name: "graphicdesign",
                                        private: false,
                                        user: 685
                                    },
                                    {
                                        id: 666,
                                        name: "photography",
                                        private: false,
                                        user: 685
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Art Shield monitors and tracks creative work online, such as logos, designs, and photographs, to catch and stop copyright infringement.",
                                created_at: "2018-10-22T23:13:15.754734+05:30",
                                launched_at: null
                            },
                            {
                                id: 158,
                                name: "First 100 Influencers",
                                slug: "first-100-influencers",
                                user: 687,
                                product_hunt:
                                    "producthunt.com/posts/first-100-influencers",
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
                                    "https://api.getmakerlog.com/media/uploads/2018/10/23/First_100_Social_Logo.jpg",
                                description:
                                    "Increase your brand influence and get discovered by new fans, followers and potential clients by adding a profile on First 100 Influencers.",
                                created_at: "2018-10-23T09:59:52.254580+05:30",
                                launched_at: "2018-10-23T10:02:39.055550+05:30"
                            },
                            {
                                id: 160,
                                name: "BugFeedr",
                                slug: "bugfeedr",
                                user: 687,
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
                                    "https://api.getmakerlog.com/media/uploads/2018/10/23/bugFeedr_Logo_Bug.png",
                                description:
                                    "Collect feedback from your clients & customers without the need for them to create yet another account. Easily send that data into other tools like Slack, Trello, Asana, Jira and Visual Studio Team Services.",
                                created_at: "2018-10-23T10:10:12.148983+05:30",
                                launched_at: "2018-10-23T10:10:12.139452+05:30"
                            },
                            {
                                id: 161,
                                name: "Retrospect.team",
                                slug: "retrospectteam",
                                user: 687,
                                product_hunt:
                                    "producthunt.com/posts/retrospect-team",
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
                                    "https://api.getmakerlog.com/media/uploads/2018/10/23/Retrospect_Team_Social.jpg",
                                description:
                                    "Simple Kanban styled Retrospective Tool for teams to quickly collaborate on post sprints and project feedback.",
                                created_at: "2018-10-23T10:11:35.320978+05:30",
                                launched_at: "2018-10-23T10:11:35.316679+05:30"
                            },
                            {
                                id: 165,
                                name: "Scraatch",
                                slug: "scraatch",
                                user: 689,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 685,
                                        name: "productivity",
                                        private: false,
                                        user: 689
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Allows you to record notes and automatically pull out todos/follow ups/next steps.",
                                created_at: "2018-10-24T05:35:01.290070+05:30",
                                launched_at: null
                            },
                            {
                                id: 166,
                                name: "outside list",
                                slug: "outside-list",
                                user: 126,
                                product_hunt: "",
                                twitter: "",
                                website: "https://outsidelist.com",
                                projects: [
                                    {
                                        id: 219,
                                        name: "outsidelist",
                                        private: false,
                                        user: 126
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/24/mark2x.png",
                                description:
                                    "It's a list of photogenic places to go outside",
                                created_at: "2018-10-24T08:51:40.324138+05:30",
                                launched_at: "2018-10-24T08:51:40.308893+05:30"
                            },
                            {
                                id: 167,
                                name: "magehash",
                                slug: "magehash-2",
                                user: 126,
                                product_hunt: "",
                                twitter: "",
                                website: "https://magehash.com",
                                projects: [
                                    {
                                        id: 686,
                                        name: "magehash",
                                        private: false,
                                        user: 126
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/24/magehash2x.png",
                                description:
                                    "It watches the js on your site and tells you when it changes",
                                created_at: "2018-10-24T08:56:15.571923+05:30",
                                launched_at: null
                            },
                            {
                                id: 168,
                                name: "Monkey Test It",
                                slug: "monkey-test-it",
                                user: 691,
                                product_hunt:
                                    "https://www.producthunt.com/posts/monkey-test-it",
                                twitter: "monkeytestit",
                                website: "https://monkeytest.it",
                                projects: [
                                    {
                                        id: 691,
                                        name: "developer",
                                        private: false,
                                        user: 691
                                    },
                                    {
                                        id: 692,
                                        name: "javascript",
                                        private: false,
                                        user: 691
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/24/logo_spaced_hq.png",
                                description:
                                    "Automated website checker for everyone",
                                created_at: "2018-10-25T03:50:35.731172+05:30",
                                launched_at: "2018-10-25T03:50:35.723894+05:30"
                            },
                            {
                                id: 169,
                                name: "Analytics",
                                slug: "analytics",
                                user: 692,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 693,
                                        name: "analytics",
                                        private: false,
                                        user: 692
                                    },
                                    {
                                        id: 694,
                                        name: "analyticsmvp",
                                        private: false,
                                        user: 692
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Simple analytics to make decisions without being overwhelmed",
                                created_at: "2018-10-25T10:17:11.922404+05:30",
                                launched_at: null
                            },
                            {
                                id: 170,
                                name: "MailMaster",
                                slug: "mailmaster",
                                user: 695,
                                product_hunt:
                                    "https://www.producthunt.com/posts/mailmaster",
                                twitter: "mailmasterco",
                                website: "mailmaster.co",
                                projects: [
                                    {
                                        id: 695,
                                        name: "mailmaster",
                                        private: false,
                                        user: 695
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/25/ico.png",
                                description: "Automated Email Marketing",
                                created_at: "2018-10-26T01:28:01.166320+05:30",
                                launched_at: "2018-10-26T01:28:01.159485+05:30"
                            },
                            {
                                id: 171,
                                name: "efe",
                                slug: "efe",
                                user: 595,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 696,
                                        name: "efe",
                                        private: false,
                                        user: 595
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/26/met2u_logo2.png",
                                description: "English For Everyone",
                                created_at: "2018-10-26T07:40:27.036644+05:30",
                                launched_at: null
                            },
                            {
                                id: 146,
                                name: "UserMetrics",
                                slug: "usermetrics",
                                user: 587,
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
                                    "https://api.getmakerlog.com/media/uploads/2018/10/29/Technologist_Emoji.png",
                                description:
                                    "Stop user frustration with better website monitoring!",
                                created_at: "2018-10-18T22:54:18.158540+05:30",
                                launched_at: null
                            },
                            {
                                id: 152,
                                name: "Arquitecto Software",
                                slug: "arquitecto-software",
                                user: 680,
                                product_hunt: "",
                                twitter: "arquitectosoft1",
                                website: "https://www.arquitectosoftware.com/",
                                projects: [
                                    {
                                        id: 822,
                                        name: "ArquitectoSoftware",
                                        private: false,
                                        user: 680
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/20/whitexs.jpg",
                                description:
                                    "Arquitecto Software shows which is the best software architecture option based on your project thematic and non-functional requirements, in addition shows related open-source frameworks that you can use to build that architecture.",
                                created_at: "2018-10-20T17:19:08.793031+05:30",
                                launched_at: "2018-10-20T17:19:08.789359+05:30"
                            },
                            {
                                id: 134,
                                name: "Drawkit",
                                slug: "drawkit",
                                user: 218,
                                product_hunt:
                                    "https://www.producthunt.com/posts/drawkit",
                                twitter: "@usedrawkit",
                                website: "https://drawkit.io",
                                projects: [
                                    {
                                        id: 590,
                                        name: "drawkit",
                                        private: false,
                                        user: 218
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/21/logo-export-3.png",
                                description:
                                    "A constantly updated collection of beautiful illustrations, free to use for your startup, app, and project without attribution",
                                created_at: "2018-10-12T18:53:53.780142+05:30",
                                launched_at: "2018-11-11T14:03:10.033216+05:30"
                            },
                            {
                                id: 127,
                                name: "InboxZero",
                                slug: "inboxzero",
                                user: 642,
                                product_hunt: "",
                                twitter: "joeytawadrous",
                                website: "https://inboxzeroemail.com",
                                projects: [],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/09/logo.png",
                                description:
                                    "Everyone deserves Inbox Zero. A replacement for Google Inbox.",
                                created_at: "2018-10-09T18:15:27.845131+05:30",
                                launched_at: null
                            },
                            {
                                id: 148,
                                name: "workmode",
                                slug: "workmode",
                                user: 672,
                                product_hunt:
                                    "https://www.producthunt.com/my/upcoming/workmode-2",
                                twitter: "frizurd",
                                website: "workmode.co",
                                projects: [
                                    {
                                        id: 657,
                                        name: "workmode",
                                        private: false,
                                        user: 672
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/19/logo.png",
                                description:
                                    "Find the best places to work from near you",
                                created_at: "2018-10-19T21:37:54.068204+05:30",
                                launched_at: "2018-12-12T10:42:39.926677+05:30"
                            },
                            {
                                id: 366,
                                name: "Focus",
                                slug: "focus",
                                user: 46,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 1296,
                                        name: "FocusApp",
                                        private: false,
                                        user: 46
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/01/noun_Eye_2047926.png",
                                description: "Eye tracking as a mouse",
                                created_at: "2018-12-02T04:54:42.193181+05:30",
                                launched_at: null
                            },
                            {
                                id: 438,
                                name: "inwork",
                                slug: "inwork",
                                user: 941,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 1219,
                                        name: "gab",
                                        private: false,
                                        user: 941
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "inwork",
                                created_at: "2018-12-12T17:34:52.768352+05:30",
                                launched_at: null
                            },
                            {
                                id: 162,
                                name: "Surface Pixel",
                                slug: "surface-pixel",
                                user: 687,
                                product_hunt:
                                    "producthunt.com/posts/surface-pixel",
                                twitter: "surfacepixel",
                                website: "surfacepixel.com",
                                projects: [
                                    {
                                        id: 680,
                                        name: "portfolio",
                                        private: false,
                                        user: 687
                                    },
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
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/23/Surface_Pixel_Logo_Square.png",
                                description:
                                    "Windows 10 app for artists to showcase their portfolio of work, create storyboards & receive feedback through pen & ink annotations.",
                                created_at: "2018-10-23T10:13:17.140359+05:30",
                                launched_at: "2018-10-26T10:35:06.566636+05:30"
                            },
                            {
                                id: 197,
                                name: "Coding Coach",
                                slug: "coding-coach",
                                user: 670,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 788,
                                        name: "codingcoach",
                                        private: false,
                                        user: 670
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "On-demand help to your coding questions",
                                created_at: "2018-11-01T18:10:42.993378+05:30",
                                launched_at: null
                            },
                            {
                                id: 172,
                                name: "Goal Beeper",
                                slug: "goal-beeper",
                                user: 698,
                                product_hunt: "",
                                twitter: "",
                                website: "goalbeeper.app",
                                projects: [
                                    {
                                        id: 704,
                                        name: "goal_beeper",
                                        private: false,
                                        user: 698
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/26/mac2x.png",
                                description:
                                    "Free desktop app providing soccer results in real-time. It supports the Premier and Champions Leagues amongst others.",
                                created_at: "2018-10-26T20:46:39.046866+05:30",
                                launched_at: null
                            },
                            {
                                id: 173,
                                name: "OpsDuck",
                                slug: "opsduck",
                                user: 686,
                                product_hunt: "opsduck.com",
                                twitter: "opsduckhq",
                                website: "opsduck.com",
                                projects: [
                                    {
                                        id: 707,
                                        name: "app",
                                        private: false,
                                        user: 686
                                    },
                                    {
                                        id: 708,
                                        name: "sysadmin",
                                        private: false,
                                        user: 686
                                    },
                                    {
                                        id: 709,
                                        name: "devops",
                                        private: false,
                                        user: 686
                                    },
                                    {
                                        id: 710,
                                        name: "server",
                                        private: false,
                                        user: 686
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/26/180901_Opsduck-Logo-05.png",
                                description:
                                    "App for sysadmins to get alerts when their servers go down and restart them from their phone with the tap of a button.",
                                created_at: "2018-10-27T04:52:29.524613+05:30",
                                launched_at: null
                            },
                            {
                                id: 175,
                                name: "noshit",
                                slug: "noshit",
                                user: 586,
                                product_hunt:
                                    "https://www.producthunt.com/posts/noshit",
                                twitter: "@noshit_app",
                                website: "https://noshit.xyz/",
                                projects: [
                                    {
                                        id: 718,
                                        name: "design",
                                        private: false,
                                        user: 586
                                    },
                                    {
                                        id: 719,
                                        name: "free",
                                        private: false,
                                        user: 586
                                    }
                                ],
                                launched: true,
                                icon: null,
                                description: "free design resources",
                                created_at: "2018-10-28T09:09:05.810948+05:30",
                                launched_at: "2018-10-28T09:09:05.804391+05:30"
                            },
                            {
                                id: 174,
                                name: "Simple Policy",
                                slug: "simple-policy",
                                user: 690,
                                product_hunt: "",
                                twitter: "",
                                website:
                                    "openlensresearch.weebly.com/tools.html",
                                projects: [],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/28/simple-policy-512.png",
                                description:
                                    "Extension that summarizes privacy policies of notable companies.",
                                created_at: "2018-10-27T23:21:32.202381+05:30",
                                launched_at: null
                            },
                            {
                                id: 177,
                                name: "KryptoniteWP",
                                slug: "kryptonitewp",
                                user: 702,
                                product_hunt: "",
                                twitter: "KryptoniteWP",
                                website: "https://kryptonitewp.com/",
                                projects: [
                                    {
                                        id: 722,
                                        name: "KryptoniteWP",
                                        private: false,
                                        user: 702
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/28/profile_Eqqy1cW.png",
                                description:
                                    "WordPress plugins and themes crafted by passionated Kryptonians.",
                                created_at: "2018-10-28T13:24:41.847619+05:30",
                                launched_at: "2018-10-28T13:24:41.842757+05:30"
                            },
                            {
                                id: 178,
                                name: "Affiliate Coupons",
                                slug: "affiliate-coupons",
                                user: 702,
                                product_hunt: "",
                                twitter: "affcoups",
                                website: "https://affcoups.com/",
                                projects: [
                                    {
                                        id: 724,
                                        name: "affcoups",
                                        private: false,
                                        user: 702
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/28/twitter-profile.png",
                                description:
                                    "The best WordPress Coupons\nPlugin for Affiliate Marketers.",
                                created_at: "2018-10-28T13:26:13.770193+05:30",
                                launched_at: "2018-10-28T13:26:13.767361+05:30"
                            },
                            {
                                id: 179,
                                name: "DojoWP",
                                slug: "dojowp",
                                user: 702,
                                product_hunt: "",
                                twitter: "dojowp",
                                website: "https://dojowp.com/",
                                projects: [
                                    {
                                        id: 725,
                                        name: "DojoWP",
                                        private: false,
                                        user: 702
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/28/profile_h2E2BQ7.png",
                                description:
                                    "Blog about WordPress related stuff and experiences by a professional developer.",
                                created_at: "2018-10-28T13:27:56.801776+05:30",
                                launched_at: null
                            },
                            {
                                id: 180,
                                name: "Fellows.chat",
                                slug: "fellowschat",
                                user: 704,
                                product_hunt: "",
                                twitter: "FellowsChat",
                                website:
                                    "https://opencollective.com/fellows_chat",
                                projects: [
                                    {
                                        id: 734,
                                        name: "fellowschat",
                                        private: false,
                                        user: 704
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/28/fellowschat_concept_1.png",
                                description:
                                    "Smart Community for startups, entrepreneurs, everyone to learn, share their knowledge and build their career",
                                created_at: "2018-10-28T21:28:46.255347+05:30",
                                launched_at: null
                            },
                            {
                                id: 176,
                                name: "AAWP",
                                slug: "aawp",
                                user: 702,
                                product_hunt:
                                    "https://www.producthunt.com/posts/aawp-3-0",
                                twitter: "AmazonPlugin",
                                website: "https://getaawp.com/",
                                projects: [
                                    {
                                        id: 720,
                                        name: "aawp",
                                        private: false,
                                        user: 702
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/28/profile.png",
                                description:
                                    "Best WordPress Plugin for Amazon Affiliates",
                                created_at: "2018-10-28T13:20:06.920655+05:30",
                                launched_at: "2018-10-29T13:06:03.530757+05:30"
                            },
                            {
                                id: 182,
                                name: "useHooks",
                                slug: "usehooks",
                                user: 631,
                                product_hunt: "",
                                twitter: "",
                                website: "https://usehooks.com",
                                projects: [
                                    {
                                        id: 752,
                                        name: "usehooks",
                                        private: false,
                                        user: 631
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/29/Screen_Shot_2018-10-29_at_11.40.36_AM.png",
                                description:
                                    "One new React Hook code recipe every day",
                                created_at: "2018-10-30T00:11:14.830919+05:30",
                                launched_at: "2018-10-30T00:11:21.732157+05:30"
                            },
                            {
                                id: 183,
                                name: "AsyncMatic",
                                slug: "asyncmatic",
                                user: 693,
                                product_hunt:
                                    "https://www.producthunt.com/upcoming/asyncmatic/",
                                twitter: "asyncmatic",
                                website: "https://asyncmatic.com",
                                projects: [
                                    {
                                        id: 755,
                                        name: "asyncmatic",
                                        private: false,
                                        user: 693
                                    },
                                    {
                                        id: 756,
                                        name: "remote",
                                        private: false,
                                        user: 693
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/29/logo.png",
                                description:
                                    "Onboarding, docs and meetings for remote teams.",
                                created_at: "2018-10-30T00:45:24.443562+05:30",
                                launched_at: null
                            },
                            {
                                id: 185,
                                name: "TeenMade",
                                slug: "teenmade",
                                user: 227,
                                product_hunt: "",
                                twitter: "",
                                website: "teenmade.netlify.com",
                                projects: [
                                    {
                                        id: 760,
                                        name: "teenmade",
                                        private: false,
                                        user: 227
                                    },
                                    {
                                        id: 761,
                                        name: "tm",
                                        private: false,
                                        user: 227
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "A community based education accelerator for high school students.",
                                created_at: "2018-10-30T08:40:59.338879+05:30",
                                launched_at: null
                            },
                            {
                                id: 186,
                                name: "Table2Site",
                                slug: "table2site",
                                user: 713,
                                product_hunt:
                                    "https://www.producthunt.com/posts/table-2-site",
                                twitter: "poehah",
                                website: "https://table2site.com",
                                projects: [
                                    {
                                        id: 763,
                                        name: "table2site",
                                        private: false,
                                        user: 713
                                    },
                                    {
                                        id: 764,
                                        name: "nocode",
                                        private: false,
                                        user: 713
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/30/New_Project_3.png",
                                description:
                                    "Generate a no-code website from your Airtable base",
                                created_at: "2018-10-30T14:05:49.470166+05:30",
                                launched_at: "2018-10-30T14:05:49.466448+05:30"
                            },
                            {
                                id: 188,
                                name: "Producer Chat",
                                slug: "producer-chat",
                                user: 481,
                                product_hunt: "",
                                twitter: "producer_chat",
                                website: "https://producer.chat",
                                projects: [
                                    {
                                        id: 773,
                                        name: "producerchat",
                                        private: false,
                                        user: 481
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/30/Logo-03.png",
                                description: "help music producers ship tunes",
                                created_at: "2018-10-31T00:03:45.031336+05:30",
                                launched_at: null
                            },
                            {
                                id: 189,
                                name: "Toorno",
                                slug: "toorno",
                                user: 730,
                                product_hunt: "",
                                twitter: "",
                                website: "www.toorno.io",
                                projects: [
                                    {
                                        id: 776,
                                        name: "toorno",
                                        private: false,
                                        user: 730
                                    },
                                    {
                                        id: 777,
                                        name: "toornoapp",
                                        private: false,
                                        user: 730
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/31/logo.png",
                                description:
                                    "Staff management platform for hospitality businesses",
                                created_at: "2018-10-31T12:19:01.138055+05:30",
                                launched_at: null
                            },
                            {
                                id: 191,
                                name: "SlimPlanner",
                                slug: "slimplanner",
                                user: 476,
                                product_hunt:
                                    "producthunt.com/posts/slimplanner",
                                twitter: "slimplanner",
                                website: "slimplanner.it",
                                projects: [
                                    {
                                        id: 408,
                                        name: "slimplanner",
                                        private: false,
                                        user: 476
                                    }
                                ],
                                launched: true,
                                icon: null,
                                description: "Team scheduling made easy",
                                created_at: "2018-10-31T22:32:02.426732+05:30",
                                launched_at: "2018-10-31T22:32:02.418144+05:30"
                            },
                            {
                                id: 193,
                                name: "FreeCodeCamp Projects",
                                slug: "freecodecamp-projects",
                                user: 721,
                                product_hunt: "",
                                twitter: "",
                                website: "https://freecodecamp.org",
                                projects: [
                                    {
                                        id: 781,
                                        name: "FCC",
                                        private: false,
                                        user: 721
                                    },
                                    {
                                        id: 780,
                                        name: "freecodecamp",
                                        private: false,
                                        user: 721
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/31/glyph.jpg",
                                description: "FCC",
                                created_at: "2018-10-31T22:34:18.209088+05:30",
                                launched_at: "2018-11-01T00:16:00.339936+05:30"
                            },
                            {
                                id: 194,
                                name: "Belooga",
                                slug: "belooga",
                                user: 730,
                                product_hunt:
                                    "https://www.producthunt.com/posts/belooga",
                                twitter: "@Belooga_",
                                website: "http://belooga.co",
                                projects: [
                                    {
                                        id: 784,
                                        name: "belooga",
                                        private: false,
                                        user: 730
                                    },
                                    {
                                        id: 785,
                                        name: "digitalnomads",
                                        private: false,
                                        user: 730
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/01/belooga-logo-mascot-only.png",
                                description:
                                    "Crowdsourced list of laptop-friendly homes for nomads",
                                created_at: "2018-11-01T15:28:27.313550+05:30",
                                launched_at: "2018-11-01T15:28:27.309700+05:30"
                            },
                            {
                                id: 195,
                                name: "TrackMySushi",
                                slug: "trackmysushi",
                                user: 730,
                                product_hunt: "",
                                twitter: "",
                                website:
                                    "https://play.google.com/store/apps/details?id=com.meetandrearocca.trackmysushi",
                                projects: [
                                    {
                                        id: 786,
                                        name: "sushigo",
                                        private: false,
                                        user: 730
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/01/sushi.png",
                                description: "Scorekeeper for SushiGo",
                                created_at: "2018-11-01T15:31:35.687461+05:30",
                                launched_at: "2018-11-01T15:31:35.685166+05:30"
                            },
                            {
                                id: 196,
                                name: "JepRas",
                                slug: "jepras",
                                user: 670,
                                product_hunt: "",
                                twitter: "jepras_",
                                website: "jepras.com",
                                projects: [
                                    {
                                        id: 787,
                                        name: "JepRas",
                                        private: false,
                                        user: 670
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/01/jrfav.png",
                                description: "My website",
                                created_at: "2018-11-01T18:06:58.520430+05:30",
                                launched_at: null
                            },
                            {
                                id: 200,
                                name: "wheretowatch",
                                slug: "wheretowatch",
                                user: 735,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 800,
                                        name: "wheretowatch",
                                        private: false,
                                        user: 735
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "streaming search engine",
                                created_at: "2018-11-02T04:37:50.630011+05:30",
                                launched_at: null
                            },
                            {
                                id: 248,
                                name: "Mindful",
                                slug: "mindful",
                                user: 720,
                                product_hunt: "",
                                twitter: "mindful_hq",
                                website: "",
                                projects: [
                                    {
                                        id: 874,
                                        name: "Mindful",
                                        private: false,
                                        user: 720
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "TBA",
                                created_at: "2018-11-11T01:32:21.817278+05:30",
                                launched_at: null
                            },
                            {
                                id: 187,
                                name: "WP Optin Wheel",
                                slug: "wp-optin-wheel",
                                user: 713,
                                product_hunt:
                                    "https://www.producthunt.com/posts/wp-optin-wheel",
                                twitter: "poehah",
                                website:
                                    "https://studiowombat.com/wp-optin-wheel",
                                projects: [
                                    {
                                        id: 770,
                                        name: "wordpress",
                                        private: false,
                                        user: 713
                                    },
                                    {
                                        id: 771,
                                        name: "woocommerce",
                                        private: false,
                                        user: 713
                                    },
                                    {
                                        id: 806,
                                        name: "wpoptinwheel",
                                        private: false,
                                        user: 713
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/30/Knipsel.JPG",
                                description:
                                    'Gamified "wheel of fortune" optin tool for WordPress & WooCommerce',
                                created_at: "2018-10-30T19:53:02.645337+05:30",
                                launched_at: "2018-10-30T19:53:02.642358+05:30"
                            },
                            {
                                id: 204,
                                name: "laundrify",
                                slug: "laundrify",
                                user: 661,
                                product_hunt: "",
                                twitter: "",
                                website: "https://laundrify.de",
                                projects: [
                                    {
                                        id: 816,
                                        name: "smarthome",
                                        private: false,
                                        user: 661
                                    },
                                    {
                                        id: 817,
                                        name: "IoT",
                                        private: false,
                                        user: 661
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "A power plug for your washing machine, that will send a push notification when your washing is done.",
                                created_at: "2018-11-03T15:51:18.613277+05:30",
                                launched_at: null
                            },
                            {
                                id: 109,
                                name: "hellonext",
                                slug: "hellonext-2",
                                user: 627,
                                product_hunt:
                                    "https://www.producthunt.com/posts/hellonext",
                                twitter: "hellonextco",
                                website: "https://hellonext.co",
                                projects: [
                                    {
                                        id: 531,
                                        name: "feedback",
                                        private: false,
                                        user: 627
                                    },
                                    {
                                        id: 532,
                                        name: "customerfeedback",
                                        private: false,
                                        user: 627
                                    },
                                    {
                                        id: 527,
                                        name: "app",
                                        private: false,
                                        user: 627
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/03/socialmark_1.png",
                                description: "Product feedback management.",
                                created_at: "2018-10-03T21:17:59.353852+05:30",
                                launched_at: "2018-10-03T21:17:59.349613+05:30"
                            },
                            {
                                id: 207,
                                name: "KIT CRM",
                                slug: "kit-crm",
                                user: 29,
                                product_hunt: "",
                                twitter: "0xferruccio",
                                website: "",
                                projects: [
                                    {
                                        id: 824,
                                        name: "kit",
                                        private: false,
                                        user: 29
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/03/icon-192x192.png",
                                description: "A personal CRM on Blockstack",
                                created_at: "2018-11-04T02:57:33.326824+05:30",
                                launched_at: "2018-12-03T14:11:07.432705+05:30"
                            },
                            {
                                id: 208,
                                name: "Quantum Computing Weekly",
                                slug: "quantum-computing-weekly",
                                user: 691,
                                product_hunt: "",
                                twitter: "jesperht",
                                website:
                                    "https://www.quantumcomputingweekly.com/",
                                projects: [
                                    {
                                        id: 825,
                                        name: "quantumcomputing",
                                        private: false,
                                        user: 691
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/03/quantum.png",
                                description:
                                    "Newsletter for people learning about quantum computing and keep up to date with news.",
                                created_at: "2018-11-04T04:26:55.814194+05:30",
                                launched_at: "2018-11-04T04:26:55.808544+05:30"
                            },
                            {
                                id: 205,
                                name: "Cyborg Mayhem",
                                slug: "cyborg-mayhem",
                                user: 218,
                                product_hunt: "",
                                twitter: "",
                                website: "https://cyborgmayhem.bigcartel.com",
                                projects: [
                                    {
                                        id: 818,
                                        name: "CyborgMayhem",
                                        private: false,
                                        user: 218
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/04/cyborg-mayhem-logo.png",
                                description:
                                    "Happy products for the nerd in all of us",
                                created_at: "2018-11-03T21:29:52.279112+05:30",
                                launched_at: null
                            },
                            {
                                id: 209,
                                name: "MentorCruise",
                                slug: "mentorcruise",
                                user: 743,
                                product_hunt:
                                    "producthunt.com/posts/mentorcruise",
                                twitter: "mentorcruise",
                                website: "mentorcruise.com",
                                projects: [
                                    {
                                        id: 834,
                                        name: "mentorcruise",
                                        private: false,
                                        user: 743
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/04/cruise_icon.png",
                                description: "Mentorship for people in Tech",
                                created_at: "2018-11-05T02:32:12.693047+05:30",
                                launched_at: "2018-11-05T02:32:12.688908+05:30"
                            },
                            {
                                id: 210,
                                name: "RemoteML",
                                slug: "remoteml",
                                user: 743,
                                product_hunt:
                                    "https://www.producthunt.com/posts/remoteml-v2",
                                twitter: "remoteml",
                                website: "remoteml.com",
                                projects: [
                                    {
                                        id: 835,
                                        name: "remoteml",
                                        private: false,
                                        user: 743
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/04/rml_sign_inv.png",
                                description:
                                    "Global Machine Learning Community",
                                created_at: "2018-11-05T02:35:00.164189+05:30",
                                launched_at: "2018-11-05T02:35:00.160833+05:30"
                            },
                            {
                                id: 199,
                                name: "App Metrics",
                                slug: "app-metrics",
                                user: 737,
                                product_hunt: "",
                                twitter: "appmetricshq",
                                website: "appmetrics.co",
                                projects: [
                                    {
                                        id: 796,
                                        name: "metrics",
                                        private: false,
                                        user: 737
                                    },
                                    {
                                        id: 797,
                                        name: "lighthouse",
                                        private: false,
                                        user: 737
                                    },
                                    {
                                        id: 798,
                                        name: "performance",
                                        private: false,
                                        user: 737
                                    },
                                    {
                                        id: 799,
                                        name: "monitoring",
                                        private: false,
                                        user: 737
                                    },
                                    {
                                        id: 802,
                                        name: "appmetrics",
                                        private: false,
                                        user: 737
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/02/icon.png",
                                description:
                                    "Powered by Google's Lighthouse, We provide performance analytics about your sites with regression alerts",
                                created_at: "2018-11-02T04:26:26.120851+05:30",
                                launched_at: null
                            },
                            {
                                id: 190,
                                name: "GameDig",
                                slug: "devconnect",
                                user: 734,
                                product_hunt: "",
                                twitter: "",
                                website: "https://gamedig.xyz",
                                projects: [
                                    {
                                        id: 856,
                                        name: "GameDig",
                                        private: false,
                                        user: 734
                                    },
                                    {
                                        id: 779,
                                        name: "DevConnect",
                                        private: false,
                                        user: 734
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Connect indie game developers with content creators",
                                created_at: "2018-10-31T22:28:05.034462+05:30",
                                launched_at: null
                            },
                            {
                                id: 202,
                                name: "Artemis",
                                slug: "artemis",
                                user: 721,
                                product_hunt: "",
                                twitter: "",
                                website: "https://getartemis.app",
                                projects: [
                                    {
                                        id: 810,
                                        name: "Artemis",
                                        private: false,
                                        user: 721
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/07/Logo.png",
                                description:
                                    "Open source project management tool",
                                created_at: "2018-11-03T02:12:09.671214+05:30",
                                launched_at: null
                            },
                            {
                                id: 192,
                                name: "DriveMyDev",
                                slug: "drivemydev",
                                user: 476,
                                product_hunt: "",
                                twitter: "drivemydev",
                                website: "drivemydev.com",
                                projects: [
                                    {
                                        id: 358,
                                        name: "drivemydev",
                                        private: false,
                                        user: 476
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/10/31/logoDMD.png",
                                description:
                                    "Updates, roadmap, bugs, tips, chat. All for you product, one beautiful widget.",
                                created_at: "2018-10-31T22:33:16.237658+05:30",
                                launched_at: null
                            },
                            {
                                id: 277,
                                name: "LPDS",
                                slug: "lpds",
                                user: 762,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 992,
                                        name: "lpds",
                                        private: false,
                                        user: 762
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "Private app for a client",
                                created_at: "2018-11-17T07:44:11.539174+05:30",
                                launched_at: null
                            },
                            {
                                id: 461,
                                name: "Hazel",
                                slug: "hazel",
                                user: 477,
                                product_hunt: "",
                                twitter: "",
                                website: null,
                                projects: [
                                    {
                                        id: 1678,
                                        name: "deeplearning",
                                        private: false,
                                        user: 477
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "Deep Learning Framework",
                                created_at: "2018-12-20T02:13:39.786604+05:30",
                                launched_at: null
                            },
                            {
                                id: 211,
                                name: "Rungry",
                                slug: "rungry",
                                user: 745,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 837,
                                        name: "rungry",
                                        private: false,
                                        user: 745
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/05/favicon.png",
                                description:
                                    "Personalised running plans for beginning and intermediate runners",
                                created_at: "2018-11-05T15:59:21.403419+05:30",
                                launched_at: null
                            },
                            {
                                id: 237,
                                name: "Learn EOS Development",
                                slug: "learn-eos-development",
                                user: 756,
                                product_hunt: "",
                                twitter: "",
                                website: "learneos.one",
                                projects: [
                                    {
                                        id: 889,
                                        name: "learneos",
                                        private: false,
                                        user: 756
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/08/book-cover.png",
                                description:
                                    "A book teaching full-stack development on the EOS blockchain.",
                                created_at: "2018-11-08T19:14:54.826884+05:30",
                                launched_at: null
                            },
                            {
                                id: 215,
                                name: "Cardsaholic",
                                slug: "cardsaholic",
                                user: 660,
                                product_hunt: "",
                                twitter: "devhoag",
                                website: "cardsaholic.com",
                                projects: [
                                    {
                                        id: 845,
                                        name: "tag",
                                        private: false,
                                        user: 660
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "tables to card layouts",
                                created_at: "2018-11-06T03:48:52.820642+05:30",
                                launched_at: null
                            },
                            {
                                id: 214,
                                name: "Swyya",
                                slug: "swyya",
                                user: 647,
                                product_hunt: "",
                                twitter: "",
                                website: "swyya.com",
                                projects: [
                                    {
                                        id: 844,
                                        name: "swyya",
                                        private: false,
                                        user: 647
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/05/swyya-logo.png",
                                description:
                                    "Community connecting MENA founders, makers & every individual who aim to build something.",
                                created_at: "2018-11-06T02:53:57.080584+05:30",
                                launched_at: null
                            },
                            {
                                id: 217,
                                name: "WithKB.com",
                                slug: "withkbcom",
                                user: 394,
                                product_hunt: "",
                                twitter: "withkb_com",
                                website: "withkb.com",
                                projects: [
                                    {
                                        id: 849,
                                        name: "withkb",
                                        private: false,
                                        user: 394
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Knowledge base for customers of you Saas",
                                created_at: "2018-11-06T14:39:15.545303+05:30",
                                launched_at: null
                            },
                            {
                                id: 198,
                                name: "100 Job Boards",
                                slug: "100-job-boards",
                                user: 698,
                                product_hunt:
                                    "https://www.producthunt.com/posts/100-job-boards",
                                twitter: "",
                                website: "100jobboards.com",
                                projects: [
                                    {
                                        id: 791,
                                        name: "100_job_boards",
                                        private: false,
                                        user: 698
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/01/hundred-points-symbol_1f4af.png",
                                description:
                                    "Curated list of the best specialized job boards.",
                                created_at: "2018-11-02T01:36:20.392102+05:30",
                                launched_at: "2018-11-06T15:28:56.655887+05:30"
                            },
                            {
                                id: 218,
                                name: "AwareOps",
                                slug: "awareops",
                                user: 745,
                                product_hunt: "",
                                twitter: "",
                                website: "https://awareops.com",
                                projects: [
                                    {
                                        id: 851,
                                        name: "awareops",
                                        private: false,
                                        user: 745
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/06/logo.png",
                                description:
                                    "Email simulations to prevent phishing and social engineering attacks.",
                                created_at: "2018-11-06T21:52:34.637470+05:30",
                                launched_at: null
                            },
                            {
                                id: 219,
                                name: "200-word challenge",
                                slug: "200-word-challenge",
                                user: 750,
                                product_hunt: "",
                                twitter: "https://twitter.com/basilesamel",
                                website: "https://twitter.com/basilesamel",
                                projects: [
                                    {
                                        id: 860,
                                        name: "200words",
                                        private: false,
                                        user: 750
                                    }
                                ],
                                launched: true,
                                icon: null,
                                description:
                                    "I'm writing 200 words everyday and publish them on Twitter",
                                created_at: "2018-11-07T09:19:01.672174+05:30",
                                launched_at: "2018-11-07T09:19:01.660656+05:30"
                            },
                            {
                                id: 220,
                                name: "Akeduk",
                                slug: "akeduk",
                                user: 750,
                                product_hunt: "",
                                twitter: "",
                                website: "https://akeduk.com",
                                projects: [
                                    {
                                        id: 862,
                                        name: "akeduk",
                                        private: false,
                                        user: 750
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/07/logo_resized.png",
                                description:
                                    "Publish a Watson bot to Messenger, in minutes.",
                                created_at: "2018-11-07T13:45:28.927388+05:30",
                                launched_at: "2018-11-07T13:45:28.921335+05:30"
                            },
                            {
                                id: 223,
                                name: "eSportsy",
                                slug: "esportsy",
                                user: 36,
                                product_hunt: "",
                                twitter: "esportsyhq",
                                website: "http://esportsy.gg",
                                projects: [
                                    {
                                        id: 111,
                                        name: "esportsy",
                                        private: false,
                                        user: 36
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/07/25592110.png",
                                description: "Stealth mode",
                                created_at: "2018-11-07T20:17:53.768717+05:30",
                                launched_at: null
                            },
                            {
                                id: 224,
                                name: "Tuemilio.com",
                                slug: "tuemiliocom",
                                user: 682,
                                product_hunt: "https://goo.gl/mQX1w9",
                                twitter: "",
                                website: "tuemilio.com",
                                projects: [
                                    {
                                        id: 867,
                                        name: "email",
                                        private: false,
                                        user: 682
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/07/favicon.png",
                                description: "Collect emails & go viral",
                                created_at: "2018-11-07T21:12:41.728108+05:30",
                                launched_at: "2018-11-07T21:12:41.724793+05:30"
                            },
                            {
                                id: 225,
                                name: "Tasky",
                                slug: "tasky",
                                user: 642,
                                product_hunt:
                                    "https://www.producthunt.com/@joey_tawadrous",
                                twitter: "joeytawadrous",
                                website:
                                    "https://itunes.apple.com/us/app/tasky-your-to-do-list-tracker/id1195440882?mt=8",
                                projects: [
                                    {
                                        id: 868,
                                        name: "Tasky",
                                        private: false,
                                        user: 642
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/07/logo.jpg",
                                description: "Gamify goals and tasks easily",
                                created_at: "2018-11-07T23:19:59.271992+05:30",
                                launched_at: null
                            },
                            {
                                id: 226,
                                name: "Sunrise Alarm",
                                slug: "sunrise-alarm",
                                user: 642,
                                product_hunt:
                                    "https://www.producthunt.com/@joey_tawadrous",
                                twitter: "joeytawadrous",
                                website:
                                    "https://itunes.apple.com/us/app/sunrise-alarm-surprise-clock/id1360309647?mt=8",
                                projects: [
                                    {
                                        id: 869,
                                        name: "SunriseAlarm",
                                        private: false,
                                        user: 642
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/07/logo_U8L5ui4.jpg",
                                description: "Ensure that you're never late",
                                created_at: "2018-11-07T23:21:19.499741+05:30",
                                launched_at: null
                            },
                            {
                                id: 227,
                                name: "Learnable",
                                slug: "learnable",
                                user: 642,
                                product_hunt:
                                    "https://www.producthunt.com/@joey_tawadrous",
                                twitter: "getlearnable",
                                website:
                                    "https://itunes.apple.com/us/app/learnable-learn-to-code/id1254862243?mt=8",
                                projects: [
                                    {
                                        id: 870,
                                        name: "Learnable",
                                        private: false,
                                        user: 642
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/07/logo_6o2jwQo.jpg",
                                description: "Learn to code on the go",
                                created_at: "2018-11-07T23:22:16.542174+05:30",
                                launched_at: null
                            },
                            {
                                id: 228,
                                name: "Contact",
                                slug: "contact",
                                user: 642,
                                product_hunt:
                                    "https://www.producthunt.com/@joey_tawadrous",
                                twitter: "joeytawadrous",
                                website:
                                    "https://itunes.apple.com/us/app/contact-easily-keep-in-touch/id1101260252?mt=8",
                                projects: [
                                    {
                                        id: 871,
                                        name: "Contact",
                                        private: false,
                                        user: 642
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/07/logo_AKfMfft.jpg",
                                description: "Gamify keeping in contact",
                                created_at: "2018-11-07T23:23:09.920681+05:30",
                                launched_at: null
                            },
                            {
                                id: 229,
                                name: "Factly",
                                slug: "factly",
                                user: 642,
                                product_hunt:
                                    "https://www.producthunt.com/@joey_tawadrous",
                                twitter: "joeytawadrous",
                                website:
                                    "https://itunes.apple.com/us/app/factly-daily-random-facts/id1200288775?mt=8",
                                projects: [
                                    {
                                        id: 872,
                                        name: "Factly",
                                        private: false,
                                        user: 642
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/07/logo_cBtzJ7j.jpg",
                                description: "Learn fun new facts every day",
                                created_at: "2018-11-07T23:23:46.134292+05:30",
                                launched_at: null
                            },
                            {
                                id: 230,
                                name: "Meditation Fox",
                                slug: "meditation-fox",
                                user: 642,
                                product_hunt:
                                    "https://www.producthunt.com/@joey_tawadrous",
                                twitter: "joeytawadrous",
                                website:
                                    "https://itunes.apple.com/us/app/meditation-fox-daily-focus/id1431521616?mt=8",
                                projects: [
                                    {
                                        id: 873,
                                        name: "MeditationFox",
                                        private: false,
                                        user: 642
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/07/iTunesArtwork3x.png",
                                description: "Gamify your focused meditation",
                                created_at: "2018-11-07T23:24:37.008007+05:30",
                                launched_at: null
                            },
                            {
                                id: 231,
                                name: "Maker Launches",
                                slug: "maker-launches",
                                user: 642,
                                product_hunt:
                                    "https://www.producthunt.com/@joey_tawadrous",
                                twitter: "makerlaunches",
                                website: "https://www.makerlaunches.com/",
                                projects: [],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/07/logo_bigger.png",
                                description:
                                    "Get the stats and stories behind the product launches from makers all over the world.",
                                created_at: "2018-11-08T02:28:43.600685+05:30",
                                launched_at: null
                            },
                            {
                                id: 232,
                                name: "FlagMe",
                                slug: "flagme",
                                user: 587,
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
                                created_at: "2018-11-08T05:56:59.171390+05:30",
                                launched_at: null
                            },
                            {
                                id: 233,
                                name: "Cashmyflight",
                                slug: "cashmyflight",
                                user: 750,
                                product_hunt: "",
                                twitter: "https://twitter.com/cashmyflight",
                                website: "https://www.cashmyflight-bot.com/",
                                projects: [
                                    {
                                        id: 882,
                                        name: "cashmyflight",
                                        private: false,
                                        user: 750
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/08/logo_app.png",
                                description: "Legalbot for flight refunds",
                                created_at: "2018-11-08T11:05:16.368516+05:30",
                                launched_at: "2018-11-08T11:05:16.360734+05:30"
                            },
                            {
                                id: 222,
                                name: "Edvins Blog",
                                slug: "edvins-blog",
                                user: 36,
                                product_hunt: "",
                                twitter: "edvinsantonovs",
                                website: "https://edvins.io",
                                projects: [
                                    {
                                        id: 114,
                                        name: "edvinsio",
                                        private: false,
                                        user: 36
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/07/male-technologist_1f468-200d-1f4bb.png",
                                description:
                                    "Blog about React, Angular, TypeScript, JavaScript and Front-End development",
                                created_at: "2018-11-07T20:16:15.345368+05:30",
                                launched_at: null
                            },
                            {
                                id: 221,
                                name: "Hustle Market",
                                slug: "hustle-market",
                                user: 36,
                                product_hunt: "",
                                twitter: "",
                                website: "hustle.market",
                                projects: [
                                    {
                                        id: 866,
                                        name: "hustlemarket",
                                        private: false,
                                        user: 36
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "Stealth mode",
                                created_at: "2018-11-07T20:14:17.951270+05:30",
                                launched_at: null
                            },
                            {
                                id: 235,
                                name: "JumpRank",
                                slug: "jumprank",
                                user: 754,
                                product_hunt: "",
                                twitter: "",
                                website: "jumprank.io",
                                projects: [
                                    {
                                        id: 886,
                                        name: "JumpRank",
                                        private: false,
                                        user: 754
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Automatically document SEO changes you make to your website.",
                                created_at: "2018-11-08T16:37:07.809567+05:30",
                                launched_at: null
                            },
                            {
                                id: 236,
                                name: "hostmytest",
                                slug: "hostmytest",
                                user: 735,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 887,
                                        name: "hostmytest",
                                        private: false,
                                        user: 735
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "create and share quiz (mcq based test)",
                                created_at: "2018-11-08T16:41:02.411971+05:30",
                                launched_at: null
                            },
                            {
                                id: 213,
                                name: "Shoptopus",
                                slug: "shoptopus",
                                user: 746,
                                product_hunt: "",
                                twitter: "shoptopus",
                                website: "",
                                projects: [
                                    {
                                        id: 843,
                                        name: "shoptopus",
                                        private: false,
                                        user: 746
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Help maker shops track, automate, and manage their business operations!",
                                created_at: "2018-11-06T02:50:09.945847+05:30",
                                launched_at: null
                            },
                            {
                                id: 239,
                                name: "Gamma Engine",
                                slug: "gamma-engine",
                                user: 731,
                                product_hunt: "",
                                twitter: "notmareklol",
                                website: "gammagta.online",
                                projects: [
                                    {
                                        id: 895,
                                        name: "gamma",
                                        private: false,
                                        user: 731
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/09/gamma-logo.png",
                                description: "Private GTA V mod menu.",
                                created_at: "2018-11-09T23:00:21.108729+05:30",
                                launched_at: "2018-11-09T23:00:21.101668+05:30"
                            },
                            {
                                id: 241,
                                name: "NiftyCo",
                                slug: "niftyco",
                                user: 737,
                                product_hunt: "",
                                twitter: "aniftyco",
                                website: "https://aniftyco.com",
                                projects: [
                                    {
                                        id: 898,
                                        name: "niftyco",
                                        private: false,
                                        user: 737
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/09/nifty-icon.png",
                                description:
                                    "We design & develop simple solutions to complex problems.",
                                created_at: "2018-11-10T04:18:14.655346+05:30",
                                launched_at: "2018-11-10T04:18:14.649407+05:30"
                            },
                            {
                                id: 244,
                                name: "Opsbot",
                                slug: "opsbot",
                                user: 1,
                                product_hunt: "",
                                twitter: "opsbothq",
                                website: "",
                                projects: [
                                    {
                                        id: 902,
                                        name: "opsbot",
                                        private: false,
                                        user: 1
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/10/Opsbotw2-01.png",
                                description: "Hire a robot.",
                                created_at: "2018-11-10T14:33:06.830172+05:30",
                                launched_at: null
                            },
                            {
                                id: 246,
                                name: "Productile",
                                slug: "productile",
                                user: 765,
                                product_hunt: "",
                                twitter: "",
                                website: "http://www.productile.xyz",
                                projects: [
                                    {
                                        id: 908,
                                        name: "design",
                                        private: false,
                                        user: 765
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/10/pr-ig.jpg",
                                description:
                                    "Unlimited Instagram content creation \nsubscription for brands 📷",
                                created_at: "2018-11-10T22:13:22.501026+05:30",
                                launched_at: null
                            },
                            {
                                id: 247,
                                name: "Helloradius",
                                slug: "helloradius",
                                user: 765,
                                product_hunt:
                                    "https://www.producthunt.com/posts/helloradius",
                                twitter: "",
                                website: "www.helloradius.co",
                                projects: [
                                    {
                                        id: 905,
                                        name: "socialmedia",
                                        private: false,
                                        user: 765
                                    },
                                    {
                                        id: 906,
                                        name: "instagram",
                                        private: false,
                                        user: 765
                                    },
                                    {
                                        id: 907,
                                        name: "contentcreation",
                                        private: false,
                                        user: 765
                                    },
                                    {
                                        id: 908,
                                        name: "design",
                                        private: false,
                                        user: 765
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/10/helloradius-logo.jpg",
                                description:
                                    "Get exposure, grow your audience, boost your engagement on Instagram.",
                                created_at: "2018-11-10T22:18:08.954753+05:30",
                                launched_at: "2018-11-10T22:18:08.952287+05:30"
                            },
                            {
                                id: 249,
                                name: "Jemini Framework",
                                slug: "jemini-framework",
                                user: 737,
                                product_hunt: "",
                                twitter: "",
                                website: "https://git.io/jemini",
                                projects: [
                                    {
                                        id: 910,
                                        name: "jemini",
                                        private: false,
                                        user: 737
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/10/jemini.png",
                                description:
                                    "Lets you create GraphQL backed applications from out of this world.",
                                created_at: "2018-11-11T01:45:22.442482+05:30",
                                launched_at: null
                            },
                            {
                                id: 251,
                                name: "Fireadmin",
                                slug: "fireadmin",
                                user: 773,
                                product_hunt: "",
                                twitter: "",
                                website: "https://fireadmin.app/",
                                projects: [
                                    {
                                        id: 917,
                                        name: "fireadmin",
                                        private: false,
                                        user: 773
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/11/touch.png",
                                description:
                                    "Dynamic dashboards for your Firebase database projects.",
                                created_at: "2018-11-11T19:43:05.057476+05:30",
                                launched_at: "2018-11-11T19:43:05.054127+05:30"
                            },
                            {
                                id: 326,
                                name: "albatross cafe",
                                slug: "albatross-cafe",
                                user: 897,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 1147,
                                        name: "albatross",
                                        private: false,
                                        user: 897
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "website",
                                created_at: "2018-11-25T09:16:45.024229+05:30",
                                launched_at: null
                            },
                            {
                                id: 242,
                                name: "maker.rocks",
                                slug: "makerrocks",
                                user: 26,
                                product_hunt:
                                    "https://www.producthunt.com/posts/maker-rocks",
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
                                    "https://api.getmakerlog.com/media/uploads/2018/11/18/gif.gif",
                                description:
                                    "One page that sums you up as a maker",
                                created_at: "2018-11-10T09:05:54.130446+05:30",
                                launched_at: "2018-11-18T14:08:56.312141+05:30"
                            },
                            {
                                id: 216,
                                name: "Findependents",
                                slug: "frugal-squad",
                                user: 750,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 848,
                                        name: "frugalsquad",
                                        private: false,
                                        user: 750
                                    },
                                    {
                                        id: 971,
                                        name: "findependents",
                                        private: false,
                                        user: 750
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/06/logo_colored.png",
                                description:
                                    "Reaching findependence together by sharing resources and logging your expenses",
                                created_at: "2018-11-06T13:25:58.271711+05:30",
                                launched_at: null
                            },
                            {
                                id: 234,
                                name: "Insta2blog",
                                slug: "insta2blog",
                                user: 753,
                                product_hunt: "",
                                twitter: "",
                                website:
                                    "https://github.com/alikhundmiri/insta2blog",
                                projects: [
                                    {
                                        id: 884,
                                        name: "insta2blog",
                                        private: false,
                                        user: 753
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/08/LogoMakr_3cbxo4.png",
                                description:
                                    "Create a blog post from your Instagram post.\n\nProduct Niche: Small Digital Product Seller Business on Instagram.",
                                created_at: "2018-11-08T13:34:40.635749+05:30",
                                launched_at: null
                            },
                            {
                                id: 357,
                                name: "Netweak",
                                slug: "netweak",
                                user: 949,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 1256,
                                        name: "netweak",
                                        private: false,
                                        user: 949
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/29/logo_qWETcEh.png",
                                description: "Web integration agency",
                                created_at: "2018-11-30T00:22:45.333435+05:30",
                                launched_at: null
                            },
                            {
                                id: 361,
                                name: "TBA",
                                slug: "tba",
                                user: 846,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 1273,
                                        name: "LC",
                                        private: false,
                                        user: 846
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/01/lbryChan.png",
                                description: "TBA",
                                created_at: "2018-12-01T06:26:07.423412+05:30",
                                launched_at: null
                            },
                            {
                                id: 253,
                                name: "PopMint",
                                slug: "popmint",
                                user: 774,
                                product_hunt: "",
                                twitter: "popmintapp",
                                website: "popmint.app",
                                projects: [
                                    {
                                        id: 922,
                                        name: "nft",
                                        private: false,
                                        user: 774
                                    },
                                    {
                                        id: 923,
                                        name: "blockchain",
                                        private: false,
                                        user: 774
                                    },
                                    {
                                        id: 924,
                                        name: "ethereum",
                                        private: false,
                                        user: 774
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/11/4_popmint_icon-01.png",
                                description: "The curiously useful token.",
                                created_at: "2018-11-11T21:48:42.911110+05:30",
                                launched_at: null
                            },
                            {
                                id: 254,
                                name: "Invoicebox.",
                                slug: "invoicebox",
                                user: 755,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 926,
                                        name: "organize",
                                        private: false,
                                        user: 755
                                    },
                                    {
                                        id: 927,
                                        name: "invoices",
                                        private: false,
                                        user: 755
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Invoicebox let's you organize all your invoices by sending them to pre-generated email addresses for each service you or your company has a subscription on.",
                                created_at: "2018-11-12T02:00:07.103101+05:30",
                                launched_at: null
                            },
                            {
                                id: 252,
                                name: "Rekt",
                                slug: "rekt",
                                user: 585,
                                product_hunt: "",
                                twitter: "rekt_re",
                                website: "https://rekt.re",
                                projects: [
                                    {
                                        id: 920,
                                        name: "rekt_re",
                                        private: false,
                                        user: 585
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/11/logo_black.png",
                                description:
                                    "Your boutique Cryptocurrency toolkit —\nBets • Breakout detection • Tweet analysis",
                                created_at: "2018-11-11T20:42:23.796436+05:30",
                                launched_at: null
                            },
                            {
                                id: 257,
                                name: "Tapestry",
                                slug: "tapestry",
                                user: 781,
                                product_hunt: "",
                                twitter: "",
                                website: "tapestry.cloud",
                                projects: [
                                    {
                                        id: 933,
                                        name: "staticsitegenerator",
                                        private: false,
                                        user: 781
                                    },
                                    {
                                        id: 934,
                                        name: "ssg",
                                        private: false,
                                        user: 781
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/12/28765261.png",
                                description:
                                    "A static site generator written in PHP that uses the PHP-Plates template system.",
                                created_at: "2018-11-12T15:59:41.726088+05:30",
                                launched_at: "2018-11-12T15:59:41.722234+05:30"
                            },
                            {
                                id: 259,
                                name: "1KProjects",
                                slug: "1kprojects",
                                user: 788,
                                product_hunt:
                                    "producthunt.com/posts/1kprojects",
                                twitter: "1k_projects",
                                website: "1kprojects.com",
                                projects: [
                                    {
                                        id: 937,
                                        name: "sideproject",
                                        private: false,
                                        user: 788
                                    },
                                    {
                                        id: 938,
                                        name: "marketplace",
                                        private: false,
                                        user: 788
                                    },
                                    {
                                        id: 939,
                                        name: "challenge",
                                        private: false,
                                        user: 788
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/12/1kp-twitter.png",
                                description:
                                    "A curated marketplace where makers sell their abandoned projects for less than $1000",
                                created_at: "2018-11-13T01:12:03.029223+05:30",
                                launched_at: "2018-11-13T01:12:03.025753+05:30"
                            },
                            {
                                id: 276,
                                name: "Zeitlog",
                                slug: "zeitlog",
                                user: 762,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 989,
                                        name: "zeitlog",
                                        private: false,
                                        user: 762
                                    },
                                    {
                                        id: 990,
                                        name: "app",
                                        private: false,
                                        user: 762
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Time tracking app designed to encourage pursuit of goals and optimal time utilization",
                                created_at: "2018-11-17T07:26:00.547712+05:30",
                                launched_at: null
                            },
                            {
                                id: 278,
                                name: "Subsail Blog",
                                slug: "subsail-blog",
                                user: 820,
                                product_hunt: "",
                                twitter: "subsailcom",
                                website: "subsail.com/blog/",
                                projects: [
                                    {
                                        id: 995,
                                        name: "subsailblog",
                                        private: false,
                                        user: 820
                                    },
                                    {
                                        id: 996,
                                        name: "blog",
                                        private: false,
                                        user: 820
                                    },
                                    {
                                        id: 997,
                                        name: "marketing",
                                        private: false,
                                        user: 820
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "Marketing blog for Subsail.",
                                created_at: "2018-11-17T09:40:26.587457+05:30",
                                launched_at: null
                            },
                            {
                                id: 261,
                                name: "Personal Website",
                                slug: "personal-website",
                                user: 782,
                                product_hunt: "",
                                twitter: "",
                                website: "http://joeoliver.apps-1and1.net",
                                projects: [
                                    {
                                        id: 943,
                                        name: "personalwebsite",
                                        private: false,
                                        user: 782
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/13/JoeO_Icon2x.png",
                                description: "My personal website",
                                created_at: "2018-11-13T08:56:22.012016+05:30",
                                launched_at: null
                            },
                            {
                                id: 260,
                                name: "Asobu",
                                slug: "asobu",
                                user: 782,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 941,
                                        name: "asobu",
                                        private: false,
                                        user: 782
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/13/Asobu_Placeholder_Logo3x.png",
                                description:
                                    "Send out a boredom beacon and let your friends know you're down to hang out.",
                                created_at: "2018-11-13T08:42:17.794626+05:30",
                                launched_at: null
                            },
                            {
                                id: 262,
                                name: "timetopodcast",
                                slug: "timetopodcast",
                                user: 795,
                                product_hunt: "",
                                twitter: "timetopodcast",
                                website: "timetopodcast.com",
                                projects: [
                                    {
                                        id: 947,
                                        name: "timetopodcast",
                                        private: false,
                                        user: 795
                                    },
                                    {
                                        id: 948,
                                        name: "podcast",
                                        private: false,
                                        user: 795
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/13/43915280_171063497168261_5113184322806874112_n.jpg",
                                description:
                                    "Podcast shows curation - by mood, theme and duration",
                                created_at: "2018-11-14T04:00:00.995010+05:30",
                                launched_at: "2018-11-14T04:00:00.989068+05:30"
                            },
                            {
                                id: 264,
                                name: "Cards against Humanity with Friends",
                                slug: "cards-against-humanity-with-friends",
                                user: 781,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 953,
                                        name: "game",
                                        private: false,
                                        user: 781
                                    },
                                    {
                                        id: 954,
                                        name: "cardgame",
                                        private: false,
                                        user: 781
                                    },
                                    {
                                        id: 955,
                                        name: "multiplayer",
                                        private: false,
                                        user: 781
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Online multiplayer CaH that has a decent design and user experience.",
                                created_at: "2018-11-14T14:35:14.488390+05:30",
                                launched_at: null
                            },
                            {
                                id: 279,
                                name: "Subsail",
                                slug: "subsail",
                                user: 820,
                                product_hunt: "",
                                twitter: "subsailcom",
                                website: "subsail.com",
                                projects: [
                                    {
                                        id: 1000,
                                        name: "saas",
                                        private: false,
                                        user: 820
                                    },
                                    {
                                        id: 998,
                                        name: "subsail",
                                        private: false,
                                        user: 820
                                    },
                                    {
                                        id: 999,
                                        name: "payments",
                                        private: false,
                                        user: 820
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/17/logo.png",
                                description: "Magazine subscription processor.",
                                created_at: "2018-11-17T09:41:07.586265+05:30",
                                launched_at: "2018-11-17T09:41:07.583480+05:30"
                            },
                            {
                                id: 266,
                                name: "Secret Heroes",
                                slug: "secret-heroes",
                                user: 804,
                                product_hunt: "",
                                twitter: "",
                                website: "secretheroes.co",
                                projects: [
                                    {
                                        id: 957,
                                        name: "secretheroes",
                                        private: false,
                                        user: 804
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "1 click to Send anonymous appreciation notes to people you care for.",
                                created_at: "2018-11-15T00:52:04.003744+05:30",
                                launched_at: null
                            },
                            {
                                id: 268,
                                name: "Stream Forever",
                                slug: "stream-forever",
                                user: 808,
                                product_hunt: "",
                                twitter: "",
                                website: "streamforever.co",
                                projects: [
                                    {
                                        id: 967,
                                        name: "streamforever",
                                        private: false,
                                        user: 808
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/15/shareimage.png",
                                description:
                                    "Create forever running Youtube playlists that stay in sync",
                                created_at: "2018-11-15T15:25:12.100978+05:30",
                                launched_at: "2018-11-15T15:25:12.098628+05:30"
                            },
                            {
                                id: 269,
                                name: "Datatlas",
                                slug: "datatlas",
                                user: 802,
                                product_hunt: "",
                                twitter: "datatlas_com",
                                website: "https://www.datatlas.com",
                                projects: [
                                    {
                                        id: 968,
                                        name: "datatlas",
                                        private: false,
                                        user: 802
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/15/favicon1.png",
                                description:
                                    "Database & API for accessing geographical data.",
                                created_at: "2018-11-15T16:58:26.379212+05:30",
                                launched_at: null
                            },
                            {
                                id: 270,
                                name: "Skypaper",
                                slug: "skypaper",
                                user: 802,
                                product_hunt: "",
                                twitter: "skypaper.io",
                                website: "https://www.skypaper.io",
                                projects: [
                                    {
                                        id: 969,
                                        name: "skypaper",
                                        private: false,
                                        user: 802
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/15/apple-touch-icon1.png",
                                description:
                                    "Application which permits to send custom postcards",
                                created_at: "2018-11-15T17:13:10.030871+05:30",
                                launched_at: null
                            },
                            {
                                id: 280,
                                name: "MVD",
                                slug: "mvd",
                                user: 762,
                                product_hunt: "",
                                twitter: "mrvdot",
                                website: "mrvdot.com",
                                projects: [
                                    {
                                        id: 1001,
                                        name: "mvd",
                                        private: false,
                                        user: 762
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/17/colored.png",
                                description: "Personal Consulting Service",
                                created_at: "2018-11-17T10:12:25.030533+05:30",
                                launched_at: "2018-11-17T10:12:25.027875+05:30"
                            },
                            {
                                id: 263,
                                name: "mojourl",
                                slug: "mojourl",
                                user: 798,
                                product_hunt:
                                    "https://www.producthunt.com/upcoming/mojourl",
                                twitter: "",
                                website: "mojourl.com",
                                projects: [
                                    {
                                        id: 952,
                                        name: "SaaS",
                                        private: false,
                                        user: 798
                                    },
                                    {
                                        id: 950,
                                        name: "mojourl",
                                        private: false,
                                        user: 798
                                    },
                                    {
                                        id: 951,
                                        name: "marketing",
                                        private: false,
                                        user: 798
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "URL shortner for any link that adds visitors to custom audience for retargeting. #24hrstartup",
                                created_at: "2018-11-14T12:37:18.888995+05:30",
                                launched_at: null
                            },
                            {
                                id: 271,
                                name: "IdeaLogoDomain.com",
                                slug: "idealogodomaincom",
                                user: 805,
                                product_hunt: "",
                                twitter: "idealogodomain",
                                website: "idealogodomain.com",
                                projects: [
                                    {
                                        id: 970,
                                        name: "IdeaLogoDomain",
                                        private: false,
                                        user: 805
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/15/Logo_3MNW8vk.jpg",
                                description:
                                    "You have a Startup 💡Idea, 🔅Logo & 🕸️Domain - What are you waiting for? Find a partner to execute the plan or Monetize yours at #IdeaLogoDomain",
                                created_at: "2018-11-15T18:22:35.231950+05:30",
                                launched_at: null
                            },
                            {
                                id: 272,
                                name: "Upvote Bell",
                                slug: "upvote-bell",
                                user: 142,
                                product_hunt:
                                    "https://www.producthunt.com/posts/upvote-bell",
                                twitter: "upvoteBell",
                                website: "https://upvote-bell.com",
                                projects: [
                                    {
                                        id: 975,
                                        name: "UpvoteBell",
                                        private: false,
                                        user: 142
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/15/72a825ad-96a7-492f-bb47-8b87dc8c84b5.png",
                                description:
                                    "Dashboard for your Product Hunt projects.",
                                created_at: "2018-11-16T02:11:01.541214+05:30",
                                launched_at: "2018-11-16T02:11:01.537081+05:30"
                            },
                            {
                                id: 273,
                                name: "buykerracoffee",
                                slug: "buykerracoffee",
                                user: 554,
                                product_hunt: "",
                                twitter: "kerrtrvs",
                                website: "https://buymeacoff.ee/kerr",
                                projects: [
                                    {
                                        id: 983,
                                        name: "buykerracoffee",
                                        private: false,
                                        user: 554
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/16/proxy.duckduckgo.com.png",
                                description:
                                    "A webhook that posts when someone buys me a coffee. ☕️",
                                created_at: "2018-11-17T00:50:19.806147+05:30",
                                launched_at: null
                            },
                            {
                                id: 275,
                                name: "React Native Book",
                                slug: "react-native-book",
                                user: 762,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 987,
                                        name: "book",
                                        private: false,
                                        user: 762
                                    },
                                    {
                                        id: 988,
                                        name: "writing",
                                        private: false,
                                        user: 762
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Introduction book to React Native",
                                created_at: "2018-11-17T07:24:22.905504+05:30",
                                launched_at: null
                            },
                            {
                                id: 283,
                                name: "WirelessWrist",
                                slug: "wirelesswrist",
                                user: 822,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 1004,
                                        name: "arduino",
                                        private: false,
                                        user: 822
                                    },
                                    {
                                        id: 1005,
                                        name: "wristband",
                                        private: false,
                                        user: 822
                                    },
                                    {
                                        id: 1006,
                                        name: "WirelessWrist",
                                        private: false,
                                        user: 822
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/17/logo_qcxcho2.png",
                                description:
                                    "It is a wireless LED wrist band which receives commands from an Arduino with a RF Module",
                                created_at: "2018-11-17T19:05:47.450070+05:30",
                                launched_at: null
                            },
                            {
                                id: 284,
                                name: "Datascope",
                                slug: "datascope",
                                user: 830,
                                product_hunt: "",
                                twitter: "",
                                website: "datascope.me",
                                projects: [
                                    {
                                        id: 1012,
                                        name: "Datascope",
                                        private: false,
                                        user: 830
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Stop reliving the same day over and over",
                                created_at: "2018-11-18T09:40:57.693627+05:30",
                                launched_at: null
                            },
                            {
                                id: 285,
                                name: "RemoteAuth",
                                slug: "remoteauth",
                                user: 833,
                                product_hunt: "",
                                twitter: "remoteauthapp",
                                website: "remoteauth.com",
                                projects: [
                                    {
                                        id: 1013,
                                        name: "remoteauth",
                                        private: false,
                                        user: 833
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Users, roles, permissions, subscriptions, billing all handled for you, so you can focus on building your application.",
                                created_at: "2018-11-18T11:05:29.430102+05:30",
                                launched_at: null
                            },
                            {
                                id: 286,
                                name: "NutPanda",
                                slug: "nutpanda",
                                user: 824,
                                product_hunt: "",
                                twitter: "NutPandaDotCom",
                                website: "https://nutpanda.com",
                                projects: [
                                    {
                                        id: 1016,
                                        name: "serviceworkers",
                                        private: false,
                                        user: 824
                                    },
                                    {
                                        id: 1014,
                                        name: "seo",
                                        private: false,
                                        user: 824
                                    },
                                    {
                                        id: 1015,
                                        name: "digitalmarketing",
                                        private: false,
                                        user: 824
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/18/2561.png",
                                description:
                                    "NutPanda.com is a place to share digital marketing and web optimization knowledge and also a business site.",
                                created_at: "2018-11-18T11:08:58.061715+05:30",
                                launched_at: "2018-11-18T11:08:58.045787+05:30"
                            },
                            {
                                id: 267,
                                name: "Remoter.net",
                                slug: "remoternet",
                                user: 780,
                                product_hunt: "",
                                twitter: "remoter_net",
                                website: "remoter.net",
                                projects: [
                                    {
                                        id: 1018,
                                        name: "remoter",
                                        private: false,
                                        user: 780
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/15/icon-above-font.png",
                                description:
                                    "Find Remote Job in a few hours💪 Hire the best remote workers👨‍💻",
                                created_at: "2018-11-15T14:55:45.437348+05:30",
                                launched_at: null
                            },
                            {
                                id: 282,
                                name: "Rounditt",
                                slug: "rounditt",
                                user: 647,
                                product_hunt:
                                    "https://www.producthunt.com/posts/rounditt",
                                twitter: "",
                                website: "rounditt.com",
                                projects: [
                                    {
                                        id: 1003,
                                        name: "Rounditt",
                                        private: false,
                                        user: 647
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/17/Logo.png",
                                description:
                                    "The community that allows users to share books with each other",
                                created_at: "2018-11-17T18:40:15.198183+05:30",
                                launched_at: "2018-11-18T14:09:41.560228+05:30"
                            },
                            {
                                id: 288,
                                name: "shawe.co",
                                slug: "shaweco",
                                user: 839,
                                product_hunt: "",
                                twitter: "theshawe",
                                website: "shawe.co",
                                projects: [
                                    {
                                        id: 1030,
                                        name: "theshawe",
                                        private: false,
                                        user: 839
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/18/Screen_Shot_2018-11-18_at_11.27.14.png",
                                description:
                                    "Hi, this is the website of David Jackson Shawe. (that's me) It's my personal blog/website and I'll update it regulary. It's built with Jekyll and hosted on github pages.",
                                created_at: "2018-11-18T16:58:00.795204+05:30",
                                launched_at: "2018-11-18T16:58:00.791560+05:30"
                            },
                            {
                                id: 289,
                                name: "8Pixels",
                                slug: "8pixels",
                                user: 843,
                                product_hunt: "",
                                twitter: "",
                                website: "8pixels.io",
                                projects: [
                                    {
                                        id: 1031,
                                        name: "design",
                                        private: false,
                                        user: 843
                                    },
                                    {
                                        id: 1032,
                                        name: "maker",
                                        private: false,
                                        user: 843
                                    },
                                    {
                                        id: 1033,
                                        name: "indie",
                                        private: false,
                                        user: 843
                                    },
                                    {
                                        id: 1034,
                                        name: "bootstrapped",
                                        private: false,
                                        user: 843
                                    },
                                    {
                                        id: 1035,
                                        name: "designer",
                                        private: false,
                                        user: 843
                                    },
                                    {
                                        id: 1036,
                                        name: "graphicdesign",
                                        private: false,
                                        user: 843
                                    },
                                    {
                                        id: 1037,
                                        name: "product",
                                        private: false,
                                        user: 843
                                    },
                                    {
                                        id: 1038,
                                        name: "product_design",
                                        private: false,
                                        user: 843
                                    },
                                    {
                                        id: 1039,
                                        name: "startup",
                                        private: false,
                                        user: 843
                                    },
                                    {
                                        id: 1040,
                                        name: "startups",
                                        private: false,
                                        user: 843
                                    }
                                ],
                                launched: true,
                                icon: null,
                                description:
                                    "Unlimited Graphic Design Services for Startups from $199/m 🛠",
                                created_at: "2018-11-18T18:16:32.219757+05:30",
                                launched_at: "2018-11-18T18:16:32.217906+05:30"
                            },
                            {
                                id: 290,
                                name: "Sekolah",
                                slug: "sekolah",
                                user: 834,
                                product_hunt: "",
                                twitter: "",
                                website: "sekolah.nl",
                                projects: [
                                    {
                                        id: 1041,
                                        name: "Sekolah",
                                        private: false,
                                        user: 834
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/18/icon_student.png",
                                description:
                                    "Private(-ish) scheduling and assignment PWA",
                                created_at: "2018-11-18T19:31:33.899692+05:30",
                                launched_at: null
                            },
                            {
                                id: 281,
                                name: "Markdown.love",
                                slug: "markdownlove",
                                user: 454,
                                product_hunt: "",
                                twitter: "https://twitter.com/markdownlove",
                                website: "markdown.love",
                                projects: [
                                    {
                                        id: 1002,
                                        name: "mdlove",
                                        private: false,
                                        user: 454
                                    }
                                ],
                                launched: true,
                                icon: null,
                                description:
                                    "Get rid of the clutter and get just what matters of any article in plain Markdown.",
                                created_at: "2018-11-17T13:20:38.239664+05:30",
                                launched_at: "2018-11-21T03:44:23.212957+05:30"
                            },
                            {
                                id: 351,
                                name: "ahoy.live",
                                slug: "ahoylive",
                                user: 945,
                                product_hunt: "",
                                twitter: "",
                                website: "ahoy.live",
                                projects: [
                                    {
                                        id: 1236,
                                        name: "ahoylive",
                                        private: false,
                                        user: 945
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Platform and community for developers to live stream their work.",
                                created_at: "2018-11-29T06:30:49.224689+05:30",
                                launched_at: null
                            },
                            {
                                id: 274,
                                name: "Wikishirts",
                                slug: "wikishirts",
                                user: 818,
                                product_hunt:
                                    "producthunt.com/posts/wikishirts",
                                twitter: "",
                                website: "wikishirts.io",
                                projects: [
                                    {
                                        id: 1235,
                                        name: "wikishirts",
                                        private: false,
                                        user: 818
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/16/Thumbnail.png",
                                description:
                                    "Provide T-shirts generated from Wikipedia.",
                                created_at: "2018-11-17T04:45:28.497917+05:30",
                                launched_at: "2018-11-17T04:45:28.495165+05:30"
                            },
                            {
                                id: 324,
                                name: "Personal blog",
                                slug: "personal-blog",
                                user: 818,
                                product_hunt: "",
                                twitter: "",
                                website: "bensampson.me",
                                projects: [
                                    {
                                        id: 1136,
                                        name: "blog",
                                        private: false,
                                        user: 818
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Show people what I'm writing and working on",
                                created_at: "2018-11-24T16:23:52.156550+05:30",
                                launched_at: null
                            },
                            {
                                id: 364,
                                name: "ProGolang",
                                slug: "progolang",
                                user: 621,
                                product_hunt: "",
                                twitter: "progolang",
                                website: "progolang.com",
                                projects: [
                                    {
                                        id: 1291,
                                        name: "progolang",
                                        private: false,
                                        user: 621
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "Blog about Golang",
                                created_at: "2018-12-01T23:51:24.529210+05:30",
                                launched_at: null
                            },
                            {
                                id: 255,
                                name: "CityMatRP",
                                slug: "citymatrp",
                                user: 776,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 929,
                                        name: "CityMat",
                                        private: false,
                                        user: 776
                                    },
                                    {
                                        id: 930,
                                        name: "BeforeIAmIBecome",
                                        private: false,
                                        user: 776
                                    },
                                    {
                                        id: 1343,
                                        name: "254makers",
                                        private: false,
                                        user: 776
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "Let's get you there...",
                                created_at: "2018-11-12T04:53:48.843996+05:30",
                                launched_at: null
                            },
                            {
                                id: 258,
                                name: "FediCast",
                                slug: "fedicast",
                                user: 781,
                                product_hunt: "",
                                twitter: "",
                                website: "www.fedicast.com",
                                projects: [
                                    {
                                        id: 935,
                                        name: "podcast",
                                        private: false,
                                        user: 781
                                    },
                                    {
                                        id: 1566,
                                        name: "fedicast",
                                        private: false,
                                        user: 781
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "An optionally self hosted podcast publishing platform that federates with the Fediverse.",
                                created_at: "2018-11-12T16:03:43.559568+05:30",
                                launched_at: null
                            },
                            {
                                id: 292,
                                name: "Makers Up",
                                slug: "makers-up-2",
                                user: 554,
                                product_hunt: "",
                                twitter: "makersup",
                                website: "makersup.xyz",
                                projects: [
                                    {
                                        id: 1043,
                                        name: "makersup",
                                        private: false,
                                        user: 554
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/18/makersup.jpg",
                                description:
                                    "What are makers up to? Get your updates and reviews on makers and products! 🗞",
                                created_at: "2018-11-18T20:25:17.474785+05:30",
                                launched_at: null
                            },
                            {
                                id: 293,
                                name: "Swipop.co",
                                slug: "swipopco",
                                user: 856,
                                product_hunt: "",
                                twitter: "",
                                website: "swipop.co",
                                projects: [
                                    {
                                        id: 1048,
                                        name: "sell",
                                        private: false,
                                        user: 856
                                    },
                                    {
                                        id: 1045,
                                        name: "smartlink",
                                        private: false,
                                        user: 856
                                    },
                                    {
                                        id: 1046,
                                        name: "sideproject",
                                        private: false,
                                        user: 856
                                    },
                                    {
                                        id: 1047,
                                        name: "buy",
                                        private: false,
                                        user: 856
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/18/swipop.png",
                                description:
                                    "SMART LINK FOR CREATORS\nShare all your social media with one link and give monetized premium content access to your followers!",
                                created_at: "2018-11-19T02:40:58.933240+05:30",
                                launched_at: "2018-11-19T02:40:58.930547+05:30"
                            },
                            {
                                id: 294,
                                name: "Digital Cairn",
                                slug: "digital-cairn",
                                user: 857,
                                product_hunt: "",
                                twitter: "https://twitter.com/BrandonHerford",
                                website:
                                    "https://brandondh.github.io/cairnternet/",
                                projects: [
                                    {
                                        id: 1049,
                                        name: "userinterface",
                                        private: false,
                                        user: 857
                                    },
                                    {
                                        id: 1050,
                                        name: "ux",
                                        private: false,
                                        user: 857
                                    },
                                    {
                                        id: 1051,
                                        name: "interaction",
                                        private: false,
                                        user: 857
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/18/pebble-8.png",
                                description:
                                    "Digital lets you build a Cairn in your browser",
                                created_at: "2018-11-19T02:44:35.184237+05:30",
                                launched_at: "2018-11-19T02:44:35.181722+05:30"
                            },
                            {
                                id: 41,
                                name: "Wave TV",
                                slug: "wave-tv",
                                user: 551,
                                product_hunt:
                                    "https://www.producthunt.com/posts/wave-tv",
                                twitter: "wavetvapp",
                                website: "https://wavetv.co",
                                projects: [
                                    {
                                        id: 344,
                                        name: "wavetv",
                                        private: false,
                                        user: 551
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/21/Untitled_design_1.png",
                                description:
                                    "Wave TV is television for the age of the internet. It retrieves the internet's best, most recent content and sorts it into channels for you to enjoy. Videos play one after another, much like traditional television. The best part? It's all free.",
                                created_at: "2018-08-30T04:53:07.522808+05:30",
                                launched_at: "2018-11-21T21:13:02.069019+05:30"
                            },
                            {
                                id: 312,
                                name: "slidejoy",
                                slug: "slidejoy",
                                user: 899,
                                product_hunt: "",
                                twitter: "traceymeagher",
                                website: "slidejoy.co",
                                projects: [
                                    {
                                        id: 1100,
                                        name: "slidejoy",
                                        private: false,
                                        user: 899
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "make videos from presentation slides",
                                created_at: "2018-11-21T21:43:10.596550+05:30",
                                launched_at: null
                            },
                            {
                                id: 313,
                                name: "LeaveMeAlone",
                                slug: "leavemealone",
                                user: 587,
                                product_hunt: "",
                                twitter: "leavemealone",
                                website: "leavemealone.xyz",
                                projects: [
                                    {
                                        id: 1101,
                                        name: "leavemealone",
                                        private: false,
                                        user: 587
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/21/transparent-logo.png",
                                description:
                                    "Take back control of your inbox by telling subscription spammers to leave you alone!",
                                created_at: "2018-11-21T21:47:12.392855+05:30",
                                launched_at: null
                            },
                            {
                                id: 296,
                                name: "Apparel Support",
                                slug: "apparel-support",
                                user: 861,
                                product_hunt: "",
                                twitter: "",
                                website: "http://new.apparelsupport.com/",
                                projects: [
                                    {
                                        id: 1056,
                                        name: "wordpress",
                                        private: false,
                                        user: 861
                                    },
                                    {
                                        id: 1055,
                                        name: "website",
                                        private: false,
                                        user: 861
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "website",
                                created_at: "2018-11-19T13:53:46.405637+05:30",
                                launched_at: null
                            },
                            {
                                id: 297,
                                name: "Gatheroo",
                                slug: "gatheroo",
                                user: 865,
                                product_hunt: "",
                                twitter: "gatheroo",
                                website: "https://gatheroo.co",
                                projects: [
                                    {
                                        id: 1058,
                                        name: "kpi",
                                        private: false,
                                        user: 865
                                    },
                                    {
                                        id: 1059,
                                        name: "serverless",
                                        private: false,
                                        user: 865
                                    },
                                    {
                                        id: 1060,
                                        name: "smooth",
                                        private: false,
                                        user: 865
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Gatheroo lets you track, visualize and share KPIs effortlessly",
                                created_at: "2018-11-19T15:13:24.837070+05:30",
                                launched_at: null
                            },
                            {
                                id: 291,
                                name: "Alternative Education List",
                                slug: "alternative-education-list",
                                user: 846,
                                product_hunt: "",
                                twitter: "https://twitter.com/altedlist",
                                website: "http://alteducationlist.com/",
                                projects: [
                                    {
                                        id: 1042,
                                        name: "alteducationlist",
                                        private: false,
                                        user: 846
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/19/noun_education_1590380_000000.ico",
                                description:
                                    "It's a collection of any resource, bootcamp, or program that could be used as an alternative to traditional education whether that be public school, college, or something else.",
                                created_at: "2018-11-18T20:17:50.505462+05:30",
                                launched_at: "2018-11-19T22:40:09.305231+05:30"
                            },
                            {
                                id: 302,
                                name: "Quoim",
                                slug: "quoim",
                                user: 647,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 1066,
                                        name: "quoim",
                                        private: false,
                                        user: 647
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/20/Untitled-1.png",
                                description:
                                    "Collective quotes with awesome images delivered to you",
                                created_at: "2018-11-20T08:06:58.455550+05:30",
                                launched_at: null
                            },
                            {
                                id: 303,
                                name: "Break the Class",
                                slug: "break-the-class",
                                user: 882,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 1072,
                                        name: "breaktheclass",
                                        private: false,
                                        user: 882
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "Ideas for project-based learning",
                                created_at: "2018-11-20T11:06:48.984913+05:30",
                                launched_at: null
                            },
                            {
                                id: 332,
                                name: "Frontend Mentor",
                                slug: "frontend-mentor",
                                user: 930,
                                product_hunt: "",
                                twitter: "frontendmentor",
                                website: "https://www.frontendmentor.io",
                                projects: [
                                    {
                                        id: 1245,
                                        name: "frontendmentor",
                                        private: false,
                                        user: 930
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/26/fem-logo.png",
                                description:
                                    "Helps people improve their HTML, CSS and JavaScript skills by building projects in a real-life workflow.",
                                created_at: "2018-11-26T14:07:39.625475+05:30",
                                launched_at: "2018-11-26T14:07:39.623361+05:30"
                            },
                            {
                                id: 307,
                                name: "NameScore",
                                slug: "namescore",
                                user: 892,
                                product_hunt:
                                    "https://www.producthunt.com/posts/namescore",
                                twitter: "https://twitter.com/NamerobotEN",
                                website: "https://www.namescore.io/",
                                projects: [
                                    {
                                        id: 1123,
                                        name: "NameScore",
                                        private: false,
                                        user: 892
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/21/Icon.png",
                                description:
                                    "Checking business names and brand names, faster than ever before",
                                created_at: "2018-11-21T13:20:55.071209+05:30",
                                launched_at: "2018-11-21T13:20:55.068373+05:30"
                            },
                            {
                                id: 355,
                                name: "E1",
                                slug: "e1",
                                user: 104,
                                product_hunt:
                                    "https://www.producthunt.com/upcoming/eventone",
                                twitter: "eventonehq",
                                website: "geteventone.com",
                                projects: [
                                    {
                                        id: 1246,
                                        name: "e1",
                                        private: false,
                                        user: 104
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/29/e1.png",
                                description: "Tools to power your next event.",
                                created_at: "2018-11-29T19:45:06.939071+05:30",
                                launched_at: null
                            },
                            {
                                id: 306,
                                name: "Namefruits",
                                slug: "namefruits",
                                user: 892,
                                product_hunt:
                                    "https://www.producthunt.com/posts/namefruits",
                                twitter: "NamerobotEN",
                                website: "https://www.namefruits.com",
                                projects: [
                                    {
                                        id: 1124,
                                        name: "Namefruits",
                                        private: false,
                                        user: 892
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/21/namefruits_frucht_192x192.png",
                                description:
                                    "Namefruits is a naming AI (Artificial Intelligence), which creates creative and individual business names for your project",
                                created_at: "2018-11-21T13:19:13.670618+05:30",
                                launched_at: "2018-11-21T13:19:13.665961+05:30"
                            },
                            {
                                id: 314,
                                name: "malibu",
                                slug: "malibu",
                                user: 904,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 1104,
                                        name: "malibu",
                                        private: false,
                                        user: 904
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "adds filters to photos and videos",
                                created_at: "2018-11-22T02:15:24.397875+05:30",
                                launched_at: null
                            },
                            {
                                id: 315,
                                name: "Connect With Strangers",
                                slug: "connect-with-strangers",
                                user: 762,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 1105,
                                        name: "cws",
                                        private: false,
                                        user: 762
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "Sssshhh, that's coming soon",
                                created_at: "2018-11-22T04:47:51.057970+05:30",
                                launched_at: null
                            },
                            {
                                id: 305,
                                name: "Mason Dash",
                                slug: "masonhartmancom",
                                user: 882,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 1085,
                                        name: "masondash",
                                        private: false,
                                        user: 882
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "Personal homebase",
                                created_at: "2018-11-20T23:17:42.009163+05:30",
                                launched_at: null
                            },
                            {
                                id: 298,
                                name: "Colivingly",
                                slug: "colivingly",
                                user: 78,
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
                                    "https://api.getmakerlog.com/media/uploads/2018/11/19/Screen_Shot_2018-11-19_at_10.48.50.png",
                                description:
                                    "Find like minded people to live with",
                                created_at: "2018-11-19T15:19:32.626872+05:30",
                                launched_at: null
                            },
                            {
                                id: 308,
                                name: "MakingYours",
                                slug: "makingyours",
                                user: 884,
                                product_hunt: "",
                                twitter: "",
                                website: "makingyours.com",
                                projects: [
                                    {
                                        id: 1095,
                                        name: "makingyours",
                                        private: false,
                                        user: 884
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/21/Screenshot_from_2018-11-21_09-00-19.png",
                                description: "You have ideas, I build them",
                                created_at: "2018-11-21T13:33:33.309369+05:30",
                                launched_at: null
                            },
                            {
                                id: 309,
                                name: "Indielanding",
                                slug: "indielanding",
                                user: 691,
                                product_hunt: "",
                                twitter: "indielanding",
                                website: "indielanding.com",
                                projects: [
                                    {
                                        id: 1097,
                                        name: "indielanding",
                                        private: false,
                                        user: 691
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/21/icon-above-font.png",
                                description:
                                    "Instantly great a website for your game or app.",
                                created_at: "2018-11-21T15:52:48.850628+05:30",
                                launched_at: "2018-11-21T15:52:48.848325+05:30"
                            },
                            {
                                id: 310,
                                name: "laterfication",
                                slug: "laterfication",
                                user: 894,
                                product_hunt: "",
                                twitter: "pdoooo1",
                                website: "",
                                projects: [
                                    {
                                        id: 1096,
                                        name: "laterfication",
                                        private: false,
                                        user: 894
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "...",
                                created_at: "2018-11-21T15:55:02.472644+05:30",
                                launched_at: null
                            },
                            {
                                id: 304,
                                name: "ChangeLog.host",
                                slug: "changeloghost",
                                user: 621,
                                product_hunt: "",
                                twitter: "",
                                website: "changelog.host",
                                projects: [
                                    {
                                        id: 1074,
                                        name: "changeloghost",
                                        private: false,
                                        user: 621
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/24/_2511_Logo_Changelog_colour.png",
                                description:
                                    "Host your product change logs in seconds",
                                created_at: "2018-11-20T11:33:08.276627+05:30",
                                launched_at: null
                            },
                            {
                                id: 299,
                                name: "Color Koala",
                                slug: "color-koala",
                                user: 872,
                                product_hunt:
                                    "https://www.producthunt.com/posts/color-koala",
                                twitter: "whimandwind",
                                website: "colorkoala.xyz",
                                projects: [
                                    {
                                        id: 1082,
                                        name: "colorkoala",
                                        private: false,
                                        user: 872
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/21/favicon.png",
                                description:
                                    "The koala-ty color palette generator, creating gorgeous colors for all of your side projects!",
                                created_at: "2018-11-19T21:53:38.175783+05:30",
                                launched_at: "2018-11-26T12:03:47.021522+05:30"
                            },
                            {
                                id: 353,
                                name: "Makers Up",
                                slug: "makers-up",
                                user: 946,
                                product_hunt:
                                    "producthunt.com/upcoming/makersup",
                                twitter: "makersup",
                                website: "makersup.xyz",
                                projects: [
                                    {
                                        id: 1239,
                                        name: "makersup",
                                        private: false,
                                        user: 946
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/29/icon-above-font.png",
                                description:
                                    "The fastest growing platform for indie news and all things maker.",
                                created_at: "2018-11-29T10:50:27.794646+05:30",
                                launched_at: null
                            },
                            {
                                id: 354,
                                name: "Klicc",
                                slug: "klicc",
                                user: 946,
                                product_hunt: "producthunt.com/upcoming/klicc",
                                twitter: "SearchKlicc",
                                website: "klicc.herokuapp.com",
                                projects: [
                                    {
                                        id: 1240,
                                        name: "klicc",
                                        private: false,
                                        user: 946
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/29/icon-above-font_BvoAIOG.png",
                                description:
                                    "Search for a maker who's willing to help you out after office hours.",
                                created_at: "2018-11-29T10:51:31.729340+05:30",
                                launched_at: null
                            },
                            {
                                id: 360,
                                name: "Aiplon",
                                slug: "aiplon",
                                user: 952,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 1271,
                                        name: "aiplon",
                                        private: false,
                                        user: 952
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/30/Capture_decran_2018-11-30_a_15.27.29.jpg",
                                description: "List musical and artistic events",
                                created_at: "2018-12-01T03:10:58.105558+05:30",
                                launched_at: null
                            },
                            {
                                id: 311,
                                name: "Little Lingua",
                                slug: "little-lingua",
                                user: 78,
                                product_hunt:
                                    "https://www.producthunt.com/posts/little-lingua",
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
                                    "https://api.getmakerlog.com/media/uploads/2018/11/21/giffy_1.gif",
                                description:
                                    "Find your next language learning tool.",
                                created_at: "2018-11-21T17:17:39.467002+05:30",
                                launched_at: "2018-11-30T14:14:09.825522+05:30"
                            },
                            {
                                id: 362,
                                name: "Formcarry",
                                slug: "formcarry",
                                user: 956,
                                product_hunt: "",
                                twitter: "formcarry",
                                website: "formcarry.com",
                                projects: [],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/01/logo.png",
                                description: "hassle-free HTML form processing",
                                created_at: "2018-12-01T11:45:04.142933+05:30",
                                launched_at: "2018-12-01T11:45:04.135842+05:30"
                            },
                            {
                                id: 363,
                                name: "Advanced CSS/SASS Course",
                                slug: "advanced-csssass-course",
                                user: 925,
                                product_hunt: "",
                                twitter: "",
                                website:
                                    "https://zerefwayne.github.io/advanced-css-sass/",
                                projects: [
                                    {
                                        id: 1285,
                                        name: "course",
                                        private: false,
                                        user: 925
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/01/logo-green-2x.png",
                                description:
                                    "A collection of webpages made during Advanced CSS and SASS Course on Udemy.",
                                created_at: "2018-12-01T15:59:44.994058+05:30",
                                launched_at: null
                            },
                            {
                                id: 300,
                                name: "Spotify Controller",
                                slug: "spotify-controller",
                                user: 559,
                                product_hunt:
                                    "producthunt.com/posts/spotify-controller",
                                twitter: "",
                                website: "getmakerlog/spotify-controller",
                                projects: [
                                    {
                                        id: 1289,
                                        name: "SpotifyController",
                                        private: false,
                                        user: 559
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/19/icon128.png",
                                description:
                                    "Control your Spotify on any web page.",
                                created_at: "2018-11-20T00:33:03.663182+05:30",
                                launched_at: "2018-11-20T00:33:03.660604+05:30"
                            },
                            {
                                id: 365,
                                name: "Fiscally App",
                                slug: "fiscally-app",
                                user: 46,
                                product_hunt: "",
                                twitter: "",
                                website: "fiscallyapp.com",
                                projects: [],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/01/fiscally_app_icon_V2.png",
                                description: "Budgeting",
                                created_at: "2018-12-02T04:54:18.159128+05:30",
                                launched_at: null
                            },
                            {
                                id: 367,
                                name: "NextPR",
                                slug: "nextpr",
                                user: 7,
                                product_hunt: "",
                                twitter: "nxtpr",
                                website: "http://nextpr.io/",
                                projects: [
                                    {
                                        id: 37,
                                        name: "nextPR",
                                        private: false,
                                        user: 7
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/02/nextPr_logo.png",
                                description:
                                    "An online directory for exploring the tech world in Puerto Rico",
                                created_at: "2018-12-02T06:48:19.554128+05:30",
                                launched_at: "2018-12-02T06:48:19.549362+05:30"
                            },
                            {
                                id: 368,
                                name: "Where Should We Drop",
                                slug: "where-should-we-drop",
                                user: 962,
                                product_hunt:
                                    "producthunt.com/posts/where-should-we-drop",
                                twitter: "WSWDApp",
                                website: "whereshouldwedrop.com/",
                                projects: [
                                    {
                                        id: 1297,
                                        name: "wswd",
                                        private: false,
                                        user: 962
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/02/playstore-icon.png",
                                description: "Fortnite Location Picker",
                                created_at: "2018-12-02T07:55:05.449420+05:30",
                                launched_at: "2018-12-02T07:55:05.447146+05:30"
                            },
                            {
                                id: 359,
                                name: "Tailwind Toolbox",
                                slug: "tailwind-toolbox",
                                user: 954,
                                product_hunt: "",
                                twitter: "tailwindtoolbox",
                                website: "www.tailwindtoolbox.com",
                                projects: [
                                    {
                                        id: 1582,
                                        name: "tailwindtoolbox",
                                        private: false,
                                        user: 954
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/30/twtb.png",
                                description:
                                    "Starter templates for Tailwind CSS",
                                created_at: "2018-11-30T22:40:56.284755+05:30",
                                launched_at: null
                            },
                            {
                                id: 316,
                                name: "Domore",
                                slug: "domore",
                                user: 732,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 1109,
                                        name: "domore",
                                        private: false,
                                        user: 732
                                    },
                                    {
                                        id: 1110,
                                        name: "learning",
                                        private: false,
                                        user: 732
                                    },
                                    {
                                        id: 1111,
                                        name: "syllabus",
                                        private: false,
                                        user: 732
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "The main idea behind this product is to improve productivity. It doesn’t mean to track time spent on an application, it was purely in control of user.\nUser starts the timer when he is working on a task and stops once he finishes.\nThe information gets logged into the database with amount of time spent, start time, end time and the name of the task.\nUser takes a break, starts the timer and stops it when ready to work again. \nThere are two types of timers available. One is pomodoro another is like a stopwatch.\nFor pomodoro, there will be a configuration for work time and break time on user level.\nAll the tasks done are displayed like a list.\nUser can arrange tasks as sub-tasks.\nBy default tasks are marked as completed and categorised under completed.\nWhen user clicks on task, it gets marked as not completed.\nThen, it will come under uncompleted category.\nFor uncompleted tasks, a timer button will appear clicking on that will start timer.\nThere will be a dashboard where historical data will be displayed as a graph.\nExport to google sheets or excel.",
                                created_at: "2018-11-22T13:53:20.398557+05:30",
                                launched_at: null
                            },
                            {
                                id: 343,
                                name: "Maker Bundle",
                                slug: "maker-bundle",
                                user: 737,
                                product_hunt: "",
                                twitter: "makerbundle",
                                website: "https://makerbundle.com",
                                projects: [
                                    {
                                        id: 1212,
                                        name: "makerbundle",
                                        private: false,
                                        user: 737
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/28/Icon.png",
                                description:
                                    "Pay what you want. Support makers. Get awesome products & services.",
                                created_at: "2018-11-28T08:14:22.956392+05:30",
                                launched_at: null
                            },
                            {
                                id: 318,
                                name: "Like X But For Y",
                                slug: "like-x-but-for-y",
                                user: 898,
                                product_hunt: "",
                                twitter: "",
                                website:
                                    "https://leocabibihan.github.io/like-x-but-for-y/",
                                projects: [
                                    {
                                        id: 1121,
                                        name: "like_x_but_for_y",
                                        private: false,
                                        user: 898
                                    }
                                ],
                                launched: true,
                                icon: null,
                                description:
                                    "Website that makes fun of copycat startups.",
                                created_at: "2018-11-23T15:36:31.048835+05:30",
                                launched_at: "2018-11-23T15:36:31.042799+05:30"
                            },
                            {
                                id: 317,
                                name: "QUIQQER",
                                slug: "quiqqer",
                                user: 892,
                                product_hunt: "",
                                twitter: "",
                                website: "https://www.quiqqer.com/",
                                projects: [
                                    {
                                        id: 1122,
                                        name: "quiqqer",
                                        private: false,
                                        user: 892
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/22/q-thick__253x242.png",
                                description:
                                    "half-launched - The all around carefree Enterprise Content Management System. Modular design. Convenient backend  Fast implementation.",
                                created_at: "2018-11-23T00:13:04.699881+05:30",
                                launched_at: "2018-11-23T00:13:04.696609+05:30"
                            },
                            {
                                id: 319,
                                name: "WriteRise",
                                slug: "writerise",
                                user: 454,
                                product_hunt: "",
                                twitter: "",
                                website:
                                    "http://www.valentinourbano.com/apps/mac/writerise/",
                                projects: [
                                    {
                                        id: 1125,
                                        name: "writerise",
                                        private: false,
                                        user: 454
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Automatically track your writing on your Mac",
                                created_at: "2018-11-23T23:13:30.097610+05:30",
                                launched_at: null
                            },
                            {
                                id: 320,
                                name: "Let's Work in Visual Effects",
                                slug: "lets-work-in-visual-effects",
                                user: 916,
                                product_hunt: "",
                                twitter: "",
                                website: "letsworkinvfx.com",
                                projects: [
                                    {
                                        id: 1127,
                                        name: "letsworkinvfx",
                                        private: false,
                                        user: 916
                                    }
                                ],
                                launched: true,
                                icon: null,
                                description:
                                    "A job posting aggregator for the visual effects industry.",
                                created_at: "2018-11-24T02:39:25.837042+05:30",
                                launched_at: "2018-11-24T02:39:25.835357+05:30"
                            },
                            {
                                id: 321,
                                name: "Idle Moon",
                                slug: "idle-moon",
                                user: 918,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 1128,
                                        name: "idlemoon",
                                        private: false,
                                        user: 918
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "Idle Harvest Moon",
                                created_at: "2018-11-24T05:50:15.322842+05:30",
                                launched_at: null
                            },
                            {
                                id: 322,
                                name: "Blog",
                                slug: "blog",
                                user: 918,
                                product_hunt: "",
                                twitter: "",
                                website: "benortiz.io/posts",
                                projects: [
                                    {
                                        id: 1129,
                                        name: "blog",
                                        private: false,
                                        user: 918
                                    }
                                ],
                                launched: true,
                                icon: null,
                                description: "Personal blog",
                                created_at: "2018-11-24T05:54:27.936564+05:30",
                                launched_at: "2018-11-24T05:54:27.934845+05:30"
                            },
                            {
                                id: 323,
                                name: "LogChimp",
                                slug: "logchimp",
                                user: 921,
                                product_hunt:
                                    "https://www.producthunt.com/posts/logchimp",
                                twitter: "https://twitter.com/logchimp/",
                                website: "https://logchimp.now.sh/",
                                projects: [
                                    {
                                        id: 1132,
                                        name: "logchimp",
                                        private: false,
                                        user: 921
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/24/logchimp_logo.png",
                                description:
                                    "Keep customers in the loop about your product",
                                created_at: "2018-11-24T14:20:44.690707+05:30",
                                launched_at: "2018-11-24T14:20:44.688518+05:30"
                            },
                            {
                                id: 325,
                                name: "Buzzways",
                                slug: "buzzways",
                                user: 917,
                                product_hunt: "",
                                twitter: "buzzwaysapp",
                                website: "https://buzzways.at",
                                projects: [
                                    {
                                        id: 1138,
                                        name: "twitter",
                                        private: false,
                                        user: 917
                                    },
                                    {
                                        id: 1139,
                                        name: "socialmedia",
                                        private: false,
                                        user: 917
                                    },
                                    {
                                        id: 1140,
                                        name: "thread",
                                        private: false,
                                        user: 917
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/24/uIsf209l_400x400.jpg",
                                description:
                                    "Compose, read and discover the best Tweet Collections",
                                created_at: "2018-11-24T18:58:11.064927+05:30",
                                launched_at: null
                            },
                            {
                                id: 327,
                                name: "TheCatAPI.com",
                                slug: "thecatapicom",
                                user: 614,
                                product_hunt: "",
                                twitter: "adenforshaw",
                                website: "theCatAPI.com",
                                projects: [
                                    {
                                        id: 1152,
                                        name: "api",
                                        private: false,
                                        user: 614
                                    },
                                    {
                                        id: 1150,
                                        name: "theCatApi",
                                        private: false,
                                        user: 614
                                    },
                                    {
                                        id: 1151,
                                        name: "APIs",
                                        private: false,
                                        user: 614
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/25/thecatapi_256xW.png",
                                description: "Cats as a Service",
                                created_at: "2018-11-25T12:32:55.877469+05:30",
                                launched_at: "2018-11-25T12:32:55.872917+05:30"
                            },
                            {
                                id: 328,
                                name: "Ransom Yourself",
                                slug: "ransom-yourself",
                                user: 916,
                                product_hunt: "",
                                twitter: "",
                                website: "www.ransomyourself.com",
                                projects: [
                                    {
                                        id: 1153,
                                        name: "ransomyourself",
                                        private: false,
                                        user: 916
                                    }
                                ],
                                launched: true,
                                icon: null,
                                description:
                                    "Develop a writing habit by earning back your own money.",
                                created_at: "2018-11-25T13:50:28.776794+05:30",
                                launched_at: "2018-11-25T13:50:28.774072+05:30"
                            },
                            {
                                id: 329,
                                name: "Jasper",
                                slug: "jasper",
                                user: 921,
                                product_hunt: "",
                                twitter: "",
                                website: "https://mittalyashu.gitlab.io/jasper",
                                projects: [
                                    {
                                        id: 1156,
                                        name: "jasper",
                                        private: false,
                                        user: 921
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/25/Webp.net-compress-image.jpg",
                                description:
                                    "A full-featured customisable theme Casper 👻",
                                created_at: "2018-11-25T17:20:29.124626+05:30",
                                launched_at: "2018-11-25T17:20:29.122228+05:30"
                            },
                            {
                                id: 206,
                                name: "Prototypr.io",
                                slug: "prototypr-v3-and-community",
                                user: 78,
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
                                    "https://api.getmakerlog.com/media/uploads/2018/11/03/cropped-fb-logo.png",
                                description: "Design tool community",
                                created_at: "2018-11-04T02:04:07.153520+05:30",
                                launched_at: null
                            },
                            {
                                id: 331,
                                name: "Free Designs For Friends",
                                slug: "free-designs-for-friends",
                                user: 904,
                                product_hunt: "",
                                twitter: "",
                                website: "http://freedesignsforfriends.com/",
                                projects: [
                                    {
                                        id: 1159,
                                        name: "FreeDesignsForFriends",
                                        private: false,
                                        user: 904
                                    }
                                ],
                                launched: true,
                                icon: null,
                                description: "code based designs",
                                created_at: "2018-11-26T06:45:44.416732+05:30",
                                launched_at: "2018-11-26T06:45:44.415018+05:30"
                            },
                            {
                                id: 333,
                                name: "Gatsby-Bulma-Quickstart",
                                slug: "gatsby-bulma-quickstart",
                                user: 539,
                                product_hunt: "",
                                twitter: "",
                                website:
                                    "https://github.com/amandeepmittal/gatsby-bulma-quickstart",
                                projects: [
                                    {
                                        id: 1174,
                                        name: "bulmaStarterKit",
                                        private: false,
                                        user: 539
                                    },
                                    {
                                        id: 1175,
                                        name: "bulmaStartKit",
                                        private: false,
                                        user: 539
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/26/Screenshot_2018-11-26_at_6.35.18_PM.png",
                                description:
                                    "A Quick Way to bootstrap your next Gatsby + Bulma site.",
                                created_at: "2018-11-26T19:15:29.207900+05:30",
                                launched_at: "2018-11-26T19:15:29.204997+05:30"
                            },
                            {
                                id: 334,
                                name: "Closet Tools",
                                slug: "closet-tools",
                                user: 876,
                                product_hunt: "",
                                twitter: "closettools",
                                website: "https://closet.tools",
                                projects: [
                                    {
                                        id: 1177,
                                        name: "closettools",
                                        private: false,
                                        user: 876
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/26/Logo_-_Alternate_Layout_-_Orchid.png",
                                description:
                                    "Automate closet growth and help with sales on Poshmark. Automation includes sharing, following, and more. Works on 📱 and 💻.",
                                created_at: "2018-11-26T21:32:20.511760+05:30",
                                launched_at: "2018-11-26T21:32:20.509222+05:30"
                            },
                            {
                                id: 335,
                                name: "Try Bible",
                                slug: "try-bible",
                                user: 876,
                                product_hunt: "",
                                twitter: "trybible",
                                website: "https://trybible.com",
                                projects: [
                                    {
                                        id: 1178,
                                        name: "trybible",
                                        private: false,
                                        user: 876
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/26/logo-square.png",
                                description:
                                    "A Bible app that lets you change the translation of individual verses, write inline with the text, and help you study the Bible more effectively.",
                                created_at: "2018-11-26T21:34:46.973662+05:30",
                                launched_at: null
                            },
                            {
                                id: 336,
                                name: "League of Makers",
                                slug: "league-of-makers",
                                user: 589,
                                product_hunt: "",
                                twitter: "@jp_aulet",
                                website: "http://leaguemakers.com",
                                projects: [
                                    {
                                        id: 1179,
                                        name: "makers",
                                        private: false,
                                        user: 589
                                    },
                                    {
                                        id: 1180,
                                        name: "league",
                                        private: false,
                                        user: 589
                                    },
                                    {
                                        id: 1181,
                                        name: "build",
                                        private: false,
                                        user: 589
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/26/logo-helmet-white2.png",
                                description:
                                    "Be part of awesome people building stuff to solve world problems. \r\nBuild, launch, compete, win!",
                                created_at: "2018-11-26T23:25:35.311642+05:30",
                                launched_at: null
                            },
                            {
                                id: 337,
                                name: "CoderStory",
                                slug: "coderstory",
                                user: 537,
                                product_hunt: "",
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
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/26/Untitledcs_1.png",
                                description:
                                    "The project is focused on highlighting the experience of developers and people learning to code.",
                                created_at: "2018-11-27T02:53:55.714388+05:30",
                                launched_at: null
                            },
                            {
                                id: 338,
                                name: "referralprogram",
                                slug: "referralprogram",
                                user: 920,
                                product_hunt: "",
                                twitter: "",
                                website: "https://referralprogram.io",
                                projects: [
                                    {
                                        id: 1188,
                                        name: "referralprogram",
                                        private: false,
                                        user: 920
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/27/candy-icecream.png",
                                description:
                                    "Easy refer-a-friend & affiliate programs for SAAS business",
                                created_at: "2018-11-27T09:17:11.070748+05:30",
                                launched_at: null
                            },
                            {
                                id: 339,
                                name: "Let's Go Evolution",
                                slug: "lets-go-evolution",
                                user: 892,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 1193,
                                        name: "LetsGoEvolution",
                                        private: false,
                                        user: 892
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Your Pokethelper for Let's Go Pokemon. All evolution levels at a glance, with all important information.",
                                created_at: "2018-11-27T13:18:09.340258+05:30",
                                launched_at: null
                            },
                            {
                                id: 352,
                                name: "BrandSearch",
                                slug: "brandsearch",
                                user: 17,
                                product_hunt:
                                    "producthunt.com/posts/brandsearch",
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
                                created_at: "2018-11-29T07:02:48.021348+05:30",
                                launched_at: null
                            },
                            {
                                id: 341,
                                name: "Uptimebot",
                                slug: "uptimebot",
                                user: 135,
                                product_hunt: "",
                                twitter: "uptimebot",
                                website: "uptimebot.co",
                                projects: [
                                    {
                                        id: 1200,
                                        name: "uptimebot",
                                        private: false,
                                        user: 135
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/27/logo.png",
                                description:
                                    "Monitor endpoints, get notified via Twitter.",
                                created_at: "2018-11-27T18:16:01.471242+05:30",
                                launched_at: null
                            },
                            {
                                id: 342,
                                name: "GymPal",
                                slug: "gympal",
                                user: 284,
                                product_hunt: "",
                                twitter: "",
                                website: "gympal.xyz",
                                projects: [
                                    {
                                        id: 1209,
                                        name: "GymPal",
                                        private: false,
                                        user: 284
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/27/Screenshot_2018-11-18_10.58.59.png",
                                description:
                                    "Everything you actually want to know when looking for a gym",
                                created_at: "2018-11-28T03:35:46.282621+05:30",
                                launched_at: null
                            },
                            {
                                id: 243,
                                name: "IdeaScratch",
                                slug: "ideascratch",
                                user: 17,
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
                                    "https://api.getmakerlog.com/media/uploads/2018/11/27/icon-big.png",
                                description:
                                    "Ask your audience what to build next",
                                created_at: "2018-11-10T11:07:29.065662+05:30",
                                launched_at: null
                            },
                            {
                                id: 345,
                                name: "Roundabout",
                                slug: "roundabout",
                                user: 942,
                                product_hunt: "",
                                twitter: "",
                                website: "https://roundabout.money",
                                projects: [
                                    {
                                        id: 1222,
                                        name: "roundaboutpay",
                                        private: false,
                                        user: 942
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/28/roundaboutProfilePicture-01-01.png",
                                description:
                                    "Allows businesses to simply offer subscriptions to their customers, and allows customers to manage all their Roundabout subscriptions in one place.",
                                created_at: "2018-11-28T22:52:26.387695+05:30",
                                launched_at: null
                            },
                            {
                                id: 346,
                                name: "NTT jobs board 💼",
                                slug: "ntt-jobs-board",
                                user: 492,
                                product_hunt: "",
                                twitter: "",
                                website: "nontechtech.com",
                                projects: [
                                    {
                                        id: 249,
                                        name: "ntt",
                                        private: false,
                                        user: 492
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "The jobs board for NTT",
                                created_at: "2018-11-28T23:34:39.446186+05:30",
                                launched_at: null
                            },
                            {
                                id: 347,
                                name: "IdeaScratch",
                                slug: "ideascratch-2",
                                user: 6,
                                product_hunt: "",
                                twitter: "",
                                website: "https://ideascratch.com",
                                projects: [
                                    {
                                        id: 1224,
                                        name: "ideascratch",
                                        private: false,
                                        user: 6
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/28/ideascratch.png",
                                description:
                                    "Ask your audience what to build next",
                                created_at: "2018-11-29T00:33:22.556092+05:30",
                                launched_at: "2018-11-29T00:33:22.552535+05:30"
                            },
                            {
                                id: 348,
                                name: "1Do.Today",
                                slug: "1dotoday",
                                user: 757,
                                product_hunt: "",
                                twitter: "DothSquare",
                                website: "https://1do.today",
                                projects: [
                                    {
                                        id: 1226,
                                        name: "Tasks",
                                        private: false,
                                        user: 757
                                    },
                                    {
                                        id: 1227,
                                        name: "Action",
                                        private: false,
                                        user: 757
                                    },
                                    {
                                        id: 1228,
                                        name: "Todo",
                                        private: false,
                                        user: 757
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Manage One single Most Important Task every day, to compound to great achievements.",
                                created_at: "2018-11-29T01:37:40.980981+05:30",
                                launched_at: null
                            },
                            {
                                id: 349,
                                name: "Genius Funnels",
                                slug: "genius-funnels",
                                user: 944,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 1232,
                                        name: "geniusfunnels",
                                        private: false,
                                        user: 944
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/28/icon-left-font.png",
                                description:
                                    "Gather the best conversions funnels in the world",
                                created_at: "2018-11-29T03:09:10.389827+05:30",
                                launched_at: null
                            },
                            {
                                id: 350,
                                name: "Beta Codes",
                                slug: "beta-codes",
                                user: 943,
                                product_hunt: "",
                                twitter: "BetaCodesIO",
                                website: "betacodes.io",
                                projects: [
                                    {
                                        id: 1233,
                                        name: "betacodes",
                                        private: false,
                                        user: 943
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/28/Beta-Codes---Logo.png",
                                description:
                                    "Beta and feature release management, made easy. 😎",
                                created_at: "2018-11-29T03:27:34.502848+05:30",
                                launched_at: null
                            },
                            {
                                id: 340,
                                name: "WindUp",
                                slug: "premack",
                                user: 937,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 1234,
                                        name: "windup",
                                        private: false,
                                        user: 937
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Reward you for commiting on GitHub",
                                created_at: "2018-11-27T15:34:59.960131+05:30",
                                launched_at: null
                            },
                            {
                                id: 356,
                                name: "NexThing",
                                slug: "nexthing",
                                user: 872,
                                product_hunt: "",
                                twitter: "whinandwind",
                                website: "",
                                projects: [
                                    {
                                        id: 1250,
                                        name: "nexthing",
                                        private: false,
                                        user: 872
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/29/Screen_Shot_2018-11-29_at_11.04.20.png",
                                description: "Not sure yet.",
                                created_at: "2018-11-29T22:35:55.640910+05:30",
                                launched_at: null
                            },
                            {
                                id: 358,
                                name: "Astrava.Solutions",
                                slug: "astravasolutions",
                                user: 954,
                                product_hunt: "",
                                twitter: "astravaofficial",
                                website: "https://astrava.solutions",
                                projects: [],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/30/AN.png",
                                description: "My side business website",
                                created_at: "2018-11-30T22:37:55.157628+05:30",
                                launched_at: null
                            },
                            {
                                id: 369,
                                name: "Yazu",
                                slug: "yazu",
                                user: 7,
                                product_hunt: "",
                                twitter: "axelerivera",
                                website:
                                    "https://play.google.com/store/apps/details?id=com.yazu.android",
                                projects: [
                                    {
                                        id: 1298,
                                        name: "yazu",
                                        private: false,
                                        user: 7
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/02/yazu_logo.webp",
                                description:
                                    "Random Movie Recommendation Engine",
                                created_at: "2018-12-02T07:55:29.662845+05:30",
                                launched_at: "2018-12-02T07:55:29.660440+05:30"
                            },
                            {
                                id: 388,
                                name: "Podplay",
                                slug: "podplay",
                                user: 997,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 1371,
                                        name: "podcast",
                                        private: false,
                                        user: 997
                                    },
                                    {
                                        id: 1372,
                                        name: "desktop",
                                        private: false,
                                        user: 997
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "It is a desktop client for podcasts",
                                created_at: "2018-12-05T17:39:13.138053+05:30",
                                launched_at: null
                            },
                            {
                                id: 371,
                                name: "MakersBattle",
                                slug: "makersbattle",
                                user: 17,
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
                                    "https://api.getmakerlog.com/media/uploads/2018/12/02/avatar.png",
                                description: "Maker vs Maker Battles",
                                created_at: "2018-12-02T11:14:07.272479+05:30",
                                launched_at: null
                            },
                            {
                                id: 372,
                                name: "Australian Startup Jobs",
                                slug: "australian-startup-jobs",
                                user: 965,
                                product_hunt: "",
                                twitter: "StartupJobsAus",
                                website:
                                    "https://www.australianstartupjobs.com.au/",
                                projects: [
                                    {
                                        id: 1305,
                                        name: "australianstartupjobs",
                                        private: false,
                                        user: 965
                                    }
                                ],
                                launched: true,
                                icon: null,
                                description:
                                    "Australian Startup Jobs is Australia's number one startup employment marketplace. Find jobs at venture backed startups or recruit the ideal candidate.",
                                created_at: "2018-12-02T15:28:57.286099+05:30",
                                launched_at: "2018-12-02T15:28:57.284120+05:30"
                            },
                            {
                                id: 373,
                                name: "Snaptier",
                                slug: "snaptier",
                                user: 969,
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
                                    "https://api.getmakerlog.com/media/uploads/2018/12/02/logo-transparent.png",
                                description:
                                    "Automating repetitive code changes",
                                created_at: "2018-12-02T21:41:43.143150+05:30",
                                launched_at: null
                            },
                            {
                                id: 374,
                                name: "UnMarkDocs",
                                slug: "unmarkdocs",
                                user: 969,
                                product_hunt:
                                    "producthunt.com/posts/unmarkdocs",
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
                                    "https://api.getmakerlog.com/media/uploads/2018/12/02/colorful-logo.png",
                                description:
                                    "Generate beautiful documentation pages with super-powered Markdown from your GitHub repository",
                                created_at: "2018-12-02T21:45:50.290226+05:30",
                                launched_at: "2018-12-02T21:45:50.287209+05:30"
                            },
                            {
                                id: 375,
                                name: "Miguel Piedrafita's blog",
                                slug: "miguel-piedrafitas-blog",
                                user: 969,
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
                                    "https://api.getmakerlog.com/media/uploads/2018/12/02/logo.png",
                                description: "My personal blog",
                                created_at: "2018-12-02T21:50:39.513234+05:30",
                                launched_at: null
                            },
                            {
                                id: 377,
                                name: "Intellect 4 Dummies",
                                slug: "intellect-4-dummies",
                                user: 971,
                                product_hunt: "",
                                twitter: "",
                                website:
                                    "https://github.com/MStewGT/Intellect4Dummies",
                                projects: [
                                    {
                                        id: 1318,
                                        name: "i4d",
                                        private: false,
                                        user: 971
                                    }
                                ],
                                launched: true,
                                icon: null,
                                description:
                                    "Super simple WoW addon for fun/learning. Reminds you to cast a buff on your raid/party members.",
                                created_at: "2018-12-03T01:57:40.655808+05:30",
                                launched_at: "2018-12-03T01:57:40.653568+05:30"
                            },
                            {
                                id: 376,
                                name: "Jack of all Admins",
                                slug: "jack-of-all-admins",
                                user: 971,
                                product_hunt: "",
                                twitter: "",
                                website: "https://www.jackofalladmins.com/",
                                projects: [
                                    {
                                        id: 1317,
                                        name: "joaa",
                                        private: false,
                                        user: 971
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/02/teaser.jpg",
                                description: "Personal Tech Blog",
                                created_at: "2018-12-03T01:51:34.179542+05:30",
                                launched_at: "2018-12-03T01:51:34.177337+05:30"
                            },
                            {
                                id: 378,
                                name: "MyLibrary",
                                slug: "mylibrary",
                                user: 974,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 1320,
                                        name: "graphql",
                                        private: false,
                                        user: 974
                                    },
                                    {
                                        id: 1321,
                                        name: "goodreads",
                                        private: false,
                                        user: 974
                                    },
                                    {
                                        id: 1322,
                                        name: "apis",
                                        private: false,
                                        user: 974
                                    },
                                    {
                                        id: 1319,
                                        name: "react",
                                        private: false,
                                        user: 974
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "MyLibrary is an implementation of the Goodreads API using React and GraphQL.",
                                created_at: "2018-12-03T06:08:55.572477+05:30",
                                launched_at: null
                            },
                            {
                                id: 379,
                                name: "FitBoard",
                                slug: "fitboard",
                                user: 976,
                                product_hunt: "",
                                twitter: "",
                                website: "fitboard.app",
                                projects: [
                                    {
                                        id: 1324,
                                        name: "workouts",
                                        private: false,
                                        user: 976
                                    },
                                    {
                                        id: 1325,
                                        name: "exercise",
                                        private: false,
                                        user: 976
                                    },
                                    {
                                        id: 1326,
                                        name: "gym",
                                        private: false,
                                        user: 976
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/03/logo.png",
                                description:
                                    "FitBoard is a platform to share, create and discover workouts.",
                                created_at: "2018-12-03T06:46:25.117572+05:30",
                                launched_at: null
                            },
                            {
                                id: 380,
                                name: "OrgManager",
                                slug: "orgmanager",
                                user: 969,
                                product_hunt:
                                    "https://www.producthunt.com/posts/orgmanager",
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
                                    "https://api.getmakerlog.com/media/uploads/2018/12/03/Avatar.png",
                                description:
                                    "Invite System for GitHub Organizations",
                                created_at: "2018-12-03T16:47:35.780137+05:30",
                                launched_at: "2018-12-03T16:47:35.777446+05:30"
                            },
                            {
                                id: 381,
                                name: "CoderYouth",
                                slug: "coderyouth",
                                user: 969,
                                product_hunt:
                                    "https://www.producthunt.com/posts/coderyouth-v2-0",
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
                                    "https://api.getmakerlog.com/media/uploads/2018/12/03/producthunt_icon.png",
                                description: "A code community for teenagers",
                                created_at: "2018-12-03T16:49:44.655529+05:30",
                                launched_at: "2018-12-03T16:49:44.652796+05:30"
                            },
                            {
                                id: 382,
                                name: "Shortcuts",
                                slug: "shortcuts",
                                user: 982,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 1334,
                                        name: "curation",
                                        private: false,
                                        user: 982
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "A user-curated collection of keyboard shortcuts.",
                                created_at: "2018-12-03T18:43:32.547229+05:30",
                                launched_at: null
                            },
                            {
                                id: 383,
                                name: "Robotify Edu",
                                slug: "robotify-edu",
                                user: 983,
                                product_hunt: "",
                                twitter: "robotifylabs",
                                website: "robotify.com",
                                projects: [
                                    {
                                        id: 1335,
                                        name: "robotifyedu",
                                        private: false,
                                        user: 983
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/03/Logo.png",
                                description:
                                    "Code learning in innovative ways for children.",
                                created_at: "2018-12-03T19:09:46.937925+05:30",
                                launched_at: null
                            },
                            {
                                id: 384,
                                name: "WriterPA",
                                slug: "writerpa",
                                user: 987,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 1341,
                                        name: "writerPA",
                                        private: false,
                                        user: 987
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/03/logo-icon-b.png",
                                description: "Indie publishing assistant",
                                created_at: "2018-12-04T05:05:48.673810+05:30",
                                launched_at: null
                            },
                            {
                                id: 397,
                                name: "Timely",
                                slug: "timely",
                                user: 690,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 1397,
                                        name: "productivity",
                                        private: false,
                                        user: 690
                                    },
                                    {
                                        id: 1398,
                                        name: "time",
                                        private: false,
                                        user: 690
                                    },
                                    {
                                        id: 1399,
                                        name: "block",
                                        private: false,
                                        user: 690
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/06/timely-logo-256.png",
                                description:
                                    "A Google Chrome Extension that allows you to track your time and block unproductive sites.",
                                created_at: "2018-12-06T20:48:26.386281+05:30",
                                launched_at: null
                            },
                            {
                                id: 389,
                                name: "Chekr",
                                slug: "chekr",
                                user: 970,
                                product_hunt: "",
                                twitter: "chekrapp",
                                website: "www.chekr.app",
                                projects: [
                                    {
                                        id: 1373,
                                        name: "chekr",
                                        private: false,
                                        user: 970
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/05/robot.png",
                                description:
                                    "Stock alerts that gives you more time, energy and money 🤑",
                                created_at: "2018-12-05T19:40:10.988560+05:30",
                                launched_at: null
                            },
                            {
                                id: 390,
                                name: "BedsForFans.com",
                                slug: "bedsforfanscom",
                                user: 805,
                                product_hunt: "",
                                twitter: "@bedsforfans",
                                website: "BedsForFans.com",
                                projects: [
                                    {
                                        id: 1379,
                                        name: "BedsForFans",
                                        private: false,
                                        user: 805
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/05/lA-qaomV_400x400.jpg",
                                description:
                                    "Couchsurfing for travelling sports fans!",
                                created_at: "2018-12-06T05:01:35.906420+05:30",
                                launched_at: null
                            },
                            {
                                id: 391,
                                name: "Breadcrumb",
                                slug: "breadcrumb",
                                user: 1005,
                                product_hunt: "",
                                twitter: "",
                                website: "https://breadcrumb.app",
                                projects: [
                                    {
                                        id: 1381,
                                        name: "breadcrumb",
                                        private: false,
                                        user: 1005
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/06/breadcrumb-logo-dark-text-large.png",
                                description: "In page bookmarks",
                                created_at: "2018-12-06T07:22:14.616028+05:30",
                                launched_at: "2018-12-06T07:22:14.610881+05:30"
                            },
                            {
                                id: 392,
                                name: "Habitify for Android",
                                slug: "habitify-for-android",
                                user: 1006,
                                product_hunt: "",
                                twitter: "habitifyapp",
                                website: "habitify.me",
                                projects: [
                                    {
                                        id: 1384,
                                        name: "HabitifyAndroid",
                                        private: false,
                                        user: 1006
                                    },
                                    {
                                        id: 1385,
                                        name: "Roadto1Musers",
                                        private: false,
                                        user: 1006
                                    },
                                    {
                                        id: 1382,
                                        name: "Habitify",
                                        private: false,
                                        user: 1006
                                    },
                                    {
                                        id: 1383,
                                        name: "ProductHunt",
                                        private: false,
                                        user: 1006
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/06/habitify-logo.png",
                                description:
                                    "Habitify helps people track their daily routine, measure daily progress and get reminded of tasks anytime, anywhere.",
                                created_at: "2018-12-06T09:21:27.942568+05:30",
                                launched_at: null
                            },
                            {
                                id: 370,
                                name: "Send Magic",
                                slug: "sendmagic",
                                user: 961,
                                product_hunt: "",
                                twitter: "",
                                website: "https://sendmagic.io",
                                projects: [
                                    {
                                        id: 1301,
                                        name: "sendmagic",
                                        private: false,
                                        user: 961
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Email sending for developers. Manage your marketing, transactional, and lifecycle emails in the same app and send them through any SMTP server.",
                                created_at: "2018-12-02T09:42:28.568032+05:30",
                                launched_at: null
                            },
                            {
                                id: 387,
                                name: "Maker Stack",
                                slug: "maker-stack",
                                user: 698,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 1359,
                                        name: "makerstack",
                                        private: false,
                                        user: 698
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "All in one place for best maker tools and shipping stories",
                                created_at: "2018-12-04T22:12:14.789171+05:30",
                                launched_at: null
                            },
                            {
                                id: 398,
                                name: "TMon",
                                slug: "tmon",
                                user: 880,
                                product_hunt: "",
                                twitter: "",
                                website: "https://github.com/oaass/tmon",
                                projects: [
                                    {
                                        id: 1396,
                                        name: "TMon",
                                        private: false,
                                        user: 880
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/06/Screenshot_2018-12-06_16-21-50.png",
                                description: "Threat monitoring",
                                created_at: "2018-12-06T20:52:59.787332+05:30",
                                launched_at: "2018-12-06T20:52:59.785053+05:30"
                            },
                            {
                                id: 386,
                                name: "New Years Event Page -- CareerCode.org",
                                slug: "new-years-website",
                                user: 881,
                                product_hunt: "",
                                twitter: "https://twitter.com/benjaminspak",
                                website: "http://codecareer.org",
                                projects: [
                                    {
                                        id: 1366,
                                        name: "MakersBattle",
                                        private: false,
                                        user: 881
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/05/icon.png",
                                description:
                                    "New Years Hackathon Dec 28 -> Dec 31st! 🗓️\n🔥 Sponsors: Product Hunt, Will Sacks, HelpMyDev, Hirezio.\n🤘 Partnering with: Makers Up, MakerRocks, Makerlog.",
                                created_at: "2018-12-04T07:36:09.287791+05:30",
                                launched_at: "2018-12-05T06:58:33.907270+05:30"
                            },
                            {
                                id: 393,
                                name: "Best Product Hunt 2018",
                                slug: "best-product-hunt-2018",
                                user: 861,
                                product_hunt: "",
                                twitter: "Best Product Hunt 2018",
                                website:
                                    "http://best-product-hunt-2018.github.io/",
                                projects: [
                                    {
                                        id: 1386,
                                        name: "bestproducthunt2018",
                                        private: false,
                                        user: 861
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/06/logo-white-bg_Ic6b2Na.png",
                                description:
                                    "Which is the best product of 2018 on https://www.producthunt.com/? Vote and decide at http://best-product-hunt-2018.github.io/!",
                                created_at: "2018-12-06T10:20:13.178499+05:30",
                                launched_at: null
                            },
                            {
                                id: 395,
                                name: "Profile Maker",
                                slug: "profile-maker",
                                user: 703,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 1388,
                                        name: "makeaprofile",
                                        private: false,
                                        user: 703
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "Create profile pages",
                                created_at: "2018-12-06T18:46:25.996650+05:30",
                                launched_at: null
                            },
                            {
                                id: 396,
                                name: "Sked",
                                slug: "sked",
                                user: 1009,
                                product_hunt: "",
                                twitter: "GetSkedApp",
                                website: "getsked.com",
                                projects: [
                                    {
                                        id: 1395,
                                        name: "sked",
                                        private: false,
                                        user: 1009
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Scheduling for home care agencies and retirement homes",
                                created_at: "2018-12-06T20:27:13.642259+05:30",
                                launched_at: null
                            },
                            {
                                id: 402,
                                name: "Blog",
                                slug: "victor-baudot-blog",
                                user: 999,
                                product_hunt: "",
                                twitter: "VictorBaudot_",
                                website: "https://victorbaudot.com/",
                                projects: [
                                    {
                                        id: 1411,
                                        name: "blog",
                                        private: false,
                                        user: 999
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/06/favicon.ico",
                                description:
                                    "This is my french blog where I mostly talk about solo not planned travels",
                                created_at: "2018-12-07T00:27:30.952924+05:30",
                                launched_at: "2018-12-07T00:27:30.950786+05:30"
                            },
                            {
                                id: 399,
                                name: "NameRobot",
                                slug: "namerobot",
                                user: 892,
                                product_hunt: "producthunt.com/posts/namerobot",
                                twitter: "NamerobotEN",
                                website: "https://www.namerobot.com/",
                                projects: [
                                    {
                                        id: 1225,
                                        name: "NameRobot",
                                        private: false,
                                        user: 892
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/06/namerobot.png",
                                description: "Find the name for your project",
                                created_at: "2018-12-06T21:05:47.799075+05:30",
                                launched_at: "2018-12-06T21:05:47.795634+05:30"
                            },
                            {
                                id: 405,
                                name: "Chaos Printers",
                                slug: "chaos-printers",
                                user: 687,
                                product_hunt: "",
                                twitter: "ChaosPrinters",
                                website: "https://www.chaosprinters.com/",
                                projects: [
                                    {
                                        id: 936,
                                        name: "KrazierInc",
                                        private: false,
                                        user: 687
                                    },
                                    {
                                        id: 698,
                                        name: "ChaosPrinters",
                                        private: false,
                                        user: 687
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/07/Chaos_Printers_social.png",
                                description:
                                    "Provides printing services for business cards, stickers and more.",
                                created_at: "2018-12-07T09:58:54.668601+05:30",
                                launched_at: "2018-12-07T09:58:54.666480+05:30"
                            },
                            {
                                id: 301,
                                name: "FamSync",
                                slug: "famsync",
                                user: 880,
                                product_hunt: "",
                                twitter: "",
                                website: "https://famsyncapp.com",
                                projects: [
                                    {
                                        id: 1065,
                                        name: "FamSync",
                                        private: false,
                                        user: 880
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/29/logo.png",
                                description:
                                    "Organize families\r\n\r\nDevelopment tracker @ https://beta.workflowy.com/s/famsync-development/fwFNo3FVshNpTX93",
                                created_at: "2018-11-20T07:33:05.712467+05:30",
                                launched_at: "2018-12-06T20:53:15.115094+05:30"
                            },
                            {
                                id: 385,
                                name: "UXstats",
                                slug: "ux-stats",
                                user: 981,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 1342,
                                        name: "uxstats",
                                        private: false,
                                        user: 981
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Posts useful statistics about UX Design methodologies and reasearch findings for UX design students, profressionals and product teams",
                                created_at: "2018-12-04T05:09:55.312747+05:30",
                                launched_at: null
                            },
                            {
                                id: 400,
                                name: "Year Progress Twitter Bot in NodeJS",
                                slug: "year-progress-twitter-bot-in-nodejs",
                                user: 704,
                                product_hunt: "",
                                twitter: "YProgressNodeJS",
                                website: "https://twitter.com/YProgressNodeJS",
                                projects: [
                                    {
                                        id: 1558,
                                        name: "yearprogress",
                                        private: false,
                                        user: 704
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/06/Screenshot_at_Dec_06_17-43-39.png",
                                description:
                                    "Posting the Year Progress on Twitter.",
                                created_at: "2018-12-06T23:14:24.536263+05:30",
                                launched_at: "2018-12-06T23:14:24.532888+05:30"
                            },
                            {
                                id: 394,
                                name: "Maker Army",
                                slug: "maker-army",
                                user: 969,
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
                                    "https://api.getmakerlog.com/media/uploads/2018/12/08/logo.jpg",
                                description:
                                    "䷂ Providing makers with financial stability and overall, bettering the future of digital creativity. ䷂",
                                created_at: "2018-12-06T18:01:25.738562+05:30",
                                launched_at: null
                            },
                            {
                                id: 401,
                                name: "My Gifts Ideas",
                                slug: "mes-idees-de-cadeaux",
                                user: 999,
                                product_hunt: "",
                                twitter: "",
                                website: "https://mygiftsideas.rocks",
                                projects: [
                                    {
                                        id: 1410,
                                        name: "santa",
                                        private: false,
                                        user: 999
                                    },
                                    {
                                        id: 1661,
                                        name: "mygiftsideas",
                                        private: false,
                                        user: 999
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/16/logo.png",
                                description:
                                    "Create and share gift lists ideas (for birthday, christmas...)",
                                created_at: "2018-12-07T00:13:50.973468+05:30",
                                launched_at: null
                            },
                            {
                                id: 406,
                                name: "Selldom.IO",
                                slug: "selldomio",
                                user: 687,
                                product_hunt:
                                    "https://www.producthunt.com/posts/selldom",
                                twitter: "selldom_io",
                                website: "https://selldom.io",
                                projects: [
                                    {
                                        id: 936,
                                        name: "KrazierInc",
                                        private: false,
                                        user: 687
                                    },
                                    {
                                        id: 793,
                                        name: "Selldom",
                                        private: false,
                                        user: 687
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/07/Selldom_Social.jpg",
                                description:
                                    "Selldom.io is a marketplace to buy and sell your unused domains that are collecting dust at your registrar after your 100th side-project and startup pivot.",
                                created_at: "2018-12-07T10:01:24.783341+05:30",
                                launched_at: "2018-12-07T10:01:24.781170+05:30"
                            },
                            {
                                id: 413,
                                name: "Public Design Jobs",
                                slug: "public-design-jobs",
                                user: 495,
                                product_hunt: "https://bit.ly/2zPO7W4",
                                twitter: "publicdesign___",
                                website: "https://publicdesignjobs.com/",
                                projects: [
                                    {
                                        id: 1440,
                                        name: "govdesign",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1435,
                                        name: "publicgood",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1438,
                                        name: "designthinking",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1439,
                                        name: "designforpublicgood",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1453,
                                        name: "1mvp1month",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1497,
                                        name: "publicdesignjobs",
                                        private: false,
                                        user: 495
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/08/logo_-_square.jpg",
                                description:
                                    "A mission-based job board for design & innovation jobs in the public sector, worldwide.",
                                created_at: "2018-12-08T11:36:03.765532+05:30",
                                launched_at: "2018-12-08T11:36:03.763321+05:30"
                            },
                            {
                                id: 414,
                                name: "UX Storyboard",
                                slug: "ux-storyboard",
                                user: 495,
                                product_hunt:
                                    "https://www.producthunt.com/posts/ux-storyboard",
                                twitter: "",
                                website: "https://uxstoryboard.com/",
                                projects: [
                                    {
                                        id: 1441,
                                        name: "storyboard",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1437,
                                        name: "designtools",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1453,
                                        name: "1mvp1month",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1498,
                                        name: "uxstoryboard",
                                        private: false,
                                        user: 495
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/08/logo_square_white_background_with_name_jpg.jpg",
                                description:
                                    "UX Storyboard is an online productized service to help designers and innovators tell better stories of the UX of their product/service through storyboarding.",
                                created_at: "2018-12-08T11:38:52.741638+05:30",
                                launched_at: "2018-12-08T11:38:52.739259+05:30"
                            },
                            {
                                id: 407,
                                name: "One Hour Logo",
                                slug: "one-hour-logo",
                                user: 1019,
                                product_hunt: "None",
                                twitter: "None",
                                website: "None",
                                projects: [],
                                launched: false,
                                icon: null,
                                description:
                                    "A website that gives you a creative brief for a fictional company and you design and upload your own logo for them.",
                                created_at: "2018-12-07T14:53:38.799663+05:30",
                                launched_at: null
                            },
                            {
                                id: 404,
                                name: "Maker's Marketplace",
                                slug: "makers-marketplace",
                                user: 928,
                                product_hunt: "",
                                twitter: "makersmarketxyz",
                                website: "http://www.makersmarketplace.xyz",
                                projects: [
                                    {
                                        id: 1412,
                                        name: "makersmarketplace",
                                        private: false,
                                        user: 928
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/07/Makers_Martket_Logo_3Mx2cwh.ico",
                                description:
                                    "#1 Maker's Marketplace For Makers. Indie Product Makers can buy/sell designs, codes & tools. Affordable, Quality, Supporting & Growing! Made by @fajarsiddiqfs ⚡",
                                created_at: "2018-12-07T08:38:51.328158+05:30",
                                launched_at: null
                            },
                            {
                                id: 412,
                                name: "Public Design Forum",
                                slug: "public-design-forum",
                                user: 495,
                                product_hunt: "https://bit.ly/2UpSnUZ",
                                twitter: "publicdesign___",
                                website: "https://forum.publicdesignvault.com/",
                                projects: [
                                    {
                                        id: 1440,
                                        name: "govdesign",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1435,
                                        name: "publicgood",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1438,
                                        name: "designthinking",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1439,
                                        name: "designforpublicgood",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1453,
                                        name: "1mvp1month",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1501,
                                        name: "publicdesignforum",
                                        private: false,
                                        user: 495
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/08/public_design_forum_logo_square_gif.png",
                                description:
                                    "A global community of designers and innovation professionals for public good and social impact",
                                created_at: "2018-12-08T11:33:23.167629+05:30",
                                launched_at: "2018-12-08T11:33:23.165401+05:30"
                            },
                            {
                                id: 416,
                                name: "Space Nomads",
                                slug: "space-nomads",
                                user: 495,
                                product_hunt:
                                    "https://www.producthunt.com/posts/space-nomads",
                                twitter: "space_nomads",
                                website: "https://space-nomads.com/",
                                projects: [
                                    {
                                        id: 1447,
                                        name: "spacetravel",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1448,
                                        name: "SpaceX",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1449,
                                        name: "NASA",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1450,
                                        name: "space",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1451,
                                        name: "spacenomads",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1453,
                                        name: "1mvp1month",
                                        private: false,
                                        user: 495
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/08/space_nomads_logo_black.jpg",
                                description:
                                    "Space Nomads is a [fictional] space travel tour agency for the masses. We believe that humanity’s fate is starbound, and we’re here to enable that. Galactic-class launches, flights, trips, experiences, and places. All in one service, to all places in the universe.",
                                created_at: "2018-12-08T11:45:42.011690+05:30",
                                launched_at: "2018-12-08T11:45:42.008509+05:30"
                            },
                            {
                                id: 410,
                                name: "Outsprint Store",
                                slug: "outsprint-store",
                                user: 495,
                                product_hunt: "",
                                twitter: "outsprintdesign",
                                website: "https://store.outsprint.io/",
                                projects: [
                                    {
                                        id: 1435,
                                        name: "publicgood",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1436,
                                        name: "ecommerce",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1437,
                                        name: "designtools",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1438,
                                        name: "designthinking",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1439,
                                        name: "designforpublicgood",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1440,
                                        name: "govdesign",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1453,
                                        name: "1mvp1month",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1503,
                                        name: "outsprintstore",
                                        private: false,
                                        user: 495
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/08/outsprint_store.jpg",
                                description:
                                    "Ecommerce store selling design tools for public good",
                                created_at: "2018-12-08T11:22:41.636526+05:30",
                                launched_at: "2018-12-08T11:22:41.633784+05:30"
                            },
                            {
                                id: 409,
                                name: "Grant Hunt",
                                slug: "grant-hunt",
                                user: 495,
                                product_hunt:
                                    "https://www.producthunt.com/posts/grant-hunt",
                                twitter: "gogranthunt",
                                website: "https://gogranthunt.com/",
                                projects: [
                                    {
                                        id: 1282,
                                        name: "socialimpact",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1283,
                                        name: "nonprofit",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1433,
                                        name: "chatbot",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1434,
                                        name: "bots",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1453,
                                        name: "1mvp1month",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1499,
                                        name: "granthuntbot",
                                        private: false,
                                        user: 495
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/08/Logo_v1.png",
                                description:
                                    "Easiest way to hunt down that grant for your social impact project, using a chat bot.",
                                created_at: "2018-12-08T11:17:33.631693+05:30",
                                launched_at: "2018-12-08T11:17:33.628497+05:30"
                            },
                            {
                                id: 415,
                                name: "Coffice City",
                                slug: "coffice-city",
                                user: 495,
                                product_hunt:
                                    "https://www.producthunt.com/posts/coffice-city",
                                twitter: "cofficecity",
                                website: "http://coffice-city.com/",
                                projects: [
                                    {
                                        id: 1442,
                                        name: "coffice",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1443,
                                        name: "cafe",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1444,
                                        name: "coffee",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1445,
                                        name: "remotework",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1446,
                                        name: "digitalnomads",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1453,
                                        name: "1mvp1month",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1502,
                                        name: "cofficecity",
                                        private: false,
                                        user: 495
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/08/coffee_emoji_profile_pic.jpg",
                                description:
                                    "Coffice City is an inter-galactic city guide for the top 10 best coffices (cafe-as-an-office) to get real shit done. A strictly curated handful of cafes that I *want* to keep going back to. All the cafes listed are/have 📡hi-speed wifi, 😍work-friendly, ☕️coffee, 🚾toilet nearby, 🔌sockets, 🚶standing desks, 🔇mostly quiet. Made using Sheet2Site.",
                                created_at: "2018-12-08T11:42:04.466062+05:30",
                                launched_at: "2018-12-08T11:42:04.462640+05:30"
                            },
                            {
                                id: 431,
                                name: "playlists.io",
                                slug: "playlistsio",
                                user: 1048,
                                product_hunt: "",
                                twitter: "",
                                website: "playlists.io",
                                projects: [],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/10/logo2x.png",
                                description:
                                    "Community for people to share their self created music playlists from different streaming platforms",
                                created_at: "2018-12-11T01:21:42.691408+05:30",
                                launched_at: null
                            },
                            {
                                id: 432,
                                name: "johnhenry.online",
                                slug: "johnhenryonline",
                                user: 1058,
                                product_hunt: "",
                                twitter: "",
                                website: "johnhenry.online",
                                projects: [
                                    {
                                        id: 1547,
                                        name: "website",
                                        private: false,
                                        user: 1058
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Personal website. Some mix of bio, portfolio, and place to experiment.",
                                created_at: "2018-12-11T15:26:32.134497+05:30",
                                launched_at: null
                            },
                            {
                                id: 403,
                                name: "Unstyler",
                                slug: "unstyler",
                                user: 969,
                                product_hunt:
                                    "https://www.producthunt.com/posts/unstyler",
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
                                    "https://api.getmakerlog.com/media/uploads/2018/12/06/logo_El4lmWF.png",
                                description:
                                    "Chrome extension to toggle a website's styling",
                                created_at: "2018-12-07T00:50:25.867933+05:30",
                                launched_at: "2018-12-07T13:43:27.335366+05:30"
                            },
                            {
                                id: 419,
                                name: "Duel",
                                slug: "duel",
                                user: 1032,
                                product_hunt: "",
                                twitter: "duelorg",
                                website: "https://duel.org/",
                                projects: [
                                    {
                                        id: 1462,
                                        name: "duel",
                                        private: false,
                                        user: 1032
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/08/icon.png",
                                description: "Gaming Organisation",
                                created_at: "2018-12-09T00:00:13.420531+05:30",
                                launched_at: "2018-12-09T00:04:18.502939+05:30"
                            },
                            {
                                id: 420,
                                name: "Personal site",
                                slug: "personal-site",
                                user: 1017,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 1465,
                                        name: "personal",
                                        private: false,
                                        user: 1017
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "Show off my web dev abilities",
                                created_at: "2018-12-09T03:17:16.740495+05:30",
                                launched_at: null
                            },
                            {
                                id: 421,
                                name: "Santafy",
                                slug: "santafy",
                                user: 73,
                                product_hunt:
                                    "https://www.producthunt.com/posts/santafy",
                                twitter: "santafymeme",
                                website: "https://santafy.me/",
                                projects: [
                                    {
                                        id: 1402,
                                        name: "santafy",
                                        private: false,
                                        user: 73
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/08/santafy-logo-v4-transpareant.jpg.png",
                                description:
                                    "Spread Christmas cheer all over your profile photos",
                                created_at: "2018-12-09T03:53:27.400256+05:30",
                                launched_at: "2018-12-09T03:53:27.397982+05:30"
                            },
                            {
                                id: 422,
                                name: "Ilm Productions",
                                slug: "ilm-productions",
                                user: 928,
                                product_hunt:
                                    "https://www.producthunt.com/posts/ilm-productions",
                                twitter: "ilmproductionsg",
                                website: "http://www.ilmproduction.com",
                                projects: [
                                    {
                                        id: 1467,
                                        name: "ilmproductions",
                                        private: false,
                                        user: 928
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/09/23905773_1053311694811242_6210116373760665304_n-1.jpg",
                                description: "Islamic Creative Production",
                                created_at: "2018-12-09T08:32:14.263194+05:30",
                                launched_at: "2018-12-09T08:32:14.259896+05:30"
                            },
                            {
                                id: 428,
                                name: "Digital Paper",
                                slug: "digital-paper",
                                user: 921,
                                product_hunt: "",
                                twitter: "r_digitalpaper",
                                website: "http://www.readdigitalpaper.com",
                                projects: [
                                    {
                                        id: 1221,
                                        name: "digitalpaper",
                                        private: false,
                                        user: 921
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "Read books online",
                                created_at: "2018-12-09T23:04:09.915067+05:30",
                                launched_at: null
                            },
                            {
                                id: 423,
                                name: "sunnysingh.io (2019 revamp)",
                                slug: "sunny-singhs-personal-site-2019-revamp",
                                user: 6,
                                product_hunt: "",
                                twitter: "sunnysinghio",
                                website: "https://sunnysingh.io",
                                projects: [
                                    {
                                        id: 1468,
                                        name: "sunnysinghio",
                                        private: false,
                                        user: 6
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/09/logo-square.png",
                                description: "Sunny Singh's personal website.",
                                created_at: "2018-12-09T09:25:52.137519+05:30",
                                launched_at: null
                            },
                            {
                                id: 424,
                                name: "BLOCKVAULT",
                                slug: "blockvault",
                                user: 934,
                                product_hunt:
                                    "https://www.producthunt.com/posts/blockvault",
                                twitter: "blockvaultdapp",
                                website: "blockvault.site",
                                projects: [
                                    {
                                        id: 1307,
                                        name: "blockvault",
                                        private: false,
                                        user: 934
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/09/47592090_2528092753875103_1448576749636943872_n.gif",
                                description:
                                    "Decentralized password manager for teams built on Blockstack",
                                created_at: "2018-12-09T16:47:17.841168+05:30",
                                launched_at: "2018-12-09T16:47:17.826440+05:30"
                            },
                            {
                                id: 426,
                                name: "Skoll",
                                slug: "skoll",
                                user: 1008,
                                product_hunt: "",
                                twitter: "",
                                website: "skoll.app",
                                projects: [
                                    {
                                        id: 1474,
                                        name: "skoll",
                                        private: false,
                                        user: 1008
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/09/Skollikon.png",
                                description:
                                    "A party game where you decide which games to put into the mix",
                                created_at: "2018-12-09T21:03:08.681159+05:30",
                                launched_at: null
                            },
                            {
                                id: 408,
                                name: "Let's Borrowit",
                                slug: "lets-borrowit",
                                user: 970,
                                product_hunt: "",
                                twitter: "lets_borrowit",
                                website: "www.letsborrowit.com",
                                projects: [
                                    {
                                        id: 1430,
                                        name: "letsborrowit",
                                        private: false,
                                        user: 970
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/07/borrowit-logo-1024.png",
                                description:
                                    "Borrow stuff from your friends. Lend stuff to your friends.",
                                created_at: "2018-12-07T16:47:12.528385+05:30",
                                launched_at: null
                            },
                            {
                                id: 427,
                                name: "Hookeepr",
                                slug: "hookeepr",
                                user: 131,
                                product_hunt:
                                    "https://www.producthunt.com/posts/hookeepr",
                                twitter: "hookeepr",
                                website: "hookeepr.com",
                                projects: [
                                    {
                                        id: 1476,
                                        name: "webhook",
                                        private: false,
                                        user: 131
                                    },
                                    {
                                        id: 1477,
                                        name: "api",
                                        private: false,
                                        user: 131
                                    },
                                    {
                                        id: 1478,
                                        name: "developer",
                                        private: false,
                                        user: 131
                                    },
                                    {
                                        id: 1479,
                                        name: "hookeepr",
                                        private: false,
                                        user: 131
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/09/HooKeepr.png",
                                description: "Keep your webhooks for later use",
                                created_at: "2018-12-09T21:49:21.327824+05:30",
                                launched_at: "2018-12-09T21:49:21.318981+05:30"
                            },
                            {
                                id: 429,
                                name: "Code Artisan",
                                slug: "code-artisan",
                                user: 880,
                                product_hunt: "",
                                twitter: "",
                                website: "https://codeartisan.org/",
                                projects: [
                                    {
                                        id: 1481,
                                        name: "cablog",
                                        private: false,
                                        user: 880
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/09/tjXdLbF-_400x400.jpg",
                                description: "My blog about code and stuff",
                                created_at: "2018-12-10T01:28:42.714991+05:30",
                                launched_at: "2018-12-10T01:28:42.712599+05:30"
                            },
                            {
                                id: 430,
                                name: "Technical Advisors Fund",
                                slug: "technical-advisors-fund",
                                user: 419,
                                product_hunt: "",
                                twitter: "techadvisorfund",
                                website: "http://technicaladvisors.fund",
                                projects: [
                                    {
                                        id: 1492,
                                        name: "techadvisorsfund",
                                        private: false,
                                        user: 419
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/10/Screen-Shot-2018-12-01-at-9-22-14-PM.png",
                                description:
                                    "Advises & Invests In Early Stage Startups",
                                created_at: "2018-12-10T09:52:13.396777+05:30",
                                launched_at: "2018-12-10T09:52:13.394085+05:30"
                            },
                            {
                                id: 411,
                                name: "Public Design Vault",
                                slug: "public-design-vault",
                                user: 495,
                                product_hunt: "https://bit.ly/2Ptl6Vr",
                                twitter: "publicdesign___",
                                website: "https://publicdesignvault.com/",
                                projects: [
                                    {
                                        id: 1435,
                                        name: "publicgood",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1437,
                                        name: "designtools",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1438,
                                        name: "designthinking",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1439,
                                        name: "designforpublicgood",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1440,
                                        name: "govdesign",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1453,
                                        name: "1mvp1month",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1496,
                                        name: "publicdesignvault",
                                        private: false,
                                        user: 495
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/08/Logoword.jpg",
                                description:
                                    "A curated directory of 500+ design tools for public good, all in one place",
                                created_at: "2018-12-08T11:28:17.403536+05:30",
                                launched_at: "2018-12-08T11:28:17.401075+05:30"
                            },
                            {
                                id: 418,
                                name: "mvlist",
                                slug: "mvlist",
                                user: 834,
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
                                    "https://api.getmakerlog.com/media/uploads/2018/12/15/icon-big-red.png",
                                description:
                                    "Easily keep track of movies you love (or hate).",
                                created_at: "2018-12-08T19:26:05.818349+05:30",
                                launched_at: null
                            },
                            {
                                id: 433,
                                name: "QUIQQER ERP",
                                slug: "quiqqer-erp",
                                user: 892,
                                product_hunt: "",
                                twitter: "",
                                website: "quiqqer.com",
                                projects: [
                                    {
                                        id: 1548,
                                        name: "quiqqer_erp",
                                        private: false,
                                        user: 892
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/11/ERP.png",
                                description:
                                    "The QUIQQER ERP module bundles all QUIQQER modules which you need for a\nERP (Enterprise Resource Planning) system.\n\nIt is your central point to successfully realize your project.\nThe ERP system transforms QUIQQER into a fully-fledged e-commerce shop or into your invoice management.\nStart your e-business now.",
                                created_at: "2018-12-11T15:32:04.115513+05:30",
                                launched_at: null
                            },
                            {
                                id: 434,
                                name: "fte",
                                slug: "fte",
                                user: 1058,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 1549,
                                        name: "career",
                                        private: false,
                                        user: 1058
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "umbrella project for activities related to job seeking",
                                created_at: "2018-12-11T16:00:25.033453+05:30",
                                launched_at: null
                            },
                            {
                                id: 436,
                                name: "Progression",
                                slug: "progression",
                                user: 1063,
                                product_hunt: "",
                                twitter: "mkgrw",
                                website: "progressionapp.com",
                                projects: [
                                    {
                                        id: 1555,
                                        name: "progression",
                                        private: false,
                                        user: 1063
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/11/icon-transparent.png",
                                description:
                                    "Help your design team to grow at work",
                                created_at: "2018-12-11T20:42:15.431179+05:30",
                                launched_at: "2018-12-11T20:42:15.429102+05:30"
                            },
                            {
                                id: 439,
                                name: "SafeNote",
                                slug: "safenote",
                                user: 849,
                                product_hunt:
                                    "https://www.producthunt.com/posts/safenote",
                                twitter: "devrolabs",
                                website: "https://safenote.co",
                                projects: [
                                    {
                                        id: 1568,
                                        name: "safenote",
                                        private: false,
                                        user: 849
                                    },
                                    {
                                        id: 1569,
                                        name: "privatenote",
                                        private: false,
                                        user: 849
                                    },
                                    {
                                        id: 1570,
                                        name: "privnote",
                                        private: false,
                                        user: 849
                                    },
                                    {
                                        id: 1571,
                                        name: "devrolabs",
                                        private: false,
                                        user: 849
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/12/95a42b308b9a1df56c51e9bfe0dcbf5e.png",
                                description:
                                    "Share a confidential note via a web link that will self-destruct after it is read by your intended recipient.",
                                created_at: "2018-12-12T19:22:41.106670+05:30",
                                launched_at: "2018-12-12T19:22:41.104192+05:30"
                            },
                            {
                                id: 440,
                                name: "clinikaapp",
                                slug: "clinikaapp",
                                user: 1072,
                                product_hunt: "",
                                twitter: "",
                                website: "clinikaapp.com.br",
                                projects: [
                                    {
                                        id: 1572,
                                        name: "clinikaapp",
                                        private: false,
                                        user: 1072
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "A SaaS with features to manage clinics and saloons, with patients, scheduling and much more",
                                created_at: "2018-12-13T00:18:33.015601+05:30",
                                launched_at: null
                            },
                            {
                                id: 458,
                                name: "Makerlog Menubar",
                                slug: "makerlog-menubar",
                                user: 26,
                                product_hunt: "",
                                twitter: "",
                                website: "https://makerlog-menubar.netlify.com",
                                projects: [
                                    {
                                        id: 1663,
                                        name: "MakerlogMenubar",
                                        private: false,
                                        user: 26
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/20/logo.png",
                                description:
                                    "⚡️ A super fast menubar app for Makerlog 🔥🚢",
                                created_at: "2018-12-19T10:18:22.764456+05:30",
                                launched_at: null
                            },
                            {
                                id: 442,
                                name: "FajarSiddiq",
                                slug: "fajar-siddiq",
                                user: 928,
                                product_hunt: "",
                                twitter: "fajarsiddiqfs",
                                website: "https://www.fajarsiddiq.com",
                                projects: [
                                    {
                                        id: 1579,
                                        name: "personalsite",
                                        private: false,
                                        user: 928
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/13/DsG4N2LU8AA7rm7.jpg",
                                description:
                                    "It show's a profile about me on my official personal website",
                                created_at: "2018-12-13T14:20:22.480483+05:30",
                                launched_at: "2018-12-13T14:20:22.476155+05:30"
                            },
                            {
                                id: 443,
                                name: "MailDump",
                                slug: "maildump",
                                user: 849,
                                product_hunt:
                                    "https://www.producthunt.com/posts/maildump",
                                twitter: "devrolabs",
                                website: "https://maildump.co/",
                                projects: [
                                    {
                                        id: 1580,
                                        name: "MailDump",
                                        private: false,
                                        user: 849
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/13/2ov3cs.gif",
                                description:
                                    "email addresses extracting, verifying and finding",
                                created_at: "2018-12-13T15:17:33.159612+05:30",
                                launched_at: "2018-12-13T15:17:33.156574+05:30"
                            },
                            {
                                id: 444,
                                name: "Fresh Fonts",
                                slug: "fresh-fonts",
                                user: 1079,
                                product_hunt: "",
                                twitter: "@fresh_fonts",
                                website: "freshfonts.io",
                                projects: [
                                    {
                                        id: 1584,
                                        name: "freshfonts",
                                        private: false,
                                        user: 1079
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/13/Avatar_Black2x.jpg",
                                description:
                                    "Email newsletter for high-quality, free and open source fonts 💌",
                                created_at: "2018-12-14T04:06:27.164619+05:30",
                                launched_at: "2018-12-14T04:06:27.162447+05:30"
                            },
                            {
                                id: 441,
                                name: "Daily Podcast Club",
                                slug: "dailypodcast",
                                user: 969,
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
                                    "https://api.getmakerlog.com/media/uploads/2018/12/17/headphone_1f3a7.png",
                                description:
                                    "Speak for two minutes every day. Get into the habit of podcasting and share your thoughts with others. WIP",
                                created_at: "2018-12-13T05:20:10.017453+05:30",
                                launched_at: null
                            },
                            {
                                id: 437,
                                name: "XKCDifier",
                                slug: "xkcdifier",
                                user: 969,
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
                                    "https://api.getmakerlog.com/media/uploads/2018/12/11/logo.png",
                                description:
                                    "Replace strings in websites with other that make more sense (not really, it just applies the XKCD replacement comics to everything you visit)",
                                created_at: "2018-12-12T04:02:29.783707+05:30",
                                launched_at: null
                            },
                            {
                                id: 445,
                                name: "NomadWallet app",
                                slug: "nomadwallet-app",
                                user: 1076,
                                product_hunt:
                                    "https://www.producthunt.com/posts/nomadwallet-app",
                                twitter: "@nomadwallet_app",
                                website: "https://nomadwalletapp.com/",
                                projects: [
                                    {
                                        id: 1589,
                                        name: "nomadwallet",
                                        private: false,
                                        user: 1076
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/14/app.png",
                                description:
                                    "travel-centric expense tracker for nomads, travellers, backpackers",
                                created_at: "2018-12-14T09:55:41.249698+05:30",
                                launched_at: "2018-12-14T09:55:41.246503+05:30"
                            },
                            {
                                id: 446,
                                name: "Wabisabi - the beauty of imperfection",
                                slug: "wabisabi-the-beauty-of-imperfection",
                                user: 1076,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 1590,
                                        name: "wabisabi",
                                        private: false,
                                        user: 1076
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Chrome extension to inspire you with progress bars",
                                created_at: "2018-12-14T10:13:48.080705+05:30",
                                launched_at: null
                            },
                            {
                                id: 417,
                                name: "Public Design FAQs ebook",
                                slug: "101-govdesign-hacks",
                                user: 495,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 1440,
                                        name: "govdesign",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1282,
                                        name: "socialimpact",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1283,
                                        name: "nonprofit",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1453,
                                        name: "1mvp1month",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1435,
                                        name: "publicgood",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1437,
                                        name: "designtools",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1438,
                                        name: "designthinking",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1439,
                                        name: "designforpublicgood",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1504,
                                        name: "101_design_hacks",
                                        private: false,
                                        user: 495
                                    },
                                    {
                                        id: 1594,
                                        name: "publicdesignfaqs",
                                        private: false,
                                        user: 495
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Complete ebook guide to practitioner tips & hacks on #publicdesign & #govdesign",
                                created_at: "2018-12-08T12:10:50.047604+05:30",
                                launched_at: null
                            },
                            {
                                id: 447,
                                name: "Realm Of React",
                                slug: "realm-of-react",
                                user: 1028,
                                product_hunt: "",
                                twitter: "",
                                website: "realmofreact.com",
                                projects: [
                                    {
                                        id: 1595,
                                        name: "coaching",
                                        private: false,
                                        user: 1028
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Takes you from total newb to job ready with React JS.",
                                created_at: "2018-12-14T13:34:05.747502+05:30",
                                launched_at: null
                            },
                            {
                                id: 448,
                                name: "Frauvis",
                                slug: "frauvis",
                                user: 707,
                                product_hunt: "",
                                twitter: "frauvis",
                                website: "frauvis.com",
                                projects: [
                                    {
                                        id: 1600,
                                        name: "1000blkwit",
                                        private: false,
                                        user: 707
                                    },
                                    {
                                        id: 1598,
                                        name: "blkwit",
                                        private: false,
                                        user: 707
                                    },
                                    {
                                        id: 1599,
                                        name: "frauvis",
                                        private: false,
                                        user: 707
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/14/Frauvis_logo.png",
                                description: "Platform for Black Women in Tech",
                                created_at: "2018-12-14T14:18:07.495302+05:30",
                                launched_at: null
                            },
                            {
                                id: 449,
                                name: "Culturefiy",
                                slug: "culturefiy",
                                user: 707,
                                product_hunt: "",
                                twitter: "culturefiy",
                                website: "culturefiy.tech",
                                projects: [
                                    {
                                        id: 1601,
                                        name: "hrtech",
                                        private: false,
                                        user: 707
                                    },
                                    {
                                        id: 1602,
                                        name: "culturefiytech",
                                        private: false,
                                        user: 707
                                    },
                                    {
                                        id: 1598,
                                        name: "blkwit",
                                        private: false,
                                        user: 707
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/14/culturefiynewcolorlogo.png",
                                description: "HR Tech Platform",
                                created_at: "2018-12-14T14:19:28.572719+05:30",
                                launched_at: null
                            },
                            {
                                id: 295,
                                name: "200 words a day",
                                slug: "200-words-a-day",
                                user: 750,
                                product_hunt: "",
                                twitter: "https://twitter.com/200wordsaday",
                                website: "https://200wordsaday.com",
                                projects: [
                                    {
                                        id: 1053,
                                        name: "200wordsaday",
                                        private: false,
                                        user: 750
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/11/20/logo_wO9tTxR.png",
                                description:
                                    "Write 200 words a day. Share. Get into the habit of writing and improve.",
                                created_at: "2018-11-19T11:49:04.245666+05:30",
                                launched_at: null
                            },
                            {
                                id: 450,
                                name: "meetless",
                                slug: "meetless",
                                user: 1081,
                                product_hunt: "",
                                twitter: "",
                                website: "meetless.io",
                                projects: [
                                    {
                                        id: 1605,
                                        name: "analytics",
                                        private: false,
                                        user: 1081
                                    },
                                    {
                                        id: 1606,
                                        name: "productivity",
                                        private: false,
                                        user: 1081
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Make meetings more efficient and reduce number of meetings.",
                                created_at: "2018-12-14T16:36:51.265064+05:30",
                                launched_at: null
                            },
                            {
                                id: 451,
                                name: "Fixin",
                                slug: "fixin",
                                user: 937,
                                product_hunt: "",
                                twitter: "",
                                website: "",
                                projects: [
                                    {
                                        id: 1614,
                                        name: "fixin",
                                        private: false,
                                        user: 937
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "Helps hardware repair stores",
                                created_at: "2018-12-15T02:43:34.439200+05:30",
                                launched_at: null
                            },
                            {
                                id: 452,
                                name: "LucidDreamBot.com",
                                slug: "luciddreambotcom",
                                user: 1085,
                                product_hunt:
                                    "https://www.producthunt.com/posts/luciddreambot/",
                                twitter: "myluciddreambot",
                                website: "LucidDreamBot.com",
                                projects: [
                                    {
                                        id: 1618,
                                        name: "luciddreambot",
                                        private: false,
                                        user: 1085
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/15/logo.png",
                                description:
                                    "The easiest way to learn how to lucid dream",
                                created_at: "2018-12-15T12:06:44.870519+05:30",
                                launched_at: "2018-12-15T12:06:44.867191+05:30"
                            },
                            {
                                id: 453,
                                name: "Scan2Sheet",
                                slug: "scan2sheet",
                                user: 670,
                                product_hunt: "",
                                twitter: "",
                                website: "https://scan2sheet.netlify.com",
                                projects: [
                                    {
                                        id: 1621,
                                        name: "scan2sheet",
                                        private: false,
                                        user: 670
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Takes input from scanner, looks up item in pricelists & outputs calculated items to a new sheet",
                                created_at: "2018-12-16T00:36:06.953567+05:30",
                                launched_at: null
                            },
                            {
                                id: 454,
                                name: "Infinite Climbing",
                                slug: "infinite-climbing",
                                user: 670,
                                product_hunt: "",
                                twitter: "",
                                website: "https://infiniteclimbing.netlify.com",
                                projects: [
                                    {
                                        id: 1622,
                                        name: "xrclimb",
                                        private: false,
                                        user: 670
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "XR application that turns your environment into a climbing game",
                                created_at: "2018-12-16T00:41:27.697116+05:30",
                                launched_at: null
                            },
                            {
                                id: 455,
                                name: "Job Board",
                                slug: "job-board",
                                user: 1086,
                                product_hunt: "",
                                twitter: "lawyerscode",
                                website: "",
                                projects: [
                                    {
                                        id: 1624,
                                        name: "Job",
                                        private: false,
                                        user: 1086
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description: "Job board for newbies in tech",
                                created_at: "2018-12-16T04:43:08.520903+05:30",
                                launched_at: null
                            },
                            {
                                id: 457,
                                name: "Twitter Bot",
                                slug: "twitter-bot",
                                user: 780,
                                product_hunt: "",
                                twitter: "dzumax",
                                website: null,
                                projects: [
                                    {
                                        id: 1666,
                                        name: "twitter_bot",
                                        private: false,
                                        user: 780
                                    }
                                ],
                                launched: false,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/18/094.png",
                                description:
                                    "Automatically grow your followers",
                                created_at: "2018-12-18T12:56:15.722295+05:30",
                                launched_at: null
                            },
                            {
                                id: 425,
                                name: "Santa's Ideas",
                                slug: "santas-ideas",
                                user: 999,
                                product_hunt:
                                    "https://www.producthunt.com/posts/santa-s-ideas",
                                twitter: "",
                                website: "https://santaideas.com",
                                projects: [
                                    {
                                        id: 1472,
                                        name: "santaideas",
                                        private: false,
                                        user: 999
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/16/santaideas-white-bg_ru8ytnA.gif",
                                description:
                                    "Find original gifts people will love",
                                created_at: "2018-12-09T16:53:29.990877+05:30",
                                launched_at: "2018-12-16T16:29:10.699066+05:30"
                            },
                            {
                                id: 456,
                                name: "Coding Origins",
                                slug: "coding-origins",
                                user: 753,
                                product_hunt: "",
                                twitter: "",
                                website:
                                    "https://www.sheet2site.com/api/?key=1WQgK6tIMFydnUk9jaeZaIbwcTC6kmZIP7v8IbxhIUtY",
                                projects: [
                                    {
                                        id: 1651,
                                        name: "CodingOrigins",
                                        private: false,
                                        user: 753
                                    }
                                ],
                                launched: false,
                                icon: null,
                                description:
                                    "Guide new comers to the world of programming.",
                                created_at: "2018-12-16T18:55:01.333184+05:30",
                                launched_at: null
                            },
                            {
                                id: 435,
                                name: "Line Wizard",
                                slug: "line-wizard",
                                user: 970,
                                product_hunt:
                                    "https://www.producthunt.com/posts/line-wizard",
                                twitter: "",
                                website: "https://www.linewizard.club/",
                                projects: [
                                    {
                                        id: 1510,
                                        name: "linewizard",
                                        private: false,
                                        user: 970
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/11/wizard-fade-purple-512.gif",
                                description:
                                    "Clean Line Breaks on Your Instagram Posts with the Line Wizard",
                                created_at: "2018-12-11T20:07:18.365197+05:30",
                                launched_at: "2018-12-18T13:57:44.227801+05:30"
                            },
                            {
                                id: 459,
                                name: "Makerlog Tees",
                                slug: "makerlog-tees",
                                user: 928,
                                product_hunt: "",
                                twitter: "getmakerlog",
                                website:
                                    "https://twitter.com/fajarsiddiqFS/status/1075255208941252608",
                                projects: [
                                    {
                                        id: 1672,
                                        name: "makerlogtee",
                                        private: false,
                                        user: 928
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/19/maker_tee_icon.jpg",
                                description: "Wear it, Log it",
                                created_at: "2018-12-19T10:52:46.345688+05:30",
                                launched_at: "2018-12-19T10:52:46.342508+05:30"
                            },
                            {
                                id: 460,
                                name: "Pelican",
                                slug: "pelican",
                                user: 477,
                                product_hunt:
                                    "https://www.producthunt.com/posts/pelican-facebook",
                                twitter: "",
                                website: null,
                                projects: [
                                    {
                                        id: 1677,
                                        name: "facebookUI",
                                        private: false,
                                        user: 477
                                    }
                                ],
                                launched: true,
                                icon: null,
                                description: "Minimal Focused Facebook UI",
                                created_at: "2018-12-20T02:12:59.397555+05:30",
                                launched_at: "2018-12-20T02:12:59.395468+05:30"
                            },
                            {
                                id: 462,
                                name: "bill.pt",
                                slug: "billpt",
                                user: 1105,
                                product_hunt: "",
                                twitter: "",
                                website: "https://www.bill.pt",
                                projects: [
                                    {
                                        id: 1683,
                                        name: "bill",
                                        private: false,
                                        user: 1105
                                    }
                                ],
                                launched: true,
                                icon: null,
                                description:
                                    "Criar faturas e outros documentos legais",
                                created_at: "2018-12-20T11:09:21.323736+05:30",
                                launched_at: "2018-12-20T11:09:21.321865+05:30"
                            },
                            {
                                id: 463,
                                name: "MakerlogApp",
                                slug: "makerlogapp",
                                user: 442,
                                product_hunt: "",
                                twitter: "",
                                website: "https://getmakerlog.com",
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
                                    "https://api.getmakerlog.com/media/uploads/2018/12/20/Icon-App-1024x10241x.png",
                                description:
                                    "Android and iOS client for Makerlog",
                                created_at: "2018-12-20T12:44:27.697807+05:30",
                                launched_at: null
                            },
                            {
                                id: 464,
                                name: "Namekin",
                                slug: "namekin",
                                user: 691,
                                product_hunt: "",
                                twitter: "",
                                website: "https://www.namekin.com",
                                projects: [
                                    {
                                        id: 1686,
                                        name: "namekin",
                                        private: false,
                                        user: 691
                                    }
                                ],
                                launched: true,
                                icon:
                                    "https://api.getmakerlog.com/media/uploads/2018/12/20/iconlogo.png",
                                description:
                                    "Get YourFamilyName.com e-mail addresses and a website for your family. \nThe perfect gift, both useful and memorable.",
                                created_at: "2018-12-20T18:35:48.600045+05:30",
                                launched_at: "2018-12-20T19:58:21.961559+05:30"
                            }
                        ].filter(pr => pr.icon !== null);
                        let p = data[Math.floor(Math.random() * data.length)];
                        return (
                            <img
                                src={
                                    u.avatar.includes("gravatar")
                                        ? u.avatar +
                                          `&d=${
                                              p.icon
                                                  ? encodeURIComponent(p.icon)
                                                  : "https://pbs.twimg.com/profile_images/1070715861009342464/vWJUQi6I_400x400.jpg"
                                          }`
                                        : u.avatar
                                }
                            />
                        );
                    })
                }
            />
        </ThumbnailGrid>
    </Page>
);
