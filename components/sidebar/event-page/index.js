import React from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "~/ducks/user";
import SmallFooter from "~/components/sidebar/components/SmallFooter";
import AdCard from "~/components/sidebar/components/AdCard";
import AlreadyJoinedBar from "~/features/events/components/AlreadyJoinedBar";
import "./index.scss";

const EventCard = ({ event }) => {
    return (
        <div className="EventCard sidebar-item">
            <h3>Registration details</h3>
            <div className="card">
                <div className="card-content">
                    <AlreadyJoinedBar event={event} />
                </div>
            </div>
        </div>
    );
};

const EventPageSidebar = ({ isLoggedIn, me, event }) => {
    if (!event) return null;

    return (
        <div className="Sidebar">
            <EventCard event={event} />
            <AdCard />
            <SmallFooter />
        </div>
    );
};

export async function prefetchData() {
    try {
        return {};
    } catch (e) {
        return {
            data: {
                failed: true
            }
        };
    }
}

export default connect(mapStateToProps)(EventPageSidebar);
