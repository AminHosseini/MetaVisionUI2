import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { MetavisionUrlsService } from '../../services/metavision-urls.service';
import { ProductCategoriesGroup } from '../models/product-categories-group.model';
import { ProductCategoryService } from './product-category.service';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryStorageService {
  constructor(
    private httpClient: HttpClient,
    private metavisionUrlsService: MetavisionUrlsService,
    private productCategoryService: ProductCategoryService
  ) {}

  // private productCategories: ProductCategoriesModel[] = [];
  // productCategoriesChanged = new Subject<ProductCategoriesModel[]>();

  // getProductCategories(): ProductCategoriesModel[] {
  //   this.httpClient
  //     .get<ProductCategoriesModel[]>(
  //       this.metavisionUrlsService.productCategoriesUrl
  //     )
  //     .subscribe({
  //       next: (data) => {
  //         this.productCategoryService.setProductCategories(data);
  //       },
  //       error: (err) => {},
  //     });
  //   return this.productCategoryService.getProductCategories();
  // }

  // setProductCategories(productCategories: ProductCategoriesModel[]): void {
  //   this.productCategories = productCategories;
  //   this.productCategoriesChanged.next(this.productCategories.slice());
  // }
  // getProductCategories(): ProductCategoriesModel[] {
  //   return this.productCategories.slice();
  // }

  fetchProductCategoriesGroup(): Observable<ProductCategoriesGroup[]> {
    return this.httpClient
      .get<ProductCategoriesGroup[]>(
        this.metavisionUrlsService.productCategoriesGroupUrl
      )
      .pipe(
        tap((groups) => {
          this.productCategoryService.setProductCategoriesGroup(groups);
        })
      );
    // .subscribe({
    //   next: (data) => {
    //     this.productCategoriesGroup = data;
    //   },
    //   complete: () => {},
    //   error: (err) => {
    //     // Error handling must be implemented
    //     console.log(err);
    //   },
    // });
  }
}
