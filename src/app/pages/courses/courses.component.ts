import { Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  flipped = false;
  onExamClick() {
    console.log('exam');
  }

  toggleView() {
    this.flipped = !this.flipped;
  }
}
