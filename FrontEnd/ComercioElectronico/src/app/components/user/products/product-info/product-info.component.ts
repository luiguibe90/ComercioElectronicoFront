import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { EcommerceService } from 'src/app/services/ecommerce.service';
import { Order } from 'src/app/models/Order';
import { OrderProductDto } from 'src/app/models/OrderProductDto';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
  productSelected!: Product;
  stock: number [] = [];
  addProduct : OrderProductDto = {
    productId: "",
    productQuantity: 1
  };
  constructor(private route: ActivatedRoute, private router: Router, private httpService: EcommerceService, private location: Location) { }

  ngOnInit(): void {
    this.route.params.subscribe(param =>{
      let id = param['id'];
      this.httpService.get(`Product/${id}`).subscribe(
        response =>{
          this.productSelected = response as Product;
          this.getStock(this.productSelected.stock);
        }
      )
    });
    console.log('fuera del oninit',this.productSelected);
  }

  getStock(stock :number) : void{
    for (let i = 1; i <= stock; i++) {
      this.stock.push(i);
    }
  }

  addProductCart(productSelectedId : string, quantity : string){
    this.addProduct.productId = productSelectedId;
    this.addProduct.productQuantity = parseInt(quantity);
    let orderId = localStorage.getItem('orderId'); 

    if(orderId == null){
      this.httpService.post('Order').subscribe(response=>{
        let responseOrder = response as Order;
        let orderNew = responseOrder.id;
        localStorage.setItem('orderId', orderNew);
        
        this.httpService.post(`Order/${orderNew}/Product`,this.addProduct).subscribe(response=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Agregado al Carrito',
            showConfirmButton: false,
            timer: 1000
          });
        });
      });
    }else{
      this.httpService.post(`Order/${orderId}/Product`,this.addProduct).subscribe(response=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Agregado al Carrito',
          showConfirmButton: false,
          timer: 1000
        });
      });
    }
    this.location.back();
  }
}
