import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Lesson } from '../model/lesson';
import { CoursesService } from '../services/courses.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-drag-drop',
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    DragDropModule
  ],
  templateUrl: './drag-drop.component.html',
  styleUrl: './drag-drop.component.scss'
})
export class DragDropComponent implements OnInit {

  lessons!: Lesson[];
  done: Lesson[] =[];
  loading = true;

  constructor(private courseService: CoursesService){}

  ngOnInit(): void {
    this.courseService.findAllCourseLessons(11).subscribe(
      (lessons) =>{
        this.lessons = lessons;
        this.loading = false;
      } 
    );
  }

  dropMultiList(event: CdkDragDrop<Lesson[]>) {

    if (event.previousContainer == event.container) {
      moveItemInArray(this.lessons, event.previousIndex, event.currentIndex);
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    )
  }

}
