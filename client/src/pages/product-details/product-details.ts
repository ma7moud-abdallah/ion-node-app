import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { RestApiProvider } from '../../providers/rest-api/rest-api';




/**
 * Generated class for the ProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage  {



  product: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,http:HttpClient,private auth:RestApiProvider) {
   let id= this.navParams.get('params')
   this.auth.getProduct(id)
   .subscribe(res => {
    this.product = res
    console.log('ddddd'+this.product)
   },
   err =>{
     console.log(err)
   }
  )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

}



// import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

// export class HighlightPipe implements PipeTransform {
//     constructor(public sanitizer: DomSanitizer) {
//     }
//     aaa ='myAwesomeText'
//     transform(text: string, search): SafeHtml {
//         if (search && text) {
//             let pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
//             pattern = pattern.split(' ').filter((t) => {
//                 return t.length > 0;
//             }).join('|');
//             const regex = new RegExp(pattern, 'gi');
//             return this.sanitizer.bypassSecurityTrustHtml(
//                 text.replace(regex, (match) => `<span class="search-highlight">${match}</span>`)
//             );

//         } else {
//             return text;
//         }
//     }
// }