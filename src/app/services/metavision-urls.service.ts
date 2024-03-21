import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MetavisionUrlsService {
  get productCategoriesUrl(): string {
    return 'https://localhost:8082/api/ProductCategories';
  }
}
