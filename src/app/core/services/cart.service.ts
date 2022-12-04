import { Injectable } from '@angular/core';
import { RawProduct } from '@core/model';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable()
export class CartService {
  private _products: RawProduct[] = [];
  private _products$ = new BehaviorSubject<RawProduct[]>([]);

  updateCart(product: RawProduct, quantity: number) {
    !this._products.find((prdct) => prdct.id === product.id)
      ? (this._products = [...this._products, { ...product, quantity }])
      : (this._products = [
          ...this._products.filter((prdct) => prdct.id !== product.id),
          ...this._products
            .filter((prdct) => prdct.id === product.id)
            .map((prdct) => ({
              ...prdct,
              quantity: prdct.quantity + quantity,
            })),
        ]);

    this._products$.next(this._products);
  }

  resetCart() {
    this._products = [];
    this._products$.next(this._products);
  }

  removeProduct(id: number) {
    this._products = [...this._products.filter((prdct) => prdct.id !== id)];
    this._products$.next(this._products);
  }

  get products$(): Observable<RawProduct[]> {
    return this._products$.asObservable();
  }

  selectionCount() {
    return this._products$.pipe(
      map((products) => products.map((product) => product.quantity)),
      map((products) => products.reduce((acc, curr) => acc + curr, 0))
    );
  }
}
