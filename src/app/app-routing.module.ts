import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CodelabComponent} from './codelab/codelab/codelab.component';
import {CodelabsComponent} from './codelabs/codelabs.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {path: 'codelabs', component: CodelabsComponent},
  {path: 'codelab/:codelab/:milestone/:exercise', component: CodelabComponent},
  {path: 'edit', component: CodelabComponent},
  {path: '', redirectTo: '/codelab/test/0/0', pathMatch: 'full'},
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
