import { GoogleCalendar, ICalendar } from "~/vendor/datebook";
import React, { Component } from "react";

import Emoji from "~/components/Emoji";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Markdown from "~/components/Markdown";
import OutboundLink from "~/components/OutboundLink";
import SingleItem from "~/containers/SingleItem";
import EventsPageLayout from "../../layouts/EventsPage";

class EventAttendeePanel extends Component {
    state = {
        detailsOpen: false
    };

    renderTweetButton = () => {
        const text = `I'm attending ${this.props.item.title}! 🎉 \n Join me on Makerlog Events 👇 \n #TogetherWeMake`;
        const url = `${process.env.REACT_APP_BASE_URL}/events/${this.props.item.slug}`;

        return (
            <OutboundLink
                href={`https://twitter.com/share?text=${encodeURIComponent(
                    text
                )}&url=${url}`}
                className="btn btn-small btn-light"
            >
                <span className="icon">
                    <FontAwesomeIcon icon={["fab", "twitter"]} />
                </span>{" "}
                Tweet #TogetherWeMake
            </OutboundLink>
        );
    };

    getICalFiles = () => {
        const { item } = this.props;
        const icalendar = new ICalendar({
            title: item.title,
            description: item.description,
            start: item.starts_at,
            end: item.ends_at
        });
        icalendar.download();
    };

    getGCalUrl = () => {
        const { item } = this.props;
        const gcal = new GoogleCalendar({
            title: item.title,
            description: item.description,
            start: item.starts_at,
            end: item.ends_at
        });
        return gcal.render();
    };

    render() {
        const { item } = this.props;
        if (!item.user_joined) return <div>You haven't joined this event.</div>;

        return (
            <EventsPageLayout event={item}>
                <div className={"flex col-right v-center mbGap"}>
                    <div>
                        <h2>Your attendance to {item.title}</h2>
                        <p>Steps for a successful event experience</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-content">
                        <h4>
                            <Emoji emoji="✅" /> Logging setup
                        </h4>
                        <p>
                            Makerlog lets you log tasks and track your progress
                            on your hackathon projects.
                        </p>
                        <div className="h-list flex center spaced v-center mt-5">
                            <div>
                                <OutboundLink
                                    className="btn btn-small btn-light"
                                    to={"/welcome"}
                                >
                                    <span className="icon">
                                        <FontAwesomeIcon
                                            icon={"check-circle"}
                                        />
                                    </span>{" "}
                                    Tutorial
                                </OutboundLink>
                            </div>

                            <div>
                                <OutboundLink
                                    className="btn btn-small btn-light"
                                    to={"/log"}
                                >
                                    <span className="icon">
                                        <FontAwesomeIcon
                                            icon={"check-square"}
                                        />
                                    </span>{" "}
                                    Log
                                </OutboundLink>
                            </div>

                            <div>
                                <OutboundLink
                                    className="btn btn-small btn-light"
                                    to={"/apps"}
                                >
                                    <span className="icon">
                                        <FontAwesomeIcon icon={"ship"} />
                                    </span>{" "}
                                    Integrations & Apps
                                </OutboundLink>
                            </div>

                            <div>
                                <OutboundLink
                                    className="btn btn-small btn-light"
                                    to={"/discussions"}
                                >
                                    <span className="icon">
                                        <FontAwesomeIcon icon={"comments"} />
                                    </span>{" "}
                                    Forum
                                </OutboundLink>
                            </div>
                        </div>
                        <hr />
                        <h4>
                            <Emoji emoji="🚨" /> Team & product setup
                        </h4>
                        <p>
                            You can add your product to Makerlog to allow judges
                            to see it and track your progress more effectively.
                            You can also add your team to the product.
                        </p>
                        <div className="h-list flex center spaced v-center mt-5">
                            <div>
                                <OutboundLink
                                    className="btn btn-small btn-light"
                                    to={"/products"}
                                >
                                    <span className="icon">
                                        <FontAwesomeIcon icon={"plus"} />
                                    </span>{" "}
                                    Add a product
                                </OutboundLink>
                            </div>
                        </div>
                        <hr />
                        <h4>Calendar setup</h4>
                        <p>Here's your timezone adjusted calendar files.</p>
                        <div className="h-list flex center spaced v-center mt-5">
                            <div>
                                <button
                                    className="btn btn-small btn-light"
                                    onClick={this.getICalFiles}
                                >
                                    <span className="icon">
                                        <FontAwesomeIcon icon="calendar-check" />
                                    </span>{" "}
                                    iCal event
                                </button>
                            </div>
                            <div>
                                <OutboundLink
                                    className="btn btn-small btn-light"
                                    to={this.getGCalUrl()}
                                >
                                    <span className="icon">
                                        <FontAwesomeIcon icon="calendar-check" />
                                    </span>{" "}
                                    Google Calendar event
                                </OutboundLink>
                            </div>
                        </div>
                        <hr />
                        <h4>Livestreaming setup</h4>
                        <p>
                            Here's how to setup your livestreaming experience.
                        </p>
                        <div className="h-list flex center spaced v-center mt-5">
                            <div>
                                <OutboundLink
                                    className="btn btn-small btn-light"
                                    to={"/apps/shipstreams/"}
                                >
                                    <span className="icon">
                                        <FontAwesomeIcon icon={"ship"} />
                                    </span>{" "}
                                    Set up livestreaming
                                </OutboundLink>
                            </div>
                        </div>
                        <hr />
                        <h4>Tweet material</h4>
                        <p>
                            Here's a little bit of tweet material to spread the
                            word of your attendance!
                        </p>
                        <div className="h-list flex center spaced v-center mt-5">
                            <div>{this.renderTweetButton()}</div>
                        </div>
                    </div>
                </div>
            </EventsPageLayout>
        );
    }
}

const EventAttendeePanelContainer = props => (
    <SingleItem url={`/events/${props.slug}/`} component={EventAttendeePanel} />
);

EventAttendeePanelContainer.getInitialProps = async ({ query }) => {
    return {
        slug: query.slug ? query.slug : null
    };
};

export default EventAttendeePanelContainer;
