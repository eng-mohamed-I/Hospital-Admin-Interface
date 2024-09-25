import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AponitmentFormComponent } from './aponitment-form.component';

describe('AponitmentFormComponent', () => {
  let component: AponitmentFormComponent;
  let fixture: ComponentFixture<AponitmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AponitmentFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AponitmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
