import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { rawgApiInterceptor } from './core/interceptors/rawg-api.interceptor';
import { environment } from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideStore } from '@ngrx/store';
import { authReducer } from './store/auth.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    /* Rawg Api http interceptor to add apiKey  */
    provideHttpClient(withInterceptors([rawgApiInterceptor])),
    /* Rawg Api env setup  */
    { provide: 'BASE_PATH', useValue: environment.rawgApiUrl },
    /* login state using ngRX saving it into store */
    provideStore({
      auth: authReducer,
    }),
    /* Google Firebase setting  from heeky.du@gmail.com */
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
