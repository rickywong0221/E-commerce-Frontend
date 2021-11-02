import {ProductDetailItem} from "./product";

export type TransactionItem = {
    tpid: number;
    quantity: number;
    product: ProductDetailItem;
    subtotal: number;
}

export type Transaction = {
    tid: number;
    buyerUid: number;
    datetime: string;
    status: string;
    total: number;
    items: TransactionItem[];
}