import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ListingService } from './listing.service';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './welcome/login/login.component';
import { RegistrationComponent } from './welcome/registration/registration.component';
import { NavComponent } from './nav/nav.component';
import { BrowseComponent } from './nav/browse/browse.component';
import { ListingsComponent } from './nav/listings/listings.component';
import { CreateComponent } from './nav/listings/create/create.component';
import { EditComponent } from './nav/listings/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    RegistrationComponent,
    NavComponent,
    BrowseComponent,
    ListingsComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ListingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
