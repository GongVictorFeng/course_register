import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { CourseComponent } from './course/course.component';

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
        path: 'courses/:id',
        component: CourseComponent,
    },
];
