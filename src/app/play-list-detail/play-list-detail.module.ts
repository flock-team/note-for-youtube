import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayListDetailRoutingModule } from './play-list-detail-routing.module';
import { PlayListDetailComponent } from './play-list-detail/play-list-detail.component';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { ListNameEditComponent } from './list-name-edit/list-name-edit.component';
import { ListTextEditComponent } from './list-description-edit/list-description-edit.component';
import { ListPrivacyEditComponent } from './list-privacy-edit/list-privacy-edit.component';
import { VideoAdditionComponent } from './video-addition/video-addition.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { VideoListModule } from '../video-list/video-list.module';

@NgModule({
  declarations: [
    PlayListDetailComponent,
    ListNameEditComponent,
    ListTextEditComponent,
    ListPrivacyEditComponent,
    VideoAdditionComponent,
  ],
  imports: [
    CommonModule,
    PlayListDetailRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatDividerModule,
    MatSnackBarModule,
    VideoListModule,
  ],
})
export class PlayListDetailModule {}
