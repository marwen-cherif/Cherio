import { api } from './api';

/**
 * Utility for making API calls with error handling and type safety
 */
export const apiUtils = {
  /**
   * Generic function to handle API responses
   */
  async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      // Try to get error message from response
      try {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error ${response.status}`);
      } catch (e) {
        throw new Error(`HTTP error ${response.status}`);
      }
    }
    
    return response.json();
  },
  
  /**
   * Bills API utilities with error handling
   */
  bills: {
    async getAll() {
      try {
        const response = await api.bills.getAll();
        return apiUtils.handleResponse<{ bills: any[] }>(response);
      } catch (error) {
        console.error('Error fetching bills:', error);
        throw error;
      }
    },
    
    async getById(id: string) {
      try {
        const response = await api.bills.getById(id);
        return apiUtils.handleResponse<{ bill: any }>(response);
      } catch (error) {
        console.error(`Error fetching bill ${id}:`, error);
        throw error;
      }
    },
    
    async create(data: any) {
      try {
        const response = await api.bills.create(data);
        return apiUtils.handleResponse<{ bill: any }>(response);
      } catch (error) {
        console.error('Error creating bill:', error);
        throw error;
      }
    },
    
    async update(id: string, data: any) {
      try {
        const response = await api.bills.update(id, data);
        return apiUtils.handleResponse<{ bill: any }>(response);
      } catch (error) {
        console.error(`Error updating bill ${id}:`, error);
        throw error;
      }
    },
    
    async delete(id: string) {
      try {
        const response = await api.bills.delete(id);
        return apiUtils.handleResponse<{ message: string }>(response);
      } catch (error) {
        console.error(`Error deleting bill ${id}:`, error);
        throw error;
      }
    },
    
    async uploadFile(id: string, file: File) {
      try {
        const response = await api.bills.uploadFile(id, file);
        return apiUtils.handleResponse<{ message: string; bill: any }>(response);
      } catch (error) {
        console.error(`Error uploading file for bill ${id}:`, error);
        throw error;
      }
    }
  },
  
  /**
   * Contracts API utilities with error handling
   */
  contracts: {
    async getAll() {
      try {
        const response = await api.contracts.getAll();
        return apiUtils.handleResponse<{ contracts: any[] }>(response);
      } catch (error) {
        console.error('Error fetching contracts:', error);
        throw error;
      }
    },
    
    async getById(id: string) {
      try {
        const response = await api.contracts.getById(id);
        return apiUtils.handleResponse<{ contract: any }>(response);
      } catch (error) {
        console.error(`Error fetching contract ${id}:`, error);
        throw error;
      }
    },
    
    async create(data: any) {
      try {
        const response = await api.contracts.create(data);
        return apiUtils.handleResponse<{ contract: any }>(response);
      } catch (error) {
        console.error('Error creating contract:', error);
        throw error;
      }
    },
    
    async update(id: string, data: any) {
      try {
        const response = await api.contracts.update(id, data);
        return apiUtils.handleResponse<{ contract: any }>(response);
      } catch (error) {
        console.error(`Error updating contract ${id}:`, error);
        throw error;
      }
    },
    
    async delete(id: string) {
      try {
        const response = await api.contracts.delete(id);
        return apiUtils.handleResponse<{ message: string }>(response);
      } catch (error) {
        console.error(`Error deleting contract ${id}:`, error);
        throw error;
      }
    },
    
    async uploadFile(id: string, file: File) {
      try {
        const response = await api.contracts.uploadFile(id, file);
        return apiUtils.handleResponse<{ message: string; contract: any }>(response);
      } catch (error) {
        console.error(`Error uploading file for contract ${id}:`, error);
        throw error;
      }
    }
  },
  
  /**
   * Auth API utilities with error handling
   */
  auth: {
    async login(email: string, password: string) {
      try {
        const response = await api.auth.login(email, password);
        return apiUtils.handleResponse<{ tokens: any; user: any }>(response);
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    
    async register(email: string, password: string, firstName?: string, lastName?: string) {
      try {
        const response = await api.auth.register(email, password, firstName, lastName);
        return apiUtils.handleResponse<{ tokens: any; user: any }>(response);
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    },
    
    async getProfile() {
      try {
        const response = await api.auth.getProfile();
        return apiUtils.handleResponse<{ user: any }>(response);
      } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }
    },
    
    async logout(refreshToken: string) {
      try {
        const response = await api.auth.logout(refreshToken);
        return apiUtils.handleResponse<{ message: string }>(response);
      } catch (error) {
        console.error('Logout error:', error);
        throw error;
      }
    }
  }
};