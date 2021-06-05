import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RroomsComponent } from './rrooms.component';

describe('RroomsComponent', () => {
  let component: RroomsComponent;
  let fixture: ComponentFixture<RroomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RroomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
