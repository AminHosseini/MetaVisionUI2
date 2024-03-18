import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetProductCategoryComponent } from './get-product-category.component';

describe('GetProductCategoryComponent', () => {
  let component: GetProductCategoryComponent;
  let fixture: ComponentFixture<GetProductCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetProductCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
