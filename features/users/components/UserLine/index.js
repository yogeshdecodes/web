import React, { Component } from "react";
import "./index.scss";
import { Link } from "~/routes";
import FullName from "~/features/users/components/FullName";

import GoldIcon from "~/components/icons/GoldIcon";
import { Tooltip } from "react-tippy";
import OutboundLink from "~/components/OutboundLink";
import VerifiedIcon from "../../../../components/icons/VerifiedIcon";

export default class UserLine extends Component {
    render() {
        const { user } = this.props;
        return (
            <Link route={"profile-page"} params={{ username: user.username }}>
                <a className="user-line flex flex-gap-half">
                    <div>
                        <FullName user={user} />
                        {user.verified ? (
                            <>
                                &nbsp;
                                <Tooltip
                                    html={"Verified"}
                                    animateFill={false}
                                    delay={200}
                                    position={"top"}
                                    size={"small"}
                                >
                                    <VerifiedIcon />
                                </Tooltip>
                            </>
                        ) : (
                            user.gold && (
                                <Tooltip
                                    interactive
                                    html={
                                        <OutboundLink to="https://gold.getmakerlog.com">
                                            <a
                                                style={{
                                                    color: "white",
                                                    textDecoration: "underline"
                                                }}
                                            >
                                                Makerlog Gold Subscriber
                                            </a>
                                        </OutboundLink>
                                    }
                                    animateFill={false}
                                    delay={200}
                                    position={"top"}
                                    size={"small"}
                                >
                                    &nbsp;
                                    <GoldIcon />
                                </Tooltip>
                            )
                        )}
                    </div>
                    <div>
                        <span className="username">@{user.username}</span>
                    </div>
                </a>
            </Link>
        );
    }
}
