import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  isDrawerNavOpen = true;
  isDrawerTextOpen = true;
  constructor() {}
}
