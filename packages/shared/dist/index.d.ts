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
