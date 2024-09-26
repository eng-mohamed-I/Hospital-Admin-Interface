import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAppointmentComponent } from './doctor-appointment.component';

describe('DoctorAppointmentComponent', () => {
  let component: DoctorAppointmentComponent;
  let fixture: ComponentFixture<DoctorAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
