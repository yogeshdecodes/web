import React, { Component } from "react";
import Modal from "~/components/Modal";
import SubscribeForm from "../SubscribeForm";
import "./index.scss";

class SubscribeModal extends Component {
    render() {
        return (
            <Modal
                modalClassName="Modal panel"
                open={this.props.open}
                onClose={this.props.onClose}
            >
                <Modal.Content>
                    <div className="SubscribeModal">
                        <div className="mb-em">
                            <h3>Subscribe to the newsletter</h3>
                            <p>
                                Join over 5,000 makers reading success stories
                                and growth tips from up-and-coming founders.
                            </p>
                        </div>
                        <div>
                            <SubscribeForm />
                        </div>
                    </div>
                </Modal.Content>
            </Modal>
        );
    }
}

export default SubscribeModal;
