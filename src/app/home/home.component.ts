import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { CoursesCardListComponent, CourseUpdateEvent } from '../courses-card-list/courses-card-list.component';
import { finalize, map, Observable } from 'rxjs';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../loading/loading.service';

@Component({
  selector: 'app-home',
  imports: [
        MatIconModule,
        MatButtonModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        CommonModule,
        MatTooltipModule,
        CoursesCardListComponent,
        RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  beginnerCourses$!: Observable<Course[]>;
  advancedCourses$!: Observable<Course[]>;

  constructor(private coursesService: CoursesService, private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.reloadCourses();
  }

  reloadCourses() {
    const courses$ = this.coursesService.loadAllCourses().pipe(
      map(courses => courses.sort(sortCoursesBySeqNo))
    );
    const loadCourse$ = this.loadingService.showLoaderUntilCompleted(courses$)

    this.beginnerCourses$ = loadCourse$.pipe(map(courses => (courses.filter(course => course.category === 'BEGINNER'))));
    this.advancedCourses$ = loadCourse$.pipe(map(courses => (courses.filter(course => course.category === 'ADVANCED'))));
  }

  saveCourse(courseUpdated: CourseUpdateEvent) {
    this.coursesService.saveCourse(courseUpdated.courseId, courseUpdated.changes).subscribe(
      () => this.reloadCourses()
    );
  }
}

