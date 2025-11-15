export interface Bill {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  contractId: string;
  status: 'pending' | 'verified' | 'rejected';
  filePath?: string;
}

export interface Contract {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  provider: string;
  category: string;
  filePath?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
}

export interface DeliveryAddress {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  country: string;
  department?: string;
  phone?: string;
  additionalInfo?: string;
}

export interface PickupPoint {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  latitude: number;
  longitude: number;
  openingHours?: string;
  phone?: string;
  distance?: number;
}
