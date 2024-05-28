import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterModule, provideRouter, withPreloading } from '@angular/router';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { productCategoriesRoutes } from './shop/product-categories/product-categories.routes';
import { interceptorProvider } from './shared/interceptors/interceptor-provider';
import { FlagBasedPreloadingStrategyService } from './shared/services/flag-based-preloading-strategy.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(FlagBasedPreloadingStrategyService)),
    provideRouter(
      productCategoriesRoutes,
      withPreloading(FlagBasedPreloadingStrategyService)
    ),
    provideClientHydration(),
    provideAnimationsAsync(),
    // importProvidersFrom(HttpClientModule),
    provideHttpClient(withFetch()),
    // importProvidersFrom(RouterModule.forRoot(routes, { enableTracing: true })),
    importProvidersFrom(RouterModule.forRoot(routes)),
    interceptorProvider,
  ],
};
