import { FaceStack } from "features/users";
import React from "react";
import { getLatestParticipants } from "../../../lib/events";

class EventFaces extends React.Component {
    state = {
        isLoading: true,
        users: null,
        failed: false
    };

    componentDidMount() {
        this.fetch();
    }

    fetch = async () => {
        try {
            const people = await getLatestParticipants(this.props.slug);
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
                    Failed to load. <button onClick={this.fetch}>Retry</button>
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

EventFaces.defaultProps = {
    maxFaces: 5,
    size: null
};

export default EventFaces;
