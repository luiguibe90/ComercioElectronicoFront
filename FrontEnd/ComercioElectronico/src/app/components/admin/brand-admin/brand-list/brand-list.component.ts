import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/Brand';
import { EcommerceService } from 'src/app/services/ecommerce.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {
  brands: Brand[] = [];
  constructor(private httpService: EcommerceService) { }

  ngOnInit(): void {
    this.getBrands();
  }
  
  getBrands(){
    this.httpService.get('Brand?sort=Name&order=Asc&limit=5&offset=0').subscribe(response=>{
      this.brands = response as Brand [];
    });
  }

  deleteBrand(brandId: string){
    this.httpService.delete(`Brand/${brandId}`).subscribe(response => {
      this.brands = this.brands.filter(brand => brand.id != brandId);
    })
  }

  brandNewOut(brand: Brand){
    this.brands.push(brand);
  }
}
