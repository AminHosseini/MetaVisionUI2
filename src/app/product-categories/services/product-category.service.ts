import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import Swal from 'sweetalert2';
import { ProductCategoriesModel } from '../models/product-categories.model';
import { ProductCategoriesGroup } from '../models/product-categories-group.model';
import { IdRowVersion } from '../../models/id-rowversion.model';
import { MetavisionUrlsService } from '../../services/metavision-urls.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  private productCategories: ProductCategoriesModel[] = [];
  productCategoriesChanged = new Subject<ProductCategoriesModel[]>();
  private productCategoriesGroup: ProductCategoriesGroup[] = [];

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
        Swal.fire({
          text: 'مشکلی در دریافت اطلاعات به وجود آمد.',
          icon: 'error',
        });
      },
    });
    return data;
  }

  createProductCategory(productCategory: ProductCategoriesModel): void {
    this.httpClient
      .post<IdRowVersion>(
        this.metavisionUrlsService.createProductCategoryUrl,
        productCategory
      )
      .subscribe({
        // next: (idRowVersion: IdRowVersion) => {},
        complete: () => {
          Swal.fire({
            text: 'عملیات با موفقیت انجام شد.',
            icon: 'success',
          });
        },
        error: (err) => {
          this.errorHandlerService.handleError(err);
          // implement error logic
          console.log(err);
          Swal.fire({
            text: 'عملیات با موفقیت انجام نشد.',
            icon: 'error',
          });
        },
      });
  }

  getProductCategories(): ProductCategoriesModel[] {
    return this.productCategories;
  }

  setProductCategoriesGroup(): void {
    this.productCategories.forEach((productCategory) => {
      if (productCategory.parentId === null) {
        let item = new ProductCategoriesGroup(
          productCategory.productCategoryId,
          productCategory.name
        );
        this.productCategoriesGroup.push(item);
      }
    });
  }

  getProductCategoriesGroup(): ProductCategoriesGroup[] {
    return this.productCategoriesGroup;
  }

  // createProductCategory(): IdRowVersion {}
}
