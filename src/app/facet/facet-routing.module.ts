import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacetComponent } from './facet/facet.component';

const routes: Routes = [
  {
    path: '',
    component: FacetComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacetRoutingModule {}
