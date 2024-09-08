import './polyfills.server.mjs';
import{a as x}from"./chunk-LEQYZQEZ.mjs";import"./chunk-QZLY374Y.mjs";import{a as T,b,c as A,d as N,h as R,i as q,j as D,k as B,m as G}from"./chunk-72JKAFXL.mjs";import{a as V}from"./chunk-S7PR75XC.mjs";import"./chunk-KU5BKOKS.mjs";import"./chunk-GTSSCL6B.mjs";import{l as E,m as k}from"./chunk-UXWLCPGU.mjs";import{j as w}from"./chunk-24LQVYIO.mjs";import{Bb as S,Cb as F,Jb as a,Qb as y,Ta as d,Tb as C,Z as f,ba as v,ib as p,kb as L,ob as c,sb as o,tb as i,ub as h}from"./chunk-3OXFT4D6.mjs";import"./chunk-VVCT4QZE.mjs";var M=(e,n)=>({"is-valid":e,"is-invalid":n});function j(e,n){e&1&&(o(0,"p"),a(1,"Email is Required"),i())}function I(e,n){e&1&&(o(0,"p"),a(1,"Enter Valid Email "),i())}function O(e,n){if(e&1&&(o(0,"div",5),p(1,j,2,0,"p")(2,I,2,0),i()),e&2){let s,m=F();d(),c(1,(s=m.LoginForm.get("email"))!=null&&s.getError("required")?1:(s=m.LoginForm.get("email"))!=null&&s.getError("email")?2:-1)}}function P(e,n){e&1&&(o(0,"p"),a(1,"password is Required"),i())}function U(e,n){e&1&&(o(0,"p"),a(1,"must be at least 6 chars"),i())}function W(e,n){if(e&1&&(o(0,"div",5),p(1,P,2,0,"p")(2,U,2,0),i()),e&2){let s,m=F();d(),c(1,(s=m.LoginForm.get("password"))!=null&&s.getError("required")?1:(s=m.LoginForm.get("password"))!=null&&s.getError("pattern")?2:-1)}}function z(e,n){e&1&&(o(0,"span",10),a(1,"Login"),i(),o(2,"span"),h(3,"i",11),i())}function H(e,n){e&1&&(o(0,"span"),a(1,"Login"),i())}var ie=(()=>{let n=class n{constructor(){this._AuthService=f(x),this._FormBuilder=f(B),this._Router=f(E),this._ToastrService=f(V),this.isLoading=!1,this.LoginForm=this._FormBuilder.group({email:[null,[b.required,b.email]],password:[null,[b.required]]})}submitLoginForm(){this.LoginForm.valid?(this.isLoading=!0,this.fetchApi()):(this.LoginForm.markAllAsTouched(),this.isLoading=!1)}fetchApi(){this._AuthService.setLoginForm(this.LoginForm.value).subscribe({next:m=>{m.message=="success"&&(this.showSuccess(),setTimeout(()=>{localStorage.setItem("userToken",m.token),this._AuthService.saveUserData(),this._Router.navigate(["/home"])},1500)),this.isLoading=!1},error:()=>{this.isLoading=!1}})}showSuccess(){this._ToastrService.success("","Success Welcome \u263A..!",{timeOut:1500,positionClass:"toast-top-center"})}};n.\u0275fac=function(_){return new(_||n)},n.\u0275cmp=v({type:n,selectors:[["app-login"]],standalone:!0,features:[y],decls:20,vars:12,consts:[[1,"w-6/12","mx-auto","shadow","p-5","mb-10"],[1,"text-2xl","pt-10","main-color","font-semibold"],[1,"pt-10","pb-10",3,"ngSubmit","formGroup"],["for",""],["type","email","id","email","formControlName","email",1,"bg-gray-50","border","border-gray-300","text-gray-900","text-sm","rounded-lg","focus:ring-blue-500","focus:border-blue-500","block","w-full","p-2.5","dark:bg-gray-700","dark:border-gray-600","dark:placeholder-gray-400","dark:text-white","dark:focus:ring-blue-500","dark:focus:border-blue-500",3,"ngClass"],[1,"bg-red-200","p-2","mt-2","mb-3","rounded"],["type","password","id","password","formControlName","password",1,"bg-gray-50","border","border-gray-300","text-gray-900","text-sm","rounded-lg","focus:ring-blue-500","focus:border-blue-500","block","w-full","p-2.5","dark:bg-gray-700","dark:border-gray-600","dark:placeholder-gray-400","dark:text-white","dark:focus:ring-blue-500","dark:focus:border-blue-500",3,"ngClass"],[1,"flex","items-center","justify-end","gap-4"],["routerLink","/forget",1,"anchorLink"],["type","submit","title","Enter data in Form For Enable Button",1,"link-style","mt-5","mb-5"],[1,"pr-1"],[1,"fa","fa-spinner","fa-spin"]],template:function(_,t){if(_&1&&(o(0,"div",0)(1,"h1",1),a(2,"Login Now"),i(),o(3,"form",2),S("ngSubmit",function(){return t.submitLoginForm()}),o(4,"div")(5,"label",3),a(6,"email : "),i(),h(7,"input",4),p(8,O,3,1,"div",5),i(),o(9,"div")(10,"label",3),a(11,"password : "),i(),h(12,"input",6),p(13,W,3,1,"div",5),i(),o(14,"div",7)(15,"a",8),a(16,"Forget Password"),i(),o(17,"button",9),p(18,z,4,0)(19,H,2,0),i()()()()),_&2){let r,u,l,g;d(3),L("formGroup",t.LoginForm),d(4),L("ngClass",C(6,M,!((r=t.LoginForm.get("email"))!=null&&r.errors)&&(((r=t.LoginForm.get("email"))==null?null:r.touched)||((r=t.LoginForm.get("email"))==null?null:r.dirty)),((r=t.LoginForm.get("email"))==null?null:r.errors)&&(((r=t.LoginForm.get("email"))==null?null:r.touched)||((r=t.LoginForm.get("email"))==null?null:r.dirty)))),d(),c(8,(u=t.LoginForm.get("email"))!=null&&u.errors&&((u=t.LoginForm.get("email"))!=null&&u.touched||(u=t.LoginForm.get("email"))!=null&&u.dirty)?8:-1),d(4),L("ngClass",C(9,M,!((l=t.LoginForm.get("password"))!=null&&l.errors)&&(((l=t.LoginForm.get("password"))==null?null:l.touched)||((l=t.LoginForm.get("password"))==null?null:l.dirty)),((l=t.LoginForm.get("password"))==null?null:l.errors)&&(((l=t.LoginForm.get("password"))==null?null:l.touched)||((l=t.LoginForm.get("password"))==null?null:l.dirty)))),d(),c(13,(g=t.LoginForm.get("password"))!=null&&g.errors&&((g=t.LoginForm.get("password"))!=null&&g.touched||(g=t.LoginForm.get("password"))!=null&&g.dirty)?13:-1),d(5),c(18,t.isLoading?18:19)}},dependencies:[G,R,T,A,N,q,D,k,w]});let e=n;return e})();export{ie as LoginComponent};
