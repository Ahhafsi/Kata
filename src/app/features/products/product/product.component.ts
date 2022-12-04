import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { RawProduct } from '@core/model';
import { CartService } from '@core/services/cart.service';
import { toArray, range, startWith } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnChanges {
  @Input() product!: RawProduct;
  quantityOptions$!: Observable<number[]>;
  selectedQuantity = 0;

  constructor(private cartService: CartService) {}

  ngOnChanges(): void {
    this.quantityOptions$ = range(1, this.product?.quantity).pipe(
      startWith(0),
      toArray()
    );
  }

  addToCart() {
    if (this.selectedQuantity > 0) {
      this.cartService.updateCart(this.product, Number(this.selectedQuantity));
      this.selectedQuantity = 0;
    }
  }
}
