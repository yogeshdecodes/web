import React, { Component } from "react";

export default class PageTitle extends Component {
    render() {
        return (
            <div className="flex col-right v-center mbGap">
                <div>
                    {this.props.title ? <h2>{this.props.title}</h2> : null}
                    {this.props.left}
                </div>
                {this.props.right ? this.props.right : null}
            </div>
        );
    }
}
