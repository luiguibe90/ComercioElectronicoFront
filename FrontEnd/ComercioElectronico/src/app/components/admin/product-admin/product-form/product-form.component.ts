import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { Brand } from 'src/app/models/Brand';
import { Product } from 'src/app/models/Product';
import { ProductType } from 'src/app/models/ProductType';
import { EcommerceService } from 'src/app/services/ecommerce.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  formGroupProduct!: FormGroup;
  product!: Product;
  productTypes : ProductType [] = [];
  brands : Brand [] = [];
  productId!: string;
  @Output() productNewOut = new EventEmitter();
  constructor(private httpService : EcommerceService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { 
  }

  ngOnInit(): void {
    this.buildformGroupProduct();
    this.getProductTypes();
    this.getBrands();
  }

  getProductTypes(){
    this.httpService.get('ProductType?sort=Name&order=Asc&offset=0').subscribe(response =>{
      this.productTypes = response as ProductType[];
    });
  }
  
  getBrands(){
    this.httpService.get('Brand?sort=Name&order=Asc&offset=0').subscribe(response =>{
      this.brands = response as Brand[];
    })
  }

  addProduct(product: Product){
    this.httpService.post('Product',this.formGroupProduct.getRawValue()).subscribe(response =>{
      this.httpService.get(`Brand/${product.brandId}`).subscribe((response)=>{
        let brand = response as Brand;
        product.brand = brand.name;
      })
      this.productNewOut.emit(product);
    });
  }
   
  //Reactive Form, Validators and getters of Fields
  buildformGroupProduct(){
    this.productId = this.route.snapshot.paramMap.get('id')!;
    if(!this.productId){
      this.formGroupProduct = this.formBuilder.group({
        name: [null,[Validators.required]],
        imageUrl: [null, [Validators.required]],
        description: [null,[Validators.required]],
        stock: [null, [Validators.required]],
        price: [null, [Validators.required]],
        productTypeId: ["", [Validators.required]],
        brandId: ["", [Validators.required]]
      });
    }else{
      this.getProduct(this.productId);
    }
  }

  get nameField() {
    return this.formGroupProduct.get('name');
  }
  get imageUrlField() {
    return this.formGroupProduct.get('imageUrl');
  }
  get descriptionField() {
    return this.formGroupProduct.get('description');
  }
  get stockField() {
    return this.formGroupProduct.get('stock');
  }
  get priceField() {
    return this.formGroupProduct.get('price');
  }
  get productTypeIdField() {
    return this.formGroupProduct.get('productTypeId');
  }
  get brandIdField() {
    return this.formGroupProduct.get('brandId');
  }
  
  onSubmit(event : Event){
    event.preventDefault();
    if(this.productId != null ){
      this.updateProduct();
    }else{
      if(this.formGroupProduct.valid){
        this.addProduct(this.formGroupProduct.value);
        this.formGroupProduct.reset();
      }
    }
  }

  getProduct(id: string){
    this.httpService.get(`Product/${id}`).subscribe(
      response =>{
        this.product = response as Product;
        debugger;
        this.formGroupProduct = this.formBuilder.group({
          id: [this.product.id,[Validators.required]],
          name: [this.product.name,[Validators.required]],
          imageUrl: [this.product.imageUrl, [Validators.required]],
          description: [this.product.description,[Validators.required]],
          stock: [this.product.stock, [Validators.required]],
          price: [this.product.price, [Validators.required]],
          productTypeId: [this.product.productTypeId, [Validators.required]],
          brandId: [this.product.brandId, [Validators.required]]
        });
      }
    )
  }

  updateProduct(){
    this.httpService.put(`Product`,this.formGroupProduct.getRawValue()).subscribe(
      response=>{
        console.log(response);
      }
    );
  }
}

