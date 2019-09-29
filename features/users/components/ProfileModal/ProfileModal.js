import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { Link } from "~/routes";
import { connect } from "react-redux";
import ActivitySparklines from "~/features/stats/components/ActivitySparklines";
import FullName from "../FullName";
import GatedFollowButton from "../GatedFollowButton";
import { ProductList, ProductsContainer } from "~/features/products";

// make low performance css and include conditionally

const ProfileModal = props => (
    <Modal
        isOpen={props.isOpen}
        onRequestClose={props.onRequestClose}
        className="ProfileModal"
        overlayClassName="ProfileModalOverlay"
    >
        <div className="ProfileModal-Container">
            <div className="ProfileModal-Column ProfileModal-Header">
                <div>
                    <Link to={`/@${props.user.username}`}>
                        <img
                            className="ProfileModal-Avatar"
                            src={props.user.avatar}
                            alt={props.user.username}
                        />
                    </Link>
                    <h2>
                        <FullName user={props.user} />
                    </h2>
                    <p>
                        {props.user.description
                            ? props.user.description
                            : "I don't have a bio yet."}
                    </p>
                    <GatedFollowButton userId={props.user.id} />
                </div>
            </div>
            <div className="ProfileModal-Column ProfileModal-Content">
                <h3>
                    <FullName user={props.user} />
                    's Activity
                </h3>
                <ActivitySparklines trend={props.user.activity_trend} />
                <hr />
                <h3>Products</h3>
                <ProductsContainer
                    user={props.user.id}
                    component={props => <ProductList thumbnail {...props} />}
                />
                <hr />
                <div className={"center"}>
                    <Link to={`/@${props.user.username}`}>
                        View full profile &raquo;
                    </Link>
                </div>
            </div>
        </div>
    </Modal>
);

ProfileModal.propTypes = {
    user: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    me: state.user.me,
    isLoggedIn: state.auth.loggedIn
});

export default connect(mapStateToProps)(ProfileModal);
