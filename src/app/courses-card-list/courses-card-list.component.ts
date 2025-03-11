import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '../model/course';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule} from '@angular/material/button'
import { RouterModule } from '@angular/router';
import { openEditCourseDialog } from '../course-dialog/course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { MatGridListModule } from '@angular/material/grid-list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'courses-card-list',
  imports: [
    MatCardModule,
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatGridListModule
  ],
  templateUrl: './courses-card-list.component.html',
  styleUrl: './courses-card-list.component.scss'
})
export class CoursesCardListComponent implements OnInit{


  @Input() courses!: Course[] | null;
  @Output() courseChanged: EventEmitter<CourseUpdateEvent> = new EventEmitter();

  cols = 3;
  rowHeight = '500px';
  handsetPortrait = false;

  constructor(private dialog: MatDialog, private responsive: BreakpointObserver) {}

  ngOnInit(): void {
    this.responsive.observe([
      Breakpoints.TabletPortrait,
      Breakpoints.TabletLandscape,
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape
    ]).subscribe(
      result => {
        this.cols = 3;
        this.rowHeight = "500px";
        this.handsetPortrait = false;

        const breakpoints = result.breakpoints;

        if (breakpoints[Breakpoints.TabletPortrait]) {
            this.cols = 1;
        }
        else if (breakpoints[Breakpoints.HandsetPortrait]) {
            this.cols = 1;
            this.rowHeight = "430px";
            this.handsetPortrait = true;
        }
        else if (breakpoints[Breakpoints.HandsetLandscape]) {
            this.cols = 1;
        }
        else if (breakpoints[Breakpoints.TabletLandscape]) {
            this.cols = 2;
        }
      }
    )
  }

  editCourse(course: Course) {
    openEditCourseDialog(this.dialog, course)
      .pipe(
        filter(value => !!value)
      ).subscribe(
        value => {
          console.log(value);
          this.courseChanged.emit({courseId: course.id, changes: value});
        } 
      )
  }
}

export interface CourseUpdateEvent {
  courseId: string;
  changes: Partial<Course>;
}
