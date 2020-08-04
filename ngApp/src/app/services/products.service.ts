import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { productModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  server_url = environment.api_link;

  constructor( 
    private _http: HttpClient
   ) { }

   getAllProducts(){
     return this._http.get('http://127.0.0.1:3000/products/');
   }

   getSingleProducts(id: string){
    return this._http.get('http://127.0.0.1:3000/products/'+id);
   }

   decreaseStock(id: string){
    return this._http.put('http://127.0.0.1:3000/products/'+id+'/1','');
   }
}
