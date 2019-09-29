import Dropzone from "react-dropzone";
import Emoji from "~/components/Emoji";
import React from "react";

class ProductIconPicker extends React.Component {
    onIconUpload = (acceptedFiles, rejectedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = e => {
            this.props.onIconUpload(file, reader.result);
        };
    };

    render() {
        return (
            <Dropzone
                maxSize={2 * 1024 * 1024}
                className={"ProductIconPicker"}
                accept="image/*"
                multiple={false}
                onDrop={this.onLogoUpload}
            >
                <h4>
                    {this.props.logoPreviewUrl ? (
                        <span>
                            Yay! <Emoji emoji="✨" />
                        </span>
                    ) : (
                        <span>Drop an icon here</span>
                    )}
                </h4>
            </Dropzone>
        );
    }
}

export default ProductIconPicker;
