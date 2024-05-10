import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import Swal from 'sweetalert2';
import { ProductCategoriesModel } from '../models/product-categories.model';
import { ProductCategoriesGroup } from '../models/product-categories-group.model';
import { IdRowVersion } from '../../shared/models/id-rowversion.model';
import { MetavisionUrlsService } from '../../shared/services/metavision-urls.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { LoadingSpinnerService } from '../../shared/components/loading-spinner/loading-spinner.service';

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
    private errorHandlerService: ErrorHandlerService,
    private loadingSpinnerService: LoadingSpinnerService
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
        this.loadingSpinnerService.resetSpinner();
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
        next: (idRowVersion: IdRowVersion) => {
          console.log(idRowVersion);
        },
        complete: () => {
          Swal.fire({
            text: 'عملیات با موفقیت انجام شد.',
            icon: 'success',
          });
        },
        error: (err) => {
          this.loadingSpinnerService.resetSpinner();
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
}
