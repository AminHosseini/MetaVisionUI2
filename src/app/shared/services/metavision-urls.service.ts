import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MetavisionUrlsService {
  private domain: string = 'https://localhost:7191/api';

  get productCategoriesUrl(): string {
    return `${this.domain}/product-categories`;
  }

  get createProductCategoryUrl(): string {
    return `${this.domain}/product-categories`;
  }

  get productCategoriesGroupUrl(): string {
    return `${this.domain}/product-categories?select=productCategoryId,parentId,name&filter=parentId eq null`;
  }
}
