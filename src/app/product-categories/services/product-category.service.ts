import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import Swal from 'sweetalert2';
import { ProductCategoriesModel } from '../models/product-categories.model';
import { ProductCategoriesGroupModel } from '../models/product-categories-group.model';
import { IdRowVersionModel } from '../../shared/models/id-rowversion.model';
import { MetavisionUrlsService } from '../../shared/services/metavision-urls.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  private productCategories: ProductCategoriesModel[] = [];
  productCategoriesChanged = new Subject<ProductCategoriesModel[]>();

  private productCategoriesGroup: ProductCategoriesGroupModel[] = [];
  productCategoriesGroupChanged = new Subject<ProductCategoriesGroupModel[]>();

  constructor(
    private httpClient: HttpClient,
    private metavisionUrlsService: MetavisionUrlsService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchProductCategories(): Observable<ProductCategoriesModel[]> {
    const data = this.httpClient.get<ProductCategoriesModel[]>(
      this.metavisionUrlsService.productCategoriesUrl
    );
    data.subscribe({
      next: (productCategories: ProductCategoriesModel[]) => {
        this.productCategories = productCategories;
        this.productCategoriesChanged.next(this.productCategories);
      },
      // complete: () => {},
      error: (err) => {
        this.errorHandlerService.handleError(err.status);
      },
    });
    return data;
  }

  createProductCategory(productCategory: ProductCategoriesModel): void {
    this.httpClient
      .post<IdRowVersionModel>(
        this.metavisionUrlsService.createProductCategoryUrl,
        productCategory
      )
      .subscribe({
        next: (idRowVersion: IdRowVersionModel) => {
          // console.log(idRowVersion);
        },
        complete: () => {
          Swal.fire({
            text: 'عملیات با موفقیت انجام شد.',
            icon: 'success',
          });
        },
        error: (err) => {
          this.errorHandlerService.handleError(err.status);
        },
      });
  }

  getProductCategories(): ProductCategoriesModel[] {
    return this.productCategories;
  }

  fetchProductCategoriesGroup(): Observable<ProductCategoriesGroupModel[]> {
    const data = this.httpClient.get<ProductCategoriesGroupModel[]>(
      this.metavisionUrlsService.productCategoriesGroupUrl
    );
    data.subscribe({
      next: (productCategoriesGroup: ProductCategoriesGroupModel[]) => {
        this.productCategoriesGroup = productCategoriesGroup;
        this.productCategoriesGroupChanged.next(this.productCategoriesGroup);
      },
      // complete: () => {},
      error: (err) => {
        this.errorHandlerService.handleError(err.status);
      },
    });
    return data;
  }

  getProductCategoriesGroup(): ProductCategoriesGroupModel[] {
    return this.productCategoriesGroup;
  }
}
