import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MetavisionUrlsService {
  private domain: string = 'https://localhost:8082/api';

  get productCategoriesUrl(): string {
    return `${this.domain}/product-categories`;
  }

  get createProductCategoryUrl(): string {
    return `${this.domain}/product-categories`;
  }
}
