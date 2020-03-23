import React from "react";
import { Line } from "rc-progress";
import { connect } from "react-redux";
import { mapStateToProps } from "~/ducks/user";
import { getNextTier, getNextTierProgress } from "~/lib/utils/deals";
import GoldIcon from "~/components/icons/GoldIcon";
import OutboundLink from "../../OutboundLink";
import { DealTiers } from "../../../lib/utils/deals";
import LoggedInOnly from "~/features/users/containers/LoggedInOnly";
import LoggedOutOnly from "~/features/users/containers/LoggedOutOnly";
import { Link } from "~/routes";

const ProgressText = ({ user }) => {
    const nextTier = getNextTier(user);
    console.log(nextTier);
    if (user.gold)
        return (
            <p className="help mb0">
                You've unlocked all deals. Thanks for buying <GoldIcon /> Gold!
            </p>
        );

    if (nextTier.id === DealTiers.ALL_UNLOCKED.id) {
        return (
            <p className="help mb0">
                You've unlocked all deals. Incredible work!
            </p>
        );
    }

    return (
        <p className="help mb0">
            You're {nextTier.requires - user.streak} days away from earning{" "}
            {nextTier.id === DealTiers.TIER_4.id
                ? "the ultimate founder pack"
                : "a batch of sweet deals"}
            !
        </p>
    );
};

export default connect(mapStateToProps)(({ me, isLoggedIn }) => {
    return (
        <div className="DealUnlockProgressCard sidebar-item">
            <h3>Your progress</h3>
            <h4 className="subtitle has-text-grey">
                Complete tasks, earn streaks, and unlock fantastic deals.
            </h4>
            <div className="card">
                <div className="card-content">
                    <div className="flex-column">
                        <LoggedInOnly>
                            {!me.gold && (
                                <div>
                                    <Line
                                        percent={getNextTierProgress(me)}
                                        strokeWidth="4"
                                        trailWidth="4"
                                        trailColor="var(--c-border)"
                                        strokeColor="var(--c-main)"
                                    />
                                </div>
                            )}
                            <div>
                                <ProgressText user={me} />
                            </div>
                            <div>
                                {!me.gold && (
                                    <>
                                        <br />
                                        <p className="help mb0 has-text-grey-light">
                                            Pssst! You can instantly unlock all
                                            deals and much more by&nbsp;
                                            <OutboundLink to="https://gold.getmakerlog.com">
                                                getting Gold.
                                            </OutboundLink>{" "}
                                        </p>
                                    </>
                                )}
                            </div>
                        </LoggedInOnly>
                        <LoggedOutOnly>
                            <div>
                                <Line
                                    percent={0}
                                    strokeWidth="4"
                                    trailWidth="4"
                                    trailColor="var(--c-border)"
                                    strokeColor="var(--c-main)"
                                />
                                <p className="help mb0">
                                    <Link route="begin">
                                        <a>Create a Makerlog account</a>
                                    </Link>{" "}
                                    to become more productive and earn some
                                    sweet deals.
                                </p>
                            </div>
                        </LoggedOutOnly>
                    </div>
                </div>
            </div>
        </div>
    );
});
