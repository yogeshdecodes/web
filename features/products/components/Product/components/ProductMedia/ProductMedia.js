import React from "react";
import { Link } from "~/routes";
import Emoji from "../../../../../../components/Emoji";
import { truncate } from "~/lib/utils/random";
import { imageUrl } from "../../../../../../lib/utils/img";
import ProductIcon from "~/features/products/components/ProductIcon";

class ProductMedia extends React.Component {
    renderMedium() {
        return (
            <Link
                route="product-page"
                params={{ slug: this.props.product.slug }}
            >
                <div className={"ProductMedia"}>
                    <div className={"flex"}>
                        <ProductIcon is={48} product={this.props.product} />
                        <div>
                            <strong>{this.props.product.name} </strong>
                            <br />
                            <p>
                                {truncate(
                                    this.props.product.description,
                                    14,
                                    "..."
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
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
                    <Link
                        route="product-page"
                        params={{ slug: this.props.product.slug }}
                    >
                        <div className={"flex"}>
                            <div>
                                <figure className="img-32">
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
                            <p>
                                <strong>{this.props.product.name}</strong>
                                <br />
                                <small>
                                    {truncate(
                                        this.props.product.description,
                                        10,
                                        "..."
                                    )}
                                </small>
                            </p>
                        </div>
                    </Link>
                </div>
            );
        }

        return (
            <div className={"ProductMedia"}>
                <Link
                    route="product-page"
                    params={{ slug: this.props.product.slug }}
                >
                    <div className={"flex"}>
                        <div>
                            <figure className="img-48">
                                <img
                                    src={imageUrl(
                                        this.props.product.icon
                                            ? this.props.product.icon
                                            : "https://via.placeholder.com/200?text=No+icon",
                                        48
                                    )}
                                    alt="Product"
                                />
                            </figure>
                        </div>
                        <div>
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
                    </div>
                </Link>
            </div>
        );
    }
}

export default ProductMedia;
