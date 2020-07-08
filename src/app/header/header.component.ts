import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../services/drawer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public drawerService: DrawerService) {}

  ngOnInit(): void {}

  onDrawerToggle() {
    this.drawerService.drawerState = !this.drawerService.drawerState;
    setTimeout(() => {
      this.drawerService.linkText = this.drawerService.drawerState;
    }, 200);
  }
}
