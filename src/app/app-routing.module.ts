import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventsListComponent} from './components/events-list/events-list.component';
import {AddEventComponent} from './components/add-event/add-event.component';
import {LoginComponent} from './components/login/login.component';
import {AddUserComponent} from './components/add-user/add-user.component';
import {AuthGuardService} from './services/auth-guard.service';
import * as Paths from './app.paths';
import {EventsDetailsComponent} from './components/events-details/events-details.component';


const routes: Routes = [
  {path: Paths.LOGIN, component: LoginComponent},
  {path: Paths.ADD_USER, component: AddUserComponent},
  {path: Paths.EVENT_LIST, component: EventsListComponent, canActivate: [AuthGuardService]},
  {path: Paths.VIEW_EVENT, component: EventsDetailsComponent, canActivate: [AuthGuardService]},
  {path: Paths.ADD_EVENT, component: AddEventComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
