import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  products : Product[] = [];
  productTypeSelected: string = "";
  constructor() { }

  ngOnInit(): void {
  }
  productsOut(products : Product[]){
    this.products = products;
  }
  productTypeSelectedOut(name: string){
    this.productTypeSelected = name;
  }
}
