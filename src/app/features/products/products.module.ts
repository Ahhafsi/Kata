import { NgModule } from '@angular/core';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { SharedModule } from '@app/shared/shared.module';
import { ProductDataService, ProductService } from '@core/services';

@NgModule({
  declarations: [ProductListComponent, ProductComponent],
  imports: [ProductsRoutingModule, SharedModule],
  providers: [ProductDataService, ProductService],
})
export class ProductsModule {}
