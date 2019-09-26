import React from "react";
import "./CarbonAd.scss";
import Emoji from "../components/Emoji";

class CarbonAd extends React.Component {
    componentDidMount() {
        const s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        // s.id = '_carbonads_js';
        // s.src = `https://cdn.carbonads.com/carbon.js?serve=CK7DC5QJ&placement=${this.props.placement}`;
        s.src = `https://intravert.co/serve/0359e0d7b3.3.js`;
        this.instance.appendChild(s);
    }

    render() {
        return (
            <div className={"card nonGold"}>
                <div className={"card-content"}>
                    <h3 className={"heading mt0"}>
                        <Emoji emoji={"🤘"} /> Indie Ad
                    </h3>

                    <div ref={el => (this.instance = el)} />
                    <div className="intravert-space" id={"space-0359e0d7b33"} />
                </div>
            </div>
        );
    }
}

/*
               <div className={"intravert-card"}>
                    <Level style={{width: "100%"}}>
                        <Level.Left>
                            Reach thousands of makers monthly.
                        </Level.Left>
                        <Level.Right>
                            <OutboundLink className={"button is-small is-primary is-rounded"} href={"https://intravert.co/book/0359e0d7b3/3/"}>Advertise here!</OutboundLink>
                        </Level.Right>
                    </Level>
                </div>
 */

CarbonAd.defaultProps = {
    placement: "getmakerlogcom"
};

export default CarbonAd;
