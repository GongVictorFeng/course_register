import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';
import { finalize, map, Observable } from 'rxjs';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
  isLoading = false;

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.isLoading = true;
    const courses$ = this.coursesService.findAllCourses();

    this.beginnerCourses$ = courses$.pipe(
      map(courses => (courses ? courses.filter(course => course.category === 'BEGINNER') : [])),
      finalize(() => this.isLoading = false)
    );
    this.advancedCourses$ = courses$.pipe(map(courses => (courses ? courses.filter(course => course.category === 'ADVANCED') : [])));
  }
}
