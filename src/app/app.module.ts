import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AddEventComponent} from './components/add-event/add-event.component';
import {EventsDetailsComponent} from './components/events-details/events-details.component';
import {EventsListComponent} from './components/events-list/events-list.component';


import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './components/login/login.component';
import {UsersComponent} from './components/users/users.component';
import {AddUserComponent} from './components/add-user/add-user.component';
import {JwtInterceptor} from './interceptors/jwt-interceptor.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UpdateEventComponent } from './components/update-event/update-event.component';

@NgModule({
  declarations: [
    AppComponent,
    AddEventComponent,
    EventsDetailsComponent,
    EventsListComponent,
    LoginComponent,
    UsersComponent,
    AddUserComponent,
    UpdateEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
