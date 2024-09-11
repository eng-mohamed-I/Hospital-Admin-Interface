import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Toastify from 'toastify-js';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';
import 'toastify-js/src/toastify.css'; // تأكد من استيراد CSS

interface Appointment {
  id: number;
  patientName: string;
  doctorName: string;
  time: string; // الوقت بصيغة 12 ساعة
  period: string; // AM أو PM
  status: string;
  day: string;
  date: string;
}

@Component({
  selector: 'app-daily-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './daily-appointments.component.html',
  styleUrls: ['./daily-appointments.component.css']
})
export class DailyAppointmentsComponent implements OnInit {
  appointments: Appointment[] = [
    { id: 1, patientName: 'John Doe', doctorName: 'Dr. Smith', time: '10:00', period: 'AM', status: 'Confirmed', day: 'Monday', date: '2024-09-09' },
    { id: 2, patientName: 'John Doe', doctorName: 'Dr. Smith', time: '10:00', period: 'AM', status: 'Confirmed', day: 'Monday', date: '2024-09-09' },
    { id: 3, patientName: 'John Doe', doctorName: 'Dr. Smith', time: '10:00', period: 'AM', status: 'Confirmed', day: 'Monday', date: '2024-09-09' },
    { id: 4, patientName: 'John Doe', doctorName: 'Dr. Smith', time: '10:00', period: 'AM', status: 'Confirmed', day: 'Monday', date: '2024-09-09' },
    { id: 11, patientName: 'John Doe', doctorName: 'Dr. Smith', time: '10:00', period: 'AM', status: 'Confirmed', day: 'Monday', date: '2024-09-09' },
    { id: 23, patientName: 'John Doe', doctorName: 'Dr. Smith', time: '10:00', period: 'AM', status: 'Confirmed', day: 'Monday', date: '2024-09-09' },
    { id: 34, patientName: 'John Doe', doctorName: 'Dr. Smith', time: '10:00', period: 'AM', status: 'Confirmed', day: 'Monday', date: '2024-09-09' },
    { id: 45, patientName: 'John Doe', doctorName: 'Dr. Smith', time: '10:00', period: 'AM', status: 'Confirmed', day: 'Monday', date: '2024-09-09' },
    { id: 55, patientName: 'John Doe', doctorName: 'Dr. Smith', time: '10:00', period: 'AM', status: 'Confirmed', day: 'Monday', date: '2024-09-09' },
  ];

  newAppointment: Appointment = {
    id: 0,
    patientName: '',
    doctorName: '',
    time: '',
    period: 'AM', 
    status: 'Pending',
    day: 'Monday',
    date: ''
  };

  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  isEditMode = false;
  currentEditIndex = -1;
  formErrors = {
    patientName: '',
    doctorName: '',
    time: '',
    period: '',
    day: '',
    date: ''
  };

  searchTerm: string = '';
  currentPage = 1;

  constructor() {}

  ngOnInit(): void {}

  get filteredAppointments() {
    return this.appointments.filter(appointment => 
      appointment.patientName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      appointment.day.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  addAppointment() {
    this.resetFormErrors();
    if (this.isFormInvalid()) {
      this.showToast("Please fill in all fields correctly.", "error");
      return;
    }

    if (this.isEditMode) {
      this.appointments[this.currentEditIndex] = { ...this.newAppointment };
      this.isEditMode = false;
      this.showToast("Appointment updated successfully", "success");
    } else {
      this.newAppointment.id = this.appointments.length + 1;
      this.appointments.push({ ...this.newAppointment });
      this.showToast("Appointment added successfully", "success");
    }

    this.resetForm();
  }

  editAppointment(appointment: Appointment, index: number) {
    this.newAppointment = { ...appointment };
    this.isEditMode = true;
    this.currentEditIndex = index;
  }

  deleteAppointment(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this appointment!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.appointments = this.appointments.filter(app => app.id !== id);
        this.showToast("Appointment deleted successfully", "error");
      }
    });
  }

  isFormInvalid(): boolean {
    const { patientName, doctorName, time, period, day, date } = this.newAppointment;
    let isInvalid = false;

    if (!patientName || !/^[A-Za-z\s]+$/.test(patientName)) {
      this.formErrors.patientName = 'Patient Name should contain letters only.';
      isInvalid = true;
    }
    if (!doctorName || !/^[A-Za-z\s]+$/.test(doctorName)) {
      this.formErrors.doctorName = 'Doctor Name should contain letters only.';
      isInvalid = true;
    }
    if (!time || !/^\d{1,2}:\d{2}$/.test(time) || !this.isValidTime(time)) {
      this.formErrors.time = 'Time should be in the format HH:MM and should be a valid time.';
      isInvalid = true;
    }
    if (!period) {
      this.formErrors.period = 'Period (AM/PM) is required.';
      isInvalid = true;
    }
    if (!day) {
      this.formErrors.day = 'Day is required.';
      isInvalid = true;
    }
    if (!date) {
      this.formErrors.date = 'Date is required.';
      isInvalid = true;
    }
    return isInvalid;
  }

  isValidTime(time: string): boolean {
    const [hours, minutes] = time.split(':').map(Number);
    return hours >= 1 && hours <= 12 && minutes >= 0 && minutes < 60;
  }

  resetFormErrors() {
    this.formErrors = {
      patientName: '',
      doctorName: '',
      time: '',
      period: '',
      day: '',
      date: ''
    };
  }

  resetForm() {
    this.newAppointment = {
      id: 0,
      patientName: '',
      doctorName: '',
      time: '',
      period: 'AM', // القيمة الافتراضية
      status: 'Pending',
      day: 'Monday',
      date: ''
    };
    this.isEditMode = false;
    this.currentEditIndex = -1;
  }

  showToast(message: string, type: "success" | "error" | "info") {
    let backgroundColor = "";

    switch (type) {
      case "success":
        backgroundColor = "linear-gradient(to right, #4caf50, #81c784)";
        break;
      case "error":
        backgroundColor = "linear-gradient(to right, #ff5f6d, #ffc371)";
        break;
      case "info":
        backgroundColor = "linear-gradient(to right, #2196f3, #21cbf3)";
        break;
    }

    Toastify({
      text: message,
      backgroundColor: backgroundColor,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true
    }).showToast();
  }
}
