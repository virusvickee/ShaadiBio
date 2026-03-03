const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

const getToken = () => localStorage.getItem('token');

const apiCall = async (endpoint: string, options: RequestOptions = {}) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API Error');
  }

  return response.json();
};

// Auth
export const authAPI = {
  register: (email: string, password: string, name: string, phone?: string) =>
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, phone })
    }),

  login: (email: string, password: string) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }),

  getMe: () => apiCall('/auth/me')
};

// Biodata
export const biodataAPI = {
  create: (data: any) =>
    apiCall('/biodatas', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  list: () => apiCall('/biodatas'),

  get: (id: string) => apiCall(`/biodatas/${id}`),

  update: (id: string, data: any) =>
    apiCall(`/biodatas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),

  delete: (id: string) =>
    apiCall(`/biodatas/${id}`, { method: 'DELETE' }),

  duplicate: (id: string) =>
    apiCall(`/biodatas/${id}/duplicate`, { method: 'POST' })
};

// Upload
export const uploadAPI = {
  uploadPhoto: (biodataId: string, file: File, cropData?: any) => {
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('biodataId', biodataId);
    if (cropData) formData.append('cropData', JSON.stringify(cropData));

    const token = getToken();
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    return fetch(`${API_URL}/upload/photo`, {
      method: 'POST',
      headers,
      body: formData
    }).then(r => r.json());
  },

  deletePhoto: (id: string) =>
    apiCall(`/upload/photo/${id}`, { method: 'DELETE' }),

  getPhotos: (biodataId: string) =>
    apiCall(`/upload/photos/${biodataId}`)
};

// PDF
export const pdfAPI = {
  generate: (biodataId: string, htmlContent: string, hasWatermark: boolean = true) =>
    apiCall('/pdf', {
      method: 'POST',
      body: JSON.stringify({ biodataId, htmlContent, hasWatermark })
    }),

  list: (biodataId: string) => apiCall(`/pdf/${biodataId}`),

  download: (biodataId: string, pdfId: string) =>
    `${API_URL}/pdf/${biodataId}/${pdfId}/download?token=${getToken()}`
};

// Payments
export const paymentAPI = {
  createOrder: (planType: 'PREMIUM' | 'CUSTOM') =>
    apiCall('/payments/create-order', {
      method: 'POST',
      body: JSON.stringify({ planType })
    }),

  verify: (paymentId: string, orderId: string, signature: string) =>
    apiCall('/payments/verify', {
      method: 'POST',
      body: JSON.stringify({ paymentId, orderId, signature })
    }),

  history: () => apiCall('/payments/history')
};
