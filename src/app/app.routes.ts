import { Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { PatientsTableComponent } from './Components/patients/patients-table/patients-table.component';
import { PatientProfileComponent } from './Components/Pages/patient-profile/patient-profile.component';
import { DepartmentComponent } from './Components/department/department.component';

export const routes: Routes = [
               
        { path: '', component: DashboardComponent },
        { path: 'patients', component: PatientsTableComponent },
        { path: 'patients-profile', component: PatientProfileComponent },
        { path: 'department' , component: DepartmentComponent }
        // Add other routesPatientProfileComponent
 ];
