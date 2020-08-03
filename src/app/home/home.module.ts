import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { PlayListComponent } from '../play-list/play-list.component';

import { AngularMaterialModule } from '../shared/angular-material.module';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [HomeComponent, PlayListComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AngularMaterialModule,
    MatCardModule,
    MatDividerModule,
    MatMenuModule,
  ],
})
export class HomeModule {}
