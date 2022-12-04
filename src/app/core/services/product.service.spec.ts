import products from '@mocks/products.json';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CartService } from './cart.service';
import { ProductDataService } from './product-data.service';

import { ProductService } from './product.service';

describe('ProductsService', () => {
  let service: ProductService;
  let productDataServiceSpy: jasmine.SpyObj<ProductDataService>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;

  beforeEach(() => {
    const cartSpy = new CartService();
    const productSpy = jasmine.createSpyObj('ProductDataService', [
      'getAllProducts',
    ]);

    TestBed.configureTestingModule({
      providers: [
        ProductService,
        { provide: CartService, useValue: cartSpy },
        { provide: ProductDataService, useValue: productSpy },
      ],
    });
    service = TestBed.inject(ProductService);
    productDataServiceSpy = TestBed.inject(
      ProductDataService
    ) as jasmine.SpyObj<ProductDataService>;
    cartServiceSpy = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    productDataServiceSpy.getAllProducts.and.returnValue(of(products));
    spyOnProperty(cartSpy, 'products$', 'get').and.returnValue(of([]));
  });

  it('should get categories', (done: DoneFn) => {
    service.categories$.subscribe({
      next: (categories) => {
        expect(categories).toContain('');
        expect(categories).toContain('Food');
        expect(categories).toContain('Books');
        done();
      },
      error: done.fail,
    });

    expect(productDataServiceSpy.getAllProducts.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('should return products filtred by category', (done: DoneFn) => {
    service.filterProductByCategory('Food');

    service.filtredProduct$.subscribe({
      next: (products) => {
        expect(products.length).toEqual(8);
        done();
      },
      error: done.fail,
    });

    expect(productDataServiceSpy.getAllProducts.calls.count())
      .withContext('one call')
      .toBe(1);
  });
});
