import { Routes } from '@angular/router';
import { GetProductCategoriesComponent } from './product-categories/get-product-categories/get-product-categories.component';
import { CreateProductCategoryComponent } from './product-categories/create-product-category/create-product-category.component';
import { GetProductCategoryComponent } from './product-categories/get-product-category/get-product-category.component';
import { GetProductsComponent } from './products/get-products/get-products.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { GetProductComponent } from './products/get-product/get-product.component';
import { productCategoryResolver } from './product-categories/resolvers/product-category.resolver';

export const shopRoutes: Routes = [
  {
    path: 'product-categories',
    component: GetProductCategoriesComponent,
    resolve: [productCategoryResolver],
    children: [
      {
        path: 'new',
        component: CreateProductCategoryComponent,
      },
      {
        path: ':id',
        component: GetProductCategoryComponent,
      },
    ],
  },
  {
    path: 'products',
    component: GetProductsComponent,
    children: [
      {
        path: 'new',
        component: CreateProductComponent,
      },
      {
        path: ':id',
        component: GetProductComponent,
      },
    ],
  },
];
