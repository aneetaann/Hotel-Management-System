import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbookingComponent } from './mbooking.component';

describe('MbookingComponent', () => {
  let component: MbookingComponent;
  let fixture: ComponentFixture<MbookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
