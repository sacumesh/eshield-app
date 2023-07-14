import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { ThemeModule } from '../theme/theme.module';
import { NbMenuModule } from '@nebular/theme';
import { RouterOutlet } from '@angular/router';
import { ExamComponent } from './exam/exam.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [PageComponent, ExamComponent],
  imports: [
    CommonModule,
    ThemeModule,
    NbMenuModule,
    RouterOutlet,
    PagesRoutingModule,
  ],
})
export class PagesModule {}
