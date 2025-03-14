import { Injectable } from "@angular/core";
import { BehaviorSubject, concatMap, finalize, Observable, of, tap } from "rxjs";

@Injectable()
export class LoadingService {

    private loadingSubject = new BehaviorSubject<boolean>(false);
    loading$: Observable<boolean> = this.loadingSubject.asObservable();

    constructor() {
        console.log("loading service created...");
    }

    showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
        return of(null)
            .pipe(
                tap(() => this.loadingOn()),
                concatMap(() => obs$),
                finalize(() => this.loadingOff())
            )
    }

    private loadingOn() {
        this.loadingSubject.next(true);
    }

    private loadingOff() {
        this.loadingSubject.next(false);
    }
}