import axios from "axios";
import {getConfig} from "../config/Config";
import AuthService from "../service/AuthService";
import {Transaction} from "../data/transaction";

export function getTransaction(tid: number, callback: (isSuccess: boolean, data: Transaction | string) => void) {
    AuthService.getAccessToken()
        .then((accessToken) => {
            return axios.get<Transaction>(`${getConfig().serverBaseUrl}/transaction/tid/${tid}`, {
                headers: {
                    Authorization: "Bearer " + accessToken
                }
            });
        })
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

export function prepareTransaction(callback: (isSuccess: boolean, data: Transaction | string) => void) {
    AuthService.getAccessToken()
        .then((accessToken) => {
            return axios.post<Transaction>(`${getConfig().serverBaseUrl}/transaction/prepare`, null, {
                headers: {
                    Authorization: "Bearer " + accessToken
                }
            });
        })
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

export function payTransaction(pid: number, callback: (isSuccess: boolean, data: Transaction | string) => void) {
    AuthService.getAccessToken()
        .then((accessToken) => {
            return axios.patch<Transaction>(`${getConfig().serverBaseUrl}/transaction/tid/${pid}/pay`, null, {
                headers: {
                    Authorization: "Bearer " + accessToken
                }
            });
        })
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