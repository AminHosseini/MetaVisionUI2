import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateProductCategoryComponent } from './product-categories/create-product-category/create-product-category.component';
import { GetProductCategoriesComponent } from './product-categories/get-product-categories/get-product-categories.component';
import { productCategoryResolver } from './product-categories/resolvers/product-category.resolver';
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

  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];
