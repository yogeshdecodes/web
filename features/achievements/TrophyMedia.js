import React, { Component } from "react";
import "./TrophyMedia.scss";
import { Line } from "rc-progress";
import { Tooltip } from "react-tippy";

// tooltip
export const TrophyIcon = ({ trophy, withTooltip = true }) => {
    if (!withTooltip) {
        return (
            <div
                className="TrophyIcon"
                style={{ backgroundColor: trophy.color }}
            >
                {trophy.emoji}
            </div>
        );
    }
    return (
        <Tooltip
            html={
                <div>
                    <strong>{trophy.name}: </strong> {trophy.description}
                </div>
            }
            animateFill={false}
            delay={200}
            size={"small"}
        >
            <div
                className="TrophyIcon"
                style={{ backgroundColor: trophy.color }}
            >
                {trophy.emoji}
            </div>
        </Tooltip>
    );
};

export default class TrophyMedia extends Component {
    render() {
        const { trophy, withProgress = false } = this.props;
        return (
            <div
                className={
                    "TrophyMedia flex flex-gap" +
                    (trophy.progress === 100 ? " remaining" : "")
                }
            >
                <div>
                    <TrophyIcon
                        withTooltip={false}
                        trophy={this.props.trophy}
                    />
                </div>
                <div className="flex-grow">
                    <strong>{trophy.name}</strong>
                    <br />
                    <small>
                        {this.props.verb ? trophy.verb : trophy.description}
                    </small>
                    {withProgress && trophy.progress !== 100 ? (
                        <Line
                            percent={trophy.progress}
                            strokeWidth="3"
                            trailWidth="3"
                            trailColor="var(--c-border)"
                            strokeColor="var(--c-main)"
                        />
                    ) : null}
                </div>
            </div>
        );
    }
}
