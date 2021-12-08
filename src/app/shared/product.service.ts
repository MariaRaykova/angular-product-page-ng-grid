import { Injectable } from "@angular/core";
import { Product } from "./interfaces/product";

import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from "@angular/fire/compat/database";
@Injectable({
  providedIn: "root"
})
export class ProductService {
  productsRef: AngularFireList<any>;
  productRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  AddProduct(product: Product) {
    this.productsRef.push({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: { count: product.rating.count, rate: product.rating.rate }
    });
  }
  GetProduct(id: string) {
    this.productRef = this.db.object("students-list/" + id);
    return this.productRef;
  }
  GetProductsList() {
    this.productsRef = this.db.list("products-list");
    return this.productsRef;
  }
  UpdateProduct(product: Product) {
    this.productRef.update({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: { count: product.rating.count, rate: product.rating.rate }
    });
  }
  DeleteProduct(id: string) {
    this.productRef = this.db.object("products-list/" + id);
    this.productRef.remove();
  }
}
