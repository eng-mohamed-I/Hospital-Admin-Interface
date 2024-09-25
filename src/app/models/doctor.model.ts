interface Department {
    _id: string;
    name: string;
  }
  
  export interface AvailableDate {
    _id?: string;
    date: string;     // ISO string or any date format you expect
    fromTime: string; // HH:mm format
    toTime: string;   // HH:mm format
  }

export interface Doctor {
    _id:string;
    name: string;
    specialization: string;
    userName: string;
    Image: {
        secure_url: string;
        public_id: string;
    };
    nationalID: string;
    department: Department; // ID of the department
    availableDates: AvailableDate[];
    phone: string;
    price: Number,
    email: string;
    password: string;
    gender: 'male' | 'female' | 'other';
    dateOfBirth: Date;
    experience: number;
    history?: string;
    statistics?: { [key: string]: number };
    appointments?: {
        appointID: string;
        patientID: string;
        date: Date;
        time: string;
        report?: string;
    }[];
    availableAppointments?: Date[]; // <-- Add this line if it makes sense
}
