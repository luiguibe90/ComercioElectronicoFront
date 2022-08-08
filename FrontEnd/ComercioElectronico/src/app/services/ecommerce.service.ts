import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root',
})
export class EcommerceService {
  API_URL: string = environment.API_URL;
  token: string = '';
  constructor(private httpClient: HttpClient, private router: Router) {}

  get(url: string, params = new HttpParams()) {
    url = this.API_URL + url;
    return this.httpClient
      .get(url, { params });
  }

  post(url: string, data?: any, params = new HttpParams()) {
    url = this.API_URL + url;
    return this.httpClient
      .post(url, data, { params });
  }

  put(url: string, data?: any, params = new HttpParams()) {
    url = this.API_URL + url;
    return this.httpClient.put(url, data, { params });
  }

  delete(url: string, params = new HttpParams()) {
    url = this.API_URL + url;
    return this.httpClient.delete(url, { params });
  }
}
