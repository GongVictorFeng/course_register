import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import {  MatListModule } from "@angular/material/list";
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { LoadingComponent } from "./loading/loading.component";
import { LoadingService } from './loading/loading.service';
import { MessagesComponent } from './messages/messages.component';
import { MessagesService } from './messages/messages.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSliderModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    LoadingComponent,
    MessagesComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    LoadingService, MessagesService
  ]
})
export class AppComponent {
  title = 'course-registration';
}
