import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  drawerSource = new ReplaySubject<boolean>(1);
  isOpened$ = this.drawerSource.asObservable();
  isOpend: boolean;

  drawerState$: Subject<boolean> = new Subject();

  constructor() {}
  toggle() {
    this.isOpend = !this.isOpend;
    this.drawerSource.next(this.isOpend);
  }
}
