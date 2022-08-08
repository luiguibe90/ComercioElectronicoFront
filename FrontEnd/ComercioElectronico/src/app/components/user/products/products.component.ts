import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() productsIn : Product[] = [];
  @Input() productTypeSelectedIn : string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
