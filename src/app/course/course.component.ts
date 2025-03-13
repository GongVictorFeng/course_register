import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Course } from '../model/course';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import {  MatTableModule } from "@angular/material/table";
import { Lesson } from '../model/lesson';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { merge } from 'rxjs';
import {  MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { LoadingComponent } from "../loading/loading.component";
import { LoadingService } from '../loading/loading.service';

@Component({
  selector: 'app-course',
  imports: [
    MatTableModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    LoadingComponent
],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent implements OnInit, AfterViewInit {

  course!: Course;

  lessons: Lesson[] = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  selection = new SelectionModel<Lesson> (true, []);

  constructor(private route: ActivatedRoute, private coursesService: CoursesService, private loadingService: LoadingService) {}

  displayedColumns = ['select', 'seqNo', "description", "duration"];

  expandedLesson?: Lesson;

  ngOnInit(): void {
    this.course = this.route.snapshot.data["course"];
    this.loadLessonsPage()
  }

  onLessonToggles(lesson: Lesson) {
    this.selection.toggle(lesson);
    console.log(this.selection.selected)
  }

  isAllSelected() {
    return this.selection.selected.length == this.lessons.length;
  }

  toggleAll() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.lessons)
  }

  loadLessonsPage() {
    const lessons$ = this.coursesService.findLessons(
      this.course.id, 
      this.sort?.direction ?? "asc", 
      this.paginator?.pageIndex ?? 0,
      this.paginator?.pageSize ?? 3,
      this.sort?.active ?? "seqNo");

    const loadingLessons$ = this.loadingService.showLoaderUntilCompleted(lessons$);
    loadingLessons$.subscribe({
          next: lessons => {
            this.lessons = lessons;
            this.selection.clear();
          },
          error: () => alert("Error loading lessons")  
    })
  }

  onToggleLesson(lesson: Lesson) {

    if (lesson == this.expandedLesson) {
      this.expandedLesson = undefined;
      return;
    }

    this.expandedLesson = lesson;
  }

  ngAfterViewInit(): void {
    
    this.sort.sortChange.subscribe({
      next: () => this.paginator.pageIndex = 0
    });

    merge(this.sort.sortChange, this.paginator.page).subscribe({
      next: () => this.loadLessonsPage()
    })
  }

}
