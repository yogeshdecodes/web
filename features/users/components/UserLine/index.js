import React, { Component } from "react";
import "./index.scss";
import { Link } from "~/routes";
import FullName from "~/features/users/components/FullName";

export default class UserLine extends Component {
    render() {
        const { user } = this.props;
        return (
            <Link route={"profile-page"} params={{ username: user.username }}>
                <a className="user-line">
                    <FullName user={user} />{" "}
                    <span className="username">@{user.username}</span>
                </a>
            </Link>
        );
    }
}
