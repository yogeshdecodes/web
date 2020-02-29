import "./index.scss";

import React from "react";
import Toast from "../Toast";
import { inject, observer } from "mobx-react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ToastList = ({ toasts, ...props }) => {
    return (
        <TransitionGroup className="ToastList">
            {toasts.map((toast, index) => (
                <CSSTransition key={toast.id} timeout={400} classNames="Toast">
                    <Toast
                        onClose={props.removeToast}
                        key={toast.id}
                        toast={toast}
                    />
                </CSSTransition>
            ))}
        </TransitionGroup>
    );
};

export default inject(({ app }) => ({
    toasts: app.toasts,
    removeToast: toast => app.removeToast(toast),
    pushToast: app.pushToast
}))(observer(ToastList));
