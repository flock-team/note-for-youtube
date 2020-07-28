import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../services/drawer.service';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateListComponent } from '../create-list/create-list.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$ = this.authService.user$;
  constructor(
    public drawerService: DrawerService,
    private authService: AuthService,
    private dialog: MatDialog
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
  openCreateList() {
    this.dialog.open(CreateListComponent, {
      width: '640px',
      autoFocus: false,
      restoreFocus: false,
    });
  }
}
