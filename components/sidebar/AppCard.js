import React from "react";
import Emoji from "../Emoji";
import OutboundLink from "../OutboundLink";

export default () => (
    <div className={"card"}>
        <div className={"card-content flex"}>
            <div>
                <p className="heading">
                    <Emoji emoji="🛠" /> Spotlight
                </p>
                <p style={{ fontSize: 14 }}>
                    Use the new Telegram bot and log straight from your
                    messaging app!
                </p>
                <br />
                <p>
                    <OutboundLink
                        className="button is-primary btn-small"
                        href="https://t.me/makerlog"
                    >
                        Join the Telegram
                    </OutboundLink>
                </p>
            </div>
            <div>
                <img
                    alt="app screenshot"
                    src="/assets/img/robo-beep-boop.png"
                    width="75"
                />
            </div>
        </div>
    </div>
);
