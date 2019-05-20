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
import { EventFormComponent } from './event-form/event-form.component';
import { StoryFormComponent } from './story-form/story-form.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from  '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MapComponent } from './map/map.component';
import { MapFormComponent } from './map-form/map-form.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { EventInfoComponent } from './event-info/event-info.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthIntermediaryComponent } from './auth-intermediary/auth-intermediary.component';
import { NgxGalleryModule } from 'ngx-gallery';

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    EventDetailComponent,
    ShowListButtonComponent,
    StoriesComponent,
    StoryComponent,
    SearchEventsFormComponent,
    EventFormComponent,
    StoryFormComponent,
    MapComponent,
    MapFormComponent,
    EventInfoComponent,
    LoginComponent,
    SignupComponent,
    AuthIntermediaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxGalleryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
