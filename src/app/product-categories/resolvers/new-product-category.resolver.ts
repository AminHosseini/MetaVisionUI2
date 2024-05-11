import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ProductCategoriesGroup } from '../models/product-categories-group.model';
import { ProductCategoryService } from '../services/product-category.service';

export const newProductCategoryResolver: ResolveFn<ProductCategoriesGroup[]> = (
  route,
  state
) => {
  const productCategoryService = inject(ProductCategoryService);
  return productCategoryService.fetchProductCategoriesGroup();
};
