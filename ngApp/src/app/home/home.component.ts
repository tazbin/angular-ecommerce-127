import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { productModel } from '../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allProducts:any;

  constructor(
    private _productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this._productService.getAllProducts()
    .subscribe(
      res => {
        this.allProducts = res;
      }
    )
  }

}
