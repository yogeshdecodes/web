import React from "react";
import { connect } from "react-redux";
import SlackInstallCard from "./components/SlackInstallCard";
import { mapDispatchToProps, mapStateToProps } from "~/ducks/apps";
import Spinner from "~/components/Spinner";

class Slack extends React.Component {
    static getInitialProps({ query }) {
        return { query };
    }

    render() {
        const style = {
            backgroundColor: "#e6186d",
            color: "white"
        };

        if (this.props.isLoading && !this.props.apps) {
            return <Spinner />;
        }

        return (
            <div>
                <div className={"hero dark"} style={style}>
                    <div className={"container"}>
                        <h2 className={"has-text-white"}>Slack</h2>
                        <h3>
                            Seamlessly add logs from Slack, and stay updated
                            right from your chat client.
                        </h3>
                    </div>
                </div>
                <div className={"container"}>
                    <br />
                    <SlackInstallCard
                        code={
                            this.props.query.code ? this.props.query.code : null
                        }
                        linkKey={this.props.linkKey}
                    />
                </div>
            </div>
        );
    }
}

Slack.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(Slack);
