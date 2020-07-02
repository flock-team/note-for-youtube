import { Injectable } from '@angular/core';
import { Subject, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  drawerState$: Subject<boolean> = new Subject();

  constructor() {}
}
