import { Component } from '@angular/core';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent {
  patients = [
    { id: 1, name: 'John Doe', age: 30, gender: 'Male', condition: 'Flu' },
    { id: 2, name: 'Jane Smith', age: 25, gender: 'Female', condition: 'Cough' },
    { id: 3, name: 'Robert Brown', age: 45, gender: 'Male', condition: 'Headache' }
    
  ];

  constructor() { }

  ngOnInit(): void {
    
  }
}
