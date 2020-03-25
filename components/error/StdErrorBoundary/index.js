import React from "react";
import "./index.scss";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }
    componentDidCatch(error, info) {
        // TODO: Log to a service
    }
    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <>
                    <div className="flex has-text-danger">
                        An unknown error ocurred.
                    </div>
                    <div className="StdErrorReporter">hi</div>
                </>
            );
        }
        return this.props.children;
    }
}
