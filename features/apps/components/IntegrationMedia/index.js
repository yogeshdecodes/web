import React, { Component } from "react";
import LoggedInOnly from "~/features/users/containers/LoggedInOnly";
import { Link } from "~/routes";
import OutboundLink from "~/components/OutboundLink";

export default class IntegrationMedia extends Component {
    renderMedia = () => {
        return (
            <div className="std-media flex clickable">
                {this.props.icon && (
                    <div className="icon">
                        <figure className="img-48">
                            <img src={this.props.icon}></img>
                        </figure>
                    </div>
                )}
                {this.props.fa && (
                    <div className="icon fa">{this.props.fa}</div>
                )}
                <div className="flex-grow">
                    <h4>
                        {this.props.name}{" "}
                        {this.props.installed && (
                            <span className="has-text-grey has-text-normal">
                                Installed
                            </span>
                        )}
                    </h4>
                    <p>{this.props.description}</p>
                    <div className="actions">
                        {this.props.actions && (
                            <LoggedInOnly>{this.props.actions}</LoggedInOnly>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    render() {
        if (this.props.outboundUrl) {
            return (
                <OutboundLink
                    className="no-margin-last"
                    to={this.props.outboundUrl}
                >
                    {this.renderMedia()}
                </OutboundLink>
            );
        }

        return (
            <Link route={"apps"} params={{ app: this.props.app }}>
                {this.renderMedia()}
            </Link>
        );
    }
}
