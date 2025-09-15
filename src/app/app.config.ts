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
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([rawgApiInterceptor])),
    { provide: 'BASE_PATH', useValue: environment.rawgApiUrl },
    /* Google Firebase setting  from heeky.du@gmail.com */
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'angular-gameverse-auth',
        appId: '1:110992817677:web:59728ed565ca6cce199f44',
        storageBucket: 'angular-gameverse-auth.firebasestorage.app',
        apiKey: 'AIzaSyA3ICfD6dS3giclAwwMVdc1cwIoQoS7fo8',
        authDomain: 'angular-gameverse-auth.firebaseapp.com',
        messagingSenderId: '110992817677',
        measurementId: 'G-6W0W8H9CM0',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    // provideDatabase(() => getDatabase()),
    // provideFunctions(() => getFunctions()),
    // provideRemoteConfig(() => getRemoteConfig()),
  ],
};
