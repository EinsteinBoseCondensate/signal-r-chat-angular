import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInRegisterComponent } from './log-in-register.component';

describe('LogInRegisterComponent', () => {
  let component: LogInRegisterComponent;
  let fixture: ComponentFixture<LogInRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogInRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
