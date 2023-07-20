import { Component, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbDateService, NbDialogRef } from '@nebular/theme';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-exam-form',
  templateUrl: './edit-exam-form.component.html',
  styleUrls: ['./edit-exam-form.component.scss'],
})
export class EditExamFormComponent implements OnInit, OnDestroy {
  @Input() exam: any;
  min: Date;

  form = this._fb.group({
    date: ['', Validators.required],
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
  });

  private _formValueChangesSub!: Subscription;

  constructor(
    private _fb: FormBuilder,
    private _nbDateService: NbDateService<Date>,
    @Optional() protected dialogRef: NbDialogRef<any>
  ) {
    this.min = this._nbDateService.today();
  }

  ngOnInit(): void {
    this._formValueChangesSub = this.form.valueChanges.subscribe();
    console.log();
  }

  ngOnDestroy(): void {
    this._formValueChangesSub.unsubscribe();
  }

  onSubmit() {
    console.log(this.dialogRef);
  }
}
