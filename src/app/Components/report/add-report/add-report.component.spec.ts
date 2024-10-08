import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReportComponent } from './add-report.component';

describe('AddReportComponent', () => {
  let component: AddReportComponent;
  let fixture: ComponentFixture<AddReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
