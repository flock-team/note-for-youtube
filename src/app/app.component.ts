import { Component } from '@angular/core';
import { DrawerService } from './services/drawer.service';
import { onMainContentChange } from './animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [onMainContentChange],
})
export class AppComponent {
  title = 'note-for-youtube';

  onDrawerChange: boolean;
  constructor(private drawerService: DrawerService) {
    this.drawerService.drawerState$.subscribe((res) => {
      console.log(res);
      this.onDrawerChange = res;
    });
  }
}
