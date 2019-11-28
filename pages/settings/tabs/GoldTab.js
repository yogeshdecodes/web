import React from "react";
import { me, patchSettings } from "~/lib/user";
import Emoji from "~/components/Emoji";
import Switch from "react-switch";
import GoldIcon from "~/components/icons/GoldIcon";
import GoldCtaButton from "~/components/GoldCtaButton";

class GoldTab extends React.Component {
    state = {
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
        this.setState({ loading: true });
        try {
            const user = await patchSettings({
                accent: this.state.accent,
                dark_mode: this.state.dark_mode
            });
            if (this.props.updateUser) {
                this.props.updateUser(user);
            }
            this.setState({ loading: false });
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
                <div
                    className={
                        "GoldSettings " +
                        (!this.props.user.gold ? "disabled" : "")
                    }
                >
                    <h3 className="mt0">Dark mode</h3>
                    <div className={"form-row has-addons"}>
                        <div className={"control"}>
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
                    </div>
                </div>
            </div>
        );
    }
}

export default GoldTab;
