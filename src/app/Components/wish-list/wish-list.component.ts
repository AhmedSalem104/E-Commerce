import { Component, effect, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Subscription } from 'rxjs';
import { WishlistService } from '../../Core/services/Wishlist/wishlist.service';
import { Data } from '../../Core/interfaces/wishList/getLogedUserWishList';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../Core/services/Cart/cart.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit, OnDestroy {

  StopApi!: Subscription

  wishListData: WritableSignal<Data[]> = signal([])
  /* wishListData!: Data[] */

  private readonly _WishlistService = inject(WishlistService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _CartService = inject(CartService)




  ngOnInit(): void {
    this.getLoggedUserWishlist()
  }
  getLoggedUserWishlist() {
    this.StopApi = this._WishlistService.GetLoggedUserWishlist().subscribe({
      next: res => {
        this.wishListData.set(res.data)
        this._WishlistService.wishListCount.set(res.count)
      },
    })
  }


  RemoveFromWishList(Id: string) {
    this._WishlistService.RemoveProductFromWishlist(Id).subscribe({
      next: res => {
         localStorage.setItem('ProdcuctIdsWishListArr',JSON.stringify(res.data))
         this._WishlistService.wishListCount.set(res.count)
        this.getLoggedUserWishlist()
      }
    })
  }

  addToCart(Product_Id: string) {
    //  here
    this._CartService.addProductToCart(Product_Id).subscribe({
      next: res => {
        this.addToCartSuccess(res.message)
        this._CartService.CartCount.set(res.numOfCartItems)
      },
    })

  }
  addToCartSuccess(message: string) {
    this._ToastrService.success('', `${message}`, {
      timeOut: 2000
    })
  }
  ngOnDestroy(): void {
    this.StopApi.unsubscribe()
  }


}
