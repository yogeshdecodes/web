import React from "react";
import { getThreadRepliers } from "~/lib/discussions";
import { FaceStack } from "~/features/users";

class ReplyFaces extends React.Component {
    state = {
        isLoading: true,
        users: null,
        failed: false
    };

    componentDidMount() {
        this.getThreadRepliers();
    }

    getThreadRepliers = async () => {
        try {
            const people = await getThreadRepliers(
                this.props.threadSlug,
                this.props.withOwner
            );
            this.setState({
                isLoading: false,
                users: people,
                failed: false
            });
        } catch (e) {
            this.setState({ isLoading: false, failed: true });
        }
    };

    render() {
        if (this.state.isLoading) {
            // return <Spinner small text={"Loading people..."} />
            return null;
        } else if (this.state.failed) {
            return (
                <React.Fragment>
                    Failed to load.{" "}
                    <button onClick={this.getThreadRepliers}>Retry</button>
                </React.Fragment>
            );
        }

        return (
            <FaceStack
                is={this.props.size}
                users={this.state.users}
                limit={this.props.maxFaces}
            />
        );
    }
}

ReplyFaces.defaultProps = {
    maxFaces: 5,
    size: null
};

export default ReplyFaces;
