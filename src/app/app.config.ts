import { provideAnimations } from '@angular/platform-browser/animations';
import {
    ApplicationConfig,
    ErrorHandler,
    importProvidersFrom,
    provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { appRoutes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { TuiRootModule } from '@taiga-ui/core';
import { provideHttpClient } from '@angular/common/http';
import { createErrorHandler, TraceService } from '@sentry/angular';

const firebaseConfig = {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: 'p',
    messagingSenderId: '',
    appId: '',
};

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(appRoutes),
        provideFirebaseApp(() => initializeApp(firebaseConfig)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        importProvidersFrom([TuiRootModule]),
        provideHttpClient(),
        {
            provide: ErrorHandler,
            useValue: createErrorHandler(),
        },
        {
            provide: TraceService,
            deps: [Router],
        },
    ],
};
