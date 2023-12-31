import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent, NbLoginComponent } from '@nebular/auth';
import { PageComponent } from './pages/page/page.component';
import { ExamComponent } from './pages/exam/exam.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'pages',
    component: PageComponent,
    canActivate: [AuthGuard],
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
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
