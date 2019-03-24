import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoriesComponent }      from './stories/stories.component';

const routes: Routes = [
  { path: 'events/:eventId/stories', component: StoriesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
