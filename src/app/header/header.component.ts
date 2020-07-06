import { Component, OnInit, Input } from '@angular/core';
import { DrawerService } from '../services/drawer.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() sidenav: MatSidenav;

  constructor(private drawerService: DrawerService) {}

  ngOnInit(): void {}
}
