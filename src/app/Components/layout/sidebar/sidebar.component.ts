import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AdminLoginService } from '../../../services/admin/admin-login.service';
import { BehaviorSubject } from 'rxjs';
import { DoctorLoginService } from '../../../services/doctor/doctor-login.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  isLogged: any;
  role: any;
  constructor(
    private _authAdminService: AdminLoginService,
    private _router: Router,
    private _authDcotorService: DoctorLoginService
  ) {
    this.isLogged = new BehaviorSubject<boolean>(
      this._authAdminService.isUserLogedIn
    );
    this.role = this._authAdminService.getAdminRole();
    console.log(this.role);
  }

  logOut() {
    this._authAdminService.logOut();
    this._router.navigateByUrl('login');
  }
}
