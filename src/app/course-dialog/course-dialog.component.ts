import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {  MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Course } from '../model/course';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { LoadingService } from '../loading/loading.service';
import { LoadingComponent } from "../loading/loading.component";
import { CoursesService } from '../services/courses.service';
import { MessagesService } from '../messages/messages.service';
import { MessagesComponent } from "../messages/messages.component";
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'course-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    LoadingComponent,
    MessagesComponent
],
  templateUrl: './course-dialog.component.html',
  providers: [provideNativeDateAdapter(), LoadingService, MessagesService],
  styleUrl: './course-dialog.component.scss'
})
export class CourseDialogComponent implements OnInit {

  description: string = '';
  form!: FormGroup;

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) private course: Course,
              private dialogRef: MatDialogRef<CourseDialogComponent>,
              private loadingService: LoadingService,
              private coursesService: CoursesService,
              private messagesService: MessagesService) {}

  ngOnInit(): void {
    this.description = this.course.description;

    this.form = this.fb.group({
      description: [this.course.description, Validators.required],
      category: [this.course.category, Validators.required],
      releasedAt: [new Date(), Validators.required],
      longDescription: [this.course.longDescription, Validators.required]
   });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    const changes = this.form.value;
    const saveCourse$ = this.coursesService.saveCourse(this.course.id, changes)
      .pipe(
        catchError(err => {
          const message = "could not save the course";
          this.messagesService.showErrors(message);
          console.log(message, err);
          return throwError(() => err);
        })
      );
    this.loadingService.showLoaderUntilCompleted(saveCourse$).subscribe(
      val => this.dialogRef.close(val)
    )
  }

}

export function openEditCourseDialog(dialog: MatDialog, course: Course) {

  const config = new MatDialogConfig();
  config.disableClose = true;
  config.autoFocus = true;
  config.panelClass = 'modal-panel';

  config.data = course;

  const dialogRef = dialog.open(CourseDialogComponent, config);

  return dialogRef.afterClosed();
}
