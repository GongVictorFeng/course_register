import { Component } from '@angular/core';
import {  MatListModule } from "@angular/material/list";
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-virtual-scrolling',
  imports: [
    MatListModule,
    ScrollingModule
  ],
  templateUrl: './virtual-scrolling.component.html',
  styleUrl: './virtual-scrolling.component.scss'
})
export class VirtualScrollingComponent {

  items = Array.from({length: 100000}).map((value, i) => `Item #${i}`);
}
