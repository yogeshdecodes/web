import React, { Component } from "react";
import ProfilePageLayout from "~/layouts/ProfilePage";
import { getProfileProps } from "../index";
import { getProducts } from "~/lib/products";
import { ProductList } from "~/features/products";

class ProductsTab extends Component {
    render() {
        const { user, products } = this.props;

        if (!products) {
            return (
                <ProfilePageLayout user={user}>
                    Oops, something went wrong.
                </ProfilePageLayout>
            );
        }

        return (
            <ProfilePageLayout user={user}>
                <div className="card">
                    <div className="card-content">
                        <ProductList media products={products} />
                    </div>
                </div>
            </ProfilePageLayout>
        );
    }
}

ProductsTab.getInitialProps = async e => {
    const props = await getProfileProps(e);

    let products = null;
    if (props.user) {
        try {
            products = await getProducts(props.user.id);
        } catch (e) {
            console.log(e);
        }
    }

    return { products, ...props };
};

export default ProductsTab;
