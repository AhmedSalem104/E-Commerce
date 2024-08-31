import { Subscription } from 'rxjs';
import { Component, ElementRef, inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetSpecificProduct } from '../../Core/interfaces/Products/Products/GetSpecificProduct';
import { ProductsService } from '../../Core/services/Product/products.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../Core/services/Cart/cart.service';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {


  private readonly Id: object = inject(PLATFORM_ID)
  private readonly _Router = inject(Router)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  productId!: string | null;
  ProductDetails!: GetSpecificProduct | null 
  ProductDetailsImages!: any
  stopApi!: Subscription
  mainSrcImage: string = ''
  ProductDetailsloadingClass: string = "hidden"


  getSrc(img: string) {
    this.mainSrcImage = img
  }
  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    margin: 5,
    autoplayTimeout: 6000,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-angles-left main-color"></i>', '<i class="fa-solid fa-angles-right main-color"></i>'],

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
        items: 4
      }
    },
    nav: true
  }
  constructor(private _ActivatedRoute: ActivatedRoute, private _ProductsService: ProductsService) { }
  ngOnInit(): void {
    this.ProductDetailsloadingClass = "flex"
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.goProductDetails(param.get('id'))
      }
    })

  }
  goProductDetails(ProductId: string | null) {
    this.stopApi = this._ProductsService.getSpecificProduct(ProductId).subscribe({
      next: (res) => {
        this.ProductDetailsloadingClass = "hidden"
        this.ProductDetails = res
        this.ProductDetailsImages = res.data.images
      },
      
    })

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
  ngOnDestroy(): void {
    this.stopApi?.unsubscribe()

  }


}
