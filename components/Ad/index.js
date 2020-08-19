import React from "react";
import Emoji from "~/components/Emoji";
import GoldIcon from "~/components/icons/GoldIcon";
import { connect } from "react-redux";
import { mapStateToProps } from "~/ducks/user";
import OutboundLink from "~/components/OutboundLink";
import "./index.scss";
import Ad from "../../features/ads/Ad";

export class AdblockDetect extends React.Component {
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
