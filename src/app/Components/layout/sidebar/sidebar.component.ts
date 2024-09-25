import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AdminLoginService } from '../../../services/admin/admin-login.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(
    private _authDoctorService: AdminLoginService,
    private _router: Router
  ) {}

  logOut() {
    this._authDoctorService.logOut();
    this._router.navigateByUrl('login');
  }
}
