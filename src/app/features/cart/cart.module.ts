import { NgModule } from '@angular/core';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from '@app/features/cart/cart/cart.component';
import { CartTileComponent } from './cart-tile/cart-tile.component';
import { SharedModule } from '@app/shared/shared.module';
import { TaxeService } from './taxe.service';

@NgModule({
  declarations: [CartComponent, CartTileComponent],
  imports: [CartRoutingModule, SharedModule],
  providers: [TaxeService],
})
export class CartModule {}
