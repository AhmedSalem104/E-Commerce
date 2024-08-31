import { HttpInterceptorFn } from '@angular/common/http';
import { Token } from '@angular/compiler';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  // logic ------> Req  ------- send header ------------------>>

  if (localStorage.getItem('userToken') !== null) { //check userToken not null


    if (req.url.includes('cart') || req.url.includes('wishlist') || req.url.includes('orders')) { //pass header for some req not all
      req = req.clone({
        setHeaders: { token: localStorage.getItem('userToken')! }
      })
    }
  }
  return next(req);
};
