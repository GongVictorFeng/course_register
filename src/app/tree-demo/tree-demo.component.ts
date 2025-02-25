import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';

interface CourseNode {
  name: string;
  children?: CourseNode[];
}

const TREE_DATA: CourseNode[] = [
  {
    name: 'Angular For Beginners',
    children: [
      {
        name: 'Introduction to Angular'
      },
      {
        name: 'Angular Component @Input()'
      },
      {
        name: 'Angular Component @Output()'
      }
    ],
  },
  {
    name: 'Angular Material In Depth',
    children: [
      {
        name: 'Introduction to Angular Material',
        children: [
          {
            name: 'Form Components'
          },
          {
            name: 'Navigation and Containers'
          }
        ],
      },
      {
        name: 'Advanced Angular Material',
        children: [
          {
            name: 'Custom Themes'
          },
          {
            name: 'Tree Components'
          }
        ],
      },
    ],
  },
];

@Component({
  selector: 'app-tree-demo',
  imports: [
    MatTreeModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './tree-demo.component.html',
  styleUrl: './tree-demo.component.scss'
})
export class TreeDemoComponent implements OnInit{

  nestedDataSource = new MatTreeNestedDataSource<CourseNode>();
  childrenAccessor = (node: CourseNode) => node.children ?? [];

  ngOnInit(): void {
    this.nestedDataSource.data = TREE_DATA;
  }

  hasNestedChild(index: number,node: CourseNode) {
    if (!!node.children) {
      return node.children.length > 0;
    }
    return false;
  }

}
