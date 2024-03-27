import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  keywords: string[] = [];

  constructor() {}

  addNewKeyword(kw: string): void {
    if (kw && kw.replace(' ', '')) {
      kw = kw
        .replace(/[^a-z0-9-آ-ی-]/gi, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      this.keywords.push(kw);
    }
  }

  deleteKeyword(index: number): void {
    this.keywords.splice(index, 1);
  }

  autoFillMetaDescription(form: FormGroup): void {
    const di = form.controls['description'].value;
    // form.patchValue({
    //   metaDescription: di,
    // });
    (form.controls['seo'] as FormGroup).controls['metaDescription'].patchValue(
      di
    );
  }

  autoFillSlug(form: FormGroup): void {
    const ni = form.controls['name'].value
      .replace(/[^a-z0-9-آ-ی-]/gi, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    (form.controls['seo'] as FormGroup).controls['slug'].patchValue(ni);
  }

  getKeywords(): string[] {
    return this.keywords;
  }

  isValid(
    form: FormGroup,
    controlName: string,
    groupName?: string
  ): boolean | undefined {
    let control: AbstractControl<any, any> | null;
    if (!groupName) {
      control = form.get(controlName);
    } else {
      control = (form.controls[groupName] as FormGroup).controls[controlName];
    }
    return !control?.valid && control?.touched;
  }
}
