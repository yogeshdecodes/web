import "./index.scss";

import React from "react";
import Logo from "../../components/Logo";
import ActiveLink from "../../components/ActiveLink";

const Nav = () => {
    return (
        <div className="Nav">
            <div className="nav-container container">
                <div className="nav-left">
                    <div className="item logo">
                        <Logo width={33} height={33} />
                    </div>
                    <ActiveLink route="home" activeClassName="active">
                        <a className="item">Log</a>
                    </ActiveLink>
                    <a className="item">Products</a>
                    <a className="item">Makers</a>
                    <a className="item">Discussions</a>
                    <a className="item">More ↓</a>
                </div>
                <div className="nav-right">ssss</div>
            </div>
        </div>
    );
};

export default Nav;
