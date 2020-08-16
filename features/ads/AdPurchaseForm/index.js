import React, { Component } from "react";
import AdsPageLayout from "~/layouts/AdsPage";
import PageTitle from "~/components/ui/PageTitle";
import "./index.scss";
import InputField from "~/components/forms/InputField";
import Spinner from "~/components/Spinner";
import Emoji from "~/components/Emoji";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { connect } from "react-redux";
import { actions as appActions } from "~/ducks/app";
import { actions as userActions } from "~/ducks/user";
import Sticky from "react-stickynode";
import { isServer } from "~/config";
import { getPlansForType } from "../utils";
import { loadingClass } from "~/lib/utils/random";
import { StdErrorCollection } from "~/lib/utils/error";
import StdErrorMessages from "~/components/forms/StdErrorMessages";
import { createBooking } from "~/lib/ads";

function makeBookingMock(type, text, image, url) {
    return {
        type,
        text,
        image,
        url
    };
}

const exampleBooking = makeBookingMock(
    "ICON",
    "This is an example ad.",
    "/img/square-logo.jpg",
    "https://getmakerlog.com"
);

const Ad = ({ booking }) => {
    if (!booking) return null;
    return (
        <div className={"Booking " + booking.type.toLowerCase()}>
            <div className="image">
                <figure className="is-square is-64x64">
                    <img className={"image"} src={booking.image} />
                </figure>
            </div>
            <div className="text">{booking.text}</div>
        </div>
    );
};

const AdPreview = ({ booking }) => {
    if (!booking) return null;
    return (
        <Sticky enabled={!isServer ? window.innerWidth >= 728 : false} top={20}>
            <div className="AdCard sidebar-item">
                <h3>Your ad preview</h3>
                <h4 className="subtitle has-text-grey">
                    Here's how your ad will be displayed.
                </h4>
                <div className="card" style={{ marginBottom: "1rem" }}>
                    <div className="card-content">
                        <Ad booking={booking} />
                    </div>
                </div>
                <div
                    className="ads-cta flex flex-gap"
                    style={{ marginBottom: "2rem", marginTop: "0.5rem" }}
                >
                    <div>
                        <small>Ad by Makerlog Ads</small>
                    </div>
                    <div className="flex-grow"></div>
                    <div>
                        <small>
                            <a href="">Book an ad &raquo;</a>
                        </small>
                    </div>
                </div>
            </div>
        </Sticky>
    );
};

const TierSelect = ({
    type = "ICON",
    product = null,
    onSelect = () => {},
    ...props
}) => {
    const plans = getPlansForType(type);
    if (!plans) return null;
    return (
        <div className="TileSelect flex flex-gap">
            {plans.map(p => (
                <div
                    className={p.id === product ? "active" : ""}
                    onClick={() => onSelect(p.id)}
                >
                    <a className="unstyled-a">{p.offering()}</a>
                </div>
            ))}
        </div>
    );
};

const AdKindSelect = ({ type = "ICON", onSelect = () => {} }) => {
    return (
        <div className="TileSelect flex flex-gap">
            <div
                className={type === "ICON" ? "active" : ""}
                onClick={() => onSelect("ICON")}
            >
                <a className="unstyled-a">
                    <strong>Square ad</strong> <br />A 64x64 icon alongside
                    text.
                </a>
            </div>
            <div
                className={type === "BANNER" ? "active" : ""}
                onClick={() => onSelect("BANNER")}
            >
                <a className="unstyled-a">
                    <strong>Banner ad</strong> <br />A large 16:9 banner
                    alongside text.
                </a>
            </div>
        </div>
    );
};

class AdPurchaseForm extends Component {
    state = {
        purchased: false,
        creating: false,
        product: null,
        type: "ICON",
        text: "",
        url: "",
        image: null,
        imageName: "Uploaded",
        imagePreview: null,
        errorMessages: null,
        finalBooking: null
    };

    onClickBuy = async () => {
        if (!this.state.product) return;
        this.setState({ creating: true, errorMessages: null });
        try {
            const booking = await createBooking(
                this.state.text,
                this.state.image,
                this.state.url
            );
            Paddle.Checkout.open({
                product: this.state.product,
                email: this.props.email,
                successCallback: this.onPurchase,
                closeCallback: this.onClose,
                // This is not an error...
                passthrough: JSON.stringify({
                    booking_id: booking.id
                })
            });
            this.setState({
                finalBooking: { ...booking, type: this.state.type }
            });
        } catch (e) {
            this.setState({
                creating: false,
                errorMessages: new StdErrorCollection(e)
            });
        }
    };

    canSubmit = () => {
        return (
            this.state.text.length > 0 &&
            this.state.image !== null &&
            this.state.url.length > 0 &&
            this.state.product !== null &&
            this.state.type !== "" &&
            this.state.text.length <= 144
        );
    };

    onClose = () => {
        this.setState({
            purchased: false,
            creating: false
        });
    };

    onPurchase = () => {
        this.setState({
            purchased: true,
            creating: false,
            errorMessages: null
        });
    };

    onImageUpload = (acceptedFiles, rejectedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        this.setState({
            imageUploading: true
        });

        reader.onloadend = e => {
            this.setState({
                image: file,
                imageName: file.name,
                imagePreview: reader.result,
                imageUploading: false
            });
        };

        reader.readAsDataURL(file);
    };

    render() {
        if (this.state.purchased) {
            return (
                <div className="StdPage container ">
                    <div className="mtGap">
                        <h2>Your ad purchase has been completed.</h2>
                        <p>
                            Thanks for supporting the maker community. Please
                            check your emails for a receipt. It will begin
                            circulating shortly.
                        </p>
                    </div>
                </div>
            );
        }

        return (
            <div className="StdPage container grid-c-s">
                <div>
                    <PageTitle
                        title="Book an ad"
                        left={
                            <h4 className="subtitle has-text-grey">
                                Reach thousands of makers around the world.
                            </h4>
                        }
                    />
                    <div className="card">
                        <div className="card-content">
                            <div className="AdPurchaseForm">
                                <div className="step">
                                    <h4>1. Pick a format</h4>
                                    <p className="mb-em">
                                        We offer multiple advertisement formats
                                        to fit your brand and marketing goals.
                                    </p>
                                    <div className="step-form">
                                        <AdKindSelect
                                            type={this.state.type}
                                            onSelect={type => {
                                                this.setState({
                                                    type,
                                                    product: null
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="step">
                                    <h4>2. Build your ad</h4>
                                    <p className="mb-em">
                                        Type in text, add an image, and see the
                                        magic on the preview.
                                    </p>
                                    <div className="step-form">
                                        <InputField
                                            className="mb-em"
                                            label="Ad text"
                                            helpText={`${this.state.text.length}/144 characters remaining`}
                                            value={this.state.text}
                                            onChange={e => {
                                                if (e.target.value.length > 144)
                                                    return;
                                                this.setState({
                                                    text: e.target.value
                                                });
                                            }}
                                        />
                                        <div className="field mb-em">
                                            <label className="label">
                                                Ad image
                                            </label>
                                            <div className="control">
                                                <Dropzone
                                                    maxSize={2 * 1024 * 1024}
                                                    className={"dropzone large"}
                                                    accept="image/*"
                                                    multiple={false}
                                                    onDrop={this.onImageUpload}
                                                >
                                                    {this.state.imagePreview ? (
                                                        <span>
                                                            <FontAwesomeIcon
                                                                icon={"camera"}
                                                            />{" "}
                                                            {
                                                                this.state
                                                                    .imageName
                                                            }
                                                        </span>
                                                    ) : this.state
                                                          .imageUploading ? (
                                                        <Spinner small />
                                                    ) : (
                                                        <span>
                                                            <FontAwesomeIcon
                                                                icon={"camera"}
                                                            />{" "}
                                                            Upload an image
                                                        </span>
                                                    )}
                                                </Dropzone>
                                            </div>
                                        </div>

                                        <InputField
                                            label="Ad URL"
                                            placeholder="https://getmakerlog.com"
                                            helpText={`Where should this ad go when clicked?`}
                                            value={this.state.url}
                                            onChange={e => {
                                                this.setState({
                                                    url: e.target.value
                                                });
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="step">
                                    <h4>3. Pick a timespan</h4>
                                    <p className="mb-em">
                                        We offer flexible timespans with awesome
                                        benefits.
                                    </p>
                                    <div className="step-form">
                                        <TierSelect
                                            type={this.state.type}
                                            product={this.state.product}
                                            onSelect={product =>
                                                this.setState({ product })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="step">
                                    {this.state.errorMesaages !== null ? (
                                        <>
                                            <StdErrorMessages
                                                error={this.state.errorMessages}
                                            />{" "}
                                            <br />{" "}
                                        </>
                                    ) : null}
                                    <button
                                        className={loadingClass(
                                            "btn btn-secondary",
                                            this.state.creating
                                        )}
                                        onClick={this.onClickBuy}
                                        disabled={!this.canSubmit()}
                                    >
                                        Purchase ad
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <AdPreview
                        booking={makeBookingMock(
                            this.state.type,
                            this.state.text.length > 0
                                ? this.state.text
                                : exampleBooking.text,
                            this.state.imagePreview
                                ? this.state.imagePreview
                                : this.state.type === "ICON"
                                ? exampleBooking.image
                                : "https://getmakerlog.com/img/og/default.png",
                            this.state.url ? this.state.url : exampleBooking.url
                        )}
                    />
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        isLoggedIn: state.auth.loggedIn,
        email: state.user.me ? state.user.me.email : null
    }),
    dispatch => ({})
)(AdPurchaseForm);
