import React from 'react';
import StreamCard from '../StreamCard/index';
import StreamDateHeader from "./StreamDateHeader";

class StreamSection extends React.Component {
    render() {
        let activity = this.props.activityData;
        let date = this.props.date;

        return (
            <section className="StreamSection">
                <StreamDateHeader
                    date={date}
                    position={this.props.position}
                    canSwitchType={this.props.canSwitchType}
                    isFollowingFeed={this.props.isFollowingFeed}
                    onSwitch={this.props.onSwitch}
                />

                {Object.keys(activity).map(
                    (key) => {
                        return <StreamCard key={activity[key][0].id} activity={activity[key]} />
                    }
                )}
            </section>
        )
    }
}

StreamSection.propTypes = {}

export default StreamSection;