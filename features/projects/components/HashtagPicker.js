import React, { Component } from "react";

export default class HashtagPicker extends Component {
    state = {
        value: "",
        loading: false,
        failed: false
    };

    onAddTag = () => {};

    render() {
        return (
            <div>
                <div className="input-control flex flex-gap">
                    <div>
                        <input type="text" placeholder="#makerlog" />
                    </div>
                    <div>
                        <button className="btn-light">Add</button>
                    </div>
                </div>
                <div className="hashtag-list flex flex-gap">
                    <div className="tag">#test</div>
                </div>
            </div>
        );
    }
}
