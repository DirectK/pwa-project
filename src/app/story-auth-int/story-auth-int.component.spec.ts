import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryAuthIntComponent } from './story-auth-int.component';

describe('StoryAuthIntComponent', () => {
  let component: StoryAuthIntComponent;
  let fixture: ComponentFixture<StoryAuthIntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryAuthIntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryAuthIntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
