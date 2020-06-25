import React from "react";
import { Link } from "~/routes";
import "./index.scss";
import CompanyPageLayout from "../../layouts/CompanyPage";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import WallOfLove from "../../components/WallOfLove";
import { TwitterTimelineEmbed } from "react-twitter-embed";

class AboutPage extends React.Component {
    static async getInitialProps(ctx) {
        return {
            layout: {
                className: "AboutPage"
            }
        };
    }

    render() {
        return (
            <CompanyPageLayout>
                <div className="hero">
                    <div className="container">
                        <img src="/img/logo-white.svg" alt="" />
                        <h1>Empowering makers around the world to create</h1>
                        <p>
                            We develop platforms to help makers stay productive
                            and motivated while creating side projects.
                        </p>
                    </div>
                </div>
                <div className="maker-definition sect">
                    <div className="container">
                        <div>
                            <h2>maker</h2>
                            <small>
                                <em>noun · /ˈmeɪ.kər/</em>
                            </small>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    someone who creates or invents things,
                                    either using traditional crafts or
                                    technology
                                </li>
                                <li>
                                    the people or company that make something
                                </li>
                                <li>an avid Makerlog user</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="grid-c-s mtGap">
                        <div>
                            <div>
                                <h2 className="mb-em">What is Makerlog?</h2>
                                <div className="card">
                                    <div className="card-content">
                                        <p>
                                            Makerlog is a community of over
                                            5,000 entrepreneurs in tech shipping
                                            side projects together. These
                                            entrepreneurs, makers, can post
                                            their daily tasks and grow a network
                                            of supportive, like-minded people!
                                            Which, is pretty awesome.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="mb-em">How does it work?</h2>
                                <div className="card">
                                    <div className="card-content">
                                        <p>
                                            Makerlog works by logging your daily
                                            project-related tasks, earning
                                            streaks (consecutive days of work),
                                            and interacting with other makers to
                                            get feedback or early users.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="mb-em">Umm... why?</h2>
                                <div className="card">
                                    <div className="card-content">
                                        <p>
                                            Making can be a really lonely thing.
                                            Depending on where you are, you
                                            might not have access to a
                                            supportive environment for your
                                            entrepreneurship endeavors. We
                                            believe every maker could benefit
                                            from a group of like-minded peers to
                                            help them in their journey!
                                            <br />
                                            <br />
                                            Also... Traditional social media is
                                            all about consumption. We're all
                                            about productivity first. Makerlog's
                                            the platform that makes you more
                                            productive rather than less!
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="mb-em">How'd it begin?</h2>
                                <div className="card">
                                    <div className="card-content">
                                        <p>
                                            I started Makerlog in 2018, while in
                                            high school. I've been a maker since
                                            childhood, and throughout that
                                            entire time I never really felt
                                            anyone understood what I did. I
                                            never had a support network until I
                                            found the maker community. I grew to
                                            love the community and developed a
                                            huge passion for this really weird,
                                            yet amazing group of people... I
                                            then decided to make Makerlog to
                                            help push this movement forward.
                                        </p>

                                        <Link
                                            route="profile-page"
                                            params={{ username: "sergio" }}
                                        >
                                            <a>
                                                <div className="user-signoff">
                                                    <div>
                                                        <img
                                                            src="https://pbs.twimg.com/profile_images/1234753414762024962/EoVhb0jK_400x400.jpg"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div>
                                                        Sergio Mattei, student
                                                        founder
                                                    </div>
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="Sidebar">
                                <div className="AdCard sidebar-item">
                                    <h3>Quick stats</h3>
                                    <h4 className="subtitle has-text-grey">
                                        Here's a little bit of how we've grown
                                    </h4>
                                    <div className="card">
                                        <div className="card-content">
                                            <div className="level">
                                                <div>
                                                    <h2>200k+</h2>
                                                    <small>Tasks created</small>
                                                </div>
                                                <div>
                                                    <h2>5,000+</h2>
                                                    <small>Users</small>
                                                </div>
                                                <div>
                                                    <h2>100k+</h2>
                                                    <small>Reach</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="sidebar-item">
                                    <h3 className="mb-em">Social</h3>
                                    <TwitterTimelineEmbed
                                        sourceType="profile"
                                        screenName="getmakerlog"
                                        options={{ height: 400 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="gallery sect">
                    <div className="container">
                        <div className="mbGap">
                            <h1>The Team</h1>
                            <p>
                                We're a brilliant, diverse team ready to
                                challenge the status quo.
                            </p>
                        </div>
                        <div className="team-sect flex flex-gap">
                            <div className="member">
                                <img src="/img/team/sergio.png" alt="" />
                                <div>
                                    <h3>Sergio Mattei</h3>
                                    <p>Founder, Makerlogger in Chief</p>
                                    <small>
                                        <em>the hacker</em>
                                    </small>
                                </div>
                            </div>
                            <div className="member">
                                <img src="/img/team/hector.png" alt="" />
                                <div>
                                    <h3>Hector Soto</h3>
                                    <p>Creative director, user experience</p>
                                    <small>
                                        <em>the hipster</em>
                                    </small>
                                </div>
                            </div>
                            <div className="member">
                                <img src="/img/team/wharton.png" alt="" />
                                <div>
                                    <h3>Jose Carlos Wharton</h3>
                                    <p>Head of research, data analysis</p>
                                    <small>
                                        <em>the hustler</em>
                                    </small>
                                </div>
                            </div>
                            <div className="member">
                                <img src="/img/team/kerr.jpg" alt="" />
                                <div>
                                    <h3>Kerr Travers</h3>
                                    <p>Community outreach intern</p>
                                    <small>
                                        <em>the meme master</em>
                                    </small>
                                </div>
                            </div>
                            <div className="member">
                                <img src="/img/team/monday.png" alt="" />
                                <div>
                                    <h3>Monday</h3>
                                    <p>Head of cats</p>
                                    <small>
                                        <em>the mascot</em>
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div className=" mbGap mtGap">
                            <hr />
                        </div>
                        <div className="mbGap">
                            <h1>Wall of Love</h1>
                            <p>This is the maker community. </p>
                        </div>
                        <WallOfLove />
                    </div>
                </div>
                <div className="container">
                    <div className="mtGap">
                        <h2>Get in touch</h2>
                        <p>
                            We're very reachable people, and open to discussing
                            any business or maker related matters!
                        </p>
                        <br />
                        <Link route="contact">
                            <a className="btn btn-secondary">Contact us</a>
                        </Link>
                    </div>
                </div>
            </CompanyPageLayout>
        );
    }
}

export default AboutPage;
