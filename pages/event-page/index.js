import "./index.scss";

import { hasClosed, hasEnded, isOcurring } from "~/lib/utils/events";

import DueCountdown from "~/components/DueCountdown";
import Emoji from "~/components/Emoji";
import EventFaces from "~/features/events/components/EventFaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Markdown from "~/components/Markdown";
import Modal from "~/components/Modal";
import OutboundLink from "~/components/OutboundLink";
import React from "react";
import Sidebar from "~/components/sidebar/components/HomeSidebar";
import SingleItem from "~/containers/SingleItem";
import Spinner from "~/components/Spinner";
import { WeeklyStream } from "~/features/stream";
import { joinEvent } from "~/lib/events";
import { Link } from "~/routes";
import { Router } from "~/routes";
import { mapStateToProps } from "~/ducks/user";
import { connect } from "react-redux";
import EventsPageLayout from "../../layouts/EventsPage";
import { requireAuthed } from "~/lib/auth";

const EventStream = ({ slug }) => (
    <WeeklyStream
        tasksIndexUrl={`/events/${slug}/stream/`}
        milestonesIndexUrl={`/events/${slug}/stream/milestones/`}
    />
);

const JoinOrWatchButton = ({ item, onClick }) => {
    if (hasEnded(item)) return null;

    if (item.user_joined)
        return (
            <Link route={"event-attendee-panel"} params={{ slug: item.slug }}>
                <a className="btn is-secondary">Attendee panel</a>
            </Link>
        );

    return isOcurring(item) ? (
        <Link route={"event-stream-live"} params={{ slug: item.slug }}>
            <a className="btn is-secondary">Watch LIVE</a>
        </Link>
    ) : !hasClosed(item) && !item.user_joined ? (
        <button class="btn is-secondary" onClick={onClick}>
            Join this event
        </button>
    ) : null;
};

class JoinModal extends React.Component {
    state = {
        loading: true,
        failed: false,
        done: false
    };

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.open === false && this.props.open === true) {
            this.join();
        }
    }

    exit = () => {
        this.props.toggle();
    };

    join = async () => {
        try {
            this.setState({
                loading: true
            });
            await joinEvent(this.props.event.slug);
            this.setState({
                loading: false,
                failed: false
            });
        } catch (e) {
            this.setState({
                loading: false,
                failed: true
            });
        }
    };

    renderTweetButton = () => {
        const text = `I'm attending ${this.props.event.title}! 🎉 \n Join me on Makerlog Events 👇 \n #TogetherWeMake`;
        const url = `${process.env.REACT_APP_BASE_URL}/events/${this.props.event.slug}`;

        return (
            <OutboundLink
                href={`https://twitter.com/share?text=${encodeURIComponent(
                    text
                )}&url=${url}`}
                className="btn btn-twitter btn-medium"
                target="_blank"
            >
                <span className="icon">
                    <FontAwesomeIcon icon={["fab", "twitter"]} />
                </span>{" "}
                Tweet #TogetherWeMake
            </OutboundLink>
        );
    };

    renderContent = () => {
        const { me, isLoggedIn, event } = this.props;
        const { loading, failed } = this.state;

        if (!isLoggedIn) {
            Router.pushRoute(`/begin?next=/events/${event.slug}/`);
        }

        if (loading) return <Spinner text="Joining this event..." />;

        if (failed)
            return (
                <h3 className="subtitle is-5">
                    Oops! Something went wrong.{" "}
                    <button onClick={this.join}>Try again</button>
                </h3>
            );

        return (
            <div>
                <h1>
                    <Emoji emoji="🎉" /> Yay! You're all set!
                </h1>
                <p className="mb-5">
                    You've just joined {event.title}. Tweet it to meet other
                    attendees!
                </p>
                <br />
                <div>{this.renderTweetButton()}</div>
                <div className="mt-5">
                    <Link
                        route={"event-attendee-panel"}
                        params={{ slug: event.slug }}
                        to={`/events/${event.slug}/attendance/`}
                    >
                        <a className="btn btn-light btn-medium">
                            Set up your attendance
                        </a>
                    </Link>
                </div>
            </div>
        );
    };

    render() {
        const { open } = this.props;

        return (
            <Modal
                open={open}
                background={"transparent"}
                flexDirection={"column"}
                modalStyles={{
                    overflowY: "hidden"
                }}
                percentWidth={"50"}
                onClose={this.exit}
            >
                <div className="JoinModal card">
                    <div className="card-content">
                        <center>{this.renderContent()}</center>
                    </div>
                </div>
            </Modal>
        );
    }
}

JoinModal = connect(mapStateToProps)(JoinModal);

class EventPage extends React.Component {
    state = {
        joinActive: false
    };

    toggleJoin = () => {
        this.setState({
            joinActive: !this.state.joinActive
        });
    };

    render() {
        const { item } = this.props;

        return (
            <EventsPageLayout event={item}>
                <JoinModal
                    event={item}
                    open={this.state.joinActive}
                    toggle={this.toggleJoin}
                />
                <div className={"flex col-right v-center mbGap"}>
                    <div>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                    </div>
                    <div>
                        <JoinOrWatchButton
                            onClick={this.toggleJoin}
                            item={item}
                        />
                    </div>
                </div>

                {isOcurring(item) || hasEnded(item) ? (
                    <EventStream slug={item.slug} />
                ) : (
                    <div className="card">
                        <div className="card-content">
                            <Markdown body={item.details} />
                        </div>
                    </div>
                )}
            </EventsPageLayout>
        );
    }
}

const EventPageContainer = props => (
    <SingleItem url={`/events/${props.slug}/`} component={EventPage} />
);

EventPageContainer.getInitialProps = async ({ query }) => {
    return {
        slug: query.slug ? query.slug : null
    };
};

export default requireAuthed(EventPageContainer);
