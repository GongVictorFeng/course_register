import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import {  MatTableModule } from "@angular/material/table";
import { Lesson } from '../model/lesson';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-course',
  imports: [
    MatTableModule,
    MatProgressSpinnerModule,
    CommonModule
  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent implements OnInit {

  course!: Course;

  lessons: Lesson[] = [];

  loading: boolean = false;

  constructor(private route: ActivatedRoute, private coursesService: CoursesService) {}

  displayedColumns = ['seqNo', "description", "duration"];

  ngOnInit(): void {
    this.course = this.route.snapshot.data["course"];
    this.loadLessonsPage()
  }

  loadLessonsPage() {
    this.loading = true;
    this.coursesService.findLessons(this.course.id, 'asc', 0, 3)
        .pipe(
          finalize(() => this.loading = false)
        )
        .subscribe({
          next: lessons => this.lessons = lessons,
          error: err => alert("Error loading lessons")    
        });
  }

}
