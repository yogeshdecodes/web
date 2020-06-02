import React, { Component } from "react";
import "./index.scss";
import SubscribeForm from "../SubscribeForm";

class SubscribeCta extends Component {
    render() {
        return (
            <div className="SubscribeCta card">
                <div className="card-content">
                    <div className="mb-em">
                        <h3>Your weekly dose of makerness, delivered.</h3>
                        <p>
                            Join over 5,000 makers reading success stories and
                            growth tips from up-and-coming founders.
                        </p>
                    </div>
                    <div>
                        <SubscribeForm />
                    </div>
                </div>
            </div>
        );
    }
}

export default SubscribeCta;
