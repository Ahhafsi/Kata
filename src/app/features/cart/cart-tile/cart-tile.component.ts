import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '@core/model';
import { CartService } from '@core/services/cart.service';
import { TaxeService } from '../taxe.service';

@Component({
  selector: 'app-cart-tile',
  templateUrl: './cart-tile.component.html',
  styleUrls: ['./cart-tile.component.scss'],
})
export class CartTileComponent implements OnChanges {
  @Input() product!: Product;
  netValue!: number;
  constructor(private taxeService: TaxeService, private service: CartService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const taxeValue = this.taxeService.roundToFive(
      (this.product.getTaxe() * this.product.price) / 100
    );

    this.netValue = this.taxeService.roundToFive(
      this.product.price + taxeValue
    );
  }

  onRemoveProduct() {
    this.service.removeProduct(this.product.id);
  }
}
