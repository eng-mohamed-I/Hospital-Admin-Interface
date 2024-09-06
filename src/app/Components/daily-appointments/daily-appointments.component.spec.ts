import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyAppointmentsComponent } from './daily-appointments.component';

describe('DailyAppointmentsComponent', () => {
  let component: DailyAppointmentsComponent;
  let fixture: ComponentFixture<DailyAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyAppointmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
