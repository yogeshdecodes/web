import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {mapDispatchToProps, mapStateToProps} from "ducks/apps";
import Spinner from "components/Spinner";
import {me, patchSettings} from "../../../../lib/user";
import {Button} from "../../../../vendor/bulma";

class ShipstreamsSettings extends React.Component {
    state = {
        loading: true,
        submitting: false,
        done: false,
        me: null,
        shipstreamsHandle: '',
        failed: false,
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = async () => {
        this.setState({ loading: true, failed: false })
        try {
            const user = await me();
            this.setState({
                shipstreamsHandle: user.shipstreams_handle,
                me: user,
                loading: false, failed: false,
            })
        } catch (e) {
            this.setState({
                loading: false,
                failed: true
            })
        }
    }

    onSubmit = async (e) => {
        e.preventDefault()
        this.setState({ submitting: true, failed: false,  })
        try {
            const me = await patchSettings({ shipstreams_handle: this.state.shipstreamsHandle })
            this.setState({ submitting: false, done: true, failed: false, me })
            setTimeout(() => this.setState({ done: false}), 3000)
        } catch (e) {
            this.setState({
                submitting: false,
                failed: true
            })
        }
    }

    onDelete = async e => {
        await this.setState({ deleting: true, shipstreamsHandle: "" })
        await this.onSubmit(e)
        await this.setState({ deleting: false })
    }

	render() {
		if (this.state.loading) return <div className={"card"}><div className={"card-content"}><Spinner/></div></div>
        if (this.state.failed) return <div className={"card"}><div className={"card-content has-text-centered"}><button onClick={this.fetchData}>Try again</button></div></div>

		return (
			<div className={"card"}>
				<div className={"card-content"}>
					<form onSubmit={this.onSubmit}>
						<div className={"form-row"}>
							<label className="label">Shipstreams username</label>
							<input
								type={"text"}
								value={this.state.shipstreamsHandle}
								onChange={e => this.setState({shipstreamsHandle: e.target.value})}
								placeholder="sergiomattei"/>
						</div>
						<div className={"form-row"}>
							{!this.state.deleting &&
							<Button disabled={this.state.done} type={"submit"} medium className={"is-fullwidth"} primary loading={this.state.submitting}>
								{this.state.done ? 'Linked!' : 'Link'}
							</Button>
							}
						</div>
						<div className={"form-row"}>
							{((this.state.me.shipstreams_handle && this.state.me.shipstreams_handle.length > 0) || this.state.deleting) &&
							<Button onClick={this.onDelete} medium className={"is-fullwidth"} danger loading={this.state.submitting}>
								Unlink
							</Button>
							}
						</div>
					</form>
				</div>
			</div>
		)
	}
}

class Shipstreams extends React.Component {
    render() {
        if (this.props.isLoading && !this.props.apps) {
            return <Spinner />
        }

		return (
			<div className="Trello">
				<div className={"hero info"}>
					<div className={"container"}>
						<h2 className={"has-text-white"}>
							Shipstreams
						</h2>
						<h3>
							Log when you go live and showcase your streams!
						</h3>
					</div>
				</div>
				<br/>
				<div className={"container"}>
					<div className={"columns"}>
						<div className={"column is-one-third is-offset-one-third"}>
							<h2 is={"5"}>Link your Shipstreams.com account</h2>
							<ShipstreamsSettings/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Shipstreams.propTypes = {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Shipstreams));