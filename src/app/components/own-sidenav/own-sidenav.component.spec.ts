import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnSidenavComponent } from './own-sidenav.component';

describe('OwnSidenavComponent', () => {
  let component: OwnSidenavComponent;
  let fixture: ComponentFixture<OwnSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
