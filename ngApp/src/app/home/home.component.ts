import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
import { ProductModelServer } from '../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allProducts: ProductModelServer[] = [];

  constructor(
    private _productService: ProductsService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  // getting all products
  getAllProducts(){
    this._productService.getAllProducts()
    .subscribe(
      (res: ProductModelServer[]) => this.allProducts = res
    )
  }

  // select a perticular products
  selectProduct(id: string){
    // this._router.navigate(['/product', id]);
    this._router.navigate(['/product/'+id]);
  }


}
