import { useState, useEffect } from 'react';
import { Container, Title, Card, Text, Badge, Table } from '@mantine/core';
import { Bill } from 'shared';

// Mock data
const mockBills: Bill[] = [
  {
    id: '1',
    title: 'Electricity Bill',
    amount: 500,
    date: '2025-03-15',
    category: 'Utilities',
    contractId: '1',
    status: 'pending'
  },
  {
    id: '2',
    title: 'Building Insurance',
    amount: 1200,
    date: '2025-03-10',
    category: 'Insurance',
    contractId: '2',
    status: 'verified'
  },
  {
    id: '3',
    title: 'Maintenance',
    amount: 800,
    date: '2025-03-05',
    category: 'Maintenance',
    contractId: '3',
    status: 'rejected'
  }
];

export default function BillsPage() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBills(mockBills);
      setIsLoading(false);
    }, 800);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'green';
      case 'pending':
        return 'yellow';
      case 'rejected':
        return 'red';
      default:
        return 'gray';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Container size="lg">
      <Title order={2} mb="lg">Bills</Title>

      <Card withBorder shadow="sm" p="md" radius="md">
        {isLoading ? (
          <Text>Loading bills...</Text>
        ) : bills.length === 0 ? (
          <Text c="dimmed">No bills found.</Text>
        ) : (
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Title</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th>Date</Table.Th>
                <Table.Th>Status</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {bills.map((bill) => (
                <Table.Tr key={bill.id}>
                  <Table.Td>{bill.title}</Table.Td>
                  <Table.Td>${bill.amount.toFixed(2)}</Table.Td>
                  <Table.Td>{bill.category}</Table.Td>
                  <Table.Td>{formatDate(bill.date)}</Table.Td>
                  <Table.Td>
                    <Badge color={getStatusColor(bill.status)}>
                      {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                    </Badge>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </Card>
    </Container>
  );
}