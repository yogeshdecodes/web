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
            <button
                className={
                    props.loading ? "btn btn-light is-loading" : "btn btn-light"
                }
                disabled={props.loading}
                onClick={props.onSubmit}
            >
                <FontAwesomeIcon icon={"reply"} />
                Submit
            </button>
        </div>
    </div>
);
