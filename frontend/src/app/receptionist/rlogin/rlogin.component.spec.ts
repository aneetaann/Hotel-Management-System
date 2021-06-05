import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RloginComponent } from './rlogin.component';

describe('RloginComponent', () => {
  let component: RloginComponent;
  let fixture: ComponentFixture<RloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
