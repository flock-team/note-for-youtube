import { Component, OnInit } from '@angular/core';

interface Page {
  link: string;
  name: string;
  icon: string;
}
@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements OnInit {
  constructor() {}
  pages: Page[] = [
    { name: 'ホーム', link: '/home', icon: 'home' },
    { name: 'マイリスト', link: '/my-list', icon: 'list' },
    { name: 'ブックマーク', link: '/book-mark', icon: 'book' },
    { name: 'タグ', link: '/facet', icon: 'loyalty' },
  ];
  ngOnInit() {}
}
