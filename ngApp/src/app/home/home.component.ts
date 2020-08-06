import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ProductModel } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { CartModelServer } from '../models/cart.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allProducts: ProductModel[] = [];
  myCart: any;

  constructor(
    private _productService: ProductService,
    private _cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this._cartService.cartData$
    .subscribe(res => this.myCart = res);
  }

  // getting all product list from server
  getAllProducts(){
    this._productService.getAllProducts()
    .subscribe( (res: ProductModel[]) => {
      this.allProducts = res;
    })
  }

  // adding product to cart
  addToCart(id: string){
    this._cartService.addToCart(id);
  }


}
