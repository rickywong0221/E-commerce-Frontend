import React from 'react';
import {Breadcrumb, Button, Container, Spinner, Toast} from 'react-bootstrap';
import {Link, RouteComponentProps, withRouter } from 'react-router-dom';
import Navbar from "../../component/Navbar";
import {ProductDetailItem} from "../../../data/product";
import {getProductDetails} from "../../../resource/productResource";
import QuantityInput from "../../component/QuantityInput";
import {addProductToCart} from "../../../resource/cartResource";
import "./index.css";

type Params = {
    productId: string,
    productName: string
};

type Props = RouteComponentProps<Params> & {};
type State = {
    detail: ProductDetailItem | undefined,
    quantity: number,
    isShowNotification: boolean,
    isNotFound: boolean
};

class ProductDetailPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            detail: undefined,
            quantity: 1,
            isShowNotification: false,
            isNotFound: false
        };

        this.onLoadedDetail = this.onLoadedDetail.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
        this.onClickAddToCart = this.onClickAddToCart.bind(this);
    }

    componentDidMount() {
        getProductDetails(+this.props.match.params.productId, this.onLoadedDetail);
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
        if (prevProps.match.params.productId !== this.props.match.params.productId) {
            getProductDetails(+this.props.match.params.productId, this.onLoadedDetail);
        }
        if (!this.state.isNotFound && this.state.detail?.name !== this.props.match.params.productName) {
            this.props.history.replace(`/details/${this.props.match.params.productId}/${this.state.detail?.name}`);
        }
    }

    onLoadedDetail(isSuccess: boolean, data: ProductDetailItem | string) {
        if (isSuccess) {
            this.setState({
                    isNotFound: false,
                    detail: data as ProductDetailItem
                }
                // , () => {
                //     this.props.history.replace(`/details/${this.state.detail?.pid}/${this.state.detail?.name}`)
                // }
            );
        } else {
            this.setState({
                isNotFound: true
            })
        }
    }

    updateQuantity(quantity: number) {
        if (quantity < 1 || quantity > this.state.detail!.stock) {
            return;
        }
        // {quantity: quantity} === {quantity}
        this.setState({quantity});
    }

    onClickAddToCart() {
        addProductToCart(
            this.state.detail!.pid,
            this.state.quantity,
            (isSuccess, data) => {
                if (isSuccess) {
                    this.setState({
                        isShowNotification: true
                    });
                }
            }
        )
    }

    render() {
        return (
            <div>
                <Navbar/>

                <Container>
                    {
                        (this.state.isNotFound) ? (
                            <div>404</div>
                        ) : (this.state.detail) ? (
                            <div>
                                <Breadcrumb>
                                    <Breadcrumb.Item><Link to="/">Product List</Link></Breadcrumb.Item>
                                    <Breadcrumb.Item active>{this.state.detail.name}</Breadcrumb.Item>
                                </Breadcrumb>

                                <div className="description-page">
                                    <div className="image-frame">
                                        <img src={this.state.detail.imageUrl}/>
                                    </div>
                                    <div className="description-box">
                                        <h1>{this.state.detail.name}</h1>
                                        <h3>${this.state.detail.price}</h3>
                                        <p>{this.state.detail.description}</p>

                                        {
                                            (this.state.detail?.stock > 0) ? (
                                                <>
                                                    <QuantityInput quantity={this.state.quantity} updateQuantity={this.updateQuantity}/>
                                                    <br/>
                                                    <Button variant="primary" onClick={this.onClickAddToCart}>Add to cart</Button>
                                                </>
                                            ) : (
                                                <p><b>Out of stock</b></p>
                                            )
                                        }
                                    </div>
                                </div>



                            </div>
                        ) : (
                            <Spinner animation="border" variant="primary" />
                        )
                    }
                </Container>

                <div className="notification-toast">
                    <Toast
                        show={this.state.isShowNotification}
                        onClose={() => {
                            this.setState((prevState) => {
                                return {
                                    isShowNotification: !prevState.isShowNotification
                                }
                            })
                        }}
                    >
                        <Toast.Header>
                            <strong className="me-auto">Added to Shopping Cart</strong>
                        </Toast.Header>
                        <Toast.Body>Hooray, Product {this.state.detail?.name} has been added to your shopping cart!</Toast.Body>
                    </Toast>
                </div>

            </div>
        );
    }
}

export default withRouter(ProductDetailPage);