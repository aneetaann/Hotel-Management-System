import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MroomsComponent } from './mrooms.component';

describe('MroomsComponent', () => {
  let component: MroomsComponent;
  let fixture: ComponentFixture<MroomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MroomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
