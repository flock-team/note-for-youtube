import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayListDetailComponent } from './play-list-detail/play-list-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PlayListDetailComponent,
  },
  {
    path: ':id',
    component: PlayListDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayListDetailRoutingModule {}
