import React from "react";
import { Link } from "~/routes";
import Emoji from "../../../../../../components/Emoji";
import {
    getHostname,
    normalizeUrl
} from "../../../../../../lib/utils/products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { truncate } from "~/lib/utils/random";

class ProductMedia extends React.Component {
    renderMedium() {
        return (
            <div className={"ProductMedia"}>
                <div className={"flex"}>
                    {this.props.product.icon && (
                        <div>
                            <figure className="img-48">
                                <img src={this.props.product.icon} alt="User" />
                            </figure>
                        </div>
                    )}
                    <div>
                        <Link
                            route="product-page"
                            params={{ slug: this.props.product.slug }}
                        >
                            <strong>
                                {this.props.product.name}{" "}
                                {this.props.product.launched && (
                                    <div className={"tag"}>
                                        <Emoji emoji={"🚀"} /> Launched
                                    </div>
                                )}
                            </strong>
                        </Link>
                        <br />
                        <p>{this.props.product.description}</p>
                        <div>
                            {this.props.product.website && (
                                <a
                                    target="_blank"
                                    className={"btn-link"}
                                    rel="noopener noreferrer"
                                    href={normalizeUrl(
                                        this.props.product.website
                                    )}
                                >
                                    <FontAwesomeIcon icon={"globe"} />
                                    {getHostname(this.props.product.website)}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        if (this.props.medium) {
            return this.renderMedium();
        }

        let LinkComponent = Link;

        if (!this.props.linked) {
            LinkComponent = props => <div>{props.children}</div>;
        }

        if (this.props.xs) {
            return (
                <div className={"ProductMedia"}>
                    <LinkComponent
                        route="product-page"
                        params={{ slug: this.props.product.slug }}
                    >
                        <div className={"flex"}>
                            <div>
                                <figure className="image is-32x32 img-rounded">
                                    <img
                                        src={
                                            this.props.product.icon
                                                ? this.props.product.icon
                                                : "https://via.placeholder.com/200?text=No+icon"
                                        }
                                        alt="Product"
                                    />
                                </figure>
                            </div>
                            <div>
                                <strong>{this.props.product.name}</strong>
                                <br />
                                <small>
                                    {truncate(
                                        this.props.product.description,
                                        10,
                                        "..."
                                    )}
                                </small>
                            </div>
                        </div>
                    </LinkComponent>
                </div>
            );
        }

        return (
            <div className={"ProductMedia"}>
                <LinkComponent
                    route="product-page"
                    params={{ slug: this.props.product.slug }}
                >
                    <div className={"flex"}>
                        <div>
                            <figure className="img-48">
                                <img
                                    src={
                                        this.props.product.icon
                                            ? this.props.product.icon
                                            : "https://via.placeholder.com/200?text=No+icon"
                                    }
                                    alt="Product"
                                />
                            </figure>
                        </div>
                        <div>
                            <div>
                                <strong>
                                    {this.props.product.name}{" "}
                                    {this.props.product.launched && (
                                        <div className={"tag"}>
                                            <Emoji emoji={"🚀"} /> Launched
                                        </div>
                                    )}
                                </strong>
                                <br />
                                <small>
                                    {truncate(
                                        this.props.product.description,
                                        10,
                                        "..."
                                    )}
                                </small>
                            </div>
                        </div>
                    </div>
                </LinkComponent>
            </div>
        );
    }
}

export default ProductMedia;
