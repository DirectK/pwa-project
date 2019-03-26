import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { ShowListButtonComponent } from './show-list-button/show-list-button.component';
import { StoriesComponent } from './stories/stories.component';
import { SearchEventsFormComponent } from './search-events-form/search-events-form.component';
import { StoryComponent } from './story/story.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from  '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventFormComponent } from './event-form/event-form.component';
import { MaterialModule } from './material.module';
import { StoryFormComponent } from './story-form/story-form.component';

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    EventDetailComponent,
    ShowListButtonComponent,
    StoriesComponent,
    StoryComponent,
    SearchEventsFormComponent,
    EventFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
