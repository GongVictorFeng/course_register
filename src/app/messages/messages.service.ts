import { Injectable } from "@angular/core";
import { BehaviorSubject, filter } from "rxjs";

@Injectable()
export class MessagesService {

    messageSubject = new BehaviorSubject<string[]>([]);
    error$ = this.messageSubject.asObservable()
        .pipe(
            filter(val => val && val.length > 0)
        );  
    showErrors(...errors: string[]) {
        this.messageSubject.next(errors);
    }
}