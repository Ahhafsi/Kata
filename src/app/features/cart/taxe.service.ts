import { Injectable } from '@angular/core';

@Injectable()
export class TaxeService {
  /**
   * round the provided decimal to the next multiple of five
   *  .x6 ... .x9 to rounded to .y0 (with y= x+1)
   *  .x1 ... .x4 to rounded to .x5
   * @param value as decimal
   * @returns rounded decimal to the next multiple of five
   */
  roundToFive = (value: number): number => {
    const val = Math.trunc(value * 100);
    const modulus = val % 5;
    const result = modulus > 0 ? val - modulus + 5 : val;
    return result / 100;
  };
}
