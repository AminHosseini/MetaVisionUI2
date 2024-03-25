import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ProductCategoriesGroup } from '../models/product-categories-group.model';
import { ProductCategoryStorageService } from '../services/product-category-storage.service';

export const newProductCategoryResolver: ResolveFn<ProductCategoriesGroup[]> = (
  route,
  state
) => {
  const productCategoryStorageService = inject(ProductCategoryStorageService);
  return productCategoryStorageService.fetchProductCategoriesGroup();
};
