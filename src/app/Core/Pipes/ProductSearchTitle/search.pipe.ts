import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../interfaces/Products/Products/GetAllProducts';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform( products: Product[] ,searchText: string): Product[] {
    return products.filter((p) => {
      return p.title.toLowerCase().includes(searchText.toLowerCase())
    });
  }

}
