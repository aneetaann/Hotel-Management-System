import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbookingComponent } from './rbooking.component';

describe('RbookingComponent', () => {
  let component: RbookingComponent;
  let fixture: ComponentFixture<RbookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RbookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
