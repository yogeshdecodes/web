import React from "react";
import { Link } from "~/routes";

function getErrorMessage(status) {
    console.log(status);
    if (status >= 500) {
        return `A server error occurred. (${status})`;
    } else if (status === 404) {
        return `This page doesn't exist, has been deleted, or magically vanished from existence.`;
    } else {
        return `An unknown error occurred. (${status})`;
    }
}

function Error({ statusCode }) {
    return (
        <div className="ErrorPage flex flex-column flex-v-gap center ">
            <img
                src="/img/fun/nyan.gif"
                alt=""
                className="nyan is-hidden-mobile"
            />
            <div className="container">
                <div className=" flex flex-column flex-v-gap center ">
                    <div>
                        <h1>
                            {statusCode === 404
                                ? "Oops, we couldn't find that."
                                : "Uh oh, we're getting nervous..."}
                        </h1>
                    </div>
                    <div>
                        <h3 className="subtitle">
                            {getErrorMessage(statusCode)}
                        </h3>
                    </div>
                    <div className="flex flex-gap">
                        <div>
                            <Link route="home">
                                <a className="btn btn-light">Go home</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;
