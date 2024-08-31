import { isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';

import { Subscription } from 'rxjs';
import { Product } from '../../Core/interfaces/Products/Products/GetAllProducts';
import { ProductsService } from '../../Core/services/Product/products.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../Core/services/Cart/cart.service';
import { CategoriesService } from '../../Core/services/Category/categories.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit, OnDestroy {


  ProductsList!: Product[]
  StopApi!: Subscription

  private readonly _ProductsService = inject(ProductsService)
  private readonly Id: object = inject(PLATFORM_ID)
  private readonly _Router = inject(Router)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)


  ngOnInit(): void {
 
    this.StopApi = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.metadata.currentPage == 2);
    
        this.ProductsList = res.data;
      },
    })

    if (isPlatformBrowser(this.Id)) {
      localStorage.setItem('CurrentPage', '/Products')
    }
  }

  ngOnDestroy(): void {
    this.StopApi?.unsubscribe()
  }

  progRouterToProductdetails(id: string) {
    this._Router.navigate(['/Products', id])
  }

  addToCart(Product_Id: string) {
    this._CartService.addProductToCart(Product_Id).subscribe({
      next: res => {
        this._CartService.CartCount.set(res.numOfCartItems)
        this.addToCartSuccess(res.message)
      },
    })

  }

  addToCartSuccess(message: string) {
    this._ToastrService.success('', `${message}`, {
      timeOut: 2000
    })
  }
  addToCartFaild(message: string) {
    this._ToastrService.error('', `${message}`, {
      timeOut: 2000
    })
  }

}
