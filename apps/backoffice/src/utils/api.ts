// API utility for making authenticated requests

// API URL from environment variables or default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Custom fetch function that includes authorization headers
export const fetchWithAuth = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const accessToken = localStorage.getItem('accessToken');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }
  
  const config = {
    ...options,
    headers,
  };
  
  const response = await fetch(`${API_URL}${endpoint}`, config);
  
  // Handle 401 (Unauthorized) - Token expired
  if (response.status === 401) {
    // Try to refresh the token
    const refreshed = await refreshToken();
    
    if (refreshed) {
      // Retry the request with the new token
      const newAccessToken = localStorage.getItem('accessToken');
      const newHeaders = {
        ...headers,
        'Authorization': `Bearer ${newAccessToken}`,
      };
      
      return fetch(`${API_URL}${endpoint}`, {
        ...config,
        headers: newHeaders,
      });
    }
  }
  
  return response;
};

// Function to handle token refresh
const refreshToken = async (): Promise<boolean> => {
  const refreshToken = localStorage.getItem('refreshToken');
  
  if (!refreshToken) {
    // No refresh token available, can't refresh
    clearAuthData();
    return false;
  }
  
  try {
    const response = await fetch(`${API_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });
    
    if (!response.ok) {
      throw new Error('Token refresh failed');
    }
    
    const data = await response.json();
    const { tokens } = data;
    
    // Save new tokens
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    
    return true;
  } catch (error) {
    console.error('Token refresh error:', error);
    clearAuthData();
    return false;
  }
};

// Clear authentication data
const clearAuthData = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  
  // Redirect to login page if needed
  if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
    window.location.href = '/login';
  }
};

// API endpoints
export const api = {
  // Auth endpoints
  auth: {
    login: (email: string, password: string) => 
      fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      }),
    
    register: (email: string, password: string, firstName?: string, lastName?: string) => 
      fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, firstName, lastName }),
      }),
    
    logout: (refreshToken: string) => 
      fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      }),
    
    refreshToken: (refreshToken: string) => 
      fetch(`${API_URL}/auth/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      }),
    
    getProfile: () => fetchWithAuth('/auth/profile'),
  },
  
  // Bills endpoints
  bills: {
    getAll: () => fetchWithAuth('/bills'),
    getById: (id: string) => fetchWithAuth(`/bills/${id}`),
    create: (data: any) => fetchWithAuth('/bills', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id: string, data: any) => fetchWithAuth(`/bills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (id: string) => fetchWithAuth(`/bills/${id}`, {
      method: 'DELETE',
    }),
    uploadFile: (id: string, file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      
      // Get the access token
      const accessToken = localStorage.getItem('accessToken');
      
      // For FormData, we need to exclude the Content-Type header
      // so that the browser can set it with the boundary parameter
      return fetch(`${API_URL}/bills/${id}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      });
    },
    downloadFile: (id: string) => fetchWithAuth(`/bills/${id}/download`, {
      method: 'GET',
    }),
    getFileUrl: (id: string) => {
      const accessToken = localStorage.getItem('accessToken');
      return `${API_URL}/bills/${id}/download?token=${accessToken}`;
    },
  },
  
  // Contracts endpoints
  contracts: {
    getAll: () => fetchWithAuth('/contracts'),
    getById: (id: string) => fetchWithAuth(`/contracts/${id}`),
    create: (data: any) => fetchWithAuth('/contracts', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id: string, data: any) => fetchWithAuth(`/contracts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (id: string) => fetchWithAuth(`/contracts/${id}`, {
      method: 'DELETE',
    }),
    uploadFile: (id: string, file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      
      // Get the access token
      const accessToken = localStorage.getItem('accessToken');
      
      // For FormData, we need to exclude the Content-Type header
      // so that the browser can set it with the boundary parameter
      return fetch(`${API_URL}/contracts/${id}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      });
    },
    downloadFile: (id: string) => fetchWithAuth(`/contracts/${id}/download`, {
      method: 'GET',
    }),
    getFileUrl: (id: string) => {
      const accessToken = localStorage.getItem('accessToken');
      return `${API_URL}/contracts/${id}/download?token=${accessToken}`;
    },
  },
};