import { Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { PatientsTableComponent } from './Components/patients/patients-table/patients-table.component';
import { PatientProfileComponent } from './Components/Pages/patient-profile/patient-profile.component';
import { BlogManagementComponent } from './Components/blog-management/blog-management.component';
import { CreateComponent } from './Components/blog-management/create/create.component';
import { EditComponent } from './Components/blog-management/edit/edit.component';
import { DoctorListComponent } from './Components/doctors/doctor-list/doctor-list.component';
import { DoctorsComponent } from './Components/doctors/doctors.component';
import { DoctorFormComponent } from './Components/doctors/doctor-form/doctor-form.component';
import { DepartmentComponent } from './Components/department/department.component';
import { DepartmentDetailsComponent } from './Components/department/department-details/department-details.component';
import { DepartmentListComponent } from './Components/department/department-list/department-list.component';
import { DepartmentFormComponent } from './Components/department/department-form/department-form.component';

export const routes: Routes = [  
        { path: '', component: DashboardComponent },
        { path: 'patients', component: PatientsTableComponent },
        { path: 'patients-profile', component: PatientProfileComponent },
        { path: 'department' , component: DepartmentComponent,children: [
                { path: "details" , component: DepartmentDetailsComponent }, 
                { path: "list" , component: DepartmentListComponent }, 
                { path: "form" , component: DepartmentFormComponent }
        ] },
        { path: 'doctor', component: DoctorsComponent, children: [
                { path: 'doctor-list', component: DoctorListComponent },
                { path: 'doctor-form', component: DoctorFormComponent },
                { path: 'doctor-form/:id', component: DoctorFormComponent },
                { path: '', redirectTo: 'doctor-list', pathMatch: 'full' }
              ]},
        { path: 'blog-management', component: BlogManagementComponent },
        { path: 'blog/create', component: CreateComponent },
        { path: 'blog/edit/:id', component: EditComponent },
 ];

