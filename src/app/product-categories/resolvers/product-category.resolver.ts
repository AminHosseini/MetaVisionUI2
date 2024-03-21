import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ProductCategoriesModel } from '../models/product-categories.model';
import { ProductCategoryStorageService } from '../services/product-category-storage.service';

export const productCategoryResolver: ResolveFn<ProductCategoriesModel[]> = (
  route,
  state
) => {
  const productCategoryStorageService = inject(ProductCategoryStorageService);
  return productCategoryStorageService.getProductCategories();
};
