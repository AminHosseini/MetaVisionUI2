import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductCategoriesModel } from '../models/product-categories.model';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryUrlsService } from './product-category-urls.service';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryStorageService {
  constructor(
    private httpClient: HttpClient,
    private productCategoryUrlsService: ProductCategoryUrlsService,
    private productCategoryService: ProductCategoryService
  ) {}

  getProductCategories(): ProductCategoriesModel[] {
    this.httpClient
      .get<ProductCategoriesModel[]>(
        this.productCategoryUrlsService.productCategoriesUrl
      )
      .subscribe({
        next: (data) => {
          this.productCategoryService.setProductCategories(data);
        },
        error: (err) => {},
      });
    return this.productCategoryService.getProductCategories();
  }
}
