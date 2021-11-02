import React from 'react';
import {Button, Spinner} from "react-bootstrap";
import ItemList from "../../component/ItemList";
import {getTransaction, payTransaction} from "../../../resource/transactionResource";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Transaction} from "../../../data/transaction";

type Params = {
    transactionId: string
};

type Props = RouteComponentProps<Params> & {};
type State = {
    transaction: Transaction | undefined
};

class CheckoutPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            transaction: undefined
        }

        this.payTransaction = this.payTransaction.bind(this);
    }

    componentDidMount() {
        getTransaction(
            +this.props.match.params.transactionId,
            (isSuccess, data) => {
                if (isSuccess) {
                    this.setState({
                        transaction: data as Transaction
                    });
                } else {
                    alert("Transaction does not exist");
                    this.props.history.replace("/");
                }
            })
    }

    payTransaction() {
        payTransaction(
            +this.props.match.params.transactionId,
            (isSuccess, data) => {
                if (isSuccess) {
                    this.props.history.push("/thankyou");
                } else {
                    alert("Payment failed!");
                }
            })
    }

    render() {
        return (
            <div>
                <h1>Checkout</h1>
                <br/>
                <ItemList
                    items={
                        this.state.transaction ? (
                            this.state.transaction?.items.map((item) => {
                                return {
                                    id: item.tpid,
                                    imageUrl: item.product.imageUrl,
                                    name: item.product.name,
                                    price: item.product.price,
                                    quantity: item.quantity,
                                    subtotal: item.subtotal
                                }
                            })
                        ) : []
                    }
                    editable={false}
                />

                <h3>Total: {this.state.transaction?.total}</h3>

                <input/>

                <br/><br/>

                <Button
                    variant="primary"
                    onClick={this.payTransaction}
                >
                    Pay now
                </Button>
            </div>
        );
    }
}

export default withRouter(CheckoutPage);