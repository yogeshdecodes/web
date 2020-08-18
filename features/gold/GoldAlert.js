import React, { Component } from "react";
import GoldCtaButton from "./GoldCtaButton";

export default class GoldAlert extends Component {
    render() {
        return (
            <div className="alert is-gold">
                <div className="alert-body">
                    <h2>
                        You don't have Makerlog Gold yet. <GoldIcon />
                    </h2>
                    <p>
                        <strong>
                            Makerlog Gold is the premium plan for Makerlog
                        </strong>
                        , with value added features like{" "}
                        <strong>dark mode, Kanban, and much more</strong>!
                        <br />
                        <strong>It's just $5/mo</strong> and you'll support
                        Makerlog while getting some exclusive perks.
                    </p>
                    <br />
                    <div>
                        <GoldCtaButton className={"is-medium"} />
                    </div>
                </div>
            </div>
        );
    }
}
