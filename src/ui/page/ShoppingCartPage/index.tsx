import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {Button, Container, Spinner, Table} from "react-bootstrap";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../component/Navbar";
import {deleteItemFromCart, getCart, updateCartItemQuantity} from "../../../resource/cartResource";
import {CartItem} from "../../../data/cart";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {prepareTransaction} from "../../../resource/transactionResource";
import {Transaction} from "../../../data/transaction";
import ItemList, {Item} from "../../component/ItemList";
import "./index.css";

type Props = RouteComponentProps & {};
type State = {
    cart: CartItem[] | undefined,
    isLoading: boolean
};

class ShoppingCartPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            cart: undefined,
            isLoading: false
        };
        this.onLoadedCartData = this.onLoadedCartData.bind(this);
        this.onPreparedTransaction = this.onPreparedTransaction.bind(this);
        this.onItemQuantityChanged = this.onItemQuantityChanged.bind(this);
        this.onItemDeleted = this.onItemDeleted.bind(this);
    }

    componentDidMount() {
        getCart(this.onLoadedCartData);
    }

    onLoadedCartData(isSuccess: boolean, data: CartItem[] | string): void {
        if (isSuccess) {
            this.setState({
                cart: data as CartItem[]
            })
        } else {
            if (data === "SESSION_ERROR") {
                alert("Please login before use.");
                this.props.history.replace(`/sign-in?from=${this.props.location.pathname}`);
                return;
            }
            alert(data);
        }
    }

    onPreparedTransaction(isSuccess: boolean, data: Transaction | string): void {
        if (isSuccess) {
            const transaction = data as Transaction;
            this.props.history.push(`/checkout/${transaction.tid}`);
        } else {
            alert(data);
        }
        this.setState({
            isLoading: false
        });
    }

    toItems(cartItems: CartItem[]): Item[] {
        return cartItems.map((item) => {
            return {
                id: item.pid,
                name: item.name,
                price: item.price,
                imageUrl: item.imageUrl,
                subtotal: item.price * item.cartQuantity,
                quantity: item.cartQuantity
            };
        });
    }

    onItemQuantityChanged(pid: string | number, quantity: number) {
        updateCartItemQuantity(pid as number, quantity, (isSuccess, data) => {
            if (isSuccess) {
                const newCart: CartItem[] = [];
                for (let cartItem of this.state.cart!) {
                    if (cartItem.pid === pid) {
                        newCart.push(data as CartItem);
                    } else {
                        newCart.push(cartItem);
                    }
                }

                this.setState({
                    cart: newCart
                });
            }
        })
    }

    onItemDeleted(pid: string | number) {
        deleteItemFromCart(pid as number, (isSuccess, data) => {
            if (isSuccess) {
                const newCart: CartItem[] = [];
                for (let cartItem of this.state.cart!) {
                    if (cartItem.pid !== pid) {
                        newCart.push(cartItem);
                    }

                    this.setState({
                        cart: newCart
                    });
                }
            }
        })
    }

    render() {
        let total = 0;
        for(const item of this.state.cart || []) {
            total += item.price * item.cartQuantity;
        }

        let overlayClassName = "loadingOverlay";
        if (this.state.isLoading) {
            overlayClassName += " active";
        }

        return (
            <div>
                <Navbar/>
                <Container>
                    <h1>Shopping Cart</h1>
                    <ItemList
                        items={this.toItems(this.state.cart || [])}
                        updateItemQuantity={this.onItemQuantityChanged}
                        deleteItem={this.onItemDeleted}
                        editable={true}
                    />

                    <h3>Total: ${total}</h3>

                    {
                        (this.state.cart && this.state.cart?.length > 0) && (
                            <Button
                                variant="primary"
                                onClick={() => {
                                    this.setState({
                                        isLoading: true
                                    });
                                    prepareTransaction(this.onPreparedTransaction)
                                }}
                            >
                                Checkout
                            </Button>
                        )
                    }

                </Container>
                <div className={overlayClassName}>
                    <Spinner animation="border" variant="primary" />
                </div>
            </div>
        );
    }
}

export default withRouter(ShoppingCartPage);