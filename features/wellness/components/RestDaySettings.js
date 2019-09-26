import React from 'react';
import Spinner from "../../../components/Spinner";
import {me, patchSettings} from "../../../lib/user";
import HardcoreModeToggle from "./HardcoreModeToggle";


class RestDaySettings extends React.Component {
    state = {
        loading: false,
        enabled: false,
        failed: false,
    }

    componentDidMount() {
        this.loadSettings()
    }

    loadSettings = async () => {
        this.setState({ loading: true, failed: false, })
        try {
            const user = await me();
            this.setState({
                loading: false,
                failed: false,
                enabled: user.hardcore_mode,
            })
        } catch (e) {
            this.setState({ failed: true, loading: false, })
        }
    }

    onChange = async () => {
        const enabled = !this.state.enabled;
        this.setState({ enabled })

        try {
            const updates = await patchSettings({ hardcore_mode: enabled })
            this.setState({
                enabled: updates.hardcore_mode,
                failed: false,
            })
        } catch (e) {
            this.setState({ failed: true, loading: false, })
        }
    }

    render() {
        const {
            loading, enabled, failed
        } = this.state;

        if (loading) {
            return <Spinner small />
        }

        if (failed) {
            return <div>Failed to load. <button onClick={this.loadSettings}>Retry</button></div>
        }

        return (
            <HardcoreModeToggle checked={enabled} onChange={this.onChange} />
        )
    }
}

export default RestDaySettings;