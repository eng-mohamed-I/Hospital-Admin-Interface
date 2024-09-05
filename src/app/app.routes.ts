import { Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { PatientsTableComponent } from './Components/patients/patients-table/patients-table.component';
import { PatientProfileComponent } from './Components/Pages/patient-profile/patient-profile.component';

export const routes: Routes = [

  
        { path: '', component: DashboardComponent },
        { path: 'patients', component: PatientsTableComponent },
        { path: 'patients-profile', component: PatientProfileComponent },
        // Add other routesPatientProfileComponent
 ];
