import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomValidationMessageService {
  constructor() {}

  get fieldCannotBeEmpty(): string {
    return 'این فیلد نمیتواند خالی باشد';
  }

  get maximumFieldCharacters(): string {
    return 'تعداد کاراکتر های استفاده شده بیشتر از حد مجاز است';
  }

  get keywordsCannotBeEmpty(): string {
    return 'کلمات کلیدی نمیتواند خالی باشد!';
  }

  get maximumKeywordCharacters(): string {
    return 'فقط مجاز به وارد کردن کلمه با ۲۴ کاراکتر می باشید!';
  }

  get maximumKeywordsArrayCount(): string {
    return 'فقط مجاز به وارد کردن ۸ کلمه کلیدی می باشید!';
  }
}
