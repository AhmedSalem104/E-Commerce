import{s as l,x as r}from"./chunk-XC3E7FJG.js";import{Z as s,ca as o,fb as n}from"./chunk-Y44U2H2M.js";var u=(()=>{let t=class t{constructor(i){this._HttpClient=i,this.wishListCount=n(0)}GetLoggedUserWishlist(){return this._HttpClient.get(`${r.baseUrl}/api/v1/wishlist`)}AddProductToWishlist(i){return this._HttpClient.post(`${r.baseUrl}/api/v1/wishlist`,{productId:i})}RemoveProductFromWishlist(i){return this._HttpClient.delete(`${r.baseUrl}/api/v1/wishlist/${i}`)}};t.\u0275fac=function(a){return new(a||t)(o(l))},t.\u0275prov=s({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();export{u as a};
