import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  findCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/api/courses/${courseId}`)
  }

  findAllCourses(): Observable<Course[]> {
    return this.http.get<{ payload: Course[] }>(`${this.baseUrl}/api/courses`).pipe(map(res => res['payload']));
  }

  findAllCourseLessons(courseId: number): Observable<Lesson[]> {
    return this.http.get<{ payload: Lesson[]}>(`${this.baseUrl}/api/lessons`, {
      params: new HttpParams()
        .set('courseId', courseId.toString())
        .set('pageNumber', '0')
        .set('pageSize', '1000')
    }).pipe(
      map(res => res['payload'])
    )
  }

  findLessons(courseId: string, sortOrder = 'asc', pageNumber = 0, pageSize = 3, sortColumn = 'seqNo'): Observable<Lesson[]> {
    return this.http.get< {payload: Lesson[]} >(`${this.baseUrl}/api/lessons`, {
      params: new HttpParams()
        .set('courseId', courseId)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
        .set('sortColumn', sortColumn)
    }).pipe(
      map(res => res['payload'])
    )
  }
}
