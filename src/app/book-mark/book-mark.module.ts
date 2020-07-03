import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookMarkRoutingModule } from './book-mark-routing.module';
import { BookMarkComponent } from './book-mark/book-mark.component';

@NgModule({
  declarations: [BookMarkComponent],
  imports: [CommonModule, BookMarkRoutingModule],
})
export class BookMarkModule {}
