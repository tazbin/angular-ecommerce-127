import { ProductModel } from './product.model';

// cartDataServer
export interface CartModelServer{
    total: number;
    items: [{
        product: ProductModel;
        quantity: number
    }]
}

// localStorage info
// cartDataClient
export interface CartModelClient{
    total: number;
    products: [{
        id: string;
        quantity: number
    }]
}