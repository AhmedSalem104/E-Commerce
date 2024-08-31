import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { dir } from 'console';

@Injectable({
  providedIn: 'root'
})
export class MytranslateService {


  private readonly _TranslateService = inject(TranslateService)
  private readonly _platId = inject(PLATFORM_ID)

  // service تحتوى على جميع ال  dom
  private readonly _Renderer2 = inject(RendererFactory2).createRenderer(null, null)
  constructor() {


    if (isPlatformBrowser(this._platId)) {

      // 2- Set default language
      this._TranslateService.setDefaultLang('en')

      this.setLang()

    }

  }
  setLang() {
    // 1- Get lang form localstorage 
    let savedlang = localStorage.getItem('lang');

    // 3- Use lang ----> local
    if (savedlang !== null) {
      this._TranslateService.use(savedlang!)
    }

    // Logic direction  ---> en -- > ltr , ar --> rtl

    if (savedlang === 'en') { //dir ltr
 
      this._Renderer2.setAttribute(document.documentElement, 'dir', 'ltr')
      this._Renderer2.setAttribute(document.documentElement, 'lang', 'en')
    }
    else if (savedlang === 'ar') {// dir rtl 
   
      this._Renderer2.setAttribute(document.documentElement, 'dir', 'rtl')
      this._Renderer2.setAttribute(document.documentElement, 'lang', 'ar')

    }




  }
  changeLang(lang: string): void {
    if (isPlatformBrowser(this._platId)) {
      localStorage.setItem('lang', lang) // save lang Inside local  (en ,ar);
      this.setLang()
    }
  }
}
