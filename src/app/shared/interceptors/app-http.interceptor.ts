import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingSpinnerService } from '../components/loading-spinner/loading-spinner.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private loadingSpinnerService: LoadingSpinnerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingSpinnerService.startSpinner();

    return this.handler(next, req);
  }

  handler(next: HttpHandler, req: HttpRequest<any>) {
    return next.handle(req).pipe(
      tap({
        next: (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.loadingSpinnerService.resetSpinner();
          }
        },
        error: (err: HttpErrorResponse) => {
          this.loadingSpinnerService.resetSpinner();
        },
      })
    );
  }
}
