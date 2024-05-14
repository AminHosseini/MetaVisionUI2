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

  handleError(statusCode: number) {
    switch (statusCode) {
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
      default:
        this.router.navigate(['/dashboard'], {
          relativeTo: this.activatedRoute,
        });
        this.alertService.errorAlert();
        break;
    }
  }
}
