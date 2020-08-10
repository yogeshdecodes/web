import React from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "~/ducks/user";
import SmallFooter from "~/components/sidebar/components/SmallFooter";
import "./index.scss";
import { getTip } from "~/features/gold/GoldTip";

const GoldUsersCard = ({ latestMembers = null, me }) => {
    return (
        <div className="UserCard sidebar-item">
            <h3>New To The Club</h3>
            <h4 className="subtitle has-text-grey ">
                This is the exclusive tribe.
            </h4>
            <div className="card">
                <div className="card-content">
                    <div>x</div>
                </div>
            </div>
        </div>
    );
};

const GoldTipsCard = ({ me }) => {
    const tip = getTip();
    return (
        <div className="UserCard sidebar-item">
            <h3>Gold Tips</h3>
            <h4 className="subtitle has-text-grey ">
                A tip a day keeps the doctor away!
            </h4>
            <div className="card">
                <div className="card-content">
                    <small>
                        <div>
                            <strong>{tip.title}</strong>
                            <p>{tip.text}</p>
                        </div>
                    </small>
                </div>
            </div>
        </div>
    );
};

const GoldPageSidebar = ({ isLoggedIn, me, data, footer = false }) => {
    //if (!data || data.failed) return null;

    return (
        <div className="Sidebar">
            <GoldUsersCard />
            <GoldTipsCard />
            {footer ? <SmallFooter /> : null}
        </div>
    );
};

export async function prefetchData() {
    try {
        return {};
    } catch (e) {
        return {
            data: {
                failed: true
            }
        };
    }
}

export default connect(mapStateToProps)(GoldPageSidebar);
