export type ProductListItem = {
    pid: number;
    name: string;
    imageUrl: string;
    price: number;
    hasStock: boolean;
};

export type ProductDetailItem = {
    pid: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    stock: number;
};