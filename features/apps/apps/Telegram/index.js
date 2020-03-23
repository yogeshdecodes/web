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
            console.log(e);
            this.setState({
                linking: false,
                success: false,
                failed: true
            });
        }
    };

    render() {
        if (this.state.linking) {
            return <Spinner />;
        }

        return (
            <div>
                <div className={"flex col-right v-center mbGap"}>
                    <div>
                        <h2>Telegram</h2>
                    </div>
                </div>
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
                        <div className="flex flex-column flex-v-gap">
                            <div>
                                <h3>Click the button below to get started.</h3>
                            </div>
                            <div>
                                {" "}
                                <OutboundLink
                                    className={"btn btn-medium btn-secondary"}
                                    to={"http://telegram.me/MakerlogBot"}
                                >
                                    Add on Telegram
                                </OutboundLink>
                            </div>
                            <div>
                                <p className="help">
                                    You can also{" "}
                                    <OutboundLink to={"https://t.me/makerlog"}>
                                        join the Makerlog groupchat
                                    </OutboundLink>{" "}
                                    to interact with other makers.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Telegram.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(Telegram);
