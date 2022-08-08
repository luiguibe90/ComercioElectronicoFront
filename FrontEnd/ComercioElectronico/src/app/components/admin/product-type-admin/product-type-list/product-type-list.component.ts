import { Component, OnInit } from '@angular/core';
import { ProductType } from 'src/app/models/ProductType';
import { EcommerceService } from 'src/app/services/ecommerce.service';

@Component({
  selector: 'app-product-type-list',
  templateUrl: './product-type-list.component.html',
  styleUrls: ['./product-type-list.component.css']
})
export class ProductTypeListComponent implements OnInit {
  productType: ProductType[] = [];
  constructor(private httpService: EcommerceService) { }

  ngOnInit(): void {
    this.getproductType();
  }
  
  getproductType(){
    this.httpService.get('ProductType?sort=Name&order=Asc&limit=5&offset=0').subscribe(response=>{
      this.productType = response as ProductType [];
    });
  }

  deleteProductType(ProductTypeId: string){
    this.httpService.delete(`ProductType/${ProductTypeId}`).subscribe(response => {
      this.productType = this.productType.filter(ProductType => ProductType.id != ProductTypeId);
    })
  }

  ProductTypeNewOut(ProductType: ProductType){
    this.productType.push(ProductType);
  }
}
