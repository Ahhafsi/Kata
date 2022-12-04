import { NgModule } from '@angular/core';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from '@app/features/cart/cart/cart.component';
import { CartTileComponent } from './cart-tile/cart-tile.component';
import { SharedModule } from '@app/shared/shared.module';
import { TaxeService } from './taxe.service';
import { TaxePipe } from '@core/pipes/taxe.pipe';

@NgModule({
  declarations: [CartComponent, CartTileComponent, TaxePipe],
  imports: [CartRoutingModule, SharedModule],
  providers: [TaxeService],
})
export class CartModule {}
