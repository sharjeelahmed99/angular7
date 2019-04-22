import { AppErrorHandler } from './app.error-handler';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastyModule } from 'ng2-toasty';

import { HeroSearchComponent } from './hero-search/hero-search.component';
import { VehicalFormComponent } from './components/vehical-form/vehical-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    NavMenuComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    VehicalFormComponent
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule, ToastyModule.forRoot()],
  providers: [
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
