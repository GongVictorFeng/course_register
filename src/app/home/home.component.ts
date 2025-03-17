import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { CoursesStore } from '../services/courses.store';

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

  constructor(
      private coursesStore: CoursesStore) {}

  ngOnInit(): void {
    this.reloadCourses();
  }

  reloadCourses() {
    this.beginnerCourses$ = this.coursesStore.filterByCategory("BEGINNER");
    this.advancedCourses$ = this.coursesStore.filterByCategory("ADVANCED");
  }
}

