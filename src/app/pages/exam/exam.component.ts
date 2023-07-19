import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbDateService } from '@nebular/theme';

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
    private _nbDateService: NbDateService<Date>
  ) {
    this.min = this._nbDateService.today();
  }

  onSubmit() {
    console.log(this.examForm);
  }
}
