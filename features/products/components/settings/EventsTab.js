import {
    addProductToEvent,
    getEventsForProduct,
    getEventsForUser,
    removeProductFromEvent
} from "../../../../lib/events";
import { Link } from "~/routes";
import React from "react";
import Spinner from "~/components/Spinner";
import { hasEnded } from "../../../../lib/utils/events";
import { imageUrl } from "../../../../lib/utils/img";

class EventsTab extends React.Component {
    state = {
        eventUpdating: null,
        loading: false,
        joinable: [],
        joined: [],
        failed: false
    };

    componentDidMount() {
        this.fetchEvents();
    }

    fetchEvents = async () => {
        this.setState({ loading: true, failed: false });
        try {
            // get joinable events
            let joinable = await getEventsForUser(this.props.product.user);
            // get joined events
            const joined = await getEventsForProduct(this.props.product.slug);
            // filter joinable
            joinable = joinable.filter(event => !hasEnded(event));
            joinable = joinable.filter(
                event => !joined.find(e => event.slug === e.slug)
            );
            this.setState({
                loading: false,
                failed: false,
                joinable,
                joined
            });
        } catch (e) {
            this.setState({
                loading: false,
                failed: true
            });
        }
    };

    joinEvent = async event => {
        this.setState({ eventUpdating: event.slug });
        try {
            await addProductToEvent(event.slug, this.props.product.slug);
            this.setState({
                joinable: this.state.joinable.filter(
                    e => e.slug !== event.slug
                ),
                joined: [...this.state.joined, event]
            });

            this.setState({ eventUpdating: null });
        } catch (e) {
            this.setState({ eventUpdating: null });
        }
    };

    leaveEvent = async event => {
        this.setState({ eventUpdating: event.slug });
        try {
            await removeProductFromEvent(event.slug, this.props.product.slug);
            this.setState({
                joined: this.state.joined.filter(e => e.slug !== event.slug),
                joinable: [...this.state.joinable, event]
            });

            this.setState({ eventUpdating: null });
        } catch (e) {
            this.setState({ eventUpdating: null });
        }
    };

    renderEventsJoined = () => {
        const { joined, eventUpdating } = this.state;
        if (joined.length === 0) return null;

        return (
            <div>
                <h3 className="title is-5">Events this product is in</h3>
                {joined.map(event => (
                    <div className="level">
                        <div className="level-left">
                            {this.renderEvent(event)}
                        </div>
                        <div className="level-right">
                            <button
                                onClick={e => this.leaveEvent(event)}
                                className={
                                    "button is-danger is-rounded" +
                                    (eventUpdating === event.slug
                                        ? " is-loading"
                                        : "")
                                }
                            >
                                Remove product
                            </button>
                        </div>
                    </div>
                ))}
                <hr />
            </div>
        );
    };

    renderEvent = event => {
        return (
            <div className="media">
                <div className="media-left">
                    <figure className="image is-square is-32x32">
                        <img src={imageUrl(event.icon, 32)} />
                    </figure>
                </div>
                <div className="media-content">
                    <h3 className="title is-6">{event.title}</h3>
                    <h3 className="subtitle is-7">{event.description}</h3>
                </div>
            </div>
        );
    };

    renderEventsJoinable = () => {
        const { joinable, eventUpdating } = this.state;
        if (joinable.length === 0)
            return (
                <div>
                    No events to add this product to.{" "}
                    <Link route="events">
                        <a>All events &raquo;</a>
                    </Link>
                </div>
            );

        return (
            <div>
                <h3 className="title is-5">Events available</h3>
                {joinable.map(event => (
                    <div className="level">
                        <div className="level-left">
                            {this.renderEvent(event)}
                        </div>
                        <div className="level-right">
                            <button
                                onClick={e => this.joinEvent(event)}
                                className={
                                    "button is-primary is-rounded" +
                                    (eventUpdating === event.slug
                                        ? " is-loading"
                                        : "")
                                }
                            >
                                Add product
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    render() {
        const { loading, joinable, joined, failed } = this.state;
        const { isOwner } = this.props;

        if (!isOwner)
            return (
                <div className="alert is-warning">
                    <div className="alert-body">
                        <strong>
                            Only the owner of this product can enroll it in an
                            event.
                        </strong>{" "}
                        <br /> Your entry will count as one entry for the whole
                        team.
                    </div>
                </div>
            );

        if (loading) return <Spinner small text="Loading events..." />;
        if (failed)
            return (
                <button onClick={this.fetchEvents}>
                    Failed to load. Click to retry.
                </button>
            );
        return (
            <div>
                {this.renderEventsJoined()}
                {this.renderEventsJoinable()}
            </div>
        );
    }
}

export default EventsTab;
