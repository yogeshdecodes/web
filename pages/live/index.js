import React from "react";
import Page from "~/layouts/Page";
import styled from "styled-components";
import { fetchStreamers } from "~/lib/integrations/shipstreams";
import Spinner from "~/components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "~/routes";
import OutboundLink from "~/components/OutboundLink";
import { socketUrl } from "~/lib/utils/random";
import uniqBy from "lodash/uniqBy";
import ReconnectingWebSocket from "reconnecting-websocket/dist/reconnecting-websocket";
import "./index.scss";

const Grid = styled.div`
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
`;

const GridItem = styled.div`
    background: ${props => (props.items > 0 ? "#2f3436" : "#0a0a0a")};
`;

class LivePage extends React.Component {
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
        this.socket = new ReconnectingWebSocket(socketUrl("/explore/stream/"));
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
            const streamers = await fetchStreamers();
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
                    <div className={"center"}>
                        <Spinner color={"white"} />
                    </div>
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
            <Grid className={"GridLive"} rows={rows} columns={columns}>
                {this.state.streamers.length === 0 && (
                    <GridItem items={this.state.streamers.length}>
                        <h1>Nobody is live right now.</h1>
                        <p>
                            Stay tuned - this page updates live once someone
                            begins streaming!
                        </p>
                    </GridItem>
                )}
                {this.state.streamers.map(user => (
                    <GridItem>
                        <iframe
                            title={user.shipstreams_handle}
                            src={`https://player.twitch.tv/?channel=${user.shipstreams_handle}`}
                        ></iframe>
                    </GridItem>
                ))}
            </Grid>
        );
    }
}

const StreamersPage = props => (
    <Page footer={false} contained={false} translucent nav={false}>
        <nav className={"GridNavigation"}>
            <div className={"flex col-right"}>
                <div>
                    {!props.isEmbed && (
                        <Link route={"index"}>
                            <FontAwesomeIcon icon={"chevron-left"} />
                        </Link>
                    )}
                    <Link route={"index"}>
                        <a>
                            <FontAwesomeIcon icon={"check-circle"} /> Live
                        </a>
                    </Link>
                </div>
                <div>
                    <OutboundLink
                        className="has-text-white"
                        to={"https://shipstreams.com"}
                    >
                        <svg
                            width="35"
                            height="35"
                            viewBox="0 0 71 64"
                            xmlns="http://www.w3.org/2000/svg"
                            id="shipstreams"
                        >
                            <g fill="white" fillRule="evenodd">
                                <path
                                    d="M47.8135465,31.6156395 C47.925,32.9118023 48.1520349,34.7817442 48.1520349,34.7817442 C48.1520349,34.7817442 52.094186,35.3307558 52.9775581,35.1532558 C52.9775581,31.7848837 50.8888372,31.1120349 47.8135465,31.6156395 Z"
                                    id="Path"
                                />
                                <path
                                    d="M35.3926744,44.4740698 L36.4040116,52.0776744 L38.6743605,51.7515698 C42.5587209,45.9229651 39.2811628,44.4740698 35.3926744,44.4740698 Z"
                                    id="Path"
                                />
                                <path
                                    d="M48.7381977,45.6587791 L49.0931977,49.8114535 L52.626686,48.9280814 C53.5059302,46.8063372 53.3160465,44.2098837 48.7381977,45.6587791 Z"
                                    id="Path"
                                />
                                <path
                                    d="M35.5,-2.93305148e-15 C21.2161213,-0.00896912674 8.35255541,8.6419095 2.97363332,21.8743117 C-2.40528876,35.1067139 0.774230638,50.2790468 11.0132558,60.2385465 C15.9667442,63.2147674 20.7675,64.3664535 26.5961047,64.2715116 C32.2761047,64.1806977 41.9725581,60.6018023 48.1768023,59.8133721 C52.3707558,59.2808721 57.3985465,59.7101744 60.2220349,60.040407 C70.3480679,50.0306367 73.4209395,34.8939165 67.9997624,21.727942 C62.5785852,8.56196749 49.7383827,-0.0224391277 35.5,-2.93305148e-15 Z M55.0827907,49.9848256 C53.1385465,54.046686 49.4069186,53.2252326 48.4987791,56.5647093 C48.4987791,56.5647093 43.665,57.3201163 40.5236628,58.1044186 C37.5350581,58.8556977 34.3524419,60.0693023 31.2688953,60.7586628 C28.1853488,61.4480233 23.9996512,61.2746512 23.9996512,61.2746512 C18.5260465,58.0961628 21.8820349,54.046686 17.1101744,53.695814 C14.6334302,53.518314 14.464186,52.1065698 13.3950581,50.5173256 C11.0999419,46.9838372 3.4880814,46.4554651 19.2236628,48.3955814 L22.9387791,48.7505814 C23.4712791,55.2850581 34.5753488,52.3336047 34.5753488,52.3336047 L33.5309884,44.7176163 C29.8158721,45.2459884 26.8231395,46.4554651 23.4712791,48.2222093 C31.24,43.9828488 24.8830233,31.0913953 19.5827907,26.6745349 C22.232907,28.2637791 28.2059884,29.7126744 31.7394767,30.5960465 L31.326686,26.5878488 C29.5599419,26.2328488 25.7787791,27.2070349 23.4836628,27.557907 C31.0047093,23.9336047 23.3061628,19.966686 22.0677907,18.0224419 L30.8189535,20.1400581 L30.7240116,17.1390698 L31.5784884,20.3505814 C39.0087209,21.9398256 43.264593,25.0852907 35.8467442,31.2688953 C43.619593,32.1522674 44.5153488,46.6329651 38.6743605,51.7515698 C41.4978488,51.4006977 47.4502907,50.0219767 47.4502907,50.0219767 L47.1489535,46.1004651 C45.3863372,46.8063372 42.1954651,50.1623256 40.957093,51.2231977 C44.3130814,46.9838372 49.786686,42.554593 41.6629651,33.5640116 C42.7238372,34.0923837 45.2748837,34.4597674 46.6866279,34.6331395 L46.5834302,31.9541279 L41.6918605,33.3865116 C42.3977326,32.8581395 44.3419767,30.9097674 44.5194767,29.1471512 C44.6928488,27.2070349 42.9302326,25.6177907 41.8693605,24.7344186 L46.459593,25.6177907 C46.459593,23.6735465 46.282093,21.9026744 46.282093,20.3175581 C46.282093,20.4950581 47.0663953,25.4031395 47.1654651,25.7911628 C57.4109302,27.380407 57.5843023,34.0923837 52.9940698,35.1532558 C53.5224419,35.6816279 54.6452326,36.0944186 55.644186,37.8033721 C59.0909884,43.6773837 53.3490698,48.0447093 52.6431977,48.9487209 C55.466686,48.4162209 63.0620349,42.4142442 65.8855233,40.47 C64.6347674,42.2161047 55.0993023,49.9848256 55.0993023,49.9848256 L55.0827907,49.9848256 Z"
                                    id="Shape"
                                    fillRule="nonzero"
                                />
                                <path
                                    d="M32.6104651,26.5878488 C32.7838372,27.999593 33.3576163,30.8891279 33.3576163,30.8891279 L35.8343605,31.2688953 C36.9076163,28.090407 35.6238372,26.9387209 32.6104651,26.5878488 Z"
                                    id="Path"
                                />
                            </g>
                        </svg>
                    </OutboundLink>
                </div>
            </div>
        </nav>
        <StreamGrid />
    </Page>
);

LivePage.getInitialProps = async ({ query }) => {
    return {
        isEmbed: query.embed ? true : false
    };
};

export default LivePage;
