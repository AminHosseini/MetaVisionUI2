import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { productCategoriesRoutes } from './product-categories/product-categories.routes';
import { interceptorProvider } from './shared/interceptors/interceptor-provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideRouter(productCategoriesRoutes),
    provideClientHydration(),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    // importProvidersFrom(RouterModule.forRoot(routes, { enableTracing: true })),
    importProvidersFrom(RouterModule.forRoot(routes)),
    interceptorProvider,
  ],
};
