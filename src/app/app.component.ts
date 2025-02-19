import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import {  MatListModule } from "@angular/material/list";
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSliderModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'course-registration';
}
