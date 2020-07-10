import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('src/app/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('src/app/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'my-list',
    loadChildren: () =>
      import('src/app/my-list/my-list.module').then((m) => m.MyListModule),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('src/app/main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'book-mark',
    loadChildren: () =>
      import('src/app/book-mark/book-mark.module').then(
        (m) => m.BookMarkModule
      ),
  },
  {
    path: 'facet',
    loadChildren: () =>
      import('src/app/facet/facet.module').then((m) => m.FacetModule),
  },
  {
    path: 'subscribe',
    loadChildren: () =>
      import('src/app/subscribe/subscribe.module').then(
        (m) => m.SubscribeModule
      ),
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('src/app/welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  {
    path: 'terms',
    loadChildren: () =>
      import('src/app/terms/terms.module').then((m) => m.TermsModule),
  },
  {
    path: 'transaction',
    loadChildren: () =>
      import('src/app/transaction/transaction.module').then(
        (m) => m.TransactionModule
      ),
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
