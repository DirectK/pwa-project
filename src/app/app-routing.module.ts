import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoriesComponent }      from './stories/stories.component';
import { EventComponent } from './event/event.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { StoryComponent } from './story/story.component';
import { EventFormComponent } from './event-form/event-form.component';
import { StoryFormComponent } from './story-form/story-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: 'events', component: EventComponent },
  { path: 'events/add', component: EventFormComponent },
  { path: 'events/:eventId', component: EventDetailComponent },
  { path: 'events/:eventId/stories/add', component: StoryFormComponent },
  { path: 'events/:eventId/stories/:storyId', component: StoryComponent },
  { path: '**', redirectTo: 'events', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
