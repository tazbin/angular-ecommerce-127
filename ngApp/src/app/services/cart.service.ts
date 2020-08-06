import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartModelServer, CartModelClient } from '../models/cart.model';
import { ProductService } from './product.service';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // variable for server side storage
  private cartDataServer: CartModelServer = {
    total: 0,
    items: [{
        product: undefined,
        quantity: 0
    }]
  }

  // variable for client side storage
  private CartDataClient: CartModelClient = {
    total: 0,
    products: [{
        id: '',
        quantity: 0
    }]
  }

  // observable for emmiting any change detection
  cartData$ = new BehaviorSubject<CartModelServer>(this.cartDataServer);

  constructor(
    private _productService: ProductService
  ) {

    this.cartData$.next(this.cartDataServer);

    // getting local storage cart
    // localStorage.setItem('cart', JSON.stringify(this.CartDataClient));
    let info: CartModelClient = JSON.parse(localStorage.getItem('cart'));
    
    if( info != null && info != undefined){
      let total: number = 0;

      info.products.forEach( e => {
        this._productService.getSingleProduct(e.id)
        .subscribe((res: ProductModel) => {

          // cart data server is empty
          if( this.cartDataServer.items[0].product == undefined ){
            
            this.cartDataServer.items[0].product = res;
            this.cartDataServer.items[0].quantity = e.quantity;
            this.cartDataServer.total += (e.quantity * res.price);

            this.CartDataClient.products[0].id = e.id;
            this.CartDataClient.products[0].quantity = e.quantity;

            this.CartDataClient.total += (e.quantity * res.price);
            localStorage.setItem('cart', JSON.stringify(this.CartDataClient));
          } else{
            // cart data is not empty
            this.cartDataServer.items.push({
              product: res,
              quantity: e.quantity
            });
            this.cartDataServer.total += (e.quantity * res.price);

            this.CartDataClient.products.push({
              id: res._id,
              quantity: e.quantity
            });

            this.CartDataClient.total += (e.quantity * res.price);
            localStorage.setItem('cart', JSON.stringify(this.CartDataClient));
          }

        });
      });

      this.cartData$.next(this.cartDataServer);
    }

  } /* constructor end */

  addToCart(id: string){
    this._productService.getSingleProduct(id)
    .subscribe( (p: ProductModel) => {

      // product has stock
      if( p.stock >= 1 ){
        // cart data server is empty
        if( this.cartDataServer.items[0].product == undefined ){

          this.cartDataServer.items[0].product = p;
          this.cartDataServer.items[0].quantity = 1;
          this.cartDataServer.total = p.price;

          this.CartDataClient.products[0].id = p._id;
          this.CartDataClient.products[0].quantity = 1;
          this.CartDataClient.total = p.price;

          localStorage.setItem('cart', JSON.stringify(this.CartDataClient));
          this.cartData$.next(this.cartDataServer);
      
        }
        // cart data server is not empty
        else{

          // is this products already added?
          const index = this.cartDataServer.items.findIndex( prod => prod.product._id == p._id);
          
          // new products
          if( index == -1 ){
            this.cartDataServer.items.push({
              product: p,
              quantity: 1
            });
            this.cartDataServer.total += p.price;
  
            this.CartDataClient.products.push({
              id: p._id,
              quantity: 1
            });
            this.CartDataClient.total += p.price;
          }
          // old products
          else{
            if( p.stock > this.cartDataServer.items[index].quantity ){
              this.cartDataServer.items[index].quantity++;
            this.cartDataServer.total += p.price

            this.CartDataClient.products[index].quantity++;
            this.CartDataClient.total += p.price
            }
          }

          localStorage.setItem('cart', JSON.stringify(this.CartDataClient));
          this.cartData$.next(this.cartDataServer);

        }
      } 
      // product has no stock
      else{
        return;
      }

    });
  }

  removeFromCart(index: number){
    console.log(index);

    const cost = this.cartDataServer.items[index].product.price * this.cartDataServer.items[index].quantity;
    this.cartDataServer.items.splice(index, 1);
    this.cartDataServer.total -= cost;
    if( this.cartDataServer.total == 0 ){
       this.cartDataServer = {
        total: 0,
        items: [{
            product: undefined,
            quantity: 0
        }]
      }
   }
    this.cartData$.next(this.cartDataServer);

    this.CartDataClient.products.splice(index, 1);
    this.CartDataClient.total -= cost;
    if( this.CartDataClient.total == 0 ){
       this.CartDataClient = {
        total: 0,
        products: [{
            id: '',
            quantity: 0
        }]
      }
      // localStorage.setItem('cart', JSON.stringify(this.CartDataClient));
      localStorage.removeItem('cart');
    } else{
      localStorage.setItem('cart', JSON.stringify(this.CartDataClient));
    }
  }

}
