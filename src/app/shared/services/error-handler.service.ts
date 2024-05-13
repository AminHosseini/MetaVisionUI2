import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

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
        Swal.fire({
          title: 'خطا در دریافت اطلاعات',
          text: 'لطفا کارشناسان مارا از خطای به وجود آمده مطلع سازید.',
          showConfirmButton: false,
          timer: 6000,
          icon: 'error',
        });
        break;
      default:
        this.router.navigate(['/dashboard'], {
          relativeTo: this.activatedRoute,
        });
        Swal.fire({
          title: 'خطا در دریافت اطلاعات',
          text: 'لطفا کارشناسان مارا از خطای به وجود آمده مطلع سازید.',
          showConfirmButton: false,
          timer: 6000,
          icon: 'error',
        });
        break;
    }
  }
}
