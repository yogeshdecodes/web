import {
    addProductToEvent,
    getEventsForProduct,
    getEventsForUser,
    removeProductFromEvent
} from "../../../../lib/events";
import { Link } from "~/routes";
import React from "react";
import Spinner from "~/components/Spinner";
import { hasEnded } from "../../../../lib/utils/events";
import { imageUrl } from "../../../../lib/utils/img";
import ErrorMessageList from "~/components/forms/ErrorMessageList";
import { deleteProduct, leaveProduct } from "../../../../lib/products";
import isFunction from "lodash/isFunction";
import { loadingClass } from "~/lib/utils/random";

class DangerZone extends React.Component {
    state = {
        deleting: false
    };

    componentDidMount() {}

    onDelete = async () => {
        this.setState({
            deleting: true
        });
        try {
            if (this.props.isOwner) {
                await deleteProduct(this.props.product.slug);
            } else {
                await leaveProduct(this.props.product.slug);
            }
            this.setState({
                deleting: false,
                errorMessages: null
            });

            if (isFunction(this.props.onDelete)) {
                this.props.onDelete();
            }
        } catch (e) {
            this.setState({
                deleting: false,
                errorMessages: e.field_errors || e.message
            });
        }
    };

    render() {
        const { loading, joinable, joined, failed } = this.state;
        const { isOwner } = this.props;

        if (loading) return <Spinner small text="Loading events..." />;
        if (failed)
            return (
                <button onClick={this.fetchEvents}>
                    Failed to load. Click to retry.
                </button>
            );

        return (
            <div>
                <ErrorMessageList fieldErrors={this.state.errorMessages} />
                <div className="flex flex-column flex-v-gap-half ">
                    <div>
                        <button
                            onClick={this.onDelete}
                            className={loadingClass(
                                "btn btn-delete",
                                this.state.deleting
                            )}
                        >
                            {isOwner ? "Delete" : "Leave"} product
                        </button>
                    </div>
                    <div>
                        <p className="help">
                            This is irreversible. Your tasks won't be deleted.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default DangerZone;
