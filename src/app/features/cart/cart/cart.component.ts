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
import { Observable, map, withLatestFrom, tap } from 'rxjs';
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
        products.map((product) => this.taxeService.toConcreteProduct(product))
      )
    );

    this.totalTaxes$ = this.products$.pipe(
      map((prods) =>
        prods.map(
          (prod) =>
            prod.quantity *
            this.taxeService.roundToFive(prod.price * (prod.getTaxe() / 100))
        )
      ),
      map((taxe) => taxe.reduce((acc, curr) => acc + curr, 0)),
      map((total) => this.taxeService.roundToFive(total))
    );

    this.totalPrice$ = this.products$.pipe(
      map((prods) =>
        prods.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
      ),
      withLatestFrom(this.totalTaxes$),
      map(([prices, taxes]) => prices + taxes),
      map((total) => Math.trunc(total * 100) / 100)
    );
  }
}
