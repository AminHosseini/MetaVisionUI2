import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { TextFieldModule } from '@angular/cdk/text-field';
import Swal from 'sweetalert2';
import { HelperService } from '../../shared/services/helper.service';
import { ProductCategoryService } from '../services/product-category.service';
import { ProductCategoriesGroupModel } from '../models/product-categories-group.model';

@Component({
  selector: 'app-create-product-category',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    TextFieldModule,
  ],
  templateUrl: './create-product-category.component.html',
  styleUrl: './create-product-category.component.css',
})
export class CreateProductCategoryComponent implements OnInit {
  productCategoryForm!: FormGroup;
  @ViewChild('form') form: any;
  keywordEntered: string = '';
  keywords: string[] = this.getKeywords();
  selectOptions: ProductCategoriesGroupModel[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private helperService: HelperService,
    private productCategoryService: ProductCategoryService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.fillParentIdSelect();
  }

  private initializeForm(): void {
    this.productCategoryForm = new FormGroup({
      parentId: new FormControl<number>(0, Validators.required),
      name: new FormControl<string>('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      description: new FormControl<string>('', [
        Validators.required,
        Validators.maxLength(1000),
      ]),
      seo: new FormGroup({
        metaDescription: new FormControl<string>('', [
          Validators.required,
          Validators.maxLength(200),
        ]),
        slug: new FormControl<string>('', [
          Validators.required,
          Validators.maxLength(200),
        ]),
        keywords: new FormControl<string[]>(this.keywords),
      }),
    });
  }

  private fillParentIdSelect(): void {
    this.selectOptions =
      this.productCategoryService.getProductCategoriesGroup();
  }

  onSubmit(): void {
    if (this.helperService.keywords.length === 0) {
      Swal.fire({
        text: 'کلمات کلیدی نمیتواند خالی باشد!',
        icon: 'error',
      });
      return;
    }

    this.productCategoryService.createProductCategory(
      this.productCategoryForm.value
    );

    this.productCategoryForm.reset();
    this.form.resetForm();
    this.helperService.keywords = [];
    this.keywords = this.helperService.keywords;
    (this.productCategoryForm.controls['seo'] as FormGroup).controls[
      'keywords'
    ].patchValue(this.keywords);
  }

  returnToProductCategories(): void {
    this.router.navigate(['/product-categories'], {
      relativeTo: this.activatedRoute,
    });
  }

  activateAddKeywordBtn(): boolean {
    return this.keywordEntered === '';
  }

  addNewKeyword(): void {
    this.helperService.addNewKeyword(this.keywordEntered);
    this.keywordEntered = '';
  }

  deleteKeyword(index: number): void {
    this.helperService.deleteKeyword(index);
  }

  descriptionOut(e: FocusEvent): void {
    this.helperService.autoFillMetaDescription(this.productCategoryForm);
  }

  nameOut(e: FocusEvent): void {
    this.helperService.autoFillSlug(this.productCategoryForm);
  }

  getKeywords(): string[] {
    return this.helperService.getKeywords();
  }

  ControlNotValid(
    controlName: string,
    groupName?: string
  ): boolean | undefined {
    return this.helperService.isNotValid(
      this.productCategoryForm,
      controlName,
      groupName!
    );
  }

  getControlErrors(
    controlName: string,
    groupName?: string
  ): ValidationErrors | undefined | null {
    return this.helperService.getControlErrors(
      this.productCategoryForm,
      controlName,
      groupName
    );
  }
}
