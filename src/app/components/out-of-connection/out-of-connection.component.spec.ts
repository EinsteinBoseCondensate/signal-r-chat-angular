import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutOfConnectionComponent } from './out-of-connection.component';

describe('OutOfConnectionComponent', () => {
  let component: OutOfConnectionComponent;
  let fixture: ComponentFixture<OutOfConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutOfConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutOfConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
