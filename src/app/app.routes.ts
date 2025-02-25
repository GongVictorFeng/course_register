import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { CourseComponent } from './course/course.component';
import { courseResolver } from './services/course.resolver';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { TreeDemoComponent } from './tree-demo/tree-demo.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "add-new-course",
        component: CreateCourseComponent
    },
    {
        path: "drag-drop-example",
        component: DragDropComponent
    },
    {
        path: "tree-demo",
        component: TreeDemoComponent
      },
    {
        path: 'courses/:id',
        component: CourseComponent,
        resolve: {
            course: courseResolver
        }
    },
];
