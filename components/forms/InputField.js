import React from "react";

function hasErrors(errorMessages, name) {
    return (
        (errorMessages &&
            errorMessages.field_errors &&
            errorMessages.field_errors[name]) ||
        (errorMessages && errorMessages[name])
    );
}

const InputField = ({ errorMessages = null, helpText = null, ...props }) => {
    return (
        <div className="field">
            {props.label && <label className="label">{props.label}</label>}
            <div className="control">
                <input
                    className={
                        "input " +
                        props.className +
                        ((errorMessages &&
                            errorMessages.field_errors &&
                            errorMessages.field_errors[props.name]) ||
                        (errorMessages && errorMessages[props.name])
                            ? " is-danger"
                            : "")
                    }
                    {...props}
                />
            </div>
            {!hasErrors(errorMessages, props.name) && helpText !== null && (
                <p className="help">{helpText}</p>
            )}
            {hasErrors(errorMessages, props.name) && (
                <p className="help is-danger">
                    {errorMessages[props.name]
                        ? errorMessages[props.name]
                        : null}
                    {errorMessages.field_errors &&
                    errorMessages.field_errors[props.name]
                        ? errorMessages.field_errors[props.name]
                        : null}
                </p>
            )}
        </div>
    );
};

export default InputField;
