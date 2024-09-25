import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminLoginService } from '../../services/admin/admin-login.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  email: string = '';
  password: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private _adminLogService: AdminLoginService , private _router : Router) { }

  onLog() { 
    this._adminLogService.login({email:this.email ,password :this.password}).subscribe({
      next: (res) => { 
        let data = { 
          data: res.data,
          token: res.token,
          user: res.user
        }
        localStorage.setItem("auth", JSON.stringify(data))
        this.successMessage = "Login succssfully";
        this.errorMessage = "";
        setTimeout(( ) => { 
          this._router.navigateByUrl("/")
        },2000)
      },
      error: (err) => {
        console.error(err)
        this.errorMessage = "Invalid email or password"
        this.successMessage = ""
      }
    })
  }
}
