import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateProductCategoryComponent } from './product-categories/create-product-category/create-product-category.component';
import { GetProductCategoriesComponent } from './product-categories/get-product-categories/get-product-categories.component';
import { GetProductCategoryComponent } from './product-categories/get-product-category/get-product-category.component';
import { productCategoryResolver } from './product-categories/resolvers/product-category.resolver';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { GetProductComponent } from './products/get-product/get-product.component';
import { GetProductsComponent } from './products/get-products/get-products.component';
import { newProductCategoryResolver } from './product-categories/resolvers/new-product-category.resolver';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  {
    path: 'product-categories',
    component: GetProductCategoriesComponent,
    resolve: [productCategoryResolver],
  },

  {
    path: 'product-categories/new',
    component: CreateProductCategoryComponent,
    resolve: [newProductCategoryResolver],
  },
  { path: 'product-categories/:id', component: GetProductCategoryComponent },

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

  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];
