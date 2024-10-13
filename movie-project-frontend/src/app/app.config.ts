import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"auth-project-91427","appId":"1:48581629866:web:26bdbd21903b61f491fdd3","storageBucket":"auth-project-91427.appspot.com","apiKey":"AIzaSyDP6ZQE74okce-n4DyeZN3JWRgbeWkIBac","authDomain":"auth-project-91427.firebaseapp.com","messagingSenderId":"48581629866"})), provideAuth(() => getAuth()), provideDatabase(() => getDatabase()), provideAnimationsAsync(),  provideHttpClient()]
};
