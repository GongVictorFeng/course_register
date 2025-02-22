import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Course } from '../model/course';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import {  MatTableModule } from "@angular/material/table";
import { Lesson } from '../model/lesson';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import {  MatPaginator, MatPaginatorModule } from "@angular/material/paginator";

@Component({
  selector: 'app-course',
  imports: [
    MatTableModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatPaginatorModule
  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent implements OnInit, AfterViewInit {

  course!: Course;

  lessons: Lesson[] = [];

  loading: boolean = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private route: ActivatedRoute, private coursesService: CoursesService) {}

  displayedColumns = ['seqNo', "description", "duration"];

  ngOnInit(): void {
    this.course = this.route.snapshot.data["course"];
    this.loadLessonsPage()
  }

  loadLessonsPage() {
    this.loading = true;
    this.coursesService.findLessons(
        this.course.id, 
        'asc', 
        this.paginator?.pageIndex ?? 0,
        this.paginator?.pageSize ?? 3)
        .pipe(
          finalize(() => this.loading = false)
        )
        .subscribe({
          next: lessons => this.lessons = lessons,
          error: err => alert("Error loading lessons")    
        });
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe({
      next: () => this.loadLessonsPage()
    })
  }

}
