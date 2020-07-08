import { Component } from '@angular/core';
import {
  animateText,
  onDrawerChange,
  onMainContentChange,
} from './animations/animations';
import { DrawerService } from './services/drawer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [onDrawerChange, onMainContentChange, animateText],
})
export class AppComponent {
  title = 'note-for-youtube';
  constructor(public drawerService: DrawerService) {}
}
