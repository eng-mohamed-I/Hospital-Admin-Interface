import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap'; // Required for ngb-datepicker
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointments-calendar',
  standalone: true,
  imports: [CommonModule, NgbDatepickerModule, FormsModule],
  templateUrl: './appointments-calendar.component.html',
  styleUrls: ['./appointments-calendar.component.css'] 
})
export class AppointmentsCalendarComponent {

  model: { year: number, month: number, day: number };

  constructor() {
    const today = new Date();
    this.model = {
      year: today.getFullYear(),
      month: today.getMonth() + 1, // Months are 0-based, so add 1
      day: today.getDate()
    };
  }
}
