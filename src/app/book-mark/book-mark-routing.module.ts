import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookMarkComponent } from './book-mark/book-mark.component';

const routes: Routes = [
  {
    path: '',
    component: BookMarkComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookMarkRoutingModule {}
