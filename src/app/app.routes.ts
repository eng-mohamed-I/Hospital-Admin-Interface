import { Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { PatientsTableComponent } from './Components/patients/patients-table/patients-table.component';
import { PatientProfileComponent } from './Components/Pages/patient-profile/patient-profile.component';

import { DoctorListComponent } from './Components/doctors/doctor-list/doctor-list.component';
import { DoctorsComponent } from './Components/doctors/doctors.component';
import { DoctorFormComponent } from './Components/doctors/doctor-form/doctor-form.component';

import { DepartmentComponent } from './Components/department/department.component';
import { DepartmentDetailsComponent } from './Components/department/department-details/department-details.component';
import { DepartmentListComponent } from './Components/department/department-list/department-list.component';
import { DepartmentFormComponent } from './Components/department/department-form/department-form.component';
import { DepartmentUpdateComponent } from './Components/department/department-list/department-update/department-update.component';

import { MainComponent } from './Components/layout/main/main.component';
import { LoginComponent } from './Components/login/login.component';
import { AppointmentsComponent } from './Components/appointments/appointments.component';

import { SingleBlogComponent } from './Components/blog-management/single-blog/single-blog.component';
import { BlogManagementComponent } from './Components/blog-management/blog-management.component';
import { CreateComponent } from './Components/blog-management/create/create.component';
import { EditComponent } from './Components/blog-management/edit/edit.component';
import { UpdateDoctorComponent } from './Components/doctors/update-doctor/update-doctor.component';
import { AdminLoginComponent } from './Components/admin-login/admin-login.component';
import { AvailableDateComponent } from './Components/logined-doctor/available-date/available-date.component';
import {
  AuthAdminGuard,
  AuthDashboard,
  AuthDoctorGuard,
  logedGuard,
} from './guard/auth.guard';
import { DoctorAppointmentComponent } from './Components/doctor-appointment/doctor-appointment.component';
import { ReportComponent } from './Components/report/report.component';
import { AddReportComponent } from './Components/report/add-report/add-report.component';

export const routes: Routes = [
  // Main now is the home component contain all copmonent
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthDashboard],
      },
      {
        path: 'patients',
        component: PatientsTableComponent,
        canActivate: [AuthAdminGuard],
      },
      {
        path: 'patients-profile',
        component: PatientProfileComponent,
        canActivate: [AuthAdminGuard],
      },
      {
        path: 'department',
        component: DepartmentComponent,
        children: [
          { path: '', redirectTo: 'details', pathMatch: 'full' },
          { path: 'details', component: DepartmentDetailsComponent },
          { path: 'list', component: DepartmentListComponent },
          { path: 'add', component: DepartmentFormComponent },
          { path: 'update/:id', component: DepartmentUpdateComponent },
        ],
        canActivate: [AuthAdminGuard],
      },
      {
        path: 'doctor',
        component: DoctorsComponent,
        children: [
          { path: 'doctor-list', component: DoctorListComponent },
          { path: 'doctor-form', component: DoctorFormComponent },
          { path: 'doctor-form/:id', component: DoctorFormComponent },
          { path: 'doctor-update/:id', component: UpdateDoctorComponent },
          { path: '', redirectTo: 'doctor-list', pathMatch: 'full' },
        ],
        canActivate: [AuthAdminGuard],
      },
      {
        path: 'blog-management',
        component: BlogManagementComponent,
        canActivate: [AuthAdminGuard],
      },
      {
        path: 'blog/:id',
        component: SingleBlogComponent,
        canActivate: [AuthAdminGuard],
      },
      {
        path: 'blog-management/form',
        component: CreateComponent,
        canActivate: [AuthAdminGuard],
      },
      {
        path: 'blog/edit/:id',
        component: EditComponent,
        canActivate: [AuthAdminGuard],
      },
      {
        path: 'appointment',
        component: AppointmentsComponent,
        canActivate: [AuthAdminGuard],
      },
      {
        path: 'available-dates',
        component: AvailableDateComponent,
        canActivate: [AuthDoctorGuard],
      },
      {
        path: 'doctor-appointment',
        component: DoctorAppointmentComponent,
        canActivate: [AuthDoctorGuard],
      },
      {
        path: 'reports/:id',
        component: ReportComponent,
        canActivate: [AuthDashboard],
      },
      {
        path: 'add-report/:id',
        component: AddReportComponent,
        canActivate: [AuthDashboard],
      },
    ],
  },
  { path: 'login', component: LoginComponent, canActivate: [logedGuard] },
  {
    path: 'adminlogin',
    component: AdminLoginComponent,
    canActivate: [logedGuard],
  },
];
