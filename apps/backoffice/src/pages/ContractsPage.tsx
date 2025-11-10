import { useState, useEffect } from 'react';
import { Container, Title, Card, Text, Table, Badge } from '@mantine/core';
import { Contract } from 'shared';

// Mock data
const mockContracts: Contract[] = [
  {
    id: '1',
    title: 'Electricity Provider',
    description: 'Electricity supply contract',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    provider: 'Energy Corp',
    category: 'Utilities'
  },
  {
    id: '2',
    title: 'Building Insurance',
    description: 'Annual insurance for the building',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    provider: 'Insurance Ltd',
    category: 'Insurance'
  },
  {
    id: '3',
    title: 'Maintenance Company',
    description: 'Regular maintenance services',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    provider: 'Maintenance Bros',
    category: 'Maintenance'
  }
];

export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setContracts(mockContracts);
      setIsLoading(false);
    }, 800);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getContractStatus = (startDate: string, endDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) {
      return { status: 'Upcoming', color: 'blue' };
    } else if (now > end) {
      return { status: 'Expired', color: 'red' };
    } else {
      return { status: 'Active', color: 'green' };
    }
  };

  return (
    <Container size="lg">
      <Title order={2} mb="lg">Contracts</Title>

      <Card withBorder shadow="sm" p="md" radius="md">
        {isLoading ? (
          <Text>Loading contracts...</Text>
        ) : contracts.length === 0 ? (
          <Text c="dimmed">No contracts found.</Text>
        ) : (
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Title</Table.Th>
                <Table.Th>Provider</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th>Period</Table.Th>
                <Table.Th>Status</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {contracts.map((contract) => {
                const { status, color } = getContractStatus(contract.startDate, contract.endDate);
                return (
                  <Table.Tr key={contract.id}>
                    <Table.Td>{contract.title}</Table.Td>
                    <Table.Td>{contract.provider}</Table.Td>
                    <Table.Td>{contract.category}</Table.Td>
                    <Table.Td>
                      {formatDate(contract.startDate)} - {formatDate(contract.endDate)}
                    </Table.Td>
                    <Table.Td>
                      <Badge color={color}>{status}</Badge>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        )}
      </Card>
    </Container>
  );
}