import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireFunctionsModule, REGION } from '@angular/fire/functions';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DrawerComponent } from './drawer/drawer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MiniVariantComponent } from './mini-variant/mini-variant.component';
import { CreateListComponent } from './create-list/create-list.component';

import { AngularMaterialModule } from './shared/angular-material.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

const materialModule = [
  AngularMaterialModule,
  MatMenuModule,
  MatSnackBarModule,
  MatInputModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatOptionModule,
  MatSelectModule,
  MatTooltipModule,
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DrawerComponent,
    NotFoundComponent,
    MiniVariantComponent,
    CreateListComponent,
  ],
  imports: [
    ...materialModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: REGION, useValue: 'asia-northeast1' }],
  bootstrap: [AppComponent],
  entryComponents: [CreateListComponent],
})
export class AppModule {}
