import { Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { PatientsComponent } from './Components/patients/patients.component';
import { DoctorsComponent } from './Components/doctors/doctors.component';
import { AppointmentsComponent } from './Components/appointments/appointments.component';
import { SettingsComponent } from './Components/settings/settings.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'patients', component: PatientsComponent },
    { path: 'doctors', component: DoctorsComponent },
    { path: 'appointments', component: AppointmentsComponent },
    { path: 'settings', component: SettingsComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
