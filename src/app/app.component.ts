import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ColDef } from "ag-grid-community";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "Product Page";
  columnDefs: ColDef[] = [
    {
      field: "image",
      headerName: "Image",
      cellRenderer: this.imgRender
    },
    {
      field: "title",
      headerName: "Title",
      filter: true
    },
    {
      field: "price",
      headerName: "Price",
      sortable: true,
      cellRenderer: this.priceRender
    },
    {
      field: "category",
      headerName: "Category"
    },
    {
      field: "rating.rate",
      headerName: "Rating"
    }
  ];
  rowData: any = [];

  gridAPI: any;
  columnAPI: any;

  searchText = "";

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.loadProducts();
  }
  onGridReady(params: any) {
    this.gridAPI = params.api;
    this.columnAPI = params.columnApi;
  }
  loadProducts() {
    this.httpClient
      .get("https://fakestoreapi.com/products")
      .subscribe((data) => {
        this.rowData = data;
      });
  }
  imgRender(params: any) {
    let div = document.createElement("div");
    div.innerHTML = '<img src="' + params.value + '" height="40" width="40" >';
    return div;
  }
  search() {
    this.gridAPI.setQuickFilter(this.searchText);
  }
  priceRender(params: any) {
    return `$ ` + params.value;
  }
}
