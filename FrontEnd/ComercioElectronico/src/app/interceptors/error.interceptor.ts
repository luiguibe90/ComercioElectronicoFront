import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if(error.error.type == "error"){
          switch(error.status){
            case 0:
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: `Error en la conexión al servidor`,
                text: `Status: ${error.status}`,
              });
              break;
            case 400:
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: `Validar la estructura de la petición`,
                text: `Status: ${error.status}`,
              });
              break;
            case 401:
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: `Error de autenticación`,
                text: `Status: ${error.status}`,
              });
              this.router.navigate(['/login']);
              break;
            case 404:
              console.log('not found')
              break;              
          }
        }else{
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: `${error.error.title}`,
            text: `${error.error.detail}`,
          });  
        }
        throw error;
      }
      )
    )
  }
}

