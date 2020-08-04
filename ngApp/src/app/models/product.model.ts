export interface ProductModelServer{
    id: string;
    name: string;
    description: string,
    category: string,
    images: string,
    price: number,
    stock: number
}

export interface ServerResponse{
    products: ProductModelServer[]
}