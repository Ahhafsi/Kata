import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ProductDataService } from './product-data.service';

describe('ProductsDataService', () => {
  let service: ProductDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProductDataService],
    });
    service = TestBed.inject(ProductDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
