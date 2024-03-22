import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
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
import { SeoService } from '../../services/seo.service';
import Swal from 'sweetalert2';

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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.productCategoryForm = new FormGroup({
      parentId: new FormControl<number>(0, Validators.required),
      name: new FormControl<string>('', Validators.required),
      description: new FormControl<string>('', Validators.required),
      metaDescription: new FormControl<string>('', Validators.required),
      seo: new FormGroup({
        slug: new FormControl<string>('', Validators.required),
        keywords: new FormControl<string[]>(this.keywords),
      }),
    });
  }

  onSubmit(): void {
    if (this.seoService.keywords.length === 0) {
      Swal.fire({
        text: 'کلمات کلیدی نمیتواند خالی باشد!',
        icon: 'error',
      });
      return;
    }

    console.log(this.productCategoryForm.value);

    this.productCategoryForm.reset();
    this.form.resetForm();
    this.seoService.keywords = [];
    this.keywords = this.seoService.keywords;
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
    this.seoService.addNewKeyword(this.keywordEntered);
    this.keywordEntered = '';
  }

  deleteKeyword(index: number): void {
    this.seoService.deleteKeyword(index);
  }

  descriptionOut(e: FocusEvent): void {
    this.seoService.autoFillMetaDescription(this.productCategoryForm);
  }

  nameOut(e: FocusEvent): void {
    this.seoService.autoFillSlug(this.productCategoryForm);
  }

  getKeywords(): string[] {
    return this.seoService.getKeywords();
  }

  isControlValid(controlName: string, groupName?: string) {
    return this.seoService.isValid(
      this.productCategoryForm,
      controlName,
      groupName!
    );
  }
}
