import React from "react";
import {mount} from "enzyme";

import ActivitySparklines from "./ActivitySparklines";

describe("Test ActivitySparklines component", () => {
    const trend = [0, 1, 2, 3];

    it("renders without crashing", () => {
        mount(<ActivitySparklines trend={trend} />);
    });

    it("handles no trend parameter case", () => {
        const spark = mount(<ActivitySparklines />);
        expect(spark.text()).toEqual("No data.");
    });
});
