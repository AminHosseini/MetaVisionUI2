import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  emptyKeywordsAlert(): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      showConfirmButton: false,
      timer: 2000,
      icon: 'error',
      text: 'کلمات کلیدی نمیتواند خالی باشد!',
    });
  }

  successAlert(): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      icon: 'success',
      title: 'عملیات با موفقیت انجام شد.',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  errorAlert(): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: 'خطا در دریافت اطلاعات',
      text: 'لطفا کارشناسان مارا از خطای به وجود آمده مطلع سازید.',
      showConfirmButton: false,
      timer: 6000,
      icon: 'error',
    });
  }

  async exitAlertAsync(): Promise<SweetAlertResult<any>> {
    return await Swal.fire({
      title: 'آیا خارج میشوید؟',
      text: 'در صورت خارج شدن اطلاعات وارد شده در این فرم از بین میروند.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9966CC',
      cancelButtonColor: '#c9c5b9',
      confirmButtonText: 'بله',
      cancelButtonText: 'خیر',
    });
  }
}
