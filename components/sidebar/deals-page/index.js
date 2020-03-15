import React from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "~/ducks/user";
import SmallFooter from "~/components/sidebar/components/SmallFooter";
import AdCard from "~/components/sidebar/components/AdCard";
import "./index.scss";
import DealUnlockProgressCard from "../components/DealUnlockProgressCard";

// TODO: thread sidebar
// props passed, just check

const DealsSidebar = ({ isLoggedIn, me, data }) => {
    //if (!data || data.failed) return null;

    return (
        <div className="Sidebar">
            <DealUnlockProgressCard />
            <AdCard />
            <SmallFooter />
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

export default connect(mapStateToProps)(DealsSidebar);
