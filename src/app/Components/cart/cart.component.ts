import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../Core/services/Cart/cart.service';
import { Data, GetcartObj } from '../../Core/interfaces/Cart/GetLoggedUserCart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {

  data: WritableSignal<Data> = signal({} as Data)
  StopApi!: Subscription
  loadingCountClass: WritableSignal<string> = signal('hidden')
  cartEmpty: WritableSignal<boolean> = signal(true)
  clearCart: WritableSignal<boolean> = signal(true)

  constructor(private _CartService: CartService) { }

  ngOnInit(): void {
    this.getLoggedUserCart()
  }
  getLoggedUserCart() {
    this.StopApi = this._CartService.getLoggedUserCart().subscribe({
      next: res => {
        if (res.numOfCartItems == 0) {
          this.cartEmpty.set(true)
          this.clearCart.set(true)
          this.data.set(res.data)
        }
        else {
          /* this._CartService.addToCart(res.numOfCartItems) */
          this.cartEmpty.set(false)
          this.clearCart.set(false)
          this.data.set(res.data)
        }

      },
      error: err => {
        console.log(err.message);
      }
    })
  }
  UpdateCartProductQuantity(product_Id: string, Count: number) {
    this.loadingCountClass.set('flex')
    this.StopApi = this._CartService.UpdateCartProductQuantity(product_Id, Count.toString()).subscribe({
      next: res => {
        this.loadingCountClass.set('hidden')

        this.data.set(res.data)
      },
      error: err => {
        console.log(err);

      }
    })

  }
  RemoveSpecificCartItem(product_Id: string) {
    this.loadingCountClass.set('flex')
    this.StopApi = this._CartService.RemoveSpecificCartItem(product_Id).subscribe({
      next: res => {
        this._CartService.CartCount.set(res.numOfCartItems)
        this.loadingCountClass.set('hidden')
        this.data.set(res.data)
      },
      error: err => {
        console.log(err);
      }
    })
  }
  ClearUserCart() {
    this.StopApi = this._CartService.ClearUserCart().subscribe({
      next: res => {
        this.data.set(res.data)
        this._CartService.CartCount.set(0)
      },
      error: err => {
        console.log(err);
      }
    })

  }
  ngOnDestroy(): void {
    this.StopApi.unsubscribe()
  }
}
