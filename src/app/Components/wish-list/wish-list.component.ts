import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Subscription } from 'rxjs';
import { WishlistService } from '../../Core/services/Wishlist/wishlist.service';
import { Data } from '../../Core/interfaces/wishList/getLogedUserWishList';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit, OnDestroy {

  StopApi!: Subscription

  /* wishListData:WritableSignal<Data[]> = signal([]) */
  wishListData!:Data[]

  private readonly _WishlistService = inject(WishlistService)


  ngOnInit(): void {
    this.getLoggedUserWishlist()
  }
  getLoggedUserWishlist() {
    this.StopApi = this._WishlistService.GetLoggedUserWishlist().subscribe({
      next: res => {
       
     /*  this.wishListData = res.data */
     this.wishListData = res.data
          console.log(res.data);
          this._WishlistService.wishListCount.set(res.count)
        
      },
    })
  }


  ngOnDestroy(): void {
    this.StopApi.unsubscribe()
  }


}
