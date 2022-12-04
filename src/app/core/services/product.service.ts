import { Injectable } from '@angular/core';
import { isEmpty } from 'lodash-es';
import {
  BehaviorSubject,
  combineLatest,
  groupBy,
  iif,
  map,
  mergeMap,
  of,
  startWith,
} from 'rxjs';
import { share, mergeAll, toArray } from 'rxjs';
import { CartService } from './cart.service';
import { ProductDataService } from './product-data.service';

@Injectable()
export class ProductService {
  private _categoryFilter$ = new BehaviorSubject<string>('');

  private get _products$() {
    return this.dataService.getAllProducts().pipe(share());
  }

  private get _cartProducts$() {
    return this.cartService.products$;
  }

  constructor(
    private dataService: ProductDataService,
    private cartService: CartService
  ) {}

  private get products$() {
    return combineLatest([this._products$, this._cartProducts$]).pipe(
      map(([products, cartProduct]) => {
        cartProduct.forEach((selected) => {
          let product = products.find((prd) => prd.id === selected.id);
          if (product) {
            product = {
              ...product,
              quantity: product.quantity - selected.quantity,
            };
            products = [
              ...products.filter((prd) => prd.id !== selected.id),
              product,
            ];
          }
        });
        return products;
      }),
      map((items) => items.sort((a, b) => a.id - b.id)),
      share()
    );
  }

  get filtredProduct$() {
    return combineLatest([this.products$, this._categoryFilter$]).pipe(
      mergeMap(([products, categoryFilter]) =>
        iif(
          () => isEmpty(categoryFilter),
          of(products),
          of(products.filter((product) => product.category === categoryFilter))
        )
      )
    );
  }

  get categories$() {
    return this._products$.pipe(
      mergeAll(),
      groupBy((product) => product.category),
      mergeMap((group) => of(group.key)),
      startWith(''),
      toArray(),
      share()
    );
  }

  filterProductByCategory(filter = '') {
    this._categoryFilter$.next(filter);
  }
}
