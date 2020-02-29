import { GoogleCalendar, ICalendar } from "~/vendor/datebook";
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OutboundLink from "~/components/OutboundLink";
import SingleItem from "~/containers/SingleItem";
import EventsPageLayout from "../../layouts/EventsPage";
import { Link, Router } from "~/routes";
import { requireAuthed } from "~/lib/auth";
import { loadingClass } from "~/lib/utils/random";
import { leaveEvent } from "~/lib/events";

class LeaveEventButton extends Component {
    state = {
        deleted: false,
        deleting: false,
        failed: false
    };

    onClick = async () => {
        this.setState({
            deleting: true,
            failed: false
        });

        try {
            await leaveEvent(this.props.event.slug);
            this.setState({
                deleted: true,
                deleting: false,
                failed: false
            });
            // redirect?
            Router.pushRoute("events");
        } catch (e) {
            this.setState({
                deleting: false,
                failed: true
            });
        }
    };

    render() {
        return (
            <>
                <button
                    onClick={this.onClick}
                    className={loadingClass(
                        "btn btn-danger btn-small",
                        this.state.deleting
                    )}
                >
                    Leave "{this.props.event.title}"
                </button>
                {this.state.failed && (
                    <p className="help has-text-danger mt-5">
                        This didn't work. Try again later.
                    </p>
                )}
            </>
        );
    }
}

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

                    <Link route={"event-page"} params={{ slug: item.slug }}>
                        <a className="btn is-secondary">Go back</a>
                    </Link>
                </div>
                <div className="card">
                    <div className="card-content">
                        <h4>Logging setup</h4>
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
                        <h4>Team & product setup</h4>
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
                        <hr />
                        <h4>Leave event</h4>
                        <p>
                            If you no longer wish to attend the following event,
                            click the button below. Your registration will be
                            removed and the organizer will no longer have access
                            to your details.
                        </p>
                        <div className="h-list flex center spaced v-center mt-5">
                            <div>
                                <LeaveEventButton event={item} />
                            </div>
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

export default requireAuthed(EventAttendeePanelContainer);
