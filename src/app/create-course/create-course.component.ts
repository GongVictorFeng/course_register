import { Component } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { CreateCourseStep1Component } from './create-course-step-1/create-course-step-1.component';
import { CreateCourseStep2Component } from './create-course-step-2/create-course-step-2.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-course',
  imports: [
    MatStepperModule,
    MatButtonModule,
    CreateCourseStep1Component,
    CreateCourseStep2Component
  ],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.scss'
})
export class CreateCourseComponent {

}
