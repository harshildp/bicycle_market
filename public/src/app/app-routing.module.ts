import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { BrowseComponent } from './nav/browse/browse.component';
import { NavComponent } from './nav/nav.component';
import { ListingsComponent } from './nav/listings/listings.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent, pathMatch: 'full' },
  { path: 'nav', component: NavComponent, children: [
    { path: 'browse', component: BrowseComponent},
    { path: 'listings', component: ListingsComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
