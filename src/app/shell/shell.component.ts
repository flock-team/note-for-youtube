import { Component, OnInit } from '@angular/core';
import {
  animateText,
  onDrawerChange,
  onMainContentChange,
} from '../animations/animations';
import { DrawerService } from '../services/drawer.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  animations: [onDrawerChange, onMainContentChange, animateText],
})
export class ShellComponent implements OnInit {
  constructor(public drawerService: DrawerService) {}

  ngOnInit(): void {}
}
