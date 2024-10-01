import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DepartmentService } from '../../../../services/department/department.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-department-update',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './department-update.component.html',
  styleUrl: './department-update.component.css'
})
export class DepartmentUpdateComponent {
  departmentForm: FormGroup;
  selectedDoctors: any[] = []; // Array to store selected doctors
  doctors: any[] = []; // Array to store fetched doctors
  message: string = ""
  departmentId : any
  department: any

  constructor(private router: Router ,private route:ActivatedRoute ,private fb: FormBuilder, private departmentService: DepartmentService) {
    this.departmentForm = this.fb.group({
      departmentName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      departmentDescription: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      doctor: ['']
    });
  }

  ngOnInit(): void {
    this.getDoctors()
    this.route.paramMap.subscribe(
      {
        next : (data) => {
          let id = data.get("id")
          this.getDepartment(id)
        },error: (err) => {
          console.log("error fetch id" , err)
        }
      }
    )
  }


  getDepartment(id:any): void { 
    this.departmentService.getDapartmentById(id).subscribe(
      (res) => { 
        this.departmentId = id
        this.departmentForm.patchValue({ 
          departmentName: res.department.name,
          departmentDescription: res.department.description
        })
        this.selectedDoctors = res.department.doctors
      },
      (err) => {
        console.log(err)
      }
      
    )
  }
  
  // get all doctors
  getDoctors(): void {
    this.departmentService.getDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
      },
      error: (err) => {
        console.error('err fetch doctors:', err);
      }
    });
  }

  // add selected doctor
  addDoctor(): void {
    const selectedDoctorId = this.departmentForm.get('doctor')?.value
    if (selectedDoctorId) {
      //get doctor
      const selectedDoctor = this.doctors.find(doctor => doctor._id === selectedDoctorId);
      //check if the doc is founded in array
      let foundedDoc = this.selectedDoctors.find(doc => doc._id === selectedDoctor._id)
      //if dosen't add him
      if(!foundedDoc){ 
        this.selectedDoctors.push(selectedDoctor);
      }


      // Clear the dropdown after adding
      this.departmentForm.patchValue({ doctor: '' });
    }
  }

  // Remove a doctor by index
  removeDoctor(index: number): void {
    this.selectedDoctors.splice(index, 1);
  }

  // this for clear message
  clearMessage(messaeg: string) { 
    setTimeout(() => {
      this.message = ""
    },2000)
  }

  // handle submission
  onSubmit(): void {
    this.departmentForm.value
    if (this.departmentForm.valid) {
      const departmentData = {
        name: this.departmentForm.get('departmentName')?.value,
        description: this.departmentForm.get('departmentDescription')?.value,
        doctors: this.selectedDoctors.map(doc => doc._id) // get id in array
      };
      console.log(departmentData)

      console.log(this.departmentId)
      this.departmentService.updateDepartment(this.departmentId ,departmentData).subscribe({
        next: (response) => {
          // show success message
          this.message = response.message
          this.departmentForm.reset();
          this.selectedDoctors = [];
          // clear message
          this.clearMessage(this.message)
          setTimeout(() => { 
            this.router.navigate(["/department/list"])
          },2000)
        },
        error: (err) => {
          // show error message
          this.message = err.error.message
          
          // clear message
          this.clearMessage(this.message)
        
        }
      });
    }
  }

}
