import React from "react";
import {Link} from "~/routes";
import {LoggedOutOnly} from "~/features/users";
import Emoji from "~/components/Emoji";

const LoggedOutMessage = props => (
    <LoggedOutOnly>
        <article
            className="panel-message is-medium is-primary"
            style={{ borderColor: "#16A085" }}
        >
            <div className="message-header">
                <Emoji emoji={"✌"} /> Welcome, guest!
            </div>
            <div className="message-body">
                <p><strong>Makerlog</strong> is a{" "}
                <strong>community of makers</strong> helping each other{" "}
                <strong>ship faster</strong> through <strong>feedback</strong>{" "}
                and <strong>good vibes.</strong></p>
                <Link route={"begin"}>
                    <button
                        className={
                            "button is-primary has-text-weight-bold is-rounded"
                        }
                    >
                        Join us
                    </button>
                </Link>
            </div>
        </article>
    </LoggedOutOnly>
);

LoggedOutMessage.propTypes = {};

export default LoggedOutMessage;
