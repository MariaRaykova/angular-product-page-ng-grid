import { Component, OnInit } from "@angular/core";
import { ProductService } from "../shared/product.service";
import { Product } from "../shared/interfaces/product";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  p: number = 1;
  Product: Product[];
  hideWhenNoProduct: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;

  constructor(public crudApi: ProductService, public toastr: ToastrService) {}

  ngOnInit() {
    this.dataState();
    let s = this.crudApi.GetProductsList();
    s.snapshotChanges().subscribe((data) => {
      this.Product = [];
      data.forEach((item) => {
        let a = item.payload.toJSON();
        a["$key"] = item.key;
        this.Product.push(a as Product);
      });
    });
  }

  dataState() {
    this.crudApi
      .GetProductsList()
      .valueChanges()
      .subscribe((data) => {
        this.preLoader = false;
        if (data.length <= 0) {
          this.hideWhenNoStudent = false;
          this.noData = true;
        } else {
          this.hideWhenNoStudent = true;
          this.noData = false;
        }
      });
  }

  deleteProduct(product) {
    if (window.confirm("Are sure you want to delete this product ?")) {
      this.crudApi.DeleteProduct(product.$key);
      this.toastr.success(product.title + " successfully deleted!");
    }
  }
}
