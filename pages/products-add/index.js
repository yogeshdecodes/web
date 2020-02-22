import React, { Component } from "react";
import ProductsPageLayout from "~/layouts/ProductsPage";
import PageTitle from "~/components/ui/PageTitle";
import "./index.scss";
import ProductCreateForm from "../../features/products/components/ProductCreateForm";

export default class AddProductPage extends Component {
    render() {
        return (
            <ProductsPageLayout>
                <PageTitle title="Add a product" />
                <div className="card">
                    <div className="card-content">
                        <ProductCreateForm />
                    </div>
                </div>
            </ProductsPageLayout>
        );
    }
}
