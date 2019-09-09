import React from "react";
import Markdown from "markdown-it";
import stripIndent from "strip-indent";

export default class extends React.Component {
    static defaultProps = {
        container: "div",
        options: {}
    };

    render() {
        var Container = this.props.container;
        return <Container>{this.content()}</Container>;
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.options !== this.props.options) {
            this.md = new Markdown(nextProps.options);

            if (nextProps.plugins) {
                nextProps.plugins.map(p => this.md.use(p));
            }
        }
    }

    content() {
        if (this.props.source) {
            return (
                <span
                    dangerouslySetInnerHTML={{
                        __html: this.renderMarkdown(this.props.source)
                    }}
                />
            );
        } else {
            return React.Children.map(this.props.children, child => {
                if (typeof child === "string") {
                    return (
                        <span
                            dangerouslySetInnerHTML={{
                                __html: this.renderMarkdown(child)
                            }}
                        />
                    );
                } else {
                    return child;
                }
            });
        }
    }

    renderMarkdown(source) {
        if (!this.md) {
            this.md = new Markdown(this.props.options);
            if (this.props.plugins) {
                this.props.plugins.map(p => this.md.use(p));
            }
        }
        return this.md.render(stripIndent(source));
    }
}
