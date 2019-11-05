import "./index.scss";
import TimeAgo from "react-timeago";

import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Toast = ({ toast, onClose }) => {
    return (
        <div className={"Toast " + toast.style} onClick={() => onClose(toast)}>
            <div className="toast-title">
                <div className="level">
                    <div className="level-left">
                        <div className="level-item title-item">
                            {toast.icon && (
                                <FontAwesomeIcon icon={toast.icon} />
                            )}{" "}
                            &nbsp; {toast.title}
                        </div>
                    </div>
                    <div className="level-right">
                        <div className="level-item time has-text-grey-light">
                            <TimeAgo date={Date.now()} />
                        </div>
                    </div>
                </div>
            </div>
            {toast.body && toast.body.length > 0 && (
                <div className="toast-body">{toast.body}</div>
            )}
        </div>
    );
};

export default Toast;
