import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "~/ducks/user";
import SmallFooter from "~/components/sidebar/components/SmallFooter";
import AdCard from "~/components/sidebar/components/AdCard";
import "./index.scss";

const CreateCard = props => {
    return (
        <div className="CreateCard card">
            <div className="card-content">
                <button className="btn btn-secondary btn-block btn-big">
                    New thread
                </button>
                <center>
                    <small className="has-text-grey-light">
                        Remember to follow <a>the rules</a>!
                    </small>
                </center>
            </div>
        </div>
    );
};

const DiscussionsSidebar = ({ isLoggedIn, me, data }) => {
    //if (!data || data.failed) return null;

    return (
        <div className="Sidebar">
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

export default connect(mapStateToProps)(DiscussionsSidebar);
