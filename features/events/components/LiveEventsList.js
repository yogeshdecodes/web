import React, { Component } from "react";

import EventMedia from "./EventMedia/index";
import Spinner from "../../../components/Spinner";
import { getLiveEvents } from "../../../lib/events";

class LiveEventsList extends Component {
    state = {
        loading: true,
        events: [],
        failed: false
    };

    componentDidMount() {
        this.fetch();
    }

    fetch = async () => {
        try {
            this.setState({ loading: true, failed: false });
            const events = await getLiveEvents();
            this.setState({
                loading: false,
                events,
                failed: false
            });
        } catch (e) {
            this.setState({ loading: false, failed: false });
        }
    };

    render() {
        const { loading, events, failed } = this.state;

        if (failed)
            return (
                <button className="button" onClick={this.fetch}>
                    Failed to load. Click to retry.
                </button>
            );
        if (loading) return <Spinner text="Loading events..." />;

        if (!loading && !failed && events.length === 0) return null;

        return (
            <div className="LiveEventsList">
                <h3 className="has-text-grey mt0">Live now</h3>
                {events.map(event => (
                    <EventMedia event={event} />
                ))}
            </div>
        );
    }
}

export default LiveEventsList;
