import React from "react";
import PropTypes from "prop-types";
import { Message } from "~/vendor/bulma";

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

const ErrorMessageList = ({ errorMessages, fieldErrors }) => (
    <Message danger>
        <Message.Body>
            <ul>
                <b>
                    {errorMessages &&
                        errorMessages.map(message => (
                            <li key={message}>{message}</li>
                        ))}
                </b>
                {errorMessages && fieldErrors && <hr />}
                {fieldErrors && <div>{renderFieldErrors(fieldErrors)}</div>}
            </ul>
        </Message.Body>
    </Message>
);

ErrorMessageList.propTypes = {
    errorMessages: PropTypes.array.isRequired
};

export default ErrorMessageList;
