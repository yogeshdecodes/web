import { GoogleCalendar, ICalendar } from "~/vendor/datebook";
import React, { Component } from "react";

import Emoji from "~/components/Emoji";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Markdown from "~/components/Markdown";
import OutboundLink from "~/components/OutboundLink";
import SingleItem from "~/containers/SingleItem";

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
                className="button is-small is-rounded"
                target="_blank"
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
            <Page className="EventHostPage brand-background-page" transparent>
                <div className="columns">
                    <div className="column is-half is-offset-one-quarter">
                        <h3 className="title is-3">Your attendance</h3>
                        <h3 className="subtitle is-6">
                            Here's all you need for a successful event
                            experience!
                        </h3>

                        <div className="card">
                            <div className="card-content">
                                <h1 className="title is-6">
                                    <Emoji emoji="✅" /> Logging setup
                                </h1>
                                <h3 className="subtitle is-7">
                                    Makerlog lets you log tasks and track your
                                    progress on your hackathon projects.
                                </h3>
                                <div className="buttons">
                                    <OutboundLink
                                        className="button is-primary is-rounded is-small"
                                        to={"/welcome"}
                                    >
                                        <span className="icon">
                                            <FontAwesomeIcon
                                                icon={"check-circle"}
                                            />
                                        </span>{" "}
                                        Tutorial
                                    </OutboundLink>

                                    <OutboundLink
                                        className="button is-rounded is-small"
                                        to={"/log"}
                                    >
                                        <span className="icon">
                                            <FontAwesomeIcon
                                                icon={"check-square"}
                                            />
                                        </span>{" "}
                                        Log
                                    </OutboundLink>

                                    <OutboundLink
                                        className="button is-rounded is-small"
                                        to={"/apps"}
                                    >
                                        <span className="icon">
                                            <FontAwesomeIcon icon={"ship"} />
                                        </span>{" "}
                                        Integrations & Apps
                                    </OutboundLink>

                                    <OutboundLink
                                        className="button is-rounded is-small"
                                        to={"/discussions"}
                                    >
                                        <span className="icon">
                                            <FontAwesomeIcon
                                                icon={"comments"}
                                            />
                                        </span>{" "}
                                        Forum
                                    </OutboundLink>
                                </div>
                                <hr />
                                <h1 className="title is-6">
                                    <Emoji emoji="🚨" /> Team & product setup
                                </h1>
                                <h3 className="subtitle is-7">
                                    You can add your product to Makerlog to
                                    allow judges to see it and track your
                                    progress more effectively. You can also add
                                    your team to the product.
                                </h3>
                                <div className="buttons">
                                    <OutboundLink
                                        className="button is-primary is-rounded is-small"
                                        to={"/products"}
                                    >
                                        <span className="icon">
                                            <FontAwesomeIcon icon={"plus"} />
                                        </span>{" "}
                                        Add a product
                                    </OutboundLink>
                                </div>
                                <hr />
                                <h1 className="title is-6">Calendar setup</h1>
                                <h3 className="subtitle is-7">
                                    Here's your timezone adjusted calendar
                                    files.
                                </h3>
                                <button
                                    className="button is-rounded is-small"
                                    onClick={this.getICalFiles}
                                >
                                    <span className="icon">
                                        <FontAwesomeIcon icon="calendar-check" />
                                    </span>{" "}
                                    iCal event
                                </button>
                                &nbsp;
                                <OutboundLink
                                    className="button is-rounded is-small"
                                    to={this.getGCalUrl()}
                                >
                                    <span className="icon">
                                        <FontAwesomeIcon icon="calendar-check" />
                                    </span>{" "}
                                    Google Calendar event
                                </OutboundLink>
                                <hr />
                                <h1 className="title is-6">
                                    Livestreaming setup
                                </h1>
                                <h3 className="subtitle is-7">
                                    Here's how to setup your livestreaming
                                    experience.
                                </h3>
                                <OutboundLink
                                    className="button is-rounded is-small"
                                    to={"/apps/shipstreams/"}
                                >
                                    <span className="icon">
                                        <FontAwesomeIcon icon={"ship"} />
                                    </span>{" "}
                                    Set up livestreaming
                                </OutboundLink>
                                <hr />
                                <h1 className="title is-6">Tweet material</h1>
                                <h3 className="subtitle is-7">
                                    Here's a little bit of tweet material to
                                    spread the word of your attendance!
                                </h3>
                                {this.renderTweetButton()}
                                <hr />
                                <h1 className="title is-6">
                                    Details from the organizer
                                </h1>
                                <h3 className="subtitle is-7">
                                    Here's all you need to know about the event.
                                </h3>
                                <button
                                    className="button is-text is-small"
                                    onClick={e =>
                                        this.setState({
                                            detailsOpen: !this.state.detailsOpen
                                        })
                                    }
                                >
                                    <span className="icon">
                                        <FontAwesomeIcon icon="eye" />
                                    </span>{" "}
                                    Toggle details
                                </button>
                                {this.state.detailsOpen && (
                                    <div className="content">
                                        <Markdown body={item.details} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Page>
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
