import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbDateService, NbDialogService } from '@nebular/theme';
import { EditExamFormComponent } from '../../components/edit-exam-form/edit-exam-form.component';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
})
export class ExamComponent {
  userActivity: any[] = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11];

  min: Date;

  examForm = this._fb.group({
    date: ['', Validators.required],
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
  });

  constructor(
    private _fb: FormBuilder,
    private _nbDateService: NbDateService<Date>,
    private _nbDialogService: NbDialogService
  ) {
    this.min = this._nbDateService.today();
  }

  open(dialog: TemplateRef<any>) {
    this._nbDialogService.open(EditExamFormComponent, {
      context: {},
      closeOnBackdropClick: false,
    });
  }

  test() {}
}
