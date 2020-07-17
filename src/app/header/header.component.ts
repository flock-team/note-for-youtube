import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../services/drawer.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$ = this.authService.user$;
  constructor(
    public drawerService: DrawerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onDrawerToggle() {
    this.drawerService.drawerState = !this.drawerService.drawerState;
    setTimeout(() => {
      this.drawerService.linkText = this.drawerService.drawerState;
    }, 200);
  }

  logout() {
    this.authService.logout();
  }
}
