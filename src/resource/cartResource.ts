import axios from "axios";
import {getConfig} from "../config/Config";
import AuthService from "../service/AuthService";
import {CartItem} from "../data/cart";
import {Result} from "../data/general";

export function addProductToCart(pid: number, quantity: number, callback: (isSuccess: boolean, data: Result | string) => void) {
    try {
        AuthService.getAccessToken()
            .then((accessToken) => {
                return axios.put<Result>(`${getConfig().serverBaseUrl}/cart/add-item/${pid}/quantity/${quantity}`, null, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                })
            })
            .then((response) => {
                if (response.status === 200) {
                    callback(true, response.data);
                } else {
                    callback(false, response.statusText);
                }
            })
            .catch((err) => {
                console.error(err);
                callback(false, err);
            });
    } catch (err) {
        if (err instanceof Error && (err as Error).message === "No active session") {
            callback(false, "SESSION_ERROR");
        }
    }
}

export function updateCartItemQuantity(pid: number, quantity: number, callback: (isSuccess: boolean, data: CartItem | string) => void) {
    try {
        AuthService.getAccessToken()
            .then((accessToken) => {
                return axios.patch<CartItem>(`${getConfig().serverBaseUrl}/cart/${pid}/quantity/${quantity}`, null, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                })
            })
            .then((response) => {
                if (response.status === 200) {
                    callback(true, response.data);
                } else {
                    callback(false, response.statusText);
                }
            })
            .catch((err) => {
                console.error(err);
                callback(false, err);
            });
    } catch (err) {
        if (err instanceof Error && (err as Error).message === "No active session") {
            callback(false, "SESSION_ERROR");
        }
    }
}

export function getCart(callback: (isSuccess: boolean, data: CartItem[] | string) => void) {
    try {
        AuthService.getAccessToken()
            .then((accessToken) => {
                return axios.get<CartItem[]>(`${getConfig().serverBaseUrl}/cart/all`, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                })
            })
            .then((response) => {
                if (response.status === 200) {
                    callback(true, response.data);
                } else {
                    callback(false, response.statusText);
                }
            })
            .catch((err) => {
                console.error(err);
                callback(false, err);
            });
    } catch (err) {
        if (err instanceof Error && (err as Error).message === "No active session") {
            callback(false, "SESSION_ERROR");
        }
    }
}

export function deleteItemFromCart(pid: number, callback: (isSuccess: boolean, data: Result | string) => void) {
    try {
        AuthService.getAccessToken()
            .then((accessToken) => {
                return axios.delete<Result>(`${getConfig().serverBaseUrl}/cart/remove-item/${pid}`, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                })
            })
            .then((response) => {
                if (response.status === 200) {
                    callback(true, response.data);
                } else {
                    callback(false, response.statusText);
                }
            })
            .catch((err) => {
                console.error(err);
                callback(false, err);
            });
    } catch (err) {
        if (err instanceof Error && (err as Error).message === "No active session") {
            callback(false, "SESSION_ERROR");
        }
    }
}