import React from "react";
import Comment from "./Comment";
import {orderByDate} from "../../../lib/utils/tasks";

class CommentList extends React.Component {
    render() {
        if (!this.props.comments || !this.props.indexUrl) {
            return null;
        }

        const comments = orderByDate(this.props.comments, "asc");

        return comments.map(c => (
            <Comment indexUrl={this.props.indexUrl} key={c.id} comment={c} />
        ));
    }
}

export default CommentList;
