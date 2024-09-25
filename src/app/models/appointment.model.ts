// src/app/models/appointment.model.ts

export interface Appointment {
    _id?: string; // Optional, for the case of new appointments
    doctorID: { _id: string; name: string; specialization: string };
    patientID: { _id: string; name: string };
    isReportEnabled:boolean;
    department: string;
    date: Date;
    time: string;
    status: 'not completed' | 'completed' | 'cancelled';
    report?: {
      patientName: string;
      diagnosis: string;
      doctorComment: string;
      treatmentPrescription: string;
      doctorName: string;
      doctorSpecialization: string;
      department: string;
      dateOfExamination: Date;
      timeOfExamination: string;
      patientAddress: string;
      patientPhoneNumber: string;
    };
  }
  