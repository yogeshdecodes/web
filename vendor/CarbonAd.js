import React from "react";
import "./CarbonAd.scss";

class CarbonAd extends React.Component {
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
        // s.id = '_carbonads_js';
        // s.src = `https://cdn.carbonads.com/carbon.js?serve=CK7DC5QJ&placement=${this.props.placement}`;
        s.src = `https://intravert.co/serve/0359e0d7b3.3.js`;
        this.instance.appendChild(s);
        this.sc = s;
    }

    componentWillUnmount() {
        //this.instance.innerHTML = "";
        if (this.sc) {
            this.instance.removeChild(this.sc);
        }
    }

    render() {
        return (
            <div className={"nonGold"}>
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
