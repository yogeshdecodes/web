import React from "react";

export default class extends React.Component {
    state = {
        updating: false,
        body: null,
        failed: false
    };

    componentDidMount() {
        if (this.props.thread) {
            this.setState({
                body: this.props.thread.body
            });
        }
    }

    updateThread = async () => {
        try {
            await this.setState({
                updating: true,
                failed: false
            });
            await updateThread(this.props.thread.slug, {
                body: this.state.body
            });
            await this.setState({
                updating: false,
                failed: false
            });

            if (this.props.onFinish) {
                this.props.onFinish(this.state.body);
            }
        } catch (e) {
            this.setState({
                updating: false,
                failed: true
            });
        }
    };

    render() {
        return (
            <BodyEditor
                value={this.state.body}
                onChange={e => this.setState({ body: e.target.value })}
                loading={this.state.updating}
                onSubmit={this.updateThread}
            />
        );
    }
}
