import { Component, Input } from '@angular/core';
import { Course } from '../model/course';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule} from '@angular/material/button'
import { RouterModule } from '@angular/router';
import { openEditCourseDialog } from '../course-dialog/course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';

@Component({
  selector: 'courses-card-list',
  imports: [
    MatCardModule,
    CommonModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './courses-card-list.component.html',
  styleUrl: './courses-card-list.component.scss'
})
export class CoursesCardListComponent {


  @Input() courses!: Course[] | null;

  constructor(private dialog: MatDialog) {}

  editCourse(course: Course) {
    openEditCourseDialog(this.dialog, course)
      .pipe(
        filter(value => !!value)
      ).subscribe(
        value => console.log(value)
      )
  }
}
