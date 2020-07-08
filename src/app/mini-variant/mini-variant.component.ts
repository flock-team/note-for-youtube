import { Component, OnInit } from '@angular/core';
import { onDrawerChange, animateText } from '../animations/animations';

interface Page {
  link: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-mini-variant',
  templateUrl: './mini-variant.component.html',
  styleUrls: ['./mini-variant.component.scss'],
  animations: [onDrawerChange, animateText],
})
export class MiniVariantComponent implements OnInit {
  constructor() {}
  pages: Page[] = [
    { name: 'ホーム', link: '/home', icon: 'home' },
    { name: 'マイリスト', link: '/my-list', icon: 'list' },
    { name: 'ブックマーク', link: '/book-mark', icon: 'book' },
    { name: 'タグ', link: '/facet', icon: 'loyalty' },
  ];
  ngOnInit(): void {}
}
