import { Component } from '@angular/core';
import { DoctorLoginService } from '../../services/doctor/doctor-login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Router } from '@angular/router'; // Import the Router

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private doctorLoginService: DoctorLoginService,
    private router: Router // Inject Router
  ) { }

  onSubmit() {
    this.doctorLoginService.login(this.email, this.password).subscribe(
      response => {
        // Handle successful login here (e.g., store token, redirect)
        console.log('Login successful:', response);
        this.router.navigate(['/patients']);
      },
      error => {
        // Handle error here
        this.errorMessage = 'Invalid email or password';
        console.error('Login error:', error);
      }
    );
  }
}
