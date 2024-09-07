import { Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { PatientsTableComponent } from './Components/patients/patients-table/patients-table.component';
import { PatientProfileComponent } from './Components/Pages/patient-profile/patient-profile.component';
import { DoctorListComponent } from './Components/doctors/doctor-list/doctor-list.component';
import { DoctorsComponent } from './Components/doctors/doctors.component';
import { DoctorFormComponent } from './Components/doctors/doctor-form/doctor-form.component';

export const routes: Routes = [

        { path: '', component: DashboardComponent },
        { path: 'patients', component: PatientsTableComponent },
        { path: 'patients-profile', component: PatientProfileComponent },
        { path: 'doctor', component: DoctorsComponent, children: [
                { path: 'doctor-list', component: DoctorListComponent },
                { path: 'doctor-form', component: DoctorFormComponent },
                { path: 'doctor-form/:id', component: DoctorFormComponent },
                { path: '', redirectTo: 'doctor-list', pathMatch: 'full' }
              ]},
 ];
