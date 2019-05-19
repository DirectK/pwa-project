import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthIntermediaryComponent } from './auth-intermediary.component';

describe('AuthIntermediaryComponent', () => {
  let component: AuthIntermediaryComponent;
  let fixture: ComponentFixture<AuthIntermediaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthIntermediaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthIntermediaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
