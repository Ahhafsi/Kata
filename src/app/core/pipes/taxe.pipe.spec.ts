import { TaxePipe } from './taxe.pipe';
import { TestBed } from '@angular/core/testing';
import { TaxeService } from '@app/features/cart/taxe.service';

describe('TaxePipe', () => {
  let service: TaxeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaxeService],
    });
    service = TestBed.inject(TaxeService);
  });

  it('create an instance', () => {
    const pipe = new TaxePipe(service);
    expect(pipe).toBeTruthy();
  });
});
