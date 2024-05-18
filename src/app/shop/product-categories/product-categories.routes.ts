import { Routes } from '@angular/router';
import { GetProductCategoriesComponent } from './get-product-categories/get-product-categories.component';
import { CreateProductCategoryComponent } from './create-product-category/create-product-category.component';
import { createProductCategoryCandeactivateGuard } from './guards/create-product-category-candeactivate.guard';
import { newProductCategoryResolver } from './resolvers/new-product-category.resolver';
import { productCategoryResolver } from './resolvers/product-category.resolver';

export const productCategoriesRoutes: Routes = [
  {
    path: 'product-categories',
    component: GetProductCategoriesComponent,
    resolve: [productCategoryResolver],
  },

  {
    path: 'product-categories/new',
    component: CreateProductCategoryComponent,
    resolve: [newProductCategoryResolver],
    canDeactivate: [createProductCategoryCandeactivateGuard],
  },
];
