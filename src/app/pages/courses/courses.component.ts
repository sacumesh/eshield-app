import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { EditExamFormComponent } from '../../components/edit-exam-form/edit-exam-form.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  constructor(private _nbDialogService: NbDialogService) {}

  onViewExam() {
    console.log('exam');
  }

  onCreateExam() {
    this._nbDialogService.open(EditExamFormComponent);
  }

  onEditExam() {
    this._nbDialogService.open(EditExamFormComponent);
  }
}
