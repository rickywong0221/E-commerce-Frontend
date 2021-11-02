import React from 'react';
import {Button, Card, Container} from 'react-bootstrap';
import Navbar from "../../component/Navbar";
import "./index.css";
import {ProductListItem} from "../../../data/product";
import {getAllProducts} from "../../../resource/productResource";
import {Link, RouteComponentProps, withRouter} from 'react-router-dom';
import CarouselPage from "../../component/CarouselPage";

type Props = RouteComponentProps & {};
type State = {
    products: ProductListItem[] | undefined
};

class ProductListingPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            products: undefined
        };

        this.onLoadedProductList = this.onLoadedProductList.bind(this);
    }

    componentDidMount() {
        getAllProducts(this.onLoadedProductList);
    }

    onLoadedProductList(isSuccess: boolean, data: ProductListItem[] | string) {
        if (isSuccess) {
            this.setState({
                products: data as ProductListItem[]
            })
        } else {
            alert(data);
        }
    }

    render() {
        return (
            <div className="productListingPage">
                <Navbar/>

                <Container>
                    <CarouselPage/>
                    <div className="d-flex flex-row justify-content-center flex-wrap">
                        {
                            this.state.products?.map((item) => (
                                <Card
                                    className="item"
                                    key={item.pid}
                                    style={{width: '18rem'}}
                                >
                                    <div
                                        className="image"
                                        style={{
                                            backgroundImage: `url('${item.imageUrl}')`,
                                        }}
                                    />

                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>${item.price}</Card.Text>
                                        <Button
                                            variant="outline-info"
                                            onClick={() => {
                                                this.props.history.push(`/details/${item.pid}/${item.name}`);
                                            }}
                                        >
                                            View Details
                                        </Button>
                                    </Card.Body>
                                </Card>
                            ))
                        }

                    </div>
                </Container>
            </div>
        );
    }
}

export default withRouter(ProductListingPage);