import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "~/ducks/user";
import { getWorldStats } from "~/lib/stats";
import UserRow from "~/features/users/components/UserRow";
import { getLiveEvents, getUpcomingEvents } from "~/lib/events";
import EventMedia from "~/features/events/components/EventMedia";
import SmallFooter from "~/components/sidebar/components/SmallFooter";
import Ad from "~/components/Ad";
import sample from "lodash/sample";
import { isServer } from "~/config";

import "./index.scss";
import UserActivityGraph from "../../../features/stats/components/UserActivityGraph";

const quotes = [
    { text: "It's mango time.", from: "Fajar Siddiq" },
    {
        text: "The only people who never fail are those who never try.",
        from: "Ilka Chase"
    },
    {
        text: "Failure is just another way to learn how to do something right.",
        from: "Marian Wright Edelman"
    },
    {
        text: "I failed my way to success.",
        from: "Thomas Edison"
    },
    {
        text: "Every failure brings with it the seed of an equivalent success.",
        from: "Napoleon Hill"
    },
    {
        text: "Only those who dare to fail greatly can ever achieve greatly.",
        from: "John F. Kennedy"
    },
    {
        text:
            "It is hard to fail, but it is worse never to have tried to succeed.",
        from: "Theodore Roosevelt"
    },
    {
        text: "Imagination is more important than knowledge.",
        from: "Albert Einstein"
    },
    {
        text:
            "You cannot depend on your eyes when your imagination is out of focus.",
        from: "Mark Twain"
    },
    {
        text: "Commitment leads to action. Action brings your dream closer.",
        from: "Marcia Wieder"
    },
    {
        text: "I never think of the future",
        from: "it comes soon enough."
    },
    {
        text: "The mind that is anxious about future events is miserable.",
        from: "Seneca"
    },
    {
        text:
            "The art of leadership is saying no, not yes. It is very easy to say yes.",
        from: "Tony Blair"
    },
    {
        text: "A leader is a dealer in hope.",
        from: "Napoleon Bonaparte"
    },
    {
        text:
            "While a good leader sustains momentum, a great leader increases it.",
        from: "John C. Maxwell"
    },
    {
        text:
            "To do great things is difficult; but to command great things is more difficult.",
        from: "Friedrich Nietzsche"
    },
    {
        text: "Leadership does not always wear the harness of compromise.",
        from: "Woodrow Wilson"
    },
    {
        text: "Business opportunities are like buses",
        from: "there's always another one coming."
    },
    {
        text:
            "I avoid looking forward or backward, and try to keep looking upward.",
        from: "Charlotte Bronte"
    },
    {
        text: "Every artist was first an amateur.",
        from: "Ralph Waldo Emerson"
    },
    {
        text: "We can do anything we want to do if we stick to it long enough.",
        from: "Helen Keller"
    },
    {
        text: "Insist on yourself. Never imitate.",
        from: "Ralph Waldo Emerson"
    },
    {
        text: "Who looks outside, dreams. Who looks inside, awakes.",
        from: "Carl Jung"
    },
    {
        text: "The only journey is the one within.",
        from: "Rainer Maria Rilke"
    },
    {
        text: "Follow your honest convictions, and stay strong.",
        from: "William Thackeray"
    },
    {
        text: "Happiness is not a goal, but a by-product.",
        from: "Eleanor Roosevelt"
    },
    {
        text:
            "Happiness is not a state to arrive at, but a manner of traveling.",
        from: "Margaret Lee Runbeck"
    },
    {
        text: "Purpose is what gives life a meaning.",
        from: "C. H. Parkhurst"
    },
    {
        text: "In all things that you do, consider the end.",
        from: "Solon"
    },
    {
        text:
            "Life can be pulled by goals just as surely as it can be pushed by drives.",
        from: "Viktor Frankl"
    },
    {
        text: "The virtue lies in the struggle, not in the prize.",
        from: "Richard Monckton Milnes"
    },
    {
        text: "To reach a port, we must sail",
        from: "sail, not tie at anchor"
    },
    {
        text: "Success is the child of audacity.",
        from: "Benjamin Disraeli"
    },
    {
        text: "The secret of success is to know something nobody else knows.",
        from: "Aristotle Onassis"
    },
    {
        text: "The surest way not to fail is to determine to succeed.",
        from: "Richard Brinsley Sheridan"
    }
];

function getQuote() {
    return sample(quotes).text;
}

const TopStreaksCard = ({ topUsers }) => {
    return (
        <div className="TopStreaksCard sidebar-item">
            <h3>Top Streaks</h3>
            <h4 className="subtitle has-text-grey">
                Every week we rank the best makers.
            </h4>
            <div className="card">
                <div className="card-content">
                    <UserRow users={topUsers} />
                </div>
            </div>
        </div>
    );
};

const UpcomingEventsCard = ({ upcomingEvents }) => {
    return (
        <div className="UpcomingEventsCard sidebar-item">
            <h3>Upcoming events</h3>
            <h4 className="subtitle has-text-grey">
                Attend meetups and make new friends!
            </h4>
            <div className="card">
                <div className="card-content">
                    {upcomingEvents.map(event => (
                        <span style={{ marginBottom: 5, width: "100%" }}>
                            <EventMedia small event={event} />
                        </span>
                    ))}
                    {upcomingEvents.length === 0 && (
                        <button className="btn-light">Host an event</button>
                    )}
                </div>
            </div>
        </div>
    );
};

const AdCard = () => {
    return (
        <div className="AdCard sidebar-item">
            <h3>Indie ad</h3>
            <h4 className="subtitle has-text-grey">
                <a>Put your product here!</a>
            </h4>
            <div className="card">
                <div className="card-content">
                    <Ad />
                </div>
            </div>
        </div>
    );
};

const UserCard = ({ me }) => {
    return (
        <div className="UserCard sidebar-item">
            <h3>Hi, {me.first_name || me.username}</h3>
            {!isServer && (
                <h4 className="subtitle has-text-grey">"{getQuote()}"</h4>
            )}
            <div className="card">
                <div className="card-content">
                    <div>
                        <UserActivityGraph user={me} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ExploreSidebar = ({ isLoggedIn, me, data }) => {
    if (!data || data.failed) return null;

    return (
        <div className="Sidebar">
            {isLoggedIn && <UserCard me={me} />}
            <TopStreaksCard topUsers={data.topUsers} />
            <UpcomingEventsCard upcomingEvents={data.upcomingEvents} />
            <AdCard />
            <SmallFooter />
        </div>
    );
};

export async function prefetchData() {
    try {
        let worldStats = await getWorldStats();
        let upcomingEvents = await getUpcomingEvents();
        let topUsers = worldStats.top_users;
        let newUsers = worldStats.new_users;

        return {
            data: {
                topUsers,
                newUsers,
                upcomingEvents
            }
        };
    } catch (e) {
        return {
            data: {
                failed: true
            }
        };
    }
}

export default connect(mapStateToProps)(ExploreSidebar);
