import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbIconModule,
  NbChatModule,
  NbMenuModule,
  NbSidebarModule,
  NbDatepicker,
  NbDatepickerModule,
  NbTimepickerModule,
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbDialogModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { PagesModule } from './pages/pages.module';
import { ThemeModule } from './theme/theme.module';
import {
  NbAuthJWTToken,
  NbAuthModule,
  NbPasswordAuthStrategy,
} from '@nebular/auth';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { EditExamFormComponent } from './components/edit-exam-form/edit-exam-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeKeycloak } from './utils/keycloak.config';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
    PagesModule,
    NbIconModule,
    ThemeModule,
    NbDatepickerModule.forRoot(),
    NbTimepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    KeycloakAngularModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          baseEndpoint: environment.AUTH_ENDPOINT,
          name: 'email',
          token: {
            class: NbAuthJWTToken,
            key: 'token', // this parameter tells where to look for the token
          },

          login: {
            endpoint: '/auth/sign-in',
            method: 'post',
            redirect: {
              success: '/dashboard/',
              failure: null, // stay on the same page
            },
          },
        }),
      ],
    }),
    FormsModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
