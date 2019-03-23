import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowListButtonComponent } from './show-list-button.component';

describe('ShowListButtonComponent', () => {
  let component: ShowListButtonComponent;
  let fixture: ComponentFixture<ShowListButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowListButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowListButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
