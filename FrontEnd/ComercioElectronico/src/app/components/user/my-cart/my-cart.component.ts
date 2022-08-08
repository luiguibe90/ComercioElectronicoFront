import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeliveryMethod } from 'src/app/models/DeliveryMethod';
import { OrderDto } from 'src/app/models/OrderDto';
import { Product } from 'src/app/models/Product';
import { OrderProduct } from 'src/app/models/OrderProduct';
import { OrderProductQuantity } from 'src/app/models/OrderProductQuantity';
import { EcommerceService } from 'src/app/services/ecommerce.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
  orderId: string = '';
  stock: number [] = [];
  order!: OrderDto;
  deliveryMethod: string = "";
  deliveryMethods: DeliveryMethod[] = [];
  constructor(private httpService: EcommerceService, private router: Router, private route: ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.orderId = localStorage.getItem('orderId')!;
    this.getOrder();
    this.getDeliveryMethods();
  }
  
  getDeliveryMethods(){
    this.httpService.get('DeliveryMethod?sort=Name&order=Asc&offset=0').subscribe(
      response=>{
        this.deliveryMethods = response as DeliveryMethod[];
      }
    )
  }
  getOrder(){
    if(this.orderId != null || this.orderId != undefined){
      this.httpService.get(`Order/Show/${this.orderId}`).subscribe(response=>{
        this.order = response as OrderDto;
        if(this.order.orderProducts.length == 0){
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'No hay productos agregados',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/products']);
        }else{
          this.order.orderProducts.forEach(product => {
            this.stock = [];
            for (let i = 1; i <= product.stock + product.productQuantity; i++) {
              this.stock.push(i);
            }
            product.stockArray = this.stock;
          });
        }
      });
    }else{
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'No hay productos agregados',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/products']);
    }
  }

  cancelOrder(){
    Swal.fire({
      title: 'Estás seguro de cancelar la orden?',
      icon: 'warning',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, cancelar',
      cancelButtonText: 'No, regresar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.httpService.put(`Order/Cancel/${this.orderId}`).subscribe(response=>{
          localStorage.removeItem('orderId');
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Orden Cancelada',
            showConfirmButton: false,
            timer: 1000
          });
          this.router.navigate(['/products']);
        });
      }
    });
  }

  payOrder(){
    if(this.deliveryMethod){
      let deliveryMethodPrice = this.deliveryMethods.filter(d=> d.id == this.deliveryMethod)[0].priceByKm; 
      Swal.fire({
      title: 'Confirmar Pago',
      text: `$${this.order.totalPrice + deliveryMethodPrice} dólares`,
      icon: 'success',
      confirmButtonColor: '#5BB318',
      cancelButtonColor: '#D61C4E',
      confirmButtonText: 'Pagar',
      cancelButtonText: 'Regresar',
    }).then((result) => {
      if (result.isConfirmed) {  
        this.httpService.put(`Order/Pay/${this.orderId}/DeliveryMethod/${this.deliveryMethod}`).subscribe(response=>{
      localStorage.removeItem('orderId');
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Compra realizada',
        showConfirmButton: false,
        timer: 1000
      });
      this.router.navigate(['/products']);
    });
  }
});
}else{
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: 'Seleccione método de entrega',
    showConfirmButton: false,
    timer: 1000
  });
}
  }

  removeProduct(product: OrderProduct){
    let orderId = localStorage.getItem('orderId');
    this.httpService.delete(`Order/${orderId}/Product/${product.productId}`).subscribe(
      response =>{
        this.getOrder();
      }
    )
  }

  updateQuantity(product: OrderProduct,quantity: string){
    let orderId = localStorage.getItem('orderId');
    let OrderProductQuantity : OrderProductQuantity = {
      productId: product.productId,
      productQuantity : parseInt(quantity)
    }
    this.httpService.put(`Order/${orderId}/Product`,OrderProductQuantity).subscribe(response=>{
      this.getOrder();
    })
  }
}
