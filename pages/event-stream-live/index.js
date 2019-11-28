import "./index.scss";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import React from "react";
import ReconnectingWebSocket from "reconnecting-websocket/dist/reconnecting-websocket";
import Spinner from "~/components/Spinner";
import styled from "styled-components";
import uniqBy from "lodash/uniqBy";

const Grid = styled.div`
    overflow-y: auto;
    padding: 60px;
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: repeat(
        ${props => props.columns},
        calc(
            (100% - (1px * (${props => props.columns} - 1))) /
                ${props => props.columns}
        )
    );
    grid-template-rows: repeat(
        ${props => props.rows},
        calc(
            (100% - (1px * (${props => props.rows} - 1))) /
                ${props => props.rows}
        )
    );
    grid-gap: 1px;
    background: #0a0a0a;
    justify-content: space-evenly;

    @media screen and (max-width: 768px) {
        & {
            grid-template-columns: repeat(
                1,
                calc((100% - (1px * (1 - 1))) / 1)
            );
            grid-template-rows: auto;
        }
    }
`;

const GridItem = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${props => (props.items > 0 ? "#2f3436" : "#0a0a0a")};

    iframe {
        height: 100%;
        width: 100%;
    }

    .stream-options {
        opacity: 0;
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.8em;
        padding: 0.5em;
    }

    &:hover .stream-options {
        opacity: 1;
        pointer-events: initial;
    }

    .stream-options * {
        cursor: pointer;
    }
`;

const GridNavigation = styled.div`
    padding-left: 60px;
    padding-right: 60px;
    position: fixed;
    top: 0;
    height: 60px;
    display: flex;
    align-items: center;
    color: white;
    width: 100%;
    z-index: 5;

    & .level {
        width: 100%;
    }
`;

class StreamGrid extends React.Component {
    state = {
        loading: true,
        streamers: [],
        failed: false
    };

    async componentDidMount() {
        await this.fetchStreamers();
        this.connect();
    }

    componentWillUnmount() {
        this.disconnect();
    }

    connect = () => {
        this.socket = new ReconnectingWebSocket(
            socketUrl(`/events/${this.props.slug}/stream/`)
        );
        this.socket.onopen = () => {
            console.log(`Makerlog Live: Established connection to event bus.`);
        };
        this.socket.onmessage = this.onWsEvent;
        this.socket.onclose = () => {
            console.log(`Makerlog Live: Closed connection to event bus.`);
        };
    };

    onWsEvent = event => {
        const data = JSON.parse(event.data);
        switch (data.type) {
            case "task.created":
            case "task.updated":
            case "task.sync":
                if (data.batch) break;
                const task = data.payload;
                const isInView =
                    this.state.streamers.filter(u => u.id === task.user.id)
                        .length > 0;
                if (!isInView && task.user.is_live) {
                    this.setState({
                        streamers: uniqBy(
                            [...this.state.streamers, task.user],
                            "id"
                        )
                    });
                } else if (isInView && !task.user.is_live) {
                    this.setState({
                        streamers: this.state.streamers.filter(
                            u => u.id !== task.user.id
                        )
                    });
                }
                break;

            default:
                return;
        }
    };

    disconnect = () => {
        if (this.socket) {
            this.socket.close();
        }
    };

    fetchStreamers = async () => {
        this.setState({ loading: true, failed: false });
        try {
            const streamers = await getLiveParticipants(this.props.slug);
            this.setState({ streamers, loading: false, failed: false });
        } catch (e) {
            this.setState({ loading: false, failed: true });
        }
    };

    getDimensions = () => {
        const len = this.state.streamers.length;

        if (len === 1 || len === 0) return { rows: 1, columns: 1 };
        if (len <= 3) return { rows: 1, columns: len };
        if (len <= 6) return { rows: 2, columns: 3 };
        if (len <= 9) return { rows: 3, columns: 3 };
        if (len <= 12) return { rows: 4, columns: 4 };

        return {
            rows: 3,
            columns: 3
        };
    };

    render() {
        if (this.state.loading)
            return (
                <Grid>
                    <center>
                        <Spinner color={"white"} />
                    </center>
                </Grid>
            );
        if (this.state.loading)
            return (
                <Grid>
                    <button onClick={this.fetchStreamers}>Try again</button>
                </Grid>
            );

        const { rows, columns } = this.getDimensions();

        return (
            <Grid rows={rows} columns={columns}>
                {this.state.streamers.length === 0 && (
                    <GridItem items={this.state.streamers.length}>
                        <h3 is="2" className={"has-text-white"}>
                            Nobody is live right now.
                        </h3>
                        <h4 className={"has-text-white"}>
                            Stay tuned - this page updates live once someone
                            begins streaming!
                        </h4>
                    </GridItem>
                )}
                {this.state.streamers.map(user => (
                    <GridItem>
                        <iframe
                            title={user.shipstreams_handle}
                            src={`https://player.twitch.tv/?channel=${user.shipstreams_handle}`}
                        />
                    </GridItem>
                ))}
            </Grid>
        );
    }
}

const EventStreamersPage = props => (
    <Page
        className="EventStreamersPage"
        footer={false}
        contained={false}
        translucent
        nav={false}
    >
        <div className="LiveLogo">
            <a onClick={e => window.history.back()}>
                <FontAwesomeIcon icon={"chevron-left"} /> &nbsp;
                <FontAwesomeIcon icon={"check-circle"} /> Live
            </a>
        </div>
        <StreamGrid slug={props.match.params.slug} />
    </Page>
);

export default EventStreamersPage;
