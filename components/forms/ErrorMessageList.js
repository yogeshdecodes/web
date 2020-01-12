import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ErrorMessageList.scss";

const renderFieldErrors = fieldErrors => {
    console.log(fieldErrors);
    if (fieldErrors !== null && fieldErrors.constructor === Array) {
        let list = [];
        fieldErrors.map(o => {
            Object.keys(o).map(k => {
                list.push(
                    <li>
                        {k === "non_field_errors" ? null : <b>{k}:</b>} {o[k]}
                    </li>
                );

                return true;
            });

            return true;
        });

        return <ul>{list}</ul>;
    }

    if (fieldErrors !== null && typeof fieldErrors === "object") {
        let list = [];
        Object.keys(fieldErrors).map(k => {
            list.push(
                <li>
                    <b>{k}</b>: {JSON.stringify(fieldErrors[k])}
                </li>
            );

            return true;
        });

        return <ul>{list}</ul>;
    }

    return null;
};

const ErrorMessageList = ({ errorMessages, fieldErrors }) =>
    (errorMessages && errorMessages.length > 0) ||
    (fieldErrors && fieldErrors.length > 0) ? (
        <div className="alert is-danger">
            <div className="alert-icon">
                <FontAwesomeIcon icon="exclamation-triangle" />
            </div>
            <div className="alert-body">
                <ul>
                    <b>
                        {errorMessages &&
                            errorMessages.length > 1 &&
                            errorMessages.map(message => (
                                <li key={message}>{message}</li>
                            ))}
                        {errorMessages && errorMessages.length == 1 && (
                            <span>{errorMessages[0]}</span>
                        )}
                    </b>
                    {errorMessages && fieldErrors && <hr />}
                    {fieldErrors && <div>{renderFieldErrors(fieldErrors)}</div>}
                </ul>
            </div>
        </div>
    ) : null;

ErrorMessageList.propTypes = {
    errorMessages: PropTypes.array.isRequired
};

export default ErrorMessageList;
