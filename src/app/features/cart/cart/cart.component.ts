import { Component } from '@angular/core';
import {
  Book,
  BookCategory,
  EssentialCategory,
  EssentialProduct,
  ImportedProduct,
  Others,
  Product,
  RawProduct,
} from '@core/model';
import { CartService } from '@core/services/cart.service';
import { Observable, map, withLatestFrom } from 'rxjs';
import { TaxeService } from '../taxe.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  products$: Observable<Product[]>;
  totalPrice$: Observable<number>;
  totalTaxes$: Observable<number>;

  constructor(private service: CartService, private taxeService: TaxeService) {
    this.products$ = this.service.products$.pipe(
      map((products) =>
        products.map((product) => this.toConcreteProduct(product))
      )
    );

    this.totalTaxes$ = this.products$.pipe(
      map((prods) =>
        prods.map((prod) =>
          this.taxeService.roundToFive((prod.price * prod.getTaxe()) / 100)
        )
      ),
      map((prods) => prods.reduce((acc, curr) => acc + curr, 0))
    );

    this.totalPrice$ = this.products$.pipe(
      map((prods) => prods.reduce((acc, curr) => acc + curr.price, 0)),
      withLatestFrom(this.totalTaxes$),
      map(([prices, taxes]) => this.taxeService.roundToFive(prices + taxes))
    );
  }

  // should be with concrete type
  toConcreteProduct = (rawProduct: RawProduct): Product => {
    let product: Product;
    if (rawProduct.category in EssentialCategory) {
      product = new EssentialProduct(rawProduct);
    } else if (rawProduct.category in BookCategory) {
      product = new Book(rawProduct);
    } else {
      product = new Others(rawProduct);
    }
    if (rawProduct.isImported) return new ImportedProduct(product);
    return product;
  };
}
