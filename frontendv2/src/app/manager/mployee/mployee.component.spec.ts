import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MployeeComponent } from './mployee.component';

describe('MployeeComponent', () => {
  let component: MployeeComponent;
  let fixture: ComponentFixture<MployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
