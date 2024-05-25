import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService
  ) {}

  /**
   * تصمیم گیری برای خطاها و اکسپشن های رخ داده و واکنش به آن
   * @param statusCode کد خطا یا اکسپشن
   */
  handleError(err: any): void {
    switch (err.status) {
      case 404:
        this.router.navigate(['/not-found'], {
          relativeTo: this.activatedRoute,
        });
        break;
      case 500:
        this.router.navigate(['/dashboard'], {
          relativeTo: this.activatedRoute,
        });
        this.alertService.errorAlert();
        break;
      case 400:
        // let massages: string[] = [];
        // let errors = err.error.errors;

        // if (errors) {
        //   // pushing validation errors of name if exists
        //   if (errors.name) {
        //     for (const error of errors.name) {
        //       massages.push(`نام: ${error}\n`);
        //     }
        //   }
        //   // pushing validation errors of name if exists

        //   // pushing validation errors of description if exists
        //   if (errors.description) {
        //     for (const error of errors.description) {
        //       massages.push(`توضیحات: ${error}\n`);
        //     }
        //   }
        //   // pushing validation errors of description if exists

        //   // pushing validation errors of slug if exists
        //   if (errors['seo.Slug']) {
        //     for (const error of errors['seo.Slug']) {
        //       massages.push(`اسلاگ: ${error}\n`);
        //     }
        //   }
        //   // pushing validation errors of slug if exists

        //   // pushing validation errors of metaDescription if exists
        //   if (errors['seo.MetaDescription']) {
        //     for (const error of errors['seo.MetaDescription']) {
        //       massages.push(`توضیحات متا: ${error}\n`);
        //     }
        //   }
        //   // pushing validation errors of metaDescription if exists

        //   // pushing validation errors of keywords if exists
        //   if (errors['seo.Keyword']) {
        //     for (const error of errors['seo.keyword']) {
        //       massages.push(`کلمات کلیدی: ${error}\n`);
        //     }
        //   }
        //   // pushing validation errors of keywords if exists

        //   this.alertService.errorAlertWithMessage(massages);
        // }
        this.alertService.serverValidationErrorAlert();
        break;
      default:
        this.router.navigate(['/dashboard'], {
          relativeTo: this.activatedRoute,
        });
        this.alertService.errorAlert();
        break;
    }
  }
}
