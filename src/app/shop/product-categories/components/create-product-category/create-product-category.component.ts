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
import { HelperService } from '../../../../shared/services/helper.service';
import { ProductCategoryService } from '../../services/product-category.service';
import { ProductCategoriesGroupModel } from '../../models/product-categories-group.model';
import { ICanComponentDeactivate } from '../../../../shared/interfaces/ICanComponentDeactivate';
import { GuardsHelperService } from '../../../../shared/services/guards-helper.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { ButtonHelperDirective } from '../../../../shared/directives/button-helper.directive';
import { AddIconDirective } from '../../../../shared/directives/add-icon.directive';
import { FontHelperDirective } from '../../../../shared/directives/font-helper.directive';
import { KeywordElementDirective } from '../../../../shared/directives/keyword-element.directive';
import { FormFieldDirective } from '../../../../shared/directives/form-field.directive';
import { DeleteKeywordBtnDirective } from '../../../../shared/directives/delete-keyword-btn.directive';
import { AddKeywordsBtnDirective } from '../../../../shared/directives/add-keywords-btn.directive';

@Component({
  selector: 'shop-create-product-category',
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

  /**
   * شروع فرم
   */
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

  /**
   * پر کردن لیست و دراپ داون دسته بندی محصول اصلی
   */
  private fillParentIdSelect(): void {
    this.selectOptions =
      this.productCategoryService.getProductCategoriesGroup();
  }

  /**
   * عملیات های انجام شده هنگام سابمیت کردن فرم
   * @param focusElement اسکرول کردن به المنت اچ تی ام الی که بالاترین جای صفحه است
   * @returns
   */
  onSubmit(focusElement: HTMLElement): void {
    // دادن پیام خطا در صورتی که لیست کلمات کلیدی خالی بود
    if (this.helperService.keywords.length === 0) {
      this.alertService.emptyKeywordsAlert();
      return;
    }
    // دادن پیام خطا در صورتی که لیست کلمات کلیدی خالی بود

    // اسکرول کردن به المنت اچ تی ام الی
    focusElement.scrollIntoView({
      behavior: 'smooth',
    });
    // اسکرول کردن به المنت اچ تی ام الی

    // ارسال درخواست به ای پی آی
    this.productCategoryService.createProductCategory(
      this.productCategoryForm.value
    );
    // ارسال درخواست به ای پی آی

    // ریست کردن فرم و خالی کردن لیست کلمات کلیدی
    this.productCategoryForm.reset();
    this.form.resetForm();
    this.helperService.keywords = [];
    this.keywords = this.helperService.keywords;
    (this.productCategoryForm.controls['seo'] as FormGroup).controls[
      'keywords'
    ].patchValue(this.keywords);
    // ریست کردن فرم و خالی کردن لیست کلمات کلیدی
  }

  /**
   * برگشت به صفحه لیست نوع محصولات
   */
  returnToProductCategories(): void {
    this.router.navigate(['/product-categories'], {
      relativeTo: this.activatedRoute,
    });
  }

  /**
   * فعال یا غیر فعال کردن دکمه اضافه کردن کلمه کلیدی جدید به لیست کلمات کلیدی
   * @returns فعال یا غیر فعال؟
   */
  activateAddKeywordBtn(): boolean {
    return this.keywordEntered === '';
  }

  /**
   * اضافه کردن کلمه کلیدی جدید به لیست کلمات کلیدی
   */
  addNewKeyword(): void {
    this.helperService.addNewKeyword(this.keywordEntered);
    this.keywordEntered = '';
  }

  /**
   * پاک کردن کلمه کلیدی از لیست کلمات کلیدی
   * @param index شماره محل قرارگیری کلمه کلیدی داخل لیست کلمات کلیدی
   */
  deleteKeyword(index: number): void {
    this.helperService.deleteKeyword(index);
  }

  /**
   * پر کردن توضیحات متا بر اساس اطلاعات وارد شده داخل توضیحات
   * @param e ایونت فوکس روی فیلد توضیحات
   */
  descriptionOut(e: FocusEvent): void {
    this.helperService.autoFillMetaDescription(this.productCategoryForm);
  }

    /**
   * پر کردن اسلاگ بر اساس اطلاعات وارد شده داخل نام
   * @param e ایونت فوکس روی فیلد نام
   */
  nameOut(e: FocusEvent): void {
    this.helperService.autoFillSlug(this.productCategoryForm);
  }

  /**
   * گرفتن لیست کلمات کلیدی
   * @returns لیست کلمات کلیدی
   */
  getKeywords(): string[] {
    return this.helperService.getKeywords();
  }

  /**
   * تایید معتبر بودن یا نبودن فرم
   * @param controlName نام کنترل فرم
   * @param groupName نام گروه فرم
   * @returns فرم معتبر هست یا خیر؟
   */
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

  /**
   * گرفتن تمامی ارور های کنترل فرم
   * @param controlName نام کنترل فرم
   * @param groupName نام گروه فرم
   * @returns ارور های کنترل
   */
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
