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
import { HelperService } from '../../shared/services/helper.service';
import { ProductCategoryService } from '../services/product-category.service';
import { ProductCategoriesGroupModel } from '../models/product-categories-group.model';
import { ICanComponentDeactivate } from '../../shared/interfaces/ICanComponentDeactivate';
import { GuardsHelperService } from '../../shared/services/guards-helper.service';
import { AlertService } from '../../shared/services/alert.service';
import { ButtonHelperDirective } from '../../shared/directives/button-helper.directive';
import { AddIconDirective } from '../../shared/directives/add-icon.directive';
import { FontHelperDirective } from '../../shared/directives/font-helper.directive';
import { KeywordElementDirective } from '../../shared/directives/keyword-element.directive';
import { FormFieldDirective } from '../../shared/directives/form-field.directive';
import { DeleteKeywordBtnDirective } from '../../shared/directives/delete-keyword-btn.directive';
import { AddKeywordsBtnDirective } from '../../shared/directives/add-keywords-btn.directive';

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
    ButtonHelperDirective,
    AddIconDirective,
    FontHelperDirective,
    KeywordElementDirective,
    FormFieldDirective,
    DeleteKeywordBtnDirective,
    AddKeywordsBtnDirective,
  ],
  templateUrl: './create-product-category.component.html',
  styleUrl: './create-product-category.component.css',
})
export class CreateProductCategoryComponent
  implements OnInit, ICanComponentDeactivate
{
  productCategoryForm!: FormGroup;
  @ViewChild('form') form: any;
  keywordEntered: string = '';
  keywords: string[] = this.getKeywords();
  selectOptions: ProductCategoriesGroupModel[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private helperService: HelperService,
    private productCategoryService: ProductCategoryService,
    private guardsHelperService: GuardsHelperService,
    private alertService: AlertService
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

  onSubmit(focusElement: HTMLElement): void {
    if (this.helperService.keywords.length === 0) {
      this.alertService.emptyKeywordsAlert();
      return;
    }

    focusElement.scrollIntoView({
      behavior: 'smooth',
    });

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

  async canDeactivate(): Promise<boolean> {
    return await this.guardsHelperService.canDeactivateAsync(
      this.productCategoryForm
    );
  }
}
