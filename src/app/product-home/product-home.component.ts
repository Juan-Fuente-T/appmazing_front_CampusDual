import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css']
})
export class ProductHomeComponent {
  dataSource: any = [];
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private dialog: MatDialog) {}
  // displayedColumns: string[] = ['name', 'surname', 'lastname', 'telephone', 'email'];//se pasan los datos directamente y se elimina esta variable
  //ngAfterOnInit(){ //este seria para desdepues de que se haya cargado toda la vista, el html completo
  ngOnInit(){
    this.productsService.getProducts().subscribe(data => {
      if(Array.isArray(data)){
        this.dataSource = data;
        // debugger;
      }
    })
  }
  openDetailForm(row: any){
    this.router.navigate(['/product', row.id]);
  }
  openDeleteDialog(productId: number): void{
    const dialogRef = this.dialog.open(ProductDeleteComponent, {data: {productId: productId}})
  }
  editProductDetail(productId: any){
    this.router.navigate(['/product/edit', productId]);
  }
}
