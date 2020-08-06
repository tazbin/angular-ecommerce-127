import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartModelServer } from '../models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  myCart: CartModelServer;

  constructor(
    private _cartService: CartService
  ) { }

  ngOnInit(): void {
    this._cartService.cartData$
    .subscribe( res => this.myCart = res );
  }

}
