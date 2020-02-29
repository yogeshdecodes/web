import React, { Component } from "react";
import { getLiveParticipants, getTopParticipants } from "../../../lib/events";

import Emoji from "~/components/Emoji";
import Spinner from "../../../components/Spinner";
import { UserRow } from "../../users";
import { isOcurring } from "../../../lib/utils/events";

class AttendeesCard extends Component {
    state = {
        loading: true,
        attendees: [],
        liveNow: [],
        failed: false
    };

    componentDidMount() {
        this.fetchAttendees();
        if (isOcurring(this.props.event)) {
            this.fetchLiveNow();
        }
    }

    fetchAttendees = async () => {
        try {
            this.setState({ loading: true, failed: false });
            const attendees = await getTopParticipants(this.props.event.slug);
            this.setState({
                loading: false,
                failed: false,
                attendees
            });
        } catch (e) {
            this.setState({ loading: false, failed: true });
        }
    };

    fetchLiveNow = async () => {
        try {
            const liveNow = await getLiveParticipants(this.props.event.slug);
            this.setState({
                liveNow
            });
        } catch (e) {}
    };

    render() {
        const { loading, failed, attendees, liveNow } = this.state;

        if (failed)
            return (
                <center>
                    <button
                        className="button is-rounded"
                        onClick={this.fetchAttendees}
                    >
                        Failed to load. Retry
                    </button>
                </center>
            );
        if (loading)
            return (
                <div className="AttendeesCard card">
                    <div className="card-content">
                        <center>
                            <Spinner small />
                        </center>
                    </div>
                </div>
            );

        if (attendees.length === 0) return null;

        return (
            <div className="AttendeesCard card">
                <div className="card-content">
                    {liveNow.length > 0 && (
                        <div>
                            <p className="heading">
                                <Emoji emoji="🔴" /> Live now
                            </p>
                            <UserRow withMargin users={liveNow} />
                        </div>
                    )}
                    <div>
                        <p className="heading">
                            <Emoji emoji="✅" /> Top attendees
                        </p>
                        <UserRow withMargin={false} users={attendees} />
                    </div>
                </div>
            </div>
        );
    }
}

export default AttendeesCard;
