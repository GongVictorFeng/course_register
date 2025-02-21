import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import {  MatTableModule } from "@angular/material/table";
import { Lesson } from '../model/lesson';

@Component({
  selector: 'app-course',
  imports: [
    MatTableModule
  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent implements OnInit {

  course!: Course;

  lessons: Lesson[] = [];

  constructor(private route: ActivatedRoute, private coursesService: CoursesService) {}

  displayedColumns = ['seqNo', "description", "duration"];

  ngOnInit(): void {
    this.course = this.route.snapshot.data["course"];
    this.loadLessonsPage()
  }

  loadLessonsPage() {
    this.coursesService.findLessons(this.course.id, 'asc', 0, 3)
        .subscribe({
          next: lessons => this.lessons = lessons,
          error: err => alert("Error loading lessons")    
        });
  }

}
