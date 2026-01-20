import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { rawgApiInterceptor } from './core/interceptors/rawg-api.interceptor';
import { environment } from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideStore } from '@ngrx/store';
import { authReducer } from './store/auth.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { itemReducer } from './features/ngrx-test/store/item.reducer';
import { ItemEffects } from './features/ngrx-test/store/item.effects';
import { provideEffects } from '@ngrx/effects';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    /* Rawg Api http interceptor to add apiKey  */
    provideHttpClient(withInterceptors([rawgApiInterceptor])),
    /* Rawg Api env setup  */
    { provide: 'BASE_PATH', useValue: environment.rawgApiUrl },
    /* login state using ngRX saving it into store */
    provideStore({
      auth: authReducer,
      ngrxTestItems: itemReducer,
    }),
    // Use provideState to register it as a feature
    //provideState('ngrxTestItems', itemReducer),
    provideEffects([ItemEffects]),
    /* Google Firebase setting  from heeky.du@gmail.com */
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode(), trace: true, traceLimit: 25 }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
