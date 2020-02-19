import React from "react";
import { connect } from "react-redux";
import SlackInstallCard from "./components/SlackInstallCard";
import { mapDispatchToProps, mapStateToProps } from "~/ducks/apps";
import Spinner from "~/components/Spinner";
import PageTitle from "~/components/ui/PageTitle";

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
            <>
                <PageTitle title="Slack" />
                <div className="card">
                    <div className="card-content">
                        <SlackInstallCard
                            code={
                                this.props.query.code
                                    ? this.props.query.code
                                    : null
                            }
                            linkKey={this.props.linkKey}
                        />
                    </div>
                </div>
            </>
        );
    }
}

Slack.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(Slack);
