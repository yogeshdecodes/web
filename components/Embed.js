import React from "react";
import PropTypes from "prop-types";

class Embed extends React.Component {
    renderIframe = () => {
        // Set default dimensions.
        let height = 500;

        if (this.props.task) {
            height = "200";
        }

        if (this.props.stats) {
            height = "200";
        }

        if (this.props.user) {
            height = 300;
        }

        return (
            <div className="Embed">
                <div className={"content"}>
                    <pre>
                        {`<iframe title="Makerlog Embed" height="${height}" style="width:100%" scrolling="no" frameborder="0" allowtransparency="true" src="https://api.getmakerlog.com${this.props.url}"></iframe>`}
                    </pre>
                </div>
                <iframe
                    title={`Makerlog Embed ${height}`}
                    height={height}
                    style={{ width: "100%" }}
                    scrolling="no"
                    frameBorder="0"
                    allowtransparency="true"
                    src={`https://api.getmakerlog.com${this.props.url}`}
                ></iframe>
            </div>
        );
    };

    render() {
        return <div>{this.renderIframe()}</div>;
    }
}

Embed.propTypes = {
    url: PropTypes.string.isRequired,
    task: PropTypes.bool,
    user: PropTypes.bool,
    stats: PropTypes.bool
};

export default Embed;
