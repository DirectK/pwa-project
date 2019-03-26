import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEventsFormComponent } from './search-events-form.component';

describe('SearchEventsFormComponent', () => {
  let component: SearchEventsFormComponent;
  let fixture: ComponentFixture<SearchEventsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchEventsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchEventsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
