import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

const materialModules = [
  MatIconModule,
  MatFormFieldModule,
  MatButtonModule,
  CommonModule,
  MatDialogModule,
];

@NgModule({
  imports: [...materialModules],
  exports: [...materialModules],
})
export class AngularMaterialModule {}
