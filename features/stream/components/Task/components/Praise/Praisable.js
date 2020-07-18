import React from "react";
import debounce from "lodash/debounce";
import PraiseCount from "./PraiseCount";
import { mapStateToProps } from "~/ducks/user";
import Emoji from "../../../../../../components/Emoji";
import styled from "styled-components";
import { Router } from "~/routes";
import { connect } from "react-redux";
import { isServer } from "~/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { prefetch, praise } from "~/lib/praise";
import FaceStack from "~/features/users/components/FaceStack";
import uniqBy from "lodash/uniqBy";

const PraiseButton = styled.button``;

class Praisable extends React.Component {
    state = {
        loading: true,
        redirecting: false,
        praising: false,
        total: this.props.initialAmount,
        praised: false,
        praised_by: [],
        praiseStatus: null
    };

    componentDidUpdate(prevProps) {
        if (
            this.props.indexUrl &&
            prevProps.indexUrl &&
            this.props.initialAmount !== prevProps.initialAmount
        ) {
            // reset praise on update
            this.setState({
                total: this.props.initialAmount
            });
        }
    }

    componentDidMount() {
        if (this.props.initialAmount > 0) {
            this.prefetch();
        }
    }

    prefetch = async () => {
        try {
            this.setState({ loading: true, praised: false, praised_by: [] });
            const { total, praised, praised_by } = await prefetch(
                this.props.indexUrl
            );
            this.setState({
                loading: false,
                total,
                praised,
                praised_by
            });
        } catch (e) {}
    };

    getUserObject = () => {
        if (this.props.item.user) return this.props.item.user;
        if (this.props.item.owner) return this.props.item.owner;
        return { id: false };
    };

    onClick = async () => {
        if (!this.props.isLoggedIn) {
            this.setState({ redirecting: true });
            Router.pushRoute("start").then(e => {
                if (!isServer) {
                    window.scrollTo(0, 0);
                }
            });
            return;
        }

        try {
            const payload = { praising: true };
            if (this.state.praised) {
                payload.praised = false;
                payload.total = this.state.total - 1;
                if (this.props.me) {
                    payload.praised_by = this.state.praised_by.filter(
                        u => u.id !== this.props.me.id
                    );
                }
            } else {
                payload.praised = true;
                payload.total = this.state.total + 1;
                if (this.props.me) {
                    payload.praised_by = uniqBy(
                        [...this.state.praised_by, this.props.me],
                        "id"
                    );
                }
            }
            this.setState(payload);
            const { praised, user, total } = await praise(this.props.indexUrl);
            this.setState({
                praising: false,
                praised,
                total
            });
        } catch (e) {}
    };

    renderPraiseButton = (clickable = false) => {
        if (this.state.redirecting) {
            return (
                <button
                    className={
                        "PraiseButton btn-small btn-praise has-text-warning" +
                        (this.state.praised ? " praised" : "") +
                        " " +
                        (this.props.className ? this.props.className : "")
                    }
                >
                    <span className="mr-qt">
                        <FontAwesomeIcon
                            icon={this.state.praised ? "star" : ["far", "star"]}
                        />
                    </span>{" "}
                    <span>You must join to praise.</span>
                    {this.props.withFaces &&
                    this.state.praised_by.length > 0 ? (
                        <div className="ml-em-half" style={{ height: 24 }}>
                            <FaceStack users={this.state.praised_by} />
                        </div>
                    ) : null}
                </button>
            );
        }

        return (
            <button
                onClick={this.onClick}
                className={
                    "PraiseButton btn-small btn-praise" +
                    (this.state.praised ? " praised" : "") +
                    " " +
                    (this.props.className ? this.props.className : "")
                }
            >
                <span className="mr-qt">
                    <FontAwesomeIcon
                        icon={this.state.praised ? "star" : ["far", "star"]}
                    />
                </span>{" "}
                {this.state.praised ? (
                    <strong>Praised</strong>
                ) : (
                    <>{this.state.total} praise</>
                )}
                {this.props.withFaces && this.state.praised_by.length > 0 ? (
                    <div className="ml-em-half" style={{ height: 24 }}>
                        <FaceStack users={this.state.praised_by} />
                    </div>
                ) : null}
            </button>
        );
    };

    render() {
        return (
            <>
                {!this.props.button && <>{this.props.children} &nbsp;</>}{" "}
                {(this.props.expanded || this.props.button) &&
                this.props.me &&
                this.props.me.id !== this.getUserObject().id ? (
                    this.renderPraiseButton()
                ) : (
                    <PraiseCount
                        button={
                            !this.props.textForSameUser && this.props.button
                        }
                        amount={this.state.total}
                    />
                )}
            </>
        );
    }
}

Praisable.defaultProps = {
    textForSameUser: false
};

export default connect(mapStateToProps)(Praisable);
