import React from "react";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "~/ducks/apps";
import Spinner from "~/components/Spinner";
import { me, patchSettings } from "~/lib/user";
import { Button } from "~/vendor/bulma";
import PageTitle from "../../../../components/ui/PageTitle";
import { loadingClass } from "~/lib/utils/random";

class ShipstreamsSettings extends React.Component {
    state = {
        loading: true,
        submitting: false,
        done: false,
        me: null,
        shipstreamsHandle: "",
        failed: false
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        this.setState({ loading: true, failed: false });
        try {
            const user = await me();
            this.setState({
                shipstreamsHandle: user.shipstreams_handle,
                me: user,
                loading: false,
                failed: false
            });
        } catch (e) {
            this.setState({
                loading: false,
                failed: true
            });
        }
    };

    onSubmit = async e => {
        e.preventDefault();
        this.setState({ submitting: true, failed: false });
        try {
            const me = await patchSettings({
                shipstreams_handle: this.state.shipstreamsHandle
            });
            this.setState({ submitting: false, done: true, failed: false, me });
            setTimeout(() => this.setState({ done: false }), 3000);
        } catch (e) {
            this.setState({
                submitting: false,
                failed: true
            });
        }
    };

    onDelete = async e => {
        await this.setState({ deleting: true, shipstreamsHandle: "" });
        await this.onSubmit(e);
        await this.setState({ deleting: false });
    };

    render() {
        if (this.state.loading)
            return (
                <div className={"card"}>
                    <div className={"card-content"}>
                        <Spinner />
                    </div>
                </div>
            );
        if (this.state.failed)
            return (
                <div className={"card"}>
                    <div className={"card-content has-text-centered"}>
                        <button onClick={this.fetchData}>Try again</button>
                    </div>
                </div>
            );

        return (
            <div className={"card"}>
                <div className={"card-content"}>
                    <h4>Link your Shipstreams account</h4>
                    <br />
                    <form onSubmit={this.onSubmit}>
                        <div className={"form-row"}>
                            <input
                                type={"text"}
                                placeholder="Shipstreams username"
                                value={this.state.shipstreamsHandle}
                                onChange={e =>
                                    this.setState({
                                        shipstreamsHandle: e.target.value
                                    })
                                }
                            />
                        </div>
                        <div className={"form-row"}>
                            {!this.state.deleting && (
                                <button
                                    disabled={this.state.done}
                                    type={"submit"}
                                    className={loadingClass(
                                        "btn btn-secondary",
                                        this.state.submitting
                                    )}
                                    onClick={this.onSubmit}
                                >
                                    {this.state.done ? "Linked!" : "Link"}
                                </button>
                            )}
                        </div>
                        <div className={"form-row"}>
                            {((this.state.me.shipstreams_handle &&
                                this.state.me.shipstreams_handle.length > 0) ||
                                this.state.deleting) && (
                                <>
                                    <hr />
                                    <button
                                        onClick={this.onDelete}
                                        medium
                                        className={"btn-delete"}
                                        danger
                                        loading={this.state.submitting}
                                    >
                                        Unlink
                                    </button>
                                </>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

class Shipstreams extends React.Component {
    render() {
        if (this.props.isLoading && !this.props.apps) {
            return <Spinner />;
        }

        return (
            <div>
                <PageTitle title="Shipstreams" />

                <ShipstreamsSettings />
            </div>
        );
    }
}

Shipstreams.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(Shipstreams);
