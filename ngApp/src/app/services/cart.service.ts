import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private _productService: ProductsService
  ) { }

  addToCart(id: string, quantity = 1){
    let cartPublicModel: cartPublicModel[] = JSON.parse(localStorage.getItem('cart'));
    // cart is empty
    if( cartPublicModel == null || cartPublicModel == undefined || cartPublicModel.length == 0 ){
      this._productService.decreaseStock(id)
                .subscribe(
                  
                );
      cartPublicModel = [
      {
        id: id,
        quantity: quantity
      }
      ];
      // set new cart
    localStorage.setItem('cart', JSON.stringify(cartPublicModel));
    } 
    // cart has some products
    else{
      let hasCart = 0;
      // old products quantity increasing
      cartPublicModel.find(cart => {
        if( cart.id == id ){
          this._productService.getSingleProducts(id)
          .subscribe(
            res => {
              const productDetails:any = res;
              if( productDetails.stock >= quantity ){
                cart.quantity+=quantity;
                this._productService.decreaseStock(id)
                .subscribe(
                  
                );
                // set new cart
                localStorage.setItem('cart', JSON.stringify(cartPublicModel));
              }
            }
          )
          hasCart++;
        }
      });
      // new products adding
      if( hasCart == 0 ){
        let newcart = {
          id: id,
          quantity: quantity
        };
        this._productService.decreaseStock(id)
                .subscribe(
                  
                );
        cartPublicModel.push(newcart);
        // set new cart
      localStorage.setItem('cart', JSON.stringify(cartPublicModel));
      }
    }
  }

}

export interface cartPublicModel{
  id: string;
  quantity: number;
}
