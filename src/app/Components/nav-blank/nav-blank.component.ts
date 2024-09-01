import { NgClass, NgIf } from '@angular/common';
import { Component, computed, ElementRef, inject, OnInit, Signal, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Core/services/Auth/auth.service';
import { CartService } from '../../Core/services/Cart/cart.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { log } from 'console';
import { MytranslateService } from '../../Core/services/translate/mytranslate.service';
import { WishlistService } from '../../Core/services/Wishlist/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass, TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {

  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }



  cartItemCount:Signal<number> = computed(()=> this._CartService.CartCount())
  wishListItemCount:Signal<number> = computed(()=> this._WishlistService.wishListCount())

  CurrentCount: number | string = ""
  public readonly _AuthService = inject(AuthService)
  public readonly _CartService = inject(CartService)
  public readonly _MytranslateService = inject(MytranslateService)
  public readonly _TranslateService = inject(TranslateService)
  public readonly _WishlistService = inject(WishlistService)

  isMenuHidden = true;

  @ViewChild('mobileMenu') mobileMenu!: ElementRef;
  toggleMenu() {
    this.isMenuHidden = !this.isMenuHidden;
  }

  ngOnInit(): void {
    this.getLoggedUserCart()
    this.GetLoggedUserWishlist()
  }

  GetLoggedUserWishlist() {
    this._WishlistService.GetLoggedUserWishlist().subscribe({
      next: res => {
       this._WishlistService.wishListCount.set(res.count)
      },
    })


  }
  getLoggedUserCart() {
    this._CartService.getLoggedUserCart().subscribe({
      next: res => {
       this._CartService.CartCount.set(res.numOfCartItems)
      },
    })


  }


 
  cahnge(lang: string): void {
    this.toggleDropdown()
    this._MytranslateService.changeLang(lang)
  }

}
