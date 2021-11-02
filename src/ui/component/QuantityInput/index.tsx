import React from "react";
import "./index.css";

type Props = {
    quantity: number,
    updateQuantity: (quantity: number) => void
};

type State = {};

export default class QuantityInput extends React.Component<Props, State> {
    render() {
        return (
            <div className="quantityInput">
                <button onClick={() => this.props.updateQuantity(this.props.quantity - 1)}>-</button>
                <div>{this.props.quantity}</div>
                <button onClick={() => this.props.updateQuantity(this.props.quantity + 1)}>+</button>
            </div>
        );
    }
}