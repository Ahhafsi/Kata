import { omit } from 'lodash-es';

export class RawProduct {
  id!: number;
  productName!: string;
  quantity!: number;
  price!: number;
  category!: string;
  isImported!: boolean;
}

export abstract class Product {
  id!: number;
  productName!: string;
  quantity!: number;
  price!: number;
  category!: string;
  protected taxe!: number;

  constructor({
    id,
    productName,
    quantity,
    price,
    category,
  }: Omit<RawProduct, 'isImported'>) {
    this.id = id;
    this.productName = productName;
    this.quantity = quantity;
    this.price = price;
    this.category = category;
  }

  public getTaxe(): number {
    return this.taxe;
  }
}

export class EssentialProduct extends Product {
  override taxe = 0;
}

export class Book extends Product {
  override taxe = 10;
}

export class Others extends Product {
  override taxe = 20;
}

abstract class TaxeDecorator extends Product {
  protected product: Product;

  constructor(product: Product) {
    super({ ...omit(product, 'taxe') });
    this.product = product;
  }

  override getTaxe(): number {
    return this.product.getTaxe() + this.taxe;
  }
}

export class ImportedProduct extends TaxeDecorator {
  override taxe = 5;
}

export enum EssentialCategory {
  'Food' = 'Food',
  'Medecine' = 'Medecine',
}
export enum BookCategory {
  'Book' = 'Books',
}
