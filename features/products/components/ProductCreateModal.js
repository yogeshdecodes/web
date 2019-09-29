import React from "react";
import Modal from "../../../components/Modal/index";
import ProductCreateWizard from "./ProductCreateWizard/index";

class ProductCreateModal extends React.Component {
    render() {
        return (
            <Modal open={this.props.open} onClose={this.props.onClose}>
                <Modal.Content verticallyCentered={true} flexRatio={2}>
                    <ProductCreateWizard onFinish={this.props.onFinish} />
                </Modal.Content>
            </Modal>
        );
    }
}

export default ProductCreateModal;
