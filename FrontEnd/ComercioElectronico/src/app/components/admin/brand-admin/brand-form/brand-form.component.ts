import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { Brand } from 'src/app/models/Brand';
import { EcommerceService } from 'src/app/services/ecommerce.service';
@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.css']
})
export class BrandFormComponent implements OnInit {
  formGroupbrand!: FormGroup;
  brand!:Brand;
  brandId!: string;
  @Output() brandNewOut = new EventEmitter();
  constructor(private httpService : EcommerceService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { 
  }

  ngOnInit(): void {
    this.buildformGroupBrand();
  }


  addbrand(brand: Brand){
    this.httpService.post('Brand',this.formGroupbrand.getRawValue()).subscribe(response =>{
      this.brandNewOut.emit(brand);
    });
  }
   
  //Reactive Form, Validators and getters of Fields
  buildformGroupBrand(){
    this.brandId = this.route.snapshot.paramMap.get('id')!;
    if(!this.brandId){
      this.formGroupbrand = this.formBuilder.group({
        name: [null,[Validators.required]],

      });
    }else{
      this.getbrand(this.brandId);
    }
  }

  get nameField() {
    return this.formGroupbrand.get('name');
  }
  
  onSubmit(event : Event){
    event.preventDefault();
    if(this.brandId != null ){
      this.updatebrand();
    }else{
      if(this.formGroupbrand.valid){
        this.addbrand(this.formGroupbrand.value);
        this.formGroupbrand.reset();
      }
    }
  }

  getbrand(id: string){
    this.httpService.get(`Brand/${id}`).subscribe(
      response =>{
        this.brand = response as Brand;
     
        this.formGroupbrand = this.formBuilder.group({
          id: [this.brand.id,[Validators.required]],
          name: [this.brand.name,[Validators.required]],
          
        });
      }
    )
  }

  updatebrand(){
    this.httpService.put(`Brand/`,this.formGroupbrand.getRawValue()).subscribe(
      response=>{
        console.log(response);
      }
    );
  }
}

