import React from "react";
import Emoji from "~/components/Emoji";
import GoldIcon from "~/components/icons/GoldIcon";
import { connect } from "react-redux";
import { mapStateToProps } from "~/ducks/user";
import OutboundLink from "~/components/OutboundLink";
import "./index.scss";

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

class IntravertAd extends React.Component {
    state = {
        id: "space-0359e0d7b33"
    };

    componentDidMount() {
        const s = document.createElement("script");
        s.onload = () => {
            if (this.adSpace) {
                this.setState({ id: "" });
            }
        };
        s.type = "text/javascript";
        s.async = false;
        s.src = `https://intravert.co/serve/0359e0d7b3.3.js`;
        this.instance.appendChild(s);
        this.sc = s;
    }

    componentWillUnmount() {
        if (this.sc) {
            this.instance.removeChild(this.sc);
        }
    }

    render() {
        return (
            <div className={"nonGold"}>
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
                <div ref={el => (this.instance = el)} />
                <div
                    ref={el => (this.adSpace = el)}
                    className="intravert-space"
                    id={this.state.id}
                />
            </div>
        );
    }
}

IntravertAd.defaultProps = {
    placement: "getmakerlogcom"
};

export default connect(mapStateToProps)(props =>
    props.user && props.user.gold ? (
        <div className={"note"}>
            No ads here! Thanks for buying Makerlog Gold. <GoldIcon />{" "}
            <Emoji emoji={"✌️"} />
        </div>
    ) : (
        <IntravertAd />
    )
);
