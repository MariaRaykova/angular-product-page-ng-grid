import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RouterModule, Routes } from "@angular/router";

import { AddProductComponent } from "./add-product/add-product.component";
// import { ProductListComponent } from "./product-list/product-list.component";
// import { EditProductComponent } from "./edit-product/edit-product.component";

const routes: Routes = [
  { path: "", redirectTo: "/add-product", pathMatch: "full" },
  { path: "add-product", component: AddProductComponent }
  // { path: "edit-product/:id", component: EditProductComponent },
  // { path: "view-products", component: ProductListComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}

//https://www.positronx.io/angular-7-firebase-5-crud-operations-with-reactive-forms/
//https://www.javacodegeeks.com/basic-firebase-crud-operations-in-angular.html
//https://codingindian.com/angular-12-firebase-crud-application/
//https://www.digitalocean.com/community/tutorials/angular-firebase-crud-operations
//https://www.telerik.com/kendo-angular-ui/components/grid/data-binding/firebase/
//https://angular.io/guide/router
