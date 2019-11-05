import React from "react";
import Spinner from "../../../components/Spinner";
import {getSkipDayBalance, getSkipDays} from "../../../lib/wellness";
import format from "date-fns/format";

class RestDayList extends React.Component {
    state = {
        loading: true,
        balance: 0,
        daysTaken: null,
        failed: false,
        errorMessages: null,
        schedulerOpen: false
    };

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        this.setState({ loading: true, failed: false });
        try {
            const { balance } = await getSkipDayBalance();
            const daysTaken = await getSkipDays();
            this.setState({
                loading: false,
                failed: false,
                balance,
                daysTaken
            });
        } catch (e) {
            console.log(e);
            this.setState({ failed: true, loading: false, errorMessages: e });
        }
    };

    render() {
        const { loading, daysTaken, failed } = this.state;

        if (loading) return <Spinner />;
        if (failed)
            return (
                <div>
                    Failed to load.{" "}
                    <button onClick={this.getData}>Retry</button>
                </div>
            );

        return (
            <div>
                <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Day</th>
                        </tr>
                    </thead>
                    <tbody>
                        {daysTaken.map(skip => (
                            <tr>
                                <td>
                                    {format(
                                        new Date(
                                            new Date(skip.date).toLocaleString(
                                                "en-US",
                                                { timeZone: "UTC" }
                                            )
                                        ),
                                        "MMMM d, yyyy"
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default RestDayList;
