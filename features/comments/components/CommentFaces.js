import React from "react";
import {getCommentsPeople} from "../../../lib/comments";
import FaceStack from "../../users/components/FaceStack";

class CommentFaces extends React.Component {
    state = {
        loading: false,
        people: null,
        failed: false
    };

    componentDidMount() {
        this.getPeople();
    }

    getPeople = async () => {
        this.setState({ loading: true });
        try {
            const people = await getCommentsPeople(this.props.indexUrl);
            let failed = false;
            let loading = false;
            this.setState({ people, failed, loading });
        } catch (e) {
            this.setState({ loading: false, failed: true });
        }
    };

    render() {
        if (this.state.failed || this.state.loading) return null;
        if (!this.state.people || this.state.people.length === 0) return null;
        return <FaceStack users={this.state.people} />;
    }
}

export default CommentFaces;
