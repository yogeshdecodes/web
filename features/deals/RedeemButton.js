import React, { Component } from "react";
import { mapStateToProps as mapUserToProps } from "~/ducks/user";
import { connect } from "react-redux";
import OutboundLink from "../../components/OutboundLink";
import GoldIcon from "~/components/icons/GoldIcon";
import { DealTiers, canRedeem } from "../../lib/utils/deals";
import { loadingClass } from "~/lib/utils/random";
import { redeemDeal } from "~/lib/deals";

class DealRequirements extends Component {
    render() {
        //if (!this.props.deal) return null;
        switch (this.props.deal.tier) {
            case DealTiers.TIER_0.id:
                return <p className="help mb0">Available for all</p>;

            case DealTiers.TIER_1.id:
                return (
                    <p className="help mb0">
                        Unlocks at{" "}
                        <strong>
                            7 day streak or <GoldIcon /> Gold
                        </strong>
                    </p>
                );

            case DealTiers.TIER_2.id:
                return (
                    <p className="help mb0">
                        Unlocks at{" "}
                        <strong>
                            14 day streak or <GoldIcon /> Gold
                        </strong>
                    </p>
                );

            case DealTiers.TIER_3.id:
                return (
                    <p className="help mb0">
                        Unlocks at{" "}
                        <strong>
                            21 day streak or <GoldIcon /> Gold
                        </strong>
                    </p>
                );

            case DealTiers.TIER_4.id:
                return (
                    <p className="help mb0">
                        Unlocks at{" "}
                        <strong>
                            100 day streak or <GoldIcon /> Gold
                        </strong>
                    </p>
                );

            default:
                return <div>{this.props.deal.tier}</div>;
        }
    }
}

class RedeemButton extends Component {
    state = {
        redeeming: false,
        success: false,
        failed: false
    };

    onRedeem = async () => {
        if (!canRedeem(this.props.deal, this.props.me)) return;
        try {
            this.setState({ redeeming: true, failed: false });
            await redeemDeal(this.props.deal.id);
            this.setState({ redeeming: false, success: true, failed: false });
        } catch (e) {
            this.setState({ failed: true, redeeming: false });
        }
    };

    render() {
        const { deal } = this.props;
        const { failed, success, redeeming } = this.state;

        return (
            <div className="flex flex-gap v-center">
                <div>
                    <button
                        onClick={this.onRedeem}
                        className={loadingClass(
                            "btn btn-light " +
                                ((!canRedeem(deal, this.props.me) || success) &&
                                    "is-disabled"),
                            redeeming
                        )}
                    >
                        Grab this deal
                    </button>
                </div>
                {!canRedeem(deal, this.props.me) && (
                    <div>
                        <DealRequirements deal={deal} />
                    </div>
                )}
                {failed && (
                    <div>
                        <p className="help mb0 has-text-danger">
                            Something went wrong. Please try again later.
                        </p>
                    </div>
                )}
                {success && (
                    <div>
                        <p className="help mb0 has-text-success">
                            Check your inbox!
                        </p>
                    </div>
                )}
            </div>
        );
    }
}

export default connect(mapUserToProps)(RedeemButton);
