import React, { Component } from "react";
import ThreadStream from "~/features/discussions/ThreadStream";
import GoldPageLayout from "~/layouts/GoldPage";
import { connect } from "react-redux";
import { Router } from "~/routes";
import "~/features/discussions/index.scss";
import "./index.scss";

class GoldDiscussionsPage extends Component {
    componentDidMount() {
        if (!this.props.hasGold) {
            Router.pushRoute("gold");
        }
    }

    render() {
        return (
            <GoldPageLayout>
                <ThreadStream url="/discussions/?gold=true" />
            </GoldPageLayout>
        );
    }
}

export default connect(state => ({
    hasGold: state.user.me ? state.user.me.gold : false
}))(GoldDiscussionsPage);
