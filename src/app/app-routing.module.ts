import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoriesComponent }      from './stories/stories.component';
import { EventComponent } from './event/event.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventFormComponent } from './event-form/event-form.component';
import { StoryFormComponent } from './story-form/story-form.component';
import { EventInfoComponent } from './event-info/event-info.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthIntermediaryComponent } from './auth-intermediary/auth-intermediary.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: 'authtest', component: AuthIntermediaryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'events', component: EventComponent },
  { path: 'events/add', component: EventFormComponent, canActivate: [AuthGuardService] },
  { path: 'events/:eventId', component: EventDetailComponent, children: [
    { path: '', component: EventInfoComponent },
    { path: 'stories', component: StoriesComponent }
  ] },
  { path: 'events/:eventId/stories/add', component: StoryFormComponent, canActivate: [AuthGuardService] },
  { path: '**', redirectTo: 'events', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
