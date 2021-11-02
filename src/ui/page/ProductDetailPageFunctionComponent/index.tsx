// Function component version of ProductDetailPage for your reference

import React, {useEffect, useRef, useState} from 'react';
import Navbar from "../../component/Navbar";
import {Breadcrumb, Button, Container, Spinner} from "react-bootstrap";
import {Link, RouteComponentProps, useHistory, useParams} from "react-router-dom";
import {ProductDetailItem} from "../../../data/product";
import {getProductDetails} from "../../../resource/productResource";

type Params = {
    productId: string,
    productName: string
};

type Props = {};

// A function copied from internet for providing value's previous content
// Reference: https://stackoverflow.com/questions/53446020/how-to-compare-oldvalues-and-newvalues-on-react-hooks-useeffect
function usePrevious<T>(value: any): T | undefined {
    const ref = useRef<T | undefined>();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export default function ProductDetailPageFunctionComponent(props: Props) {
    const [isNotFound, setIsNotFound] = useState(false);
    const [detail, setDetail] = useState<ProductDetailItem | undefined>(undefined);
    const pathParams = useParams<Params>();
    const history = useHistory();

    const prevPathParams: Params | undefined = usePrevious(pathParams);

    const onLoadedDetail = (isSuccess: boolean, data: ProductDetailItem | string) => {
        if (isSuccess) {
            setIsNotFound(false);
            setDetail(data as ProductDetailItem);
        } else {
            setIsNotFound(true);
        }
    }

    useEffect(() => {
        if (!prevPathParams || prevPathParams.productId !== pathParams.productId) {
            getProductDetails(+pathParams.productId, onLoadedDetail);
        }
        if (prevPathParams && !isNotFound && pathParams?.productName !== detail?.name) {
            history.replace(`/details/${pathParams.productId}/${detail?.name}`);
        }
    })

    return (
        <div>
            <Navbar/>

            <Container>
                {
                    (isNotFound) ? (
                        <div>404</div>
                    ) : (detail) ? (
                        <div>
                            <Breadcrumb>
                                <Breadcrumb.Item><Link to="/">Product List</Link></Breadcrumb.Item>
                                <Breadcrumb.Item active>{detail.name}</Breadcrumb.Item>
                            </Breadcrumb>

                            <img src={detail.imageUrl}/>
                            <h1>{detail.name}</h1>
                            <h3>${detail.price}</h3>
                            <p>{detail.description}</p>
                            <Button variant="primary">Add to cart</Button>
                        </div>
                    ) : (
                        <Spinner animation="border" variant="primary" />
                    )
                }
            </Container>
        </div>
    );
}