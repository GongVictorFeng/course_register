import { Component, Input } from '@angular/core';
import { Course } from '../model/course';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule} from '@angular/material/button'
import { RouterModule } from '@angular/router';

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

  constructor() {}

  editCourse(course: Course) {
    throw new Error('Method not implemented.');
  }
}
