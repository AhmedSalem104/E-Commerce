import { Component, inject, OnInit } from '@angular/core';
import { BrandServiceService } from '../../Core/services/Brand/brand-service.service';
import { Brand } from '../../Core/interfaces/brand/brand';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

  data!: Brand[]

  private readonly _BrandService = inject(BrandServiceService)
  
  ngOnInit(): void {
    this.GetAllBrands()
  }

  GetAllBrands() {
    this._BrandService.GetAllBrands().subscribe({
      next: (res) => {
        this.data = res.data
      },
      error: (err) => {
        console.log(err);

      }
    })
  }


}
