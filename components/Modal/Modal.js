import React from "react";
import ReactModal from "react-modal";
import { connect } from "react-redux";
import { checkDarkMode } from "../../lib/utils/random";

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

export const ModalFooter = props => {
    // Allow width screen ratio
    // let ratio = 1;
    //let styles = {
    //   flex:
    //}

    return (
        <div className="Modal-Column Modal-Footer" style={props.style}>
            {props.children}
        </div>
    );
};

class Modal extends React.Component {
    static Header = ModalHeader;
    static Content = ModalContent;
    static Footer = ModalFooter;

    componentDidMount() {
        ReactModal.setAppElement("body");
    }

    getThemeData = () => {
        return {
            theme: this.props.darkMode ? "dark" : "light"
        };
    };

    // flexdirection: row or column
    render() {
        let styles = {
            flexDirection: this.props.flexDirection
                ? this.props.flexDirection
                : "column"
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
                className={
                    this.props.modalClassName
                        ? this.props.modalClassName
                        : "Modal"
                }
                shouldCloseOnOverlayClick={true}
                overlayClassName={
                    this.props.overlayClassName
                        ? this.props.overlayClassName
                        : "ModalOverlay"
                }
                data={this.getThemeData()}
                style={{
                    content: {
                        background: this.props.background
                            ? this.props.background
                            : "var(--c-lightest)",
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

export default connect(state => ({
    darkMode: checkDarkMode(state.user.me)
}))(Modal);
