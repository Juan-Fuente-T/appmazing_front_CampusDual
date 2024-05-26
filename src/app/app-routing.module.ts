import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactHomeComponent } from './contact-home/contact-home.component';
import { ProductHomeComponent } from './product-home/product-home.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ContactUpdateComponent } from './contact-update/contact-update.component';
import { ProductUpdateComponent } from './product-update/product-update.component';

const routes: Routes = [
  {path: 'contacts', component: ContactHomeComponent},
  {path: 'products', component: ProductHomeComponent},
  {path: 'contact/:id', component: ContactDetailComponent},
  {path: 'product/:id', component: ProductDetailComponent},
  {path: 'contact/edit/:id', component: ContactUpdateComponent},
  {path: 'product/edit/:id', component: ProductUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
