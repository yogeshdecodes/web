import React, { Component } from "react";
import OutboundLink from "~/components/OutboundLink";
import LoggedInOnly from "~/features/users/containers/LoggedInOnly";
import LoggedOutOnly from "~/features/users/containers/LoggedOutOnly";
import { Link } from "~/routes";
import { imageUrl } from "~/lib/utils/img";
import RedeemButton from "./RedeemButton";

export default class DealMedia extends Component {
    render() {
        const { deal } = this.props;
        return (
            <div className="flex flex-gap">
                <div className="icon">
                    <figure className={this.props.small ? "img-32" : "img-48"}>
                        <img src={imageUrl(deal.icon)}></img>
                    </figure>
                </div>
                <div className="flex-grow">
                    {this.props.small ? (
                        <h5
                            style={
                                this.props.small ? { fontSize: "0.938rem" } : {}
                            }
                        >
                            {deal.title}
                        </h5>
                    ) : (
                        <h4>{deal.title}</h4>
                    )}
                    <p style={this.props.small ? { fontSize: "0.813rem" } : {}}>
                        {deal.description}
                    </p>
                    {!this.props.small && (
                        <>
                            <LoggedOutOnly>
                                <Link route="begin">
                                    <a className="btn btn-light">
                                        Grab this deal
                                    </a>
                                </Link>
                            </LoggedOutOnly>
                            <LoggedInOnly>
                                <RedeemButton deal={deal} />
                            </LoggedInOnly>
                        </>
                    )}
                </div>
            </div>
        );
    }
}
