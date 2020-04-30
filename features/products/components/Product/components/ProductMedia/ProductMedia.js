import React from "react";
import { Link } from "~/routes";
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
                <a className="a-unstyled">
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
                </a>
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
                <Link
                    route="product-page"
                    params={{ slug: this.props.product.slug }}
                >
                    <a className="a-unstyled">
                        <div className={"ProductMedia"}>
                            <div className={"flex"}>
                                <ProductIcon
                                    is={32}
                                    product={this.props.product}
                                />
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
                    </a>
                </Link>
            );
        }

        return (
            <Link
                route="product-page"
                params={{ slug: this.props.product.slug }}
            >
                <a className="a-unstyled">
                    <div className={"ProductMedia"}>
                        <div className={"flex"}>
                            <ProductIcon is={48} product={this.props.product} />
                            <div
                                class="flex flex-column"
                                style={{ justifyContent: "center" }}
                            >
                                <strong>{this.props.product.name} </strong>
                                {this.props.product.description ? (
                                    <>
                                        <br />
                                        <p>
                                            {truncate(
                                                this.props.product.description,
                                                14,
                                                "..."
                                            )}
                                        </p>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
        );
    }
}

export default ProductMedia;
