import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { NavbarComponent } from '../../Components/navbar/navbar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent,NavbarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
 
  menuItems = [
    { title: 'Dashboard', icon: 'home-outline', link: '/dashboard' },
    { title: 'Patients', icon: 'person-outline', link: '/patients' },
    { title: 'Doctors', icon: 'person-outline', link: '/doctors' },
    { title: 'Appointments', icon: 'calendar-outline', link: '/appointments' },
    { title: 'Settings', icon: 'settings-outline', link: '/settings' }
  ];
  
}
