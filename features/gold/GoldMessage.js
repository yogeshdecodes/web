import React, { Component } from "react";
import GoldIcon from "~/components/icons/GoldIcon";
import GoldCtaButton from "~/components/GoldCtaButton";

class GoldMessage extends Component {
    render() {
        return (
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
        );
    }
}

export default GoldMessage;
