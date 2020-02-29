import React from "react";
import { getBroadcasts } from "../lib/broadcasts";
import OutboundLink from "./OutboundLink";

export const Broadcast = ({ broadcast }) => (
    <div className={"Broadcast std-media flex flex-gap"}>
        <div>
            <h4>{broadcast.title}</h4>
            <small>
                <p>{broadcast.message}</p>
                {broadcast.url && (
                    <OutboundLink to={broadcast.url}>
                        Learn more &raquo;
                    </OutboundLink>
                )}
            </small>
        </div>
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
                <div className="sidebar-item">
                    <h3>New on Makerlog</h3>
                    <div className={"card"}>
                        <div className={"card-content"}>
                            <div
                                className={"BroadcastList"}
                                style={{ width: "100%" }}
                            >
                                {this.state.broadcasts.map(broadcast => (
                                    <Broadcast broadcast={broadcast} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default BroadcastList;
