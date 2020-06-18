import React, { Component } from "react";
import "./index.scss";

class BlogPostsRow extends Component {
    render() {
        return <div className="BlogPostsRow">{this.props.children}</div>;
    }
}
export default BlogPostsRow;
