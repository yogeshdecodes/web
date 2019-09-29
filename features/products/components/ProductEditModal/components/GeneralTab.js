import React from "react";
import ProductIconPicker from "../../ProductIconPicker";
import LaunchedToggle from "../../LaunchedToggle";

export default props => (
    <>
        <div className={"form-row flex col-right"}>
            <div>
                <label className="label">Product name</label>
                <input
                    type={"text"}
                    value={props.name}
                    onChange={props.onNameChange}
                    placeholder="My Amazing Product"
                />
            </div>
            <div>
                <label className="label">Launched?</label>
                <LaunchedToggle
                    launched={props.launched}
                    onLaunchedChange={props.onLaunch}
                />
            </div>
        </div>
        <div className={"form-row"}>
            <label className="label">Product description</label>
            <textarea
                value={props.description}
                onChange={props.onDescriptionChange}
                placeholder="This product is an amazing one, it helps create spreadsheets from tables. Actual tables."
            ></textarea>
        </div>
        <div className={"form-row"}>
            <label className={"label"}>Icon</label>
            <ProductIconPicker onIconUpload={props.onIconUpload} />
        </div>
        <hr />
        <div className={"form-row"}>
            <label className="label">Website</label>
            <input
                type={"url"}
                value={props.website}
                onChange={props.onWebsiteChange}
                placeholder="https://getmakerlog.com"
            />
        </div>
        <div className={"form-row"}>
            <label className="label">Twitter handle</label>
            <input
                type={"text"}
                value={props.twitter}
                onChange={props.onTwitterChange}
                placeholder="getmakerlog"
            />
        </div>
        <div className={"form-row"}>
            <label className="label">Product Hunt URL</label>
            <input
                type={"text"}
                value={props.productHunt}
                onChange={props.onProductHuntChange}
                placeholder="https://producthunt.com/posts/makerlog"
            />
        </div>
    </>
);
