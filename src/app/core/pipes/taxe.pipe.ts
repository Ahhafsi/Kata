import { Pipe, PipeTransform } from '@angular/core';
import { TaxeService } from '@app/features/cart/taxe.service';
import { Product } from '@core/model';

@Pipe({
  name: 'taxe',
})
export class TaxePipe implements PipeTransform {
  constructor(private taxeService: TaxeService) {}

  transform(product: Product): number {
    return this.taxeService.roundToFive(
      (product.price * product.getTaxe()) / 100
    );
  }
}
