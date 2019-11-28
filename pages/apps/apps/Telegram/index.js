import React from "react";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "~/ducks/apps";
import Spinner from "~/components/Spinner";
import OutboundLink from "~/components/OutboundLink";
import { link } from "~/lib/integrations/telegram";

class Telegram extends React.Component {
    state = {
        linking: false,
        success: false,
        failed: false
    };

    static getInitialProps({ query }) {
        return { query };
    }

    componentDidMount() {
        if (this.props.query.key) {
            this.link(this.props.query.key);
        }
    }

    link = async key => {
        this.setState({
            linking: true,
            success: false,
            failed: false
        });
        try {
            await link(key);
            this.setState({
                linking: false,
                success: true,
                failed: false
            });
        } catch (e) {
            this.setState({
                linking: false,
                success: false,
                failed: true
            });
        }
    };

    render() {
        const style = {
            backgroundColor: "#0088cc",
            color: "white"
        };

        if (this.state.linking) {
            return <Spinner />;
        }

        return (
            <div>
                <div className={"hero dark"} style={style}>
                    <div className={"container"}>
                        <h2 className={"has-text-white"}>Telegram</h2>
                        <h3>
                            Your awesome Telegram bot for Makerlog. Add done
                            tasks from your messenger and check your stats.
                        </h3>
                    </div>
                </div>
                <div className={"container"}>
                    <br />
                    {this.state.success && (
                        <div className={"panel-message success"}>
                            Linked successfully.
                        </div>
                    )}
                    {this.state.failed && (
                        <div className={"panel-message danger"}>
                            Failed to link.
                        </div>
                    )}
                    <div className={"card"}>
                        <div className={"card-content has-text-centered"}>
                            <h3 className={"has-text-grey"}>
                                Click the button below to get started.
                            </h3>
                            <OutboundLink
                                className={"button is-medium is-info"}
                                to={"http://telegram.me/MakerlogBot"}
                            >
                                Add to Telegram
                            </OutboundLink>
                            <hr />
                            <small>
                                You can also{" "}
                                <OutboundLink to={"https://t.me/makerlog"}>
                                    join the Makerlog groupchat
                                </OutboundLink>{" "}
                                to interact with other makers.
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Telegram.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(Telegram);
