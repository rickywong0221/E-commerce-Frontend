import axios from "axios";
import {getConfig} from "../config/Config";
import {ProductDetailItem, ProductListItem} from "../data/product";

export function getAllProducts(callback: (isSuccess: boolean, data: ProductListItem[] | string) => void) {
    axios.get<ProductListItem[]>(`${getConfig().serverBaseUrl}/public/product/all`)
        .then((response) => {
            if (response.status === 200) {
                callback(true, response.data);
            } else {
                callback(false, response.statusText);
            }
        })
        .catch((err) => {
            callback(false, err);
        });
}

export function getProductDetails(productId: number, callback: (isSuccess: boolean, data: ProductDetailItem | string) => void) {
    axios.get<ProductDetailItem>(`${getConfig().serverBaseUrl}/public/product/id/${productId}`)
        .then((response) => {
            if (response.status === 200) {
                callback(true, response.data);
            } else {
                callback(false, response.statusText);
            }
        })
        .catch((err) => {
            callback(false, err);
        })
}