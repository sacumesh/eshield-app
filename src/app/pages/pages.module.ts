import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { ThemeModule } from '../theme/theme.module';
import {
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbDatepickerModule,
  NbDialogModule,
  NbDialogService,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbMenuModule,
  NbTimepickerModule,
  NbUserModule,
} from '@nebular/theme';
import { RouterOutlet } from '@angular/router';
import { ExamComponent } from './exam/exam.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppModule } from '../app.module';
import { EditExamFormComponent } from '../components/edit-exam-form/edit-exam-form.component';
import { CoursesComponent } from './courses/courses.component';

@NgModule({
  declarations: [
    PageComponent,
    ExamComponent,
    EditExamFormComponent,
    CoursesComponent,
  ],
  imports: [
    CommonModule,
    ThemeModule,
    NbMenuModule,
    RouterOutlet,
    PagesRoutingModule,
    NbCardModule,
    NbInputModule,
    NbDatepickerModule,
    NbTimepickerModule,
    NbButtonModule,
    NbIconModule,
    NbListModule,
    ReactiveFormsModule,
    NbUserModule,
    NbContextMenuModule,
    NbDialogModule.forChild(),
  ],
})
export class PagesModule {}
