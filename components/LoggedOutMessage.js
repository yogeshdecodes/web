import React from "react";
import { Link } from "~/routes";
import { LoggedOutOnly } from "~/features/users";
import Emoji from "~/components/Emoji";

const LoggedOutMessage = props => (
    <LoggedOutOnly>
        <article
            className="message is-medium is-primary"
            style={{ borderColor: "#16A085" }}
        >
            <div
                className="message-header"
                style={{ backgroundColor: "#16A085", borderColor: "#16A085" }}
            >
                <p>
                    <Emoji emoji={"✌"} /> Welcome, guest!
                </p>
            </div>
            <div className="message-body">
                <strong>Makerlog</strong> is a{" "}
                <strong>community of makers</strong> helping each other{" "}
                <strong>ship faster</strong> through <strong>feedback</strong>{" "}
                and <strong>good vibes.</strong>
                <p style={{ marginTop: 10 }}>
                    <Link
                        className={
                            "button is-primary has-text-weight-bold is-rounded"
                        }
                        to={"/begin"}
                    >
                        Join us &raquo;
                    </Link>
                </p>
            </div>
        </article>
    </LoggedOutOnly>
);

LoggedOutMessage.propTypes = {};

export default LoggedOutMessage;
