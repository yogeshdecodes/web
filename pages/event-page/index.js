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

function getCss(event) {
    if (event.header) {
        return {
            background: `url('${event.header}')`,
            backgroundSize: "cover",
            backgroundPosition: "center center"
        };
    } else {
        return {};
    }
}

const EventStream = ({ slug }) => (
    <WeeklyStream
        tasksIndexUrl={`/events/${slug}/stream/`}
        milestonesIndexUrl={`/events/${slug}/stream/milestones/`}
    />
);

const AlreadyJoinedBar = ({ item }) => {
    return (
        <div class="already-joined">
            {item.participant_count > 0 && (
                <div>
                    <EventFaces size={32} slug={item.slug} />
                </div>
            )}
            {!isOcurring(item) ? (
                <div className="joined-text">
                    {item.user_joined ? (
                        <strong>You're registered</strong>
                    ) : (
                        <strong>
                            {item.participant_count} makers joined this event
                        </strong>
                    )}
                    <br />
                    {hasEnded(item) ? (
                        <>Event has ended</>
                    ) : (
                        <>
                            Registration closes{" "}
                            <DueCountdown date={item.closes_at} />
                        </>
                    )}
                </div>
            ) : (
                <div className="joined-text">
                    {item.user_joined ? (
                        <strong>You're registered</strong>
                    ) : (
                        <strong>{item.participant_count} shipping now</strong>
                    )}
                    <br />
                    {item.task_count} tasks done
                </div>
            )}
        </div>
    );
};

const JoinOrWatchButton = ({ item, onClick }) => {
    if (hasEnded(item)) return null;

    if (item.user_joined)
        return (
            <Link route={"event-attendee-panel"} params={{ slug: item.slug }}>
                <a className="button is-medium is-primary is-rounded has-text-weight-bold">
                    <span className="icon">
                        <FontAwesomeIcon icon="calendar-check" />
                    </span>
                    Attendee panel
                </a>
            </Link>
        );

    return isOcurring(item) ? (
        <Link route={"event-stream-live"} params={{ slug: item.slug }}>
            <a className="button is-medium is-primary is-rounded has-text-weight-bold">
                <span className="icon">
                    <FontAwesomeIcon icon="check-circle" />
                </span>
                Watch LIVE
            </a>
        </Link>
    ) : !hasClosed(item) && !item.user_joined ? (
        <button
            class="button is-medium is-primary is-rounded has-text-weight-bold"
            onClick={onClick}
        >
            <span className="icon">
                <FontAwesomeIcon icon="check-circle" />
            </span>
            Join this event
        </button>
    ) : null;
};

const HackathonPage = ({ item, toggleJoin }) => (
    <>
        <section class="grid-event">
            <div style={getCss(item)} className="event-hero">
                <div className="event-side">
                    <h1>{item.title}</h1>
                    <p>{item.description}</p>
                    <JoinOrWatchButton onClick={toggleJoin} item={item} />
                    <AlreadyJoinedBar item={item} />
                    <div class="event-overlay" />
                </div>
            </div>
            <div className="event-panel">
                {isOcurring(item) || hasEnded(item) ? (
                    <EventStream slug={item.slug} />
                ) : (
                    <div className="markdown content">
                        <Markdown body={item.details} />
                    </div>
                )}
            </div>
        </section>
    </>
);

const MeetupPage = ({ item, toggleJoin }) => (
    <>
        <header style={getCss(item)} className="event-header event-hero">
            <div class="container-event-header">
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                <div class="already-joined">
                    <JoinOrWatchButton onClick={toggleJoin} item={item} />
                    <AlreadyJoinedBar item={item} />
                </div>
                <div class="event-overlay" />
            </div>
        </header>
        <br />
        <div className="container">
            {isOcurring(item) || hasEnded(item) ? (
                <div className="columns">
                    <div className="column">
                        <EventStream slug={item.slug} />
                    </div>

                    <div className="column is-one-third">
                        <Sidebar event={item} />
                    </div>
                </div>
            ) : (
                <div className="columns">
                    <div className="column">
                        <Markdown body={item.details} />
                    </div>

                    <div className="column is-one-third">
                        <Sidebar />
                    </div>
                </div>
            )}
        </div>
    </>
);

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
                className="button is-info is-medium is-rounded"
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
                <h3 className="title is-3">
                    <Emoji emoji="🎉" /> Yay! You're all set!
                </h3>
                <h3 className="subtitle is-5">
                    You've just joined {event.title}. Tweet it to meet other
                    attendees!
                </h3>
                {this.renderTweetButton()}
                <hr />
                <h3 className="subtitle is-5">
                    Now it's time to grab the calendar events, set up things
                    like livestreaming, and get ready.
                </h3>
                <Link
                    route={"event-attendee-panel"}
                    params={{ slug: item.slug }}
                    to={`/events/${event.slug}/attendance/`}
                >
                    <a className="button is-primary is-medium is-rounded">
                        <span className="icon">
                            <FontAwesomeIcon icon={"check-circle"} />
                        </span>{" "}
                        Set up your attendance
                    </a>
                </Link>
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
            <div className={"EventPage " + item.type.toLowerCase()}>
                <JoinModal
                    event={item}
                    open={this.state.joinActive}
                    toggle={this.toggleJoin}
                />
                {item.type === "HACKATHON" && false ? (
                    <HackathonPage toggleJoin={this.toggleJoin} item={item} />
                ) : (
                    <MeetupPage toggleJoin={this.toggleJoin} item={item} />
                )}
            </div>
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

export default EventPageContainer;
