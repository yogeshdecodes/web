import React from "react";
import ReactModal from "react-modal";

export const ModalContent = props => {
    let styles = {
        flex: props.flexRatio ? props.flexRatio : 1
    };

    /* let classNames = "Modal-Column Modal-Content";

    if (props.verticallyCentered) {
        classNames = `${classNames} Modal-VerticallyCentered`;
    }*/

    return (
        <div className="Modal-Column Modal-Content" style={styles}>
            {props.children}
        </div>
    );
};

export const ModalHeader = props => {
    // Allow width screen ratio
    // let ratio = 1;
    //let styles = {
    //   flex:
    //}

    return (
        <div className="Modal-Column Modal-Header" style={props.style}>
            {props.children}
        </div>
    );
};

class Modal extends React.Component {
    static Header = ModalHeader;
    static Content = ModalContent;

    componentWillMount() {
        ReactModal.setAppElement("body");
    }

    // flexdirection: row or column
    render() {
        let styles = {
            flexDirection: this.props.flexDirection
                ? this.props.flexDirection
                : "row"
        };

        if (this.props.style) {
            styles = { ...styles, ...this.props.style };
        }

        let modalStyles = this.props.modalStyles;
        if (!modalStyles) modalStyles = {};

        return (
            <ReactModal
                isOpen={this.props.open}
                onRequestClose={this.props.onClose}
                className="Modal"
                shouldCloseOnOverlayClick={true}
                overlayClassName="ModalOverlay"
                style={{
                    content: {
                        background: this.props.background
                            ? this.props.background
                            : "white",
                        width: this.props.percentWidth
                            ? `${this.props.percentWidth}%`
                            : "50%",
                        minWidth: this.props.percentWidth
                            ? `${this.props.percentWidth}%`
                            : "50%",
                        overflowX: "hidden",
                        ...modalStyles
                    }
                }}
            >
                <div
                    className={
                        this.props.className
                            ? `Modal-Container ${this.props.className}`
                            : "Modal-Container"
                    }
                    style={styles}
                >
                    {this.props.children}
                </div>
            </ReactModal>
        );
    }
}

Modal.propTypes = {};

export default Modal;
