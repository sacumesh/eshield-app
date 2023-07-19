import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { ThemeModule } from '../theme/theme.module';
import {
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbDatepickerModule,
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

@NgModule({
  declarations: [PageComponent, ExamComponent],
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
  ],
})
export class PagesModule {}
