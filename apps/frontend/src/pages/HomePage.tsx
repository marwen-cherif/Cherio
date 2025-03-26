import { useState } from 'react';
import { 
  Container, 
  Title, 
  Tabs, 
  rem, 
  Card, 
  Text, 
  FileInput, 
  Button, 
  Stack, 
  Select, 
  Grid, 
  TextInput, 
  NumberInput,
  Notification
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Bill, Contract } from 'shared';
import { IconUpload, IconFileInvoice, IconFileDescription, IconCheck, IconX } from '@tabler/icons-react';

// Mock function to simulate API calls
const mockApiCall = (data: any): Promise<any> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      console.log('API call with data:', data);
      resolve({ success: true, data });
    }, 1000);
  });
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<string | null>('upload');
  const [billFile, setBillFile] = useState<File | null>(null);
  const [contractFile, setContractFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [notification, setNotification] = useState<{ show: boolean, message: string, type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });

  const billForm = useForm({
    initialValues: {
      title: '',
      amount: 0,
      category: '',
      contractId: '',
      date: new Date().toISOString().split('T')[0]
    },
    validate: {
      title: (value) => (value.length < 3 ? 'Title must be at least 3 characters' : null),
      amount: (value) => (value <= 0 ? 'Amount must be greater than 0' : null),
      category: (value) => (!value ? 'Category is required' : null),
      contractId: (value) => (!value ? 'Contract ID is required' : null),
    }
  });

  const contractForm = useForm({
    initialValues: {
      title: '',
      description: '',
      provider: '',
      category: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
    },
    validate: {
      title: (value) => (value.length < 3 ? 'Title must be at least 3 characters' : null),
      provider: (value) => (!value ? 'Provider is required' : null),
      category: (value) => (!value ? 'Category is required' : null),
    }
  });

  const handleBillUpload = async (values: any) => {
    setUploadStatus('loading');
    try {
      // Create bill object
      const bill: Omit<Bill, 'id' | 'status'> = {
        title: values.title,
        amount: values.amount,
        date: values.date,
        category: values.category,
        contractId: values.contractId,
      };

      // Add file to form data if available
      const formData = new FormData();
      formData.append('bill', JSON.stringify(bill));
      if (billFile) {
        formData.append('file', billFile);
      }

      // Mock API call
      await mockApiCall(formData);
      
      setUploadStatus('success');
      setNotification({
        show: true,
        message: 'Bill uploaded successfully!',
        type: 'success'
      });
      
      // Reset form
      billForm.reset();
      setBillFile(null);
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 3000);
    } catch (error) {
      setUploadStatus('error');
      setNotification({
        show: true,
        message: 'Failed to upload bill. Please try again.',
        type: 'error'
      });
    }
  };

  const handleContractUpload = async (values: any) => {
    setUploadStatus('loading');
    try {
      // Create contract object
      const contract: Omit<Contract, 'id'> = {
        title: values.title,
        description: values.description,
        startDate: values.startDate,
        endDate: values.endDate,
        provider: values.provider,
        category: values.category,
      };

      // Add file to form data if available
      const formData = new FormData();
      formData.append('contract', JSON.stringify(contract));
      if (contractFile) {
        formData.append('file', contractFile);
      }

      // Mock API call
      await mockApiCall(formData);
      
      setUploadStatus('success');
      setNotification({
        show: true,
        message: 'Contract uploaded successfully!',
        type: 'success'
      });
      
      // Reset form
      contractForm.reset();
      setContractFile(null);
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 3000);
    } catch (error) {
      setUploadStatus('error');
      setNotification({
        show: true,
        message: 'Failed to upload contract. Please try again.',
        type: 'error'
      });
    }
  };

  return (
    <Container size="lg">
      <Title order={2} mb="lg">Dashboard</Title>
      
      {notification.show && (
        <Notification
          icon={notification.type === 'success' ? <IconCheck size="1.1rem" /> : <IconX size="1.1rem" />}
          color={notification.type === 'success' ? 'teal' : 'red'}
          title={notification.type === 'success' ? 'Success' : 'Error'}
          onClose={() => setNotification(prev => ({ ...prev, show: false }))}
          mb="md"
        >
          {notification.message}
        </Notification>
      )}
      
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab
            value="upload"
            leftSection={<IconUpload style={{ width: rem(16), height: rem(16) }} />}
          >
            Upload
          </Tabs.Tab>
          <Tabs.Tab
            value="recent"
            leftSection={<IconFileInvoice style={{ width: rem(16), height: rem(16) }} />}
          >
            Recent Bills
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="upload" pt="md">
          <Tabs defaultValue="bill">
            <Tabs.List>
              <Tabs.Tab 
                value="bill"
                leftSection={<IconFileInvoice style={{ width: rem(16), height: rem(16) }} />}
              >
                Upload Bill
              </Tabs.Tab>
              <Tabs.Tab
                value="contract"
                leftSection={<IconFileDescription style={{ width: rem(16), height: rem(16) }} />}
              >
                Upload Contract
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="bill" pt="md">
              <Card withBorder shadow="sm" p="md" radius="md">
                <form onSubmit={billForm.onSubmit(handleBillUpload)}>
                  <Stack>
                    <Grid>
                      <Grid.Col span={6}>
                        <TextInput
                          required
                          label="Bill Title"
                          placeholder="e.g. Electricity Bill March 2025"
                          {...billForm.getInputProps('title')}
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <NumberInput
                          required
                          label="Amount"
                          placeholder="Enter amount"
                          min={0}
                          {...billForm.getInputProps('amount')}
                        />
                      </Grid.Col>
                    </Grid>
                    
                    <Grid>
                      <Grid.Col span={6}>
                        <Select
                          required
                          label="Category"
                          placeholder="Select category"
                          data={[
                            { value: 'Utilities', label: 'Utilities' },
                            { value: 'Maintenance', label: 'Maintenance' },
                            { value: 'Insurance', label: 'Insurance' },
                            { value: 'Other', label: 'Other' },
                          ]}
                          {...billForm.getInputProps('category')}
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <TextInput
                          required
                          label="Date"
                          type="date"
                          {...billForm.getInputProps('date')}
                        />
                      </Grid.Col>
                    </Grid>
                    
                    <Select
                      required
                      label="Related Contract"
                      placeholder="Select contract"
                      data={[
                        { value: '1', label: 'Electricity Provider' },
                        { value: '2', label: 'Building Insurance' },
                        { value: '3', label: 'Maintenance Company' },
                      ]}
                      {...billForm.getInputProps('contractId')}
                    />
                    
                    <FileInput
                      label="Upload Bill Document (PDF)"
                      placeholder="Click to upload or drop file"
                      accept="application/pdf"
                      value={billFile}
                      onChange={setBillFile}
                    />
                    
                    <Button 
                      type="submit" 
                      loading={uploadStatus === 'loading'}
                      disabled={uploadStatus === 'loading'}
                    >
                      Upload Bill
                    </Button>
                  </Stack>
                </form>
              </Card>
            </Tabs.Panel>

            <Tabs.Panel value="contract" pt="md">
              <Card withBorder shadow="sm" p="md" radius="md">
                <form onSubmit={contractForm.onSubmit(handleContractUpload)}>
                  <Stack>
                    <TextInput
                      required
                      label="Contract Title"
                      placeholder="e.g. Electricity Supply Contract"
                      {...contractForm.getInputProps('title')}
                    />
                    
                    <TextInput
                      label="Description"
                      placeholder="Contract description"
                      {...contractForm.getInputProps('description')}
                    />
                    
                    <Grid>
                      <Grid.Col span={6}>
                        <TextInput
                          required
                          label="Provider"
                          placeholder="Service provider"
                          {...contractForm.getInputProps('provider')}
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <Select
                          required
                          label="Category"
                          placeholder="Select category"
                          data={[
                            { value: 'Utilities', label: 'Utilities' },
                            { value: 'Maintenance', label: 'Maintenance' },
                            { value: 'Insurance', label: 'Insurance' },
                            { value: 'Other', label: 'Other' },
                          ]}
                          {...contractForm.getInputProps('category')}
                        />
                      </Grid.Col>
                    </Grid>
                    
                    <Grid>
                      <Grid.Col span={6}>
                        <TextInput
                          required
                          label="Start Date"
                          type="date"
                          {...contractForm.getInputProps('startDate')}
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <TextInput
                          required
                          label="End Date"
                          type="date"
                          {...contractForm.getInputProps('endDate')}
                        />
                      </Grid.Col>
                    </Grid>
                    
                    <FileInput
                      label="Upload Contract Document (PDF)"
                      placeholder="Click to upload or drop file"
                      accept="application/pdf"
                      value={contractFile}
                      onChange={setContractFile}
                    />
                    
                    <Button 
                      type="submit" 
                      loading={uploadStatus === 'loading'}
                      disabled={uploadStatus === 'loading'}
                    >
                      Upload Contract
                    </Button>
                  </Stack>
                </form>
              </Card>
            </Tabs.Panel>
          </Tabs>
        </Tabs.Panel>

        <Tabs.Panel value="recent" pt="md">
          <Card withBorder shadow="sm" p="md" radius="md">
            <Text fw={500} mb="md">Recent Uploads</Text>
            <Text c="dimmed">No recent uploads found.</Text>
          </Card>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}