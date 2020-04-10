import React, { Component } from "react";
import { Link } from "~/routes";
import "./index.scss";

export default class HomeHero extends Component {
    render() {
        return (
            <div className="HomeHero hero">
                <h1>Home of the maker community.</h1>
                <h3 className="subtitle mb-em">
                    Makerlog is where 4,000+ indie hackers & makers get things
                    done together.
                </h3>
                <Link route={"begin"}>
                    <a>Get started</a>
                </Link>
            </div>
        );
    }
}
