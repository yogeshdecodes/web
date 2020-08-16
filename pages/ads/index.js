import React, { Component } from "react";
import AdsPageLayout from "~/layouts/AdsPage";
import PageTitle from "~/components/ui/PageTitle";
import AdPurchaseForm from "~/features/ads/AdPurchaseForm";
import "./index.scss";

class AdsIndex extends Component {
    render() {
        return (
            <AdsPageLayout fullWidth>
                <AdPurchaseForm />
            </AdsPageLayout>
        );
    }
}

export default AdsIndex;
