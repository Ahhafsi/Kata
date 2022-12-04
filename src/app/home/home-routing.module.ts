import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'products',
        loadChildren: () =>
          import('@features/products/products.module').then(
            (module) => module.ProductsModule
          ),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('@features/cart/cart.module').then(
            (module) => module.CartModule
          ),
      },
      { path: '**', redirectTo: '/products' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
