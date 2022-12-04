import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '@app/shared/shared.module';
import { CartService } from '@core/services/cart.service';

@NgModule({
  declarations: [HomeComponent],
  imports: [HomeRoutingModule, SharedModule],
  providers: [CartService],
})
export class HomeModule {}
