import { Component } from '@angular/core';
import { DoctorLoginService } from '../../services/doctor/doctor-login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Router } from '@angular/router'; // Import the Router

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Fix typo: styleUrl -> styleUrls
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private doctorLoginService: DoctorLoginService,
    private router: Router // Inject Router
  ) {}

  // Handle form submission
  onSubmit() {
    this.doctorLoginService.login(this.email, this.password).subscribe({
      next: (response) => {
        // Successful login response handling
        if (response?.token) {
          // Save the token using the login service
          this.doctorLoginService.saveToken(response.token);
          
          // Optionally store user info in localStorage
          localStorage.setItem('userName', response.user.name);
          localStorage.setItem('userId', response.user._id);
          
          console.log('Login successful:', response);
          
          // Redirect to the patients page (or any other page)
          this.router.navigate(['/patients']);
        }
      },
      error: (error) => {
        // Error handling
        this.errorMessage = 'Invalid email or password. Please try again.';
        console.error('Login error:', error);
      }
    });
  }
}
