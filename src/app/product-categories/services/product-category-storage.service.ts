import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductCategoriesModel } from '../models/product-categories.model';
import { ProductCategoryService } from './product-category.service';
import { MetavisionUrlsService } from '../../services/metavision-urls.service';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryStorageService {
  constructor(
    private httpClient: HttpClient,
    private metavisionUrlsService: MetavisionUrlsService,
    private productCategoryService: ProductCategoryService
  ) {}

  getProductCategories(): ProductCategoriesModel[] {
    this.httpClient
      .get<ProductCategoriesModel[]>(
        this.metavisionUrlsService.productCategoriesUrl
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
