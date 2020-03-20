import React, { Component } from "react";
import LoggedInOnly from "~/features/users/containers/LoggedInOnly";

export default class DealLevelsCard extends Component {
    render() {
        return (
            <LoggedInOnly>
                <div className="DealLevelsCard sidebar-item">
                    <h3>Levels</h3>
                    <h4 className="subtitle has-text-grey">
                        Here are all the levels you can reach!
                    </h4>
                    <div className="card">
                        <div className="card-content">
                            <ul className="unstyled mb">
                                <li>
                                    <strong>Level 1:</strong> 7 day streak
                                </li>
                                <li>
                                    <strong>Level 2:</strong> 14 day streak
                                </li>
                                <li>
                                    <strong>Level 3:</strong> 21 day streak
                                </li>
                                <li>
                                    <strong>Level 4:</strong> #100DayClub
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </LoggedInOnly>
        );
    }
}
