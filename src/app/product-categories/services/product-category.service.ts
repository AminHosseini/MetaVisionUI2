import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { ProductCategoriesModel } from '../models/product-categories.model';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  private productCategories: ProductCategoriesModel[] = [];
  productCategoriesChanged = new Subject<ProductCategoriesModel[]>();

  setProductCategories(productCategories: ProductCategoriesModel[]): void {
    this.productCategories = productCategories;
    this.productCategoriesChanged.next(this.productCategories.slice());
  }

  getProductCategories(): ProductCategoriesModel[] {
    return this.productCategories.slice();
  }
}
