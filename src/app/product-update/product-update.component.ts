import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit{
  product: any;
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void{ 
    this.product = this.productsService.getProduct(this.route.snapshot.params['id']).subscribe(data => {
      this.product = data;
      // debugger;
    });
  }
  // updateProduct() {
  //   this.PrdctsService.updateContact(this.contact);
  //   this.navigateDetail();
  // }
  updateProduct() {
    debugger;
    this.productsService.updateProduct(this.product).subscribe(data =>{
      this.navigateToDetail();
    });
  }
  cancelChange(){
    this.router.navigate(['/products']);
  }
  navigateToDetail(){
    this.router.navigate(['/product', this.route.snapshot.params['id']]);
  }
}

