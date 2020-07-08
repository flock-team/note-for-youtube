import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacetRoutingModule } from './facet-routing.module';
import { FacetComponent } from './facet/facet.component';

@NgModule({
  declarations: [FacetComponent],
  imports: [CommonModule, FacetRoutingModule],
})
export class FacetModule {}
