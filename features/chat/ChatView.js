import Spinner from "~/components/Spinner";
import "./index.scss";
import OutboundLink from "~/components/OutboundLink";

class TelegramChatView extends React.Component {
    componentDidMount() {}

    render() {
        return (
            <embed
                src="https://laughing-northcutt-6d4694.netlify.com/"
                style={{ width: "100%", height: "100%" }}
            />
        );
    }
}

class ChatView extends React.Component {
    state = {};

    componentDidMount() {}

    render() {
        return (
            <>
                {this.props.open && <div className="quickview-overlay"></div>}
                <div
                    className={
                        this.props.open
                            ? "chat-quickview quickview is-active"
                            : "quickview"
                    }
                >
                    <header className="notifications-header">
                        <h1 className="page-heading">Chat</h1>
                        <span
                            className="delete"
                            onClick={this.props.closeHandler}
                        />
                    </header>
                    <div className="telegram-cta flex flex-column flex-v-gap has-text-centered">
                        <div>
                            <h2>Join the conversation</h2>
                            <h3 className="subtitle has-text-grey">
                                Join our Telegram chat to log from anywhere,
                                discuss maker culture, and much more.
                            </h3>
                        </div>
                        <div>
                            <OutboundLink to="https://t.me/makerlog">
                                <strong>
                                    {" "}
                                    <a className="btn btn-primary">Join now</a>
                                </strong>
                            </OutboundLink>
                        </div>
                        <div></div>
                        <div>
                            <small className="has-text-grey-light">
                                On-site chat coming soon. Do you want it? &nbsp;
                                <OutboundLink to="https://twitter.com/matteing">
                                    <a>
                                        <span>Scream at me.</span>
                                    </a>
                                </OutboundLink>
                            </small>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ChatView;
