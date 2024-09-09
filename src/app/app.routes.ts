import { Routes } from '@angular/router';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { authGuard } from './Core/gards/auth.guard';
import { loginGuard } from './Core/gards/login.guard';
import { HomeComponent } from './Components/home/home.component';

export const routes: Routes = [
    {
        path: '', component: AuthLayoutComponent, canActivate: [loginGuard],
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            {
                path: 'login',
                loadComponent: () => import('./Components/login/login.component').then(m => m.LoginComponent),
                title: 'Login'
            },
            {
                path: 'register',
                loadComponent: () => import('./Components/register/register.component').then(m => m.RegisterComponent),
                title: 'Register'
            },
            {
                path: 'forget',
                loadComponent: () => import('./Components/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent),
                title: 'Forget password'
            },
        ]
    },
    {
        path: '', component: BlankLayoutComponent, canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {
                path: 'home',
                component: HomeComponent, pathMatch: 'full', title: 'Home'
            },
            {
                path: 'products',
                loadComponent: () => import('./Components/product/product.component').then(m => m.ProductComponent),
                title: 'Products'
            },
            {
                path: 'ProductDetails/:id',
                loadComponent: () => import('./Components/product-details/product-details.component').then(m => m.ProductDetailsComponent),
                title: 'ProductDetails'
            },
            {
                path: 'allorders',
                loadComponent: () => import('./Components/allorders/allorders.component').then(m => m.AllordersComponent),
                title: 'All Orders'
            },
            {
                path: 'Orders/:id',
                loadComponent: () => import('./Components/orders/orders.component').then(m => m.OrdersComponent),
                title: 'Orders'
            },
            {
                path: 'categories',
                loadComponent: () => import('./Components/categories/categories.component').then(m => m.CategoriesComponent),
                title: 'Category'
            },
            {
                path: 'cart',
                loadComponent: () => import('./Components/cart/cart.component').then(m => m.CartComponent),
                title: 'Cart'
            },
            {
                path: 'wishList',
                loadComponent: () => import('./Components/wish-list/wish-list.component').then(m => m.WishListComponent),
                title: 'WishList'
            },
            {
                path: 'brands',
                loadComponent: () => import('./Components/brands/brands.component').then(m => m.BrandsComponent),
                title: 'Brands'
            },
        ]
    },
    { path: '**', loadComponent: () => import('./Components/notfound/notfound.component').then(m => m.NotfoundComponent), title: 'Not Found' }
];
