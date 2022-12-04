import { Component } from '@angular/core';
import { RawProduct } from '@core/model';
import { ProductService } from '@core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products$: Observable<RawProduct[]>;
  categories$: Observable<string[]>;
  selectedcategory?: string;

  constructor(private service: ProductService) {
    this.products$ = this.service.filtredProduct$;
    this.categories$ = this.service.categories$;
  }

  onCategoryChange() {
    this.service.filterProductByCategory(this.selectedcategory);
  }
}
