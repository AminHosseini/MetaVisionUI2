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
          text: 'مشکلی در دریافت اطلاعات به وجود آمد. لطفا سریعا با کارشناسان ما تماس بگیرید.',
          icon: 'error',
        });
        break;
      default:
        this.router.navigate(['/dashboard'], {
          relativeTo: this.activatedRoute,
        });
        Swal.fire({
          text: 'مشکلی در دریافت اطلاعات به وجود آمد. لطفا سریعا با کارشناسان ما تماس بگیرید.',
          icon: 'error',
        });
        break;
    }
  }
}
