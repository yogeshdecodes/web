import React from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "~/ducks/user";
import SmallFooter from "~/components/sidebar/components/SmallFooter";
import "./index.scss";
import UserMedia from "~/features/users/components/UserMedia";
import { getTip } from "~/features/gold/GoldTip";
import OutboundLink from "../../OutboundLink";

const GoldUsersCard = ({ latestUsers = null, me }) => {
    if (!latestUsers) return null;
    return (
        <div className="UserCard sidebar-item">
            <h3>Public Roadmap</h3>
            <h4 className="subtitle has-text-grey ">
                We're building this with you!
            </h4>
            <div className="card">
                <div className="card-content">
                    <div>
                        <p>
                            Makerlog Gold is just getting started, and we're
                            building it with you.
                        </p>
                        <br />
                        <OutboundLink
                            to="https://trello.com/invite/b/kPevmmtD/b4896c4b18d7572be90835c7bf474ae7/makerlog-gold"
                            className="btn btn-light"
                        >
                            View roadmap
                        </OutboundLink>
                    </div>
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

const GoldPageSidebar = ({
    isLoggedIn,
    me,
    data,
    latestUsers = null,
    footer = false
}) => {
    //if (!data || data.failed) return null;

    return (
        <div className="Sidebar">
            <GoldUsersCard latestUsers={latestUsers} />
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
