import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductModelServer } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private server_url = environment.SERVER_URL;

  constructor( 
    private _http: HttpClient
   ) { }

   getAllProducts(){
     return this._http.get(this.server_url+'/products');
   }

   getSingleProducts(id: string){
    return this._http.get('http://127.0.0.1:3000/products/'+id);
   }

   decreaseStock(id: string){
    return this._http.put('http://127.0.0.1:3000/products/'+id+'/1','');
   }

   restoreStock(id: string, quantity: number){
    return this._http.put('http://127.0.0.1:3000/products/'+id+'/'+quantity,'');
   }
}
