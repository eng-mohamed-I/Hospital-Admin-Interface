import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DoctorLoginService } from '../services/doctor/doctor-login.service';
import { AdminLoginService } from '../services/admin/admin-login.service';

export const AuthDoctorGuard: CanActivateFn = (route, state) => {
  let authService = inject(DoctorLoginService);
  let router = inject(Router);
  if (authService.isUserLogedIn) {
    if (authService.getUserRole() === 'doctor') {
      return true;
    } else {
      router.navigateByUrl('/login');
      return false;
    }
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};

export const AuthDashboard: CanActivateFn = (route, state) => {
  let doctorAuthService = inject(DoctorLoginService);
  let adminAuthService = inject(AdminLoginService);
  let router = inject(Router);
  if (doctorAuthService.isUserLogedIn || adminAuthService.isUserLogedIn) {
    if (
      doctorAuthService.getUserRole() == 'admin' ||
      adminAuthService.getAdminRole() == 'doctor'
    ) {
      return true;
    } else {
      router.navigateByUrl('/login');
      return false;
    }
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};

export const AuthAdminGuard: CanActivateFn = (route, state) => {
  let adminLogService = inject(AdminLoginService);
  let router = inject(Router);
  if (adminLogService.isUserLogedIn) {
    if (adminLogService.getAdminRole() == 'admin') {
      return true;
    } else {
      router.navigateByUrl('/adminlogin');
      return false;
    }
  } else {
    router.navigateByUrl('/adminlogin');
    return false;
  }
};

export const logedGuard: CanActivateFn = (route, state) => {
  let authService = inject(AdminLoginService);
  let authDocService = inject(DoctorLoginService);
  let router = inject(Router);
  if (authService.isUserLogedIn) {
    if (authService.getAdminRole() == 'admin') {
      router.navigateByUrl('/');
      return false;
    } else if (authService.getAdminRole() == 'doctor') {
      router.navigateByUrl('available-dates');
      return false;
    } else {
      return false;
    }
  } else {
    return true;
  }
};
