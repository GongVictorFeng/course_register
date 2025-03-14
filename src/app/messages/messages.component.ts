import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MessagesService } from './messages.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'messages',
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit {

  showMessages = false;
  error$!: Observable<string[]>;

  constructor(public messagesService: MessagesService) {
    console.log("Created messages component...");
  } 
  ngOnInit(): void {
    this.error$ = this.messagesService.error$.pipe(
      tap(() => this.showMessages = true)
    );
  }

  onClose() {
    this.showMessages = false;
  }
}
