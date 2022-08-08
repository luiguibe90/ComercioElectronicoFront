import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductType } from 'src/app/models/ProductType';
import { EcommerceService } from 'src/app/services/ecommerce.service';

@Component({
  selector: 'app-product-type-form',
  templateUrl: './product-type-form.component.html',
  styleUrls: ['./product-type-form.component.css']
})
export class ProductTypeFormComponent implements OnInit {
  formGroupProductType!: FormGroup;
  ProductType!:ProductType;
  ProductTypeId!: string;
  @Output() ProductTypeNewOut = new EventEmitter();
  constructor(private httpService : EcommerceService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { 
  }

  ngOnInit(): void {
    this.buildformGroupProductType();
  }


  addProductType(ProductType: ProductType){
    this.httpService.post('ProductType',this.formGroupProductType.getRawValue()).subscribe(response =>{
      this.ProductTypeNewOut.emit(ProductType);
    });
  }
   
  //Reactive Form, Validators and getters of Fields
  buildformGroupProductType(){
    this.ProductTypeId = this.route.snapshot.paramMap.get('id')!;
    if(!this.ProductTypeId){
      this.formGroupProductType = this.formBuilder.group({
        name: [null,[Validators.required]],

      });
    }else{
      this.getProductType(this.ProductTypeId);
    }
  }

  get nameField() {
    return this.formGroupProductType.get('name');
  }
  
  onSubmit(event : Event){
    event.preventDefault();
    if(this.ProductTypeId != null ){
      this.updateProductType();
    }else{
      if(this.formGroupProductType.valid){
        this.addProductType(this.formGroupProductType.value);
        this.formGroupProductType.reset();
      }
    }
  }

  getProductType(id: string){
    this.httpService.get(`ProductType/${id}`).subscribe(
      response =>{
        this.ProductType = response as ProductType;
     
        this.formGroupProductType = this.formBuilder.group({
          id: [this.ProductType.id,[Validators.required]],
          name: [this.ProductType.name,[Validators.required]],
          
        });
      }
    )
  }

  updateProductType(){
    this.httpService.put(`ProductType/`,this.formGroupProductType.getRawValue()).subscribe(
      response=>{
        console.log(response);
      }
    );
  }
}

