import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent, NbLoginComponent } from '@nebular/auth';
import { PageComponent } from './pages/page/page.component';
import { ExamComponent } from './pages/exam/exam.component';
import { CoursesComponent } from './pages/courses/courses.component';

export const routes: Routes = [
  {
    path: 'pages',
    component: PageComponent,
    children: [
      {
        path: 'exam',
        component: ExamComponent,
      },
      {
        path: 'courses',
        component: CoursesComponent,
      },
    ],
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
    ],
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
