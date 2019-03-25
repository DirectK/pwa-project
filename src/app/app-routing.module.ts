import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoriesComponent }      from './stories/stories.component';
import { EventComponent } from './event/event.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { StoryComponent } from './story/story.component';

const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: 'events', component: EventComponent },
  { path: 'events/:eventId', component: EventDetailComponent },
  { path: 'events/:eventId/stories', component: StoriesComponent },
  { path: 'events/:eventId/stories/:storyId', component: StoryComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
