import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('src/app/home/home.module').then((m) => m.HomeModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('src/app/welcome/welcome.module').then((m) => m.WelcomeModule),
    canLoad: [GuestGuard],
    canActivate: [GuestGuard],
  },
  {
    path: 'account',
    loadChildren: () =>
      import('src/app/account/account.module').then((m) => m.AccountModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'my-list',
    loadChildren: () =>
      import('src/app/my-list/my-list.module').then((m) => m.MyListModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'main',
    loadChildren: () =>
      import('src/app/main/main.module').then((m) => m.MainModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'book-mark',
    loadChildren: () =>
      import('src/app/book-mark/book-mark.module').then(
        (m) => m.BookMarkModule
      ),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'facet',
    loadChildren: () =>
      import('src/app/facet/facet.module').then((m) => m.FacetModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'subscribe',
    loadChildren: () =>
      import('src/app/subscribe/subscribe.module').then(
        (m) => m.SubscribeModule
      ),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'terms',
    loadChildren: () =>
      import('src/app/terms/terms.module').then((m) => m.TermsModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'transaction',
    loadChildren: () =>
      import('src/app/transaction/transaction.module').then(
        (m) => m.TransactionModule
      ),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
