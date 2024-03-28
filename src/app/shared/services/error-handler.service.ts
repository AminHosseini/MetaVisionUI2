import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  handleError(statusCode: number) {
    switch (statusCode) {
      case 404:
        this.router.navigate(['/product-categories'], {
          relativeTo: this.activatedRoute,
        });
        break;
      case 500:
        this.router.navigate(['/product-categories'], {
          relativeTo: this.activatedRoute,
        });
        break;
      default:
        this.router.navigate(['/product-categories'], {
          relativeTo: this.activatedRoute,
        });
        break;
    }
  }
}
