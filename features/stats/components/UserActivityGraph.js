import React from "react";
import CalendarHeatmap from "~/vendor/heatmap";
import "~/vendor/heatmap/styles.css";
import {getUserActivityGraph} from "../../../lib/stats";
import Spinner from "~/components/Spinner";

function scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max) {
    return Math.ceil(
        ((maxAllowed - minAllowed) * (unscaledNum - min)) / (max - min) +
            minAllowed
    );
}

class UserActivityGraph extends React.Component {
    state = {
        loading: true,
        graph: null,
        failed: false
    };

    componentDidMount() {
        this.getActivityGraph();
    }

    getActivityGraph = async () => {
        this.setState({
            loading: true,
            graph: null,
            failed: false
        });
        try {
            const graph = await getUserActivityGraph(this.props.user.username);
            this.setState({
                graph,
                loading: false,
                failed: false
            });
        } catch (e) {
            this.setState({
                loading: false,
                graph: null,
                failed: true
            });
        }
    };

    render() {
        const { loading, failed, graph } = this.state;

        if (graph && (!graph.data || !graph.max || !graph.avg)) {
            return (
                <div className={"center"}>This maker has no activity yet.</div>
            );
        }

        if (failed)
            return (
                <div>
                    Failed to load.{" "}
                    <button onClick={this.getActivityGraph}>Retry</button>
                </div>
            );
        if (loading) return <Spinner small text="Loading activity..." />;

        return (
            <CalendarHeatmap
                classForValue={v => {
                    if (!v || v === 0) return `color-scale-0`;
                    const scale = scaleBetween(v.count, 0, 4, 0, graph.max);
                    return `color-scale-${scale}`;
                }}
                values={graph.data.map(({ date, count }) => ({
                    date: new Date(date),
                    count: count
                }))}
            />
        );
    }
}

export default UserActivityGraph;
