import { TestBed } from '@angular/core/testing';

import { TaxeService } from './taxe.service';

describe('TaxeService', () => {
  let service: TaxeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaxeService],
    });
    service = TestBed.inject(TaxeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should round the decimal to the next multiple of five', () => {
    expect(service.roundToFive(0.99)).toBe(1);
    expect(service.roundToFive(1.01)).toBe(1.05);
    expect(service.roundToFive(1.0)).toBe(1);
    expect(service.roundToFive(1.56)).toBe(1.6);
  });
});
