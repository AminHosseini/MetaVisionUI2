import {
  Component,
  ElementRef,
  NgModule,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  ],
  templateUrl: './create-product-category.component.html',
  styleUrl: './create-product-category.component.css',
})
export class CreateProductCategoryComponent implements OnInit {
  productCategoryForm!: FormGroup;
  keywords: string[] = [];
  @ViewChild('keywordInput', { static: true }) kwi!: ElementRef;
  @ViewChild('descriptionInput', { static: true }) di!: ElementRef;
  @ViewChild('metaDescriptionInput', { static: true }) mdi!: ElementRef;
  @ViewChild('nameInput', { static: true }) ni!: ElementRef;
  @ViewChild('slugInput', { static: true }) si!: ElementRef;
  keywordEntered: string = '';

  constructor() {}

  ngOnInit(): void {
    this.productCategoryForm = new FormGroup({
      parentId: new FormControl<number>(0, Validators.required),
      name: new FormControl<string>('', Validators.required),
      description: new FormControl<string>('', Validators.required),
      metaDescription: new FormControl<string>('', Validators.required),
      seo: new FormGroup({
        slug: new FormControl<string>('', Validators.required),
        keywords: new FormControl<string[]>(this.keywords, Validators.required),
      }),
    });
  }

  onSubmit(): void {
    if (!this.keywords) {
      return;
    }
    console.log(this.productCategoryForm.value);
  }

  activateAddKeywordBtn(): boolean {
    return this.keywordEntered === '';
  }

  addNewKeyword(): void {
    const kw = this.kwi.nativeElement.value
      .replace(/[^a-z0-9-آ-ی-]/gi, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    this.keywords.push(kw);
    this.kwi.nativeElement.value = '';
  }

  deleteKeyword(index: number): void {
    this.keywords.splice(index, 1);
  }

  descriptionOut(e: FocusEvent): void {
    const di = this.di.nativeElement.value;
    this.mdi.nativeElement.value = di;
  }

  nameOut(e: FocusEvent): void {
    const ni = this.ni.nativeElement.value
      .replace(/[^a-z0-9-آ-ی-]/gi, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    this.si.nativeElement.value = ni;
  }
}
