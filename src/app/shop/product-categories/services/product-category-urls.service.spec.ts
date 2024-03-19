import { TestBed } from '@angular/core/testing';

import { ProductCategoryUrlsService } from './product-category-urls.service';

describe('ProductCategoryUrlsService', () => {
  let service: ProductCategoryUrlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCategoryUrlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
