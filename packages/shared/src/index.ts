// Shared types for both frontend and backend

export interface Bill {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  contractId: string;
  status: 'pending' | 'verified' | 'rejected';
  filePath?: string; // Path to the uploaded bill file
}

export interface Contract {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  provider: string;
  category: string;
  filePath?: string; // Path to the uploaded contract file
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
}