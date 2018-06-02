import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductDetailsPage } from '../product-details/product-details';
import { RestApiProvider } from '../../providers/rest-api/rest-api';


@Component({
  selector: 'page-home',
  
  templateUrl: 'home.html',

})
export class HomePage{
  page = 1
  products
  filteredproducts
  totalBill = 0.0
  
  constructor(public navCtrl: NavController , private auth:RestApiProvider) {
    
      this.auth.getProducts(this.page)
      .subscribe(res => {
        this.products = res
        this.filteredproducts = this.products.products
      
     })
      
  }



  ionViewDidLoad(){

  }


  productDetails(product){
    this.navCtrl.push(ProductDetailsPage,{params:product._id})
  }

  getItems(ev: any) {

    const val = ev.target.value;

    if (!(val && val.trim() != '')) return this.filteredproducts = this.products.products 

    if(this.totalBill > 0 ){
     this.deselectAll()
    }
    let test = this.products.products.filter(product => product.number.toString().indexOf(val) > -1) 
    if(!test.length) return this.filteredproducts = this.products.products 
    this.filteredproducts = test
   }


   checked(f,p){
    if(!f.value) {
     this.totalBill -= p.bill 
    }else{
      this.totalBill += p.bill
      
    }
 }



 selectAll(){
   this.filteredproducts.forEach(element => {
     element.selected = true
     this.totalBill +=  element.bill
   });
   
 }


 deselectAll(){
    this.filteredproducts.forEach(element => {
      if(element.selected){
        element.selected = false
        this.totalBill = 0
      } 
    })
  
 }
   
 //////////////////// pagination /////////////////////
 prev(){
  this.deselectAll()
  this.page--
  this.auth.getProducts(this.page)
  .subscribe(res => {
    this.products = res
    this.filteredproducts = this.products.products
  
 })
}  

next(){
  this.deselectAll()
  this.page++
  this.auth.getProducts(this.page)
  .subscribe(res => {
    this.products = res
    this.filteredproducts = this.products.products
  
 })
}



  get lower(){
   return 20 * (this.page - 1 ) + 1
  }

  get  upper(){
   return Math.min(20 * this.page , this.products.totalCount)
  }

 
 


}







