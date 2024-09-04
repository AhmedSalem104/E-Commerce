import { isPlatformBrowser, NgClass } from '@angular/common';
import { Component, ElementRef, inject, OnDestroy, OnInit, PLATFORM_ID, signal, ViewChild, WritableSignal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../Core/interfaces/Products/Products/GetAllProducts';
import { ProductsService } from '../../Core/services/Product/products.service';
import { Router, RouterLink } from '@angular/router';
import { CategoriesService } from '../../Core/services/Category/categories.service';
import { Category } from '../../Core/interfaces/Category/Category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { SearchPipe } from '../../Core/Pipes/ProductSearchTitle/search.pipe';
import { FormsModule, NgModel } from '@angular/forms';
import { SearchcategoryPipe } from '../../Core/Pipes/ProductSearchCategory/searchcategory.pipe';
import { CartService } from '../../Core/services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { BrandServiceService } from '../../Core/services/Brand/brand-service.service';
import { Brand } from '../../Core/interfaces/brand/brand';
import { WishlistService } from '../../Core/services/Wishlist/wishlist.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, SearchPipe, FormsModule, SearchcategoryPipe, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {




  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoplay: true,
    rtl: true,
    autoplayTimeout: 6000,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],

    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }
  customOptionsCategories: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    rtl: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
  customOptionsBrands: OwlOptions = {
    loop: true,
    rtl: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }




  isWishlisted: boolean = true;
  ProductloadingClass: string = "hidden"
  CategoryloadingClass: string = "hidden"
  BrandloadingClass: string = "hidden"
  ProductsList: WritableSignal<Product[]> = signal([])
  BrandList: WritableSignal<Brand[]> = signal([])
  CategorysList: WritableSignal<Category[]> = signal([])
  StopApiProduct!: Subscription
  StopApiCategory!: Subscription
  StopApiBrand!: Subscription
  searchText: string = ''

  WishListArr!: any[]
  x!: any[]

  private readonly Id: object = inject(PLATFORM_ID)
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _Router = inject(Router)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _BrandService = inject(BrandServiceService)
  private readonly _WishlistService = inject(WishlistService)


  ngOnInit(): void {
    this.WishListArr = JSON.parse(localStorage.getItem('ProdcuctIdsWishListArr')!)
    this.CategoryloadingClass = "flex"
    this.BrandloadingClass = "flex"
    this.ProductloadingClass = "flex"
    this.GetAllBrands()
    this.getAllGategories()
    this.getAllProducts()
    if (isPlatformBrowser(this.Id)) {
      localStorage.setItem('CurrentPage', '/Products')
    }
  }
  getAllProducts() {
    this.StopApiProduct = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.ProductloadingClass = 'hidden';
        this.ProductsList.set(res.data);
        this.WishListArr = JSON.parse(localStorage.getItem('ProdcuctIdsWishListArr')!) || [];
       

        
      },
    });
  }

  getIconClass(productId: string): string {

    this.WishListArr = JSON.parse(localStorage.getItem('ProdcuctIdsWishListArr')!)
    return this.WishListArr.includes(productId) ? 'loveIconsolid' : 'loveIconregular';
  }

  getAllGategories() {
    this.StopApiCategory = this._CategoriesService.getAllGategories().subscribe({
      next: (res) => {
        this.CategoryloadingClass = "hidden"
        this.CategorysList.set(res.data)


      },
    })
  }
  GetAllBrands() {
    this.StopApiBrand = this._BrandService.GetAllBrands().subscribe({
      next: (res) => {
        this.BrandloadingClass = "hidden"
        this.BrandList.set(res.data)
      },
    })
  }
  progRouterToProductdetails(id: string) {
    this._Router.navigate(['/Products', id])
  }
  addToWishList(Product_Id: string) {
    this.WishListArr = JSON.parse(localStorage.getItem('ProdcuctIdsWishListArr')!)
    if (!this.WishListArr.includes(Product_Id)) {
      //  فى حالة ان المنتج مش موجود فى  wishlist
      this._WishlistService.AddProductToWishlist(Product_Id).subscribe({
        next: res => {
          this._WishlistService.wishListCount.set(res.data.length)
          this.addToWishListSuccess(res.message)
          localStorage.setItem('ProdcuctIdsWishListArr', JSON.stringify(res.data))
          this.getIconClass(Product_Id)
        },
      })
    }
    else {
      // المنتج موجود مسبقا فى wishList
      this._WishlistService.RemoveProductFromWishlist(Product_Id).subscribe({
        next: res => {
          this._WishlistService.wishListCount.set(res.data.length)
          this.removeFromWishListSuccess(res.message)
          localStorage.setItem('ProdcuctIdsWishListArr', JSON.stringify(res.data))
          this.getIconClass(Product_Id)
        },
      })
    }
  }
  addToCart(Product_Id: string) {
    //  here
    this._CartService.addProductToCart(Product_Id).subscribe({
      next: res => {
        this.addToWishListSuccess(res.message)
        this._CartService.CartCount.set(res.numOfCartItems)
      },
    })

  }
  addToWishListSuccess(message: string) {
    this._ToastrService.success('', `${message}`, {
      timeOut: 2000
    })
  }
  removeFromWishListSuccess(message: string) {
    this._ToastrService.info('', `${message}`, {
      timeOut: 2000
    })
  }
  addToCartFaild(message: string) {
    this._ToastrService.error('', `${message}`, {
      timeOut: 2000
    })
  }
  toggleWishlist() {
    console.log(this.isWishlisted);
    this.isWishlisted = !this.isWishlisted;
    console.log(this.isWishlisted);
  }
  ngOnDestroy(): void {
    this.StopApiBrand?.unsubscribe()
    this.StopApiCategory?.unsubscribe()
    this.StopApiProduct?.unsubscribe()
  }
}
