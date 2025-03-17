import { BehaviorSubject, catchError, map, mergeAll, Observable, throwError } from "rxjs";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { HttpClient } from "@angular/common/http";
import { LoadingService } from "../loading/loading.service";
import { MessagesService } from "../messages/messages.service";
import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CoursesStore {

    private baseUrl = environment.apiUrl;
    private coursesSubject = new BehaviorSubject<Course[]>([]);
    courses$: Observable<Course[]> = this.coursesSubject.asObservable();

    constructor(
        private http: HttpClient,
        private loadingService: LoadingService,
        private messageService: MessagesService) {
            
            this.loadAllCourses();
        }

    private loadAllCourses() {
       const loadCourses$ = this.http.get<{payload: Course[]}>(`${this.baseUrl}/api/courses`)
        .pipe(
            map(response => response['payload']),
            catchError(err => {
                const message = "Could not load courses";
                this.messageService.showErrors(message);
                console.log(message, err);
                return throwError(() => err);
            })
        );

        this.loadingService.showLoaderUntilCompleted(loadCourses$).subscribe(
            vals => this.coursesSubject.next(vals)
        )
    }

    filterByCategory(category: string): Observable<Course[]> {
        return this.courses$
            .pipe(
                map(courses => courses.filter(course => course.category === category).sort(sortCoursesBySeqNo))
            );
    }
}