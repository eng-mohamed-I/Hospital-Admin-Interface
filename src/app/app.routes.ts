import { Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { PatientsTableComponent } from './Components/patients/patients-table/patients-table.component';
import { PatientProfileComponent } from './Components/Pages/patient-profile/patient-profile.component';
import { BlogManagementComponent } from './Components/blog-management/blog-management.component';
import { CreateComponent } from './Components/blog-management/create/create.component';
export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'patients', component: PatientsTableComponent },
  { path: 'patients-profile', component: PatientProfileComponent },
  { path: 'blog-management', component: BlogManagementComponent },
  { path: 'blog/create', component: CreateComponent },
  // Add other routesPatientProfileComponent
];
