import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default props => (
    <div>
        <div className={"form-row"}>
            <div className="control">
                <textarea
                    cols={4}
                    value={props.value}
                    onChange={props.onChange}
                    placeholder={"Write something..."}
                />
            </div>
        </div>
        <div className={"action-container"}>
            <Button
                className={"is-rounded"}
                loading={props.loading}
                disabled={props.loading}
                onClick={props.onSubmit}
                primary
            >
                <FontAwesomeIcon icon={"reply"} />
                Submit
            </Button>
        </div>
    </div>
);
