import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Course } from "../model/course";
import { inject } from "@angular/core";
import { CoursesService } from "./courses.service";

export function courseResolver(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {

    const coursesService = inject(CoursesService);
  
    return coursesService.findCourseById(route.params['id']); 
  }