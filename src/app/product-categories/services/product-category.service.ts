import { Injectable } from '@angular/core';
import { ProductCategoriesGroup } from '../models/product-categories-group.model';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  private productCategoriesGroup: ProductCategoriesGroup[] = [];

  setProductCategoriesGroup(
    productCategoriesGroup: ProductCategoriesGroup[]
  ): void {
    this.productCategoriesGroup = productCategoriesGroup;
  }

  getProductCategoriesGroup(): ProductCategoriesGroup[] {
    return this.productCategoriesGroup;
  }
}
