import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatInputModule } from "@angular/material/input";

@Component({
  selector: 'create-course-step-1',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './create-course-step-1.component.html',
  styleUrl: './create-course-step-1.component.scss'
})
export class CreateCourseStep1Component implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)
      ]],
      releaseAt: [new Date(), Validators.required],
      category: ['BEGINNER', Validators.required],
      courseType: ['premium', Validators.required],
      downloadsAllowed: [false, Validators.requiredTrue],
      longDescription: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  get courseTitle() {
    return this.form.controls['title'];
  }
}
