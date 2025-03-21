import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { LoadingService } from './loading/loading.service';
import { MessagesService } from './messages/messages.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimationsAsync(), 
    provideHttpClient(),
    {provide: LoadingService, useClass: LoadingService},
    {provide: MessagesService, useClass: MessagesService}
  ]
};
