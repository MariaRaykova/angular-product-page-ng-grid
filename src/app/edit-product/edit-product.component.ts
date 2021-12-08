import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProductService } from "../shared/product.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-edit-product",
  templateUrl: "./edit-product.component.html",
  styleUrls: ["./edit-product.component.css"]
})
export class EditProductComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    private crudApi: ProductService,
    private fb: FormBuilder,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.updateStudentData();
    const id = this.actRoute.snapshot.paramMap.get("id");
    this.crudApi
      .GetProduct(id)
      .valueChanges()
      .subscribe((data) => {
        this.editForm.setValue(data);
      });
  }

  get firstName() {
    return this.editForm.get("title");
  }

  get lastName() {
    return this.editForm.get("description");
  }

  get email() {
    return this.editForm.get("price");
  }

  get mobileNumber() {
    return this.editForm.get("category");
  }

  updateStudentData() {
    this.editForm = this.fb.group({
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

  goBack() {
    this.location.back();
  }

  updateForm() {
    this.crudApi.UpdateProduct(this.editForm.value);
    this.toastr.success(
      this.editForm.controls["title"].value + " updated successfully"
    );
    this.router.navigate(["view-products"]);
  }
}
