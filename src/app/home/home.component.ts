import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';
import { map, Observable } from 'rxjs';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
        MatIconModule,
        MatButtonModule,
        MatTabsModule,
        CommonModule,
        CoursesCardListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  beginnerCourses$!: Observable<Course[]>;
  advancedCourses$!: Observable<Course[]>;

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    const courses$ = this.coursesService.findAllCourses();

    this.beginnerCourses$ = courses$.pipe(map(courses => (courses ? courses.filter(course => course.category === 'BEGINNER') : [])));
    this.advancedCourses$ = courses$.pipe(map(courses => (courses ? courses.filter(course => course.category === 'ADVANCED') : [])));
  }
}
