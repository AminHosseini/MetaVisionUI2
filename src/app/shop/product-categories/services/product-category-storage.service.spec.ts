import { TestBed } from '@angular/core/testing';

import { ProductCategoryStorageService } from './product-category-storage.service';

describe('ProductCategoryStorageService', () => {
  let service: ProductCategoryStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCategoryStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
