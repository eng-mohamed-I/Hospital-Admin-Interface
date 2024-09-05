import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Required for ngModel
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap'; // Required for ngb-datepicker
import { CommonModule } from '@angular/common';
 

@Component({
  selector: 'app-appointments-calendar',
  standalone: true,
  imports: [CommonModule,
    NgbDatepickerModule,
    FormsModule,],
  templateUrl: './appointments-calendar.component.html',
  styleUrl: './appointments-calendar.component.css'
})
export class AppointmentsCalendarComponent {
  model: { year: number, month: number, day: number } = { year: 2024, month: 9, day: 5 };
}
