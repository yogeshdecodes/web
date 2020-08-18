import React, { Component } from "react";
import GoldCtaButton from "./GoldCtaButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* 

            <div className={"alert is-gold"}>
                <div className="alert-body">
                    <div className={"flex"} style={{ width: "100%" }}>
                        <div>
                            <h3>
                                {this.props.feature
                                    ? `${this.props.feature} is a Gold feature.`
                                    : "You don't have Makerlog Gold"}
                            </h3>
                            <p>
                                Get Gold and support the maker movement for just
                                $5/mo.
                            </p>
                        </div>
                        <div className="flex-grow"></div>
                        <div className="buttons">
                            <GoldCtaButton />
                        </div>
                    </div>
                </div>
            </div>
*/

class GoldMessage extends Component {
    render() {
        return (
            <div className="card" data-theme="dark">
                <div className="card-content">
                    <h1 className="has-text-gold">
                        <FontAwesomeIcon icon="check-circle" /> Gold
                    </h1>
                    <p>
                        {this.props.action
                            ? `You must subscribe to Makerlog Gold to ${this.props.action}.`
                            : "You must subscribe to Makerlog Gold to do this."}
                    </p>
                </div>
            </div>
        );
    }
}

export default GoldMessage;
