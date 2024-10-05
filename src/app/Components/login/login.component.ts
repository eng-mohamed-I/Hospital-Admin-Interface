import { Component } from '@angular/core';
import { DoctorLoginService } from '../../services/doctor/doctor-login.service';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'; // Import FormsModule
import { Router, RouterLink } from '@angular/router'; // Import the Router

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Fix typo: styleUrl -> styleUrls
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [Validators.required]),
  });
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  success: boolean = false;
  passwordVisibilty: string = 'password';

  constructor(
    private doctorLoginService: DoctorLoginService,
    private router: Router // Inject Router
  ) {}

  showVesibity() {
    this.passwordVisibilty =
      this.passwordVisibilty === 'password' ? 'text' : 'password';
  }

  clearMessage() {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 2000);
  }

  // Handle form submission
  onLog() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.doctorLoginService.login(this.loginForm).subscribe({
        next: (response) => {
          // Successful login response handling
          if (response?.token) {
            // Save the token using the login service
            this.success = true;
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
            this.clearMessage();
            // Redirect to available dates
            setTimeout(() => {
              this.router.navigate(['/available-dates']);
            }, 2000);
          }
        },
        error: (error) => {
          this.isLoading = false;
          // Error handling
          this.errorMessage = 'Invalid email or password';
          this.clearMessage();
        },
      });
    }
  }
}
