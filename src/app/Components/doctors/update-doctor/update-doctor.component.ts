import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../../../services/doctor/add-doctor/doctor.service';
import { Doctor } from '../../../models/doctor.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-doctor',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './update-doctor.component.html',
  styleUrl: './update-doctor.component.css'
})
export class UpdateDoctorComponent implements OnInit {
  updateDoctorForm: FormGroup;
  doctorId: string;
  doctor: Doctor | undefined;

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.updateDoctorForm = this.formBuilder.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      specialization: ['', Validators.required],
      gender: ['', Validators.required],
      availableDates: this.formBuilder.array([])
    });
    this.doctorId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    // this.getDoctorById();
  }

  // getDoctorById(): void {
  //   if (this.doctorId) {
  //     this.doctorService.getDoctorById(this.doctorId).subscribe((doctor) => {
  //       this.doctor = doctor;
  //       this.updateDoctorForm.patchValue({
  //         name: doctor.name,
  //         department: doctor.department._id,
  //         specialization: doctor.specialization,
  //         gender: doctor.gender,
  //         availableDates: doctor.availableDates // You can handle this differently based on your form structure
  //       });
  //     });
  //   }
  // }

  onSubmit(): void {
    if (this.updateDoctorForm.valid) {
      this.doctorService.updateDoctor(this.doctorId, this.updateDoctorForm.value).subscribe(() => {
        this.router.navigate(['/doctors']); // Redirect back to doctor list after successful update
      });
    }
  }
}