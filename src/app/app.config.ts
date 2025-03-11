import { provideAnimations } from '@angular/platform-browser/animations';
import {
    ApplicationConfig,
    importProvidersFrom,
    provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { TuiRootModule } from '@taiga-ui/core';

const firebaseConfig = {
    apiKey: 'AIzaSyCY43rSuMF90TIkTS_brS2RpUvWeQyjEsg',
    authDomain: 'mvd-mhs-tests-app.firebaseapp.com',
    projectId: 'mvd-mhs-tests-app',
    storageBucket: 'mvd-mhs-tests-app.firebasestorage.app',
    messagingSenderId: '1004524785744',
    appId: '1:1004524785744:web:bf918245254c94208a8155',
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
    ],
};
