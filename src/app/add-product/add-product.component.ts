import { Component, OnInit } from "@angular/core";
import { ProductService } from "../shared/product.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"]
})
export class AddProductComponent implements OnInit {
  public productForm: FormGroup;

  constructor(
    public crudApi: ProductService,
    public fb: FormBuilder,
    public toastr: ToastrService
  ) {}

  ngOnInit() {
    this.crudApi.GetProductsList();
    this.validateProductForm();
  }

  validateProductForm() {
    this.productForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      description: [""],
      price: [Validators.required],
      category: [Validators.required]
      // email: [
      //   "",
      //   [
      //     Validators.required,
      //     Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      //   ]
      // ],
      // mobileNumber: ["", [Validators.required, Validators.pattern("^[0-9]+$")]]
    });
  }

  get title() {
    return this.productForm.get("title");
  }

  get description() {
    return this.productForm.get("description");
  }

  get price() {
    return this.productForm.get("price");
  }

  get category() {
    return this.productForm.get("category");
  }

  ResetForm() {
    this.productForm.reset();
  }

  submitStudentData() {
    this.crudApi.AddProduct(this.productForm.value);
    this.toastr.success(
      this.productForm.controls["title"].value + " successfully added!"
    );
    this.ResetForm();
  }
}
