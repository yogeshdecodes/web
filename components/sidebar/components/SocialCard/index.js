import React from "react";
import { TwitterHashtagButton } from "react-twitter-embed";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OutboundLink from "~/components/OutboundLink";

export default () => {
    return (
        <div className="SocialCard sidebar-item">
            <h3>Social</h3>
            <h4 className="subtitle has-text-grey">
                Connect with the community, say hi!
            </h4>
            <div className="card">
                <div className="card-content">
                    <TwitterHashtagButton
                        tag="TogetherWeMake"
                        options={{
                            size: "large"
                        }}
                    />
                    <div className="flex">
                        <OutboundLink
                            to="https://instagram.com/getmakerlog"
                            className="btn btn-link has-text-instagram btn-block"
                        >
                            <FontAwesomeIcon icon={["fab", "instagram"]} />
                        </OutboundLink>

                        <OutboundLink
                            to="https://twitter.com/getmakerlog"
                            className="btn btn-link has-text-twitter btn-block"
                        >
                            <FontAwesomeIcon icon={["fab", "twitter"]} />
                        </OutboundLink>
                    </div>
                </div>
            </div>
        </div>
    );
};
