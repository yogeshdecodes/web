import React from "react";
import {getBroadcasts} from "../lib/broadcasts";
import OutboundLink from "./OutboundLink";

export const Broadcast = ({ broadcast }) => (
    <div className={"Broadcast flex"}>
        <div>
            <h2>{broadcast.title}</h2>
            <p>{broadcast.message}</p>
            {broadcast.url && (
                <OutboundLink className={"btn-small green"} to={broadcast.url}>
                    Take a look &raquo;
                </OutboundLink>
            )}
        </div>
        {broadcast.attachment && (
            <div>
                <img
                    alt={broadcast.title}
                    src={broadcast.attachment}
                    width="75"
                />
            </div>
        )}
    </div>
);

class BroadcastList extends React.Component {
    state = {
        ready: false,
        broadcasts: [],
        failed: false
    };

    componentDidMount() {
        this.getBroadcasts();
    }

    getBroadcasts = async () => {
        try {
            const broadcasts = await getBroadcasts();
            this.setState({ ready: true, failed: false, broadcasts });
        } catch (e) {
            this.setState({ ready: false, failed: true });
        }
    };

    render() {
        if (this.state.broadcasts.length && !this.state.failed) {
            return (
                <>
                    <div
                        className={"card"}
                        style={{ borderTop: "3px solid #00b77a" }}
                    >
                        <div className={"card-content"}>
                            <div className={"BroadcastList"}>
                                {this.state.broadcasts.map(broadcast => (
                                    <Broadcast broadcast={broadcast} />
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            );
        } else {
            return null;
        }
    }
}

export default BroadcastList;
