import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';

// Transloco
import { provideTransloco, translocoConfig } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './transloco-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    // Configuración de Transloco
    provideTransloco({
      config: translocoConfig({
        availableLangs: ['en', 'es'],
        defaultLang: localStorage.getItem('lang') || 'es',
        reRenderOnLangChange: true,
        prodMode: true,
      }),
      loader: TranslocoHttpLoader
    }),
  ]
};