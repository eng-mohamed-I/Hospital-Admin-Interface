import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableDateComponent } from './available-date.component';

describe('AvailableDateComponent', () => {
  let component: AvailableDateComponent;
  let fixture: ComponentFixture<AvailableDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
