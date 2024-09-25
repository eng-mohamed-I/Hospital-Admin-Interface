import { Component } from '@angular/core';
import { DoctorLoginService } from '../../services/doctor/doctor-login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Router, RouterLink } from '@angular/router'; // Import the Router

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Fix typo: styleUrl -> styleUrls
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

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
          // this.doctorLoginService.saveToken(response.token);
          console.log(response);
          // Optionally store user info in localStorage
          localStorage.setItem('userName', response.user.name);
          localStorage.setItem('userId', response.user._id);
          // save auth contain doctor info to localstorage
          localStorage.setItem(
            'auth',
            JSON.stringify({
              token: response.token,
              user: { role: response.user.role },
            })
          );
          this.successMessage = 'Login Successfully';
          this.errorMessage = '';
          // Redirect to available dates
          setTimeout(() => {
            this.router.navigate(['/available-dates']);
          }, 2000);
        }
      },
      error: (error) => {
        // Error handling
        this.errorMessage = 'Invalid email or password. Please try again.';
        console.error('Login error:', error);
      },
    });
  }
}
