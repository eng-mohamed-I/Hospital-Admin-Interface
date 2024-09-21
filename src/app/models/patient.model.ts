export interface Patient {
    _id?: string; 
    name: string;
    email: string;
    password?: string; 
    gender: 'male' | 'female' | 'is not selected';
    isConfirmed?: boolean; 
    donations?: Donation[]; 
  }
  
  
  export interface Donation {
    donationID?: string; 
    amount: number;
    date: Date;
  }