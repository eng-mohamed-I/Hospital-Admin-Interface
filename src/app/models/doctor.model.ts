export interface Department {
    _id: any;
    name: string;
    id: number;
  }
  
  export interface AvailableAppointment {
    date: string;
    time: string;
  }
  export interface ContactInfo {
    email: string;
    phone: string;
  }
  export interface Doctor {
    _id?: string; // Optional for cases when the ID is not available (e.g., before saving)
    name: string;
    department: Department; // Assuming this is a reference ID to a Department
    specialization: string;
    availableDates:[]
    gender: 'Male' | 'Female';
    userName: string;
    nationalID: string;
    contactInfo: ContactInfo;
    dateOfBirth: Date; // Ensure this is a Date object
    experience: string;
    history: string;
    availableAppointments: {
      date: string; // Ensure this matches the format used in the form
      time: string; // Ensure this matches the format used in the form
    }[];
    image?: string; // Optional field for image URL or file path
  }
  
  