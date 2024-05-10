import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingSpinnerService {
  private count = 0;
  private spinner = new BehaviorSubject<boolean>(false);

  constructor() {}

  getSpinnerObserver(): Observable<boolean> {
    return this.spinner.asObservable();
  }

  startSpinner(): void {
    if (++this.count === 1) {
      this.spinner.next(true);
    }
  }

  endSpinner(): void {
    if (++this.count === 0 || this.count === 0) {
      this.spinner.next(false);
    }
  }

  resetSpinner(): void {
    this.count = 0;
    this.spinner.next(false);
  }
}
