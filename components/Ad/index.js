import React from "react";
import Emoji from "~/components/Emoji";
import GoldIcon from "~/components/icons/GoldIcon";
import { connect } from "react-redux";
import { mapStateToProps } from "~/ducks/user";
import OutboundLink from "~/components/OutboundLink";
import "./index.scss";
import Ad from "../../features/ads/Ad";

class AdblockDetect extends React.Component {
    state = {
        usingAdblock: false
    };

    componentDidMount() {
        this.setState({ usingAdblock: this.fakeAdBanner.offsetHeight === 0 });
    }

    render() {
        if (this.state.usingAdblock === true) {
            return this.props.children;
        }

        return (
            <div
                ref={r => (this.fakeAdBanner = r)}
                style={{
                    height: "1px",
                    width: "1px",
                    visiblity: "none",
                    pointerEvents: "none"
                }}
                className="adBanner"
            />
        );
    }
}

class AdSpace extends React.Component {
    render() {
        return (
            <div className={"nonGold"} style={{ width: "100%" }}>
                <AdblockDetect>
                    <small>
                        <div className="flex flex-column flex-v-gap">
                            <div>
                                Hi! I see you're using an ad blocker. Ads pay
                                for Makerlog's bills and I promise they're
                                unintrusive.
                            </div>
                            <div>
                                Consider{" "}
                                <OutboundLink to="https://blog.getadmiral.com/ultimate-guide-whitelisting">
                                    making an exception
                                </OutboundLink>{" "}
                                or{" "}
                                <OutboundLink to="https://patreon.com/matteing">
                                    supporting me on Patreon
                                </OutboundLink>
                                . <Emoji emoji="💚" />
                            </div>
                        </div>
                    </small>
                </AdblockDetect>
                <Ad />
            </div>
        );
    }
}

export default connect(mapStateToProps)(props =>
    props.user && props.user.gold ? (
        <div className={"note"}>
            No ads here! Thanks for buying Makerlog Gold. <GoldIcon />{" "}
            <Emoji emoji={"✌️"} />
        </div>
    ) : (
        <AdSpace />
    )
);
