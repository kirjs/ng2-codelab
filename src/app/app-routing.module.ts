import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CodelabComponent} from './codelab/codelab/codelab.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CodelabsComponent} from './codelabs/codelabs.component';

const appRoutes: Routes = [
  {path: 'codelabs', component: CodelabsComponent},
  {path: 'codelab', component: CodelabComponent},
  {path: 'edit', component: CodelabComponent},
  {path: '', redirectTo: '/codelab', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
