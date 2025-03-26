"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.json({ message: 'SyndicCheck API is running' });
});
// Mock data using shared types
const mockBills = [
    {
        id: '1',
        title: 'Electricity Bill',
        amount: 500,
        date: '2025-03-15',
        category: 'Utilities',
        contractId: '1',
        status: 'pending'
    }
];
const mockContracts = [
    {
        id: '1',
        title: 'Electricity Provider',
        description: 'Electricity supply contract',
        startDate: '2025-01-01',
        endDate: '2025-12-31',
        provider: 'Energy Corp',
        category: 'Utilities'
    }
];
// Routes for bills verification
app.get('/api/bills', (req, res) => {
    res.json(mockBills);
});
app.get('/api/contracts', (req, res) => {
    res.json(mockContracts);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
