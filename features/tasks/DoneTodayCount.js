import React, { Component } from "react";
import { connect } from "react-redux";
import differenceInHours from "date-fns/differenceInHours";

class DoneTodayCount extends Component {
    render() {
        return <>{this.props.tasks.filter(t => t.done).length}</>;
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks.tasks.filter(
            task =>
                differenceInHours(new Date(), new Date(task.created_at)) <= 24
        )
    };
};

export default connect(mapStateToProps)(DoneTodayCount);
