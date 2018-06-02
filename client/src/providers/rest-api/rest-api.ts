import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestApiProvider {

  constructor(public http: HttpClient) {
    
  }

  getProducts(page){
  return  this.http.get(`http://localhost:3000/products?page=${page - 1}`)
  }

  getProduct(id){
    return  this.http.get(`http://localhost:3000/products/${id}`)
  }

}
