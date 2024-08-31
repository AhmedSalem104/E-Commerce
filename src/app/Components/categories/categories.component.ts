import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../Core/services/Category/categories.service';
import { Category, CategoryObj } from '../../Core/interfaces/Category/Category';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {


  Category!: Category[]

  private readonly _CategoriesService = inject(CategoriesService)
  ngOnInit(): void {
    this.getAllGategories();
  }

  getAllGategories() {
    this._CategoriesService.getAllGategories().subscribe({
      next: (res) => {
        this.Category = res.data
        console.log(res.data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


}
