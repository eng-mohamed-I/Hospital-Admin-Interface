import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminLoginService } from '../../services/admin/admin-login.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [Validators.required]),
  });
  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  success: boolean = false;
  passwordVisibilty: string = 'password';
  constructor(
    private _adminLogService: AdminLoginService,
    private _router: Router
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

  goToDoctorLogin() {
    this._router.navigate(['/login']);
  }

  onLog() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.isLoading = true;
      this._adminLogService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.success = true;
          let data = {
            data: res.data,
            token: res.token,
            user: res.user,
          };
          localStorage.setItem('auth', JSON.stringify(data));
          this.successMessage = 'Login succssfully';
          this.errorMessage = '';
          this.clearMessage();
          setTimeout(() => {
            this._router.navigateByUrl('/');
          }, 2000);
        },
        error: (err) => {
          this.isLoading = false;
          console.error(err);
          if (err.error.message) {
            this.successMessage = '';
            this.clearMessage();
            return (this.errorMessage = err.error.message || 'Login faild');
          }
          this.errorMessage = 'Login Faild';
          this.clearMessage();
        },
      });
    }
  }
}
