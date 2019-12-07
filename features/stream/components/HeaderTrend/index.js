import React from "react";
import styled from "styled-components";
import "./index.scss";

const Bar = styled.span`
    background-color: ${props => props.color};
    height: ${props => props.data * 5}%;
`;

export default ({ trend, color }) => {
    if (!trend) return null;

    return (
        <div className={"HeaderTrend"}>
            {trend.map(point => (
                <Bar className={"bar"} color={color} data={point} />
            ))}
        </div>
    );
};
