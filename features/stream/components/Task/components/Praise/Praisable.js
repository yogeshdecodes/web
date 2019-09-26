import React from "react";
import { debounce } from "lodash-es";
import PraiseCount from "./PraiseCount";
import { withCurrentUser } from "features/users";
import { setPraise } from "lib/praise";
import Repeatable from "react-repeatable";
import Emoji from "../../../../../../components/Emoji";
import { incrementPraise } from "../../../../../../lib/praise";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

const PraiseButton = styled.button``;

class Praisable extends React.Component {
    maxPraise = 100;
    praiseToAdd = 5;

    constructor(props) {
        super(props);

        this.state = {
            checked: false,
            isPraising: false,
            canPraise: false,
            amount: 0,
            total: this.props.initialAmount,
            failed: false,
            loggedOutError: false,
            redirecting: false,
            tooMuchPraise: false,
            clicked: false,
            done: false
        };
    }

    getUserPraise = () => {
        return 0;
    };

    componentDidMount() {}

    onStart = async () => {
        await this.canPraise();
        this.setState({
            checked: true,
            clicked: true,
            done: false
        });
    };

    onRelease = () => {
        this.setState({
            clicked: false
        });
    };

    checkPraiseStatus = () => {
        if (!this.props.isLoggedIn) {
            this.setState({ loggedOutError: true });
            setTimeout(() => this.setState({ redirecting: true }), 1000);
            this.fadeErr();
            return false;
        }

        if (this.props.user.id === this.getUserObject().id) {
            return false;
        }
        console.log(this.state.amount, this.getUserPraise(), this.state.total);

        if (
            this.getUserPraise() > this.maxPraise ||
            this.state.amount + 1 > this.maxPraise ||
            this.getUserPraise() + this.state.amount + this.praiseToAdd >
                this.maxPraise ||
            this.getUserPraise() + this.praiseToAdd > this.maxPraise
        ) {
            this.setState({ tooMuchPraise: true });
            this.fadeErr();
            return false;
        }

        return true;
    };

    fadeErr = debounce(() => {
        setTimeout(
            () =>
                this.setState({
                    tooMuchPraise: false,
                    loggedOutError: false,
                    isPraising: false
                }),
            2000
        );
    }, 300);

    beginPraise = async () => {
        const canPraise = this.checkPraiseStatus();
        if (canPraise) {
            this.triggerIncrement();
        }
    };

    endPraise = async () => {
        await this.setState({
            isPraising: false,
            done: true
        });

        setTimeout(e => this.setState({ done: false }), 500);
        await this.setPraise();
    };

    setPraise = debounce(async () => {
        try {
            const task = await setPraise(
                this.props.indexUrl,
                this.state.amount
            );
            const total = task.praise - task.user_praised;
            this.setState({
                done: true,
                isPraising: false,
                total,
                amount: task.user_praised
            });
        } catch (e) {
            this.setState({ failed: true, amount: 0 });
        }
    }, 500);

    stopPropagation = () => {
        if (this.click) {
            this.click.stopPropagation();
        }
    };

    getUserObject = () => {
        if (this.props.item.user) return this.props.item.user;
        if (this.props.item.owner) return this.props.item.owner;
    };

    warn = () => {
        this.incrementPraise();
        this.setState({
            clicked: true
        });
        setTimeout(() => this.setState({ clicked: false }), 500);
    };

    triggerIncrement = () => {
        this.setState({
            isPraising: true,
            amount: this.state.amount + this.praiseToAdd
        });
        this.incrementPraise();
    };

    shouldAlwaysShowButton = () => {
        return window.matchMedia("only screen and (max-width: 760px)").matches;
    };

    incrementPraise = debounce(async () => {
        try {
            const praise = await incrementPraise(
                this.props.indexUrl,
                this.state.amount
            );
            const total = praise.total;
            this.setState({ done: true, isPraising: false, total, amount: 0 });
        } catch (e) {
            this.setState({ failed: true, tooMuchPraise: true, amount: 0 });
            this.fadeErr();
        }
    }, 300);

    componentDidUpdate(prevProps) {
        if (
            this.props.indexUrl &&
            prevProps.indexUrl &&
            this.props.initialAmount !== prevProps.initialAmount &&
            !this.state.isPraising
        ) {
            // reset praise on update
            this.setState({
                total: this.props.initialAmount
            });
        }
    }

    renderPraiseButton = () => (
        <Repeatable
            repeatDelay={100}
            onPress={this.beginPraise}
            repeatInterval={50}
            componentClass={PraiseButton}
            className={
                this.state.isPraising
                    ? "btn-praise praising"
                    : "btn-praise btn-gray"
            }
        >
            <Emoji emoji={"👏"} /> &nbsp;
            {this.state.isPraising &&
                !this.state.loggedOutError &&
                !this.state.tooMuchPraise &&
                "Yay! "}
            {!this.state.loggedOutError && !this.state.tooMuchPraise
                ? this.state.total + this.state.amount
                : null}
            {this.state.tooMuchPraise &&
                this.props.isLoggedIn &&
                "Too much praise!"}
            {this.state.loggedOutError &&
                "You must login to praise. Taking you there..."}
            {this.state.redirecting && <Redirect to={"/begin"} />}
        </Repeatable>
    );

    render() {
        return (
            <>
                {!this.props.button && <>{this.props.children} &nbsp;</>}{" "}
                {(this.props.expanded ||
                    this.props.button ||
                    this.shouldAlwaysShowButton()) &&
                this.props.me.id !== this.getUserObject().id ? (
                    this.renderPraiseButton()
                ) : (
                    <PraiseCount
                        button={this.props.button}
                        amount={this.state.total}
                    />
                )}
            </>
        );
    }
}

export default withCurrentUser(Praisable);
