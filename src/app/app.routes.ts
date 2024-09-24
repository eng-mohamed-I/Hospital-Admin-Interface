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
import { EarningsComponent } from './Components/earnings/earnings.component';
import { UpdateDoctorComponent } from './Components/doctors/update-doctor/update-doctor.component';
import { AdminLoginComponent } from './Components/admin-login/admin-login.component';
import { AvailableDateComponent } from './Components/logined-doctor/available-date/available-date.component';

export const routes: Routes = [  
  

        

        // Main now is the home component contain all copmonent 
        { path: '', component: MainComponent ,children: [ 
                { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                { path: 'dashboard' , component: DashboardComponent},
                { path: 'patients', component: PatientsTableComponent },
                { path: 'patients-profile', component: PatientProfileComponent },
                { path: 'department' , component: DepartmentComponent , children: [
                        { path: '' , redirectTo: "details" , pathMatch: "full"},
                        { path: "details" , component: DepartmentDetailsComponent }, 
                        { path: "list" , component: DepartmentListComponent },
                        { path: "add" , component: DepartmentFormComponent },
                        { path: 'update/:id' , component: DepartmentUpdateComponent}
                      ]},
                { path: 'doctor', component: DoctorsComponent, children: [
                        { path: 'doctor-list', component: DoctorListComponent },
                        { path: 'doctor-form', component: DoctorFormComponent },
                        { path: 'doctor-form/:id', component: DoctorFormComponent },
                        { path: 'doctor-update/:id', component: UpdateDoctorComponent },

                        { path: '', redirectTo: 'doctor-list', pathMatch: 'full' }
                      ]},
                      { path: 'blog-management', component: BlogManagementComponent },
                      { path: 'blog/:id', component: SingleBlogComponent },
                      { path: 'blog-management/form', component: CreateComponent },
                      { path: 'blog/edit/:id', component: EditComponent },
                      { path: 'appointment' , component: AppointmentsComponent},
                      { path: 'earnings', component: EarningsComponent },
                     
        ]},
        { path: 'login' , component: LoginComponent },
        {path:'adminlogin',component:AdminLoginComponent},



        {path:'eslam',component:AvailableDateComponent}, // logged in doctor update his Available date with his own api 
        



 ];

