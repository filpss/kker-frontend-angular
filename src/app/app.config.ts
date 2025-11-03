import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideEnvironmentNgxMask } from 'ngx-mask';

import ptLocale from '@angular/common/locales/pt';
import { DATE_PIPE_DEFAULT_OPTIONS, registerLocaleData } from '@angular/common';

registerLocaleData(ptLocale, 'pt-br');

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline',
                  floatLabel: 'always'
      }
    },
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: {
        dateFormat: 'MMMM dd yyyy',
        timezone: '-0300'
      }
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt-br'
    },
    provideEnvironmentNgxMask(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
