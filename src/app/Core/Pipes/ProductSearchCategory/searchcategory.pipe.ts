import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../interfaces/Products/Products/GetAllProducts';

@Pipe({
  name: 'searchcategory',
  standalone: true
})
export class SearchcategoryPipe implements PipeTransform {

  transform(product: Product[], searchText: string): Product[] {
    return product.filter((product) => {
      return product.category.name.toLowerCase().includes(searchText.toLowerCase())
    });
  }

}
