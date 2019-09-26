import PropTypes from "prop-types";
import React from "react";
import sizeMe from "react-sizeme";
import Confetti from "react-confetti";

export default sizeMe({
    monitorHeight: true,
    monitorWidth: true
})(
    class SizedConfetti extends React.Component {
        static propTypes = {
            size: PropTypes.shape({
                width: PropTypes.number,
                height: PropTypes.number,
                position: PropTypes.string
            })
        };

        render() {
            const { width, height } = this.props.size;
            return (
                <span
                    style={{
                        position: "absolute",
                        top: -20,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none"
                    }}
                >
                    <Confetti
                        recycle={false}
                        numberOfPieces={100}
                        {...this.props.size}
                    />
                </span>
            );
        }
    }
);
