export interface Doctor {
    id: number;
    name: string;
    department: string;
    specialist: string;
    gender: string;
    availableAppointments: { date: string, time: string }[]; 
}