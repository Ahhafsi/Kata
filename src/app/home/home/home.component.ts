import { Component, OnInit } from '@angular/core';
import { CartService } from '@core/services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  selectedProductsCount$!: Observable<number>;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.selectedProductsCount$ = this.cartService.selectionCount();
  }
}
