import React from "react";
import { me, patchSettings } from "~/lib/user";
import Emoji from "~/components/Emoji";
import Switch from "react-switch";
import GoldIcon from "~/components/icons/GoldIcon";
import GoldCtaButton from "~/components/GoldCtaButton";
import Spinner from "~/components/Spinner";
import { getSubscriptionDetails } from "../../../lib/billing";
import { handleChange, loadingClass } from "../../../lib/utils/random";

class SubscriptionSettings extends React.Component {
    state = {
        loading: true,
        subscription: null,
        failed: false
    };

    componentDidMount() {
        this.load();
    }

    load = async () => {
        try {
            this.setState({ loading: true, failed: false });
            const subscription = await getSubscriptionDetails();
            this.setState({
                subscription,
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

    onUpdateSub = () => {
        Paddle.Checkout.open({
            override: this.state.subscription.update_url
        });
    };

    onCancelSub = () => {
        Paddle.Checkout.open({
            override: this.state.subscription.cancel_url
        });
    };

    render() {
        if (this.state.loading)
            return <Spinner small text="Loading subscription details..." />;

        if (this.state.failed)
            return (
                <span className="has-text-danger">
                    Failed to load.{" "}
                    <button
                        className="btn btn-light btn-small"
                        onClick={this.load}
                    >
                        Retry
                    </button>
                </span>
            );

        return (
            <form onSubmit={e => e.preventDefault()}>
                <div className="control">
                    <label>Subscription settings</label>
                    <button
                        className="btn btn-light btn-small"
                        onClick={this.onUpdateSub}
                    >
                        Update payment details
                    </button>
                    &nbsp;
                    <button
                        className="btn btn-delete btn-small"
                        onClick={this.onCancelSub}
                    >
                        Cancel subscription
                    </button>
                </div>
            </form>
        );
    }
}

class GoldTab extends React.Component {
    state = {
        saved: false,
        loading: true,
        isPosting: false,
        accent: "",
        dark_mode: false,
        failed: false
    };

    componentDidMount() {
        this.prefillFields();
    }

    onSubmit = async event => {
        if (event.preventDefault) {
            event.preventDefault();
        }
        this.setState({ loading: true, saved: false });
        try {
            const user = await patchSettings({
                accent: this.state.accent,
                dark_mode: this.state.dark_mode
            });
            if (this.props.updateUser) {
                this.props.updateUser(user);
            }
            this.setState({ loading: false, saved: true });
        } catch (e) {}
    };

    prefillFields = async () => {
        try {
            const data = await me();
            this.setState({
                loading: false,
                accent: data.accent,
                dark_mode: data.dark_mode
            });
        } catch (e) {}
    };

    onChangeColor = async (color, event) => {
        await this.setState({
            accent: color.hex
        });
        await this.onSubmit(event);
    };

    renderErrorMessages = () => {
        let messages = [];
        let errors = this.state.errorMessages;
        if (typeof errors === "object") {
            for (let key in errors) {
                messages.push(
                    <p>
                        <strong>{key.replace(/[_-]/g, " ")}</strong>:{" "}
                        {errors[key]}
                    </p>
                );
            }

            return messages;
        } else if (errors.constructor === Array) {
            errors.map(err => {
                messages.push(<p>{err}</p>);

                return true;
            });
        } else {
            return <p>{errors}</p>;
        }

        return messages;
    };

    onChangeDarkMode = async e => {
        await this.setState({
            dark_mode: !this.state.dark_mode
        });

        await this.onSubmit(e);
    };

    resetDefaultColor = async () => {
        await this.setState({
            accent: new Colors().primary
        });

        await this.onSubmit({});
    };

    handleChange = e => handleChange(e, this);

    render() {
        return (
            <div>
                {!this.props.user.gold && (
                    <div>
                        <h2>
                            You don't have Makerlog Gold yet. <GoldIcon />
                        </h2>
                        <p>
                            <strong>
                                Makerlog Gold is the premium plan for Makerlog
                            </strong>
                            , with value added features like:
                            <ul>
                                <li>Dark Mode</li>
                                <li>editable accent color</li>
                                <li>NO ADS</li>
                                <li>and more</li>
                            </ul>
                            <br />
                            <strong>It's just $5/mo</strong> and you'll support
                            Makerlog while getting some exclusive perks.
                        </p>
                        <br />
                        <div>
                            <GoldCtaButton className={"is-medium"} />
                        </div>
                    </div>
                )}
                <form
                    onSubmit={this.onSubmit}
                    className={
                        "GoldSettings " +
                        (!this.props.user.gold ? "disabled" : "")
                    }
                >
                    <div className={"control"}>
                        <label>Dark mode</label>
                        <Switch
                            checkedIcon={
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "100%",
                                        fontSize: 15,
                                        paddingRight: 2
                                    }}
                                >
                                    <Emoji emoji="🌑" />
                                </div>
                            }
                            uncheckedIcon={
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "100%",
                                        fontSize: 15,
                                        paddingRight: 2
                                    }}
                                >
                                    <Emoji emoji="☀️" />
                                </div>
                            }
                            onColor="#47E0A0"
                            height={30}
                            width={60}
                            handleDiameter={20}
                            checked={this.state.dark_mode}
                            onChange={this.onChangeDarkMode}
                        />
                    </div>
                    <div className="control">
                        <label>Accent color</label>
                        <p className="help mb-5">
                            Add a little flair to your profile!
                        </p>
                        <input
                            onChange={this.handleChange}
                            type="color"
                            name="accent"
                            value={this.state.accent}
                        ></input>
                    </div>{" "}
                    {this.state.saved && (
                        <div className="control">
                            <div className="alert is-success">
                                <div className="alert-body">Saved.</div>
                            </div>
                        </div>
                    )}
                    <div className="control">
                        <button
                            onClick={this.onSubmit}
                            className={loadingClass(
                                "btn btn-secondary",
                                this.state.loading
                            )}
                        >
                            Save
                        </button>
                    </div>
                    {this.props.user.gold && (
                        <>
                            <hr />
                            <SubscriptionSettings />
                        </>
                    )}
                </form>
            </div>
        );
    }
}

export default GoldTab;
