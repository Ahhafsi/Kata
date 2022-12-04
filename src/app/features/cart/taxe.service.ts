import { Injectable } from '@angular/core';
import {
  Book,
  BookCategory,
  EssentialCategory,
  EssentialProduct,
  ImportedProduct,
  Others,
  Product,
  RawProduct,
} from '@core/model';

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

  /**
   * regarding to the product's category
   * it creates the more appropriate type
   * @param rawProduct
   * @returns
   */
  toConcreteProduct = (rawProduct: RawProduct): Product => {
    let product: Product;
    if (rawProduct.category in EssentialCategory) {
      product = new EssentialProduct(rawProduct);
    } else if (rawProduct.category in BookCategory) {
      product = new Book(rawProduct);
    } else {
      product = new Others(rawProduct);
    }
    if (rawProduct.isImported) return new ImportedProduct(product);
    return product;
  };
}
