import { NgModule } from '@angular/core';
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
  NbToastrModule,
  NbUserModule,
  NbListModule,
  NbContextMenuModule,
  NbActionsModule,
  NbAlertModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbAuthJWTToken,
  NbAuthModule,
  NbPasswordAuthStrategy,
} from '@nebular/auth';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { EditExamFormComponent } from './components/edit-exam-form/edit-exam-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExamComponent } from './pages/exam/exam.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { OneColumnComponent } from './components/one-column/one-column.component';
import { TwoColumnsComponent } from './components/two-columns/two-columns.component';
import { ThreeColumnsComponent } from './components/three-columns/three-columns.component';
import { PageComponent } from './pages/page/page.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    ExamComponent,
    EditExamFormComponent,
    HeaderComponent,
    FooterComponent,
    OneColumnComponent,
    TwoColumnsComponent,
    ThreeColumnsComponent,
    CoursesComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbUserModule,
    FormsModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    ReactiveFormsModule,
    NbListModule,
    NbContextMenuModule,
    NbActionsModule,
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbTimepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbThemeModule.forRoot(),
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbToastrModule.forRoot(),
    NbAlertModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
