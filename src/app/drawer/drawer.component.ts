import { Component, OnInit } from '@angular/core';
import { onDrawerChange, animateText } from '../animations/animations';
import { DrawerService } from '../services/drawer.service';

interface Page {
  link: string;
  name: string;
  icon: string;
}
@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  animations: [onDrawerChange, animateText],
})
export class DrawerComponent implements OnInit {
  constructor(private drawerService: DrawerService) {}
  pages: Page[] = [
    { name: 'ホーム', link: 'some-link', icon: 'home' },
    { name: 'マイリスト', link: 'some-link', icon: 'list' },
    { name: 'ブックマーク', link: 'some-link', icon: 'book' },
    { name: 'タグ', link: 'some-link', icon: 'loyalty' },
  ];

  drawerState = false;
  linkText = false;
  onToggle() {
    this.drawerState = !this.drawerState;
    setTimeout(() => {
      this.linkText = this.drawerState;
    });
    this.drawerService.drawerState$.next(this.drawerState);
  }
  ngOnInit() {}
}
