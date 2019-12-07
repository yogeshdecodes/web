import React from "react";
import styled from "styled-components";
import { Tooltip } from "react-tippy";
import Emoji from "~/components/Emoji";
import "./index.scss";

const ProgressBar = styled.div`
    background-color: #04ae6f;
    width: ${props => (props.progress ? props.progress : 0)}%;
`;

class DayProgressBar extends React.Component {
    state = {
        percentage: null
    };

    componentDidMount() {
        this.refresh();
        this.check = setInterval(this.refresh, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.check);
    }

    refresh = () => {
        this.setState({
            percentage: this.getDayProgress()
        });
    };

    getDayProgress = () => {
        const dt = new Date();
        const secs =
            dt.getSeconds() + 60 * (dt.getMinutes() + 60 * dt.getHours());
        return (secs / 86400) * 100;
    };

    render() {
        return (
            <Tooltip
                // options
                html={
                    <small>
                        <Emoji emoji={"🔥"} /> Day progress (until streaks end)
                    </small>
                }
                delay={500}
                followCursor
                position="bottom-end"
                theme={"light"}
            >
                <ProgressBar
                    className={"DayProgressBar"}
                    progress={this.state.percentage}
                />
            </Tooltip>
        );
    }
}

export default DayProgressBar;
