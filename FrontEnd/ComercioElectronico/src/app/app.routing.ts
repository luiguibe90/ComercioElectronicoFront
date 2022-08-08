import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { BrandAdminComponent } from './components/admin/brand-admin/brand-admin.component';
import { ProductAdminComponent } from './components/admin/product-admin/product-admin.component';
import { ProductFormComponent } from './components/admin/product-admin/product-form/product-form.component';
import { LoginComponent } from './components/shared/login/login.component';
import { MyCartComponent } from './components/user/my-cart/my-cart.component';
import { ProductInfoComponent } from './components/user/products/product-info/product-info.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuardService } from './auth/authGuard.service';
import { BrandFormComponent } from './components/admin/brand-admin/brand-form/brand-form.component';
import { ProductTypeAdminComponent } from './components/admin/product-type-admin/product-type-admin.component';
import { ProductTypeFormComponent } from './components/admin/product-type-admin/product-type-form/product-type-form.component';

export const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch:'full' },
    {path:'', children:[
        { path: 'products', component: UserComponent},
        { path: 'my-cart', component: MyCartComponent },
        { path: 'product/:id', component: ProductInfoComponent },
        { path: 'admin', component: AdminComponent},
        ////// -- productos --
        { path: 'admin/products', component: ProductAdminComponent},
        { path: 'admin/products/edit/:id', component: ProductFormComponent},
        { path: 'admin/products/create', component: ProductFormComponent},
        ////////// -- marcas --
        { path: 'admin/brands', component: BrandAdminComponent},
        { path: 'admin/brands/edit/:id', component: BrandFormComponent},
        { path: 'admin/brands/create', component: BrandFormComponent},
        ////////////tipo de producto
        { path: 'admin/productType', component: ProductTypeAdminComponent},
        { path: 'admin/productType/edit/:id', component: ProductTypeFormComponent},
        { path: 'admin/productType/create', component: ProductTypeFormComponent},
    ]
    ,canActivate: [AuthGuardService]
}
];