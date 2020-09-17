import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { DrawerService } from './services/drawer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'note-for-youtube';

  constructor(private drawerService: DrawerService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const route = this.getChildRoute(this.router.routerState.snapshot.root);
        this.drawerService.isDrawerNavOpen =
          route.data.isDrawerNavOpen !== false;
        this.drawerService.isDrawerTextOpen =
          route.data.isDrawerTextOpen !== false;
      }
    });
  }

  private getChildRoute(route: ActivatedRouteSnapshot) {
    if (!route.children.length) {
      return route;
    } else {
      return this.getChildRoute(route.children[0]);
    }
  }
}
