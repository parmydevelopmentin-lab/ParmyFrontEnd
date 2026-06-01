import axios, { AxiosResponse, AxiosError } from 'axios';
import {
  ApiResponse,
  AuthResponse,
  RegisterRequest,
  LoginRequest,
  OTPRequest,
  // GoogleAuthRequest, // TODO: Uncomment when Google OAuth is configured
  ForgotPasswordRequest,
  VerifyResetCodeRequest,
  ResetPasswordRequest,
  InvoiceRequest,
  InvoiceResponse,
  InvoiceStats,
  ExpenseRequest,
  ExpenseResponse,
  ExpenseAnalyticsResponse,
  ExpenseCategory,
  OfferRequest,
  OfferResponse,
  OfferStatus,
  ErrorResponse
} from '../types/api';
import type { ProjectRequest, ProjectResponse, PurchaseResponse } from '../types/api';

// Configure API base URL from Vite env var with a safe fallback for local development
const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8080';

// Configure axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  // Remove global Content-Type so axios can set it per request (JSON vs multipart)
  withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh and errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Error class
export class ApiError extends Error {
  public status: number;
  public data: any;

  constructor(message: string, status: number, data: any) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}

// Generic error handler - accept unknown so callers don't need to cast
const handleApiError = (error: unknown): never => {
  const axiosError = error as AxiosError<ErrorResponse>;
  const message = axiosError?.response?.data?.message || axiosError?.message || 'An unexpected error occurred';
  const status = axiosError?.response?.status || 500;
  const data = axiosError?.response?.data?.data || null;

  throw new ApiError(message, status, data);
};

// Contact form interface
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  location?: string;
  message: string;
}

// Auth API functions
export const authApi = {
  // Register with email and password
  register: async (request: RegisterRequest): Promise<ApiResponse<string>> => {
    try {
      const response: AxiosResponse<ApiResponse<string>> = await api.post('/api/auth/register', request);
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  },

  // Login with email and password
  login: async (request: LoginRequest): Promise<ApiResponse<string>> => {
    try {
      const response: AxiosResponse<ApiResponse<string>> = await api.post('/api/auth/login', request);
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  },

  // TODO: Uncomment when Google OAuth is configured
  // Register with Google OAuth
  // registerWithGoogle: async (request: GoogleAuthRequest): Promise<ApiResponse<string>> => {
  //   try {
  //     const response: AxiosResponse<ApiResponse<string>> = await api.post('/api/auth/google/register', request);
  //     return response.data;
  //   } catch (error) {
  //     return handleApiError(error as AxiosError<ErrorResponse>);
  //   }
  // },

  // TODO: Uncomment when Google OAuth is configured
  // Login with Google OAuth
  // loginWithGoogle: async (request: GoogleAuthRequest): Promise<ApiResponse<string>> => {
  //   try {
  //     const response: AxiosResponse<ApiResponse<string>> = await api.post('/api/auth/google/login', request);
  //     return response.data;
  //   } catch (error) {
  //     return handleApiError(error as AxiosError<ErrorResponse>);
  //   }
  // },

  // Verify OTP
  verifyOTP: async (request: OTPRequest): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response: AxiosResponse<ApiResponse<AuthResponse>> = await api.post('/api/otp/verify', request);
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  },

  // Get OTP status
  getOTPStatus: async (email: string): Promise<ApiResponse<{ hasOTP: boolean; remainingTimeMinutes: number }>> => {
    try {
      const response = await api.get(`/api/otp/status/${encodeURIComponent(email)}`);
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  },

  // Health check
  healthCheck: async (): Promise<ApiResponse<string>> => {
    try {
      const response: AxiosResponse<ApiResponse<string>> = await api.get('/api/auth/health');
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  },

  // Send password reset code
  sendPasswordResetCode: async (request: ForgotPasswordRequest): Promise<ApiResponse<string>> => {
    try {
      const response: AxiosResponse<ApiResponse<string>> = await api.post('/api/auth/send-reset-code', request);
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  },

  // Verify password reset code
  verifyPasswordResetCode: async (request: VerifyResetCodeRequest): Promise<ApiResponse<string>> => {
    try {
      const response: AxiosResponse<ApiResponse<string>> = await api.post('/api/auth/verify-reset-code', request);
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  },

  // Reset password with verified code
  resetPassword: async (request: ResetPasswordRequest): Promise<ApiResponse<string>> => {
    try {
      const response: AxiosResponse<ApiResponse<string>> = await api.post('/api/auth/reset-password', request);
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  }
};

// Contact API functions
export const contactApi = {
  // Submit contact form
  submitContactForm: async (formData: ContactFormData): Promise<ApiResponse<string>> => {
    try {
      const response: AxiosResponse<ApiResponse<string>> = await api.post('/api/contact', formData);
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  },

  // Get available services
  getServices: async (): Promise<ApiResponse<string[]>> => {
    try {
      const response: AxiosResponse<ApiResponse<string[]>> = await api.get('/api/contact/services');
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  },

  // Get available locations
  getLocations: async (): Promise<ApiResponse<string[]>> => {
    try {
      const response: AxiosResponse<ApiResponse<string[]>> = await api.get('/api/contact/locations');
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  },

  // Health check
  healthCheck: async (): Promise<ApiResponse<string>> => {
    try {
      const response: AxiosResponse<ApiResponse<string>> = await api.get('/api/contact/health');
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  }
};

// Projects API
export const projectsApi = {
  // Public
  listPublic: async (): Promise<ApiResponse<ProjectResponse[]>> => {
    try {
      const response: AxiosResponse<ApiResponse<ProjectResponse[]>> = await api.get('/api/projects');
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  },
  getBySlug: async (slug: string): Promise<ApiResponse<ProjectResponse>> => {
    try {
      const response: AxiosResponse<ApiResponse<ProjectResponse>> = await api.get(`/api/projects/slug/${encodeURIComponent(slug)}`);
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  },
  // Admin
  adminList: async (): Promise<ApiResponse<ProjectResponse[]>> => {
    try {
      const response: AxiosResponse<ApiResponse<ProjectResponse[]>> = await api.get('/api/admin/projects');
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  },
  adminCreate: async (req: ProjectRequest): Promise<ApiResponse<ProjectResponse>> => {
    try {
      const response: AxiosResponse<ApiResponse<ProjectResponse>> = await api.post('/api/admin/projects', req);
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  },
  adminUpdate: async (id: string, req: ProjectRequest): Promise<ApiResponse<ProjectResponse>> => {
    try {
      const response: AxiosResponse<ApiResponse<ProjectResponse>> = await api.put(`/api/admin/projects/${id}`, req);
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  },
  adminDelete: async (id: string): Promise<ApiResponse<string>> => {
    try {
      const response: AxiosResponse<ApiResponse<string>> = await api.delete(`/api/admin/projects/${id}`);
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  },

  // Abstract file operations
  uploadAbstract: async (id: string, file: File): Promise<ApiResponse<string>> => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response: AxiosResponse<ApiResponse<string>> = await api.post(`/api/admin/projects/${id}/abstract`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  },

  downloadAbstract: async (id: string): Promise<Blob> => {
    try {
      const response = await api.get(`/api/projects/${id}/abstract/download`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to download abstract file');
    }
  },

  deleteAbstract: async (id: string): Promise<ApiResponse<string>> => {
    try {
      const response: AxiosResponse<ApiResponse<string>> = await api.delete(`/api/admin/projects/${id}/abstract`);
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  }
};

// Invoice API functions
export const invoiceApi = {
  // Create new invoice
  createInvoice: async (request: InvoiceRequest): Promise<ApiResponse<InvoiceResponse>> => {
    try {
      const response: AxiosResponse<ApiResponse<InvoiceResponse>> = await api.post('/api/invoices', request);
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  },

  // Get all invoices
  getAllInvoices: async (): Promise<ApiResponse<InvoiceResponse[]>> => {
    try {
      const response: AxiosResponse<ApiResponse<InvoiceResponse[]>> = await api.get('/api/invoices');
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  },

  // Get invoice by ID
  getInvoiceById: async (id: string): Promise<ApiResponse<InvoiceResponse>> => {
    try {
      const response: AxiosResponse<ApiResponse<InvoiceResponse>> = await api.get(`/api/invoices/${id}`);
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  },

  // Update invoice status
  updateInvoiceStatus: async (id: string, status: string): Promise<ApiResponse<InvoiceResponse>> => {
    try {
      const response: AxiosResponse<ApiResponse<InvoiceResponse>> = await api.put(`/api/invoices/${id}/status?status=${status}`);
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  },

  // Delete invoice
  deleteInvoice: async (id: string): Promise<ApiResponse<string>> => {
    try {
      const response: AxiosResponse<ApiResponse<string>> = await api.delete(`/api/invoices/${id}`);
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  },

  // Download invoice PDF
  downloadInvoicePDF: async (id: string): Promise<Blob> => {
    try {
      const response = await api.get(`/api/invoices/${id}/download`, {
        responseType: 'blob',
        headers: {
          'Accept': 'application/pdf'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Resend invoice PDF
  resendInvoicePDF: async (id: string): Promise<ApiResponse<string>> => {
    try {
      const response: AxiosResponse<ApiResponse<string>> = await api.post(`/api/invoices/${id}/resend`);
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  },

  // Filter invoices by status
  getInvoicesByStatus: async (status: string): Promise<ApiResponse<InvoiceResponse[]>> => {
    try {
      const response: AxiosResponse<ApiResponse<InvoiceResponse[]>> = await api.get(`/api/invoices/filter/status/${status}`);
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  },

  // Get overdue invoices
  getOverdueInvoices: async (): Promise<ApiResponse<InvoiceResponse[]>> => {
    try {
      const response: AxiosResponse<ApiResponse<InvoiceResponse[]>> = await api.get('/api/invoices/filter/overdue');
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  },

  // Search invoices
  searchInvoices: async (type: 'email' | 'project' | 'customer', query: string): Promise<ApiResponse<InvoiceResponse[]>> => {
    try {
      const response: AxiosResponse<ApiResponse<InvoiceResponse[]>> = await api.get(`/api/invoices/search?type=${type}&query=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  },

  // Get invoice statistics
  getInvoiceStats: async (): Promise<ApiResponse<InvoiceStats>> => {
    try {
      const response: AxiosResponse<ApiResponse<InvoiceStats>> = await api.get('/api/invoices/stats');
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  }
};

// Expense API methods
export const expenseApi = {
  // Create new expense
  createExpense: async (request: ExpenseRequest): Promise<ApiResponse<ExpenseResponse>> => {
    try {
      const response: AxiosResponse<ApiResponse<ExpenseResponse>> = await api.post('/api/expenses', request);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get all expenses
  getAllExpenses: async (): Promise<ApiResponse<ExpenseResponse[]>> => {
    try {
      const response: AxiosResponse<ApiResponse<ExpenseResponse[]>> = await api.get('/api/expenses');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get expense by ID
  getExpenseById: async (id: string): Promise<ApiResponse<ExpenseResponse>> => {
    try {
      const response: AxiosResponse<ApiResponse<ExpenseResponse>> = await api.get(`/api/expenses/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Update expense
  updateExpense: async (id: string, request: ExpenseRequest): Promise<ApiResponse<ExpenseResponse>> => {
    try {
      const response: AxiosResponse<ApiResponse<ExpenseResponse>> = await api.put(`/api/expenses/${id}`, request);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Delete expense
  deleteExpense: async (id: string): Promise<ApiResponse<string>> => {
    try {
      const response: AxiosResponse<ApiResponse<string>> = await api.delete(`/api/expenses/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Filter expenses by category
  getExpensesByCategory: async (category: ExpenseCategory): Promise<ApiResponse<ExpenseResponse[]>> => {
    try {
      const response: AxiosResponse<ApiResponse<ExpenseResponse[]>> = await api.get(`/api/expenses/filter/category/${category}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Filter expenses by date range
  getExpensesByDateRange: async (startDate: string, endDate: string): Promise<ApiResponse<ExpenseResponse[]>> => {
    try {
      const response: AxiosResponse<ApiResponse<ExpenseResponse[]>> = await api.get('/api/expenses/filter/date-range', {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Filter expenses by month
  getExpensesByMonth: async (year: number, month: number): Promise<ApiResponse<ExpenseResponse[]>> => {
    try {
      const response: AxiosResponse<ApiResponse<ExpenseResponse[]>> = await api.get(`/api/expenses/filter/month/${year}/${month}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Search expenses by title
  searchExpensesByTitle: async (title: string): Promise<ApiResponse<ExpenseResponse[]>> => {
    try {
      const response: AxiosResponse<ApiResponse<ExpenseResponse[]>> = await api.get('/api/expenses/search', {
        params: { title }
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get expense analytics
  getExpenseAnalytics: async (): Promise<ApiResponse<ExpenseAnalyticsResponse>> => {
    try {
      const response: AxiosResponse<ApiResponse<ExpenseAnalyticsResponse>> = await api.get('/api/expenses/analytics');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get expense analytics for date range
  getExpenseAnalyticsByDateRange: async (startDate: string, endDate: string): Promise<ApiResponse<ExpenseAnalyticsResponse>> => {
    try {
      const response: AxiosResponse<ApiResponse<ExpenseAnalyticsResponse>> = await api.get('/api/expenses/analytics/date-range', {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Export expenses to PDF
  exportExpensesToPdf: async (startDate?: string, endDate?: string): Promise<Blob> => {
    try {
      const params: Record<string, string> = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const response: AxiosResponse<Blob> = await api.get('/api/expenses/export/pdf', {
        params,
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get available categories
  getAvailableCategories: async (): Promise<ApiResponse<string[]>> => {
    try {
      const response: AxiosResponse<ApiResponse<string[]>> = await api.get('/api/expenses/categories');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

// Offer API methods
export const offerApi = {
  // Create a new offer
  createOffer: async (request: OfferRequest): Promise<ApiResponse<OfferResponse>> => {
    try {
      const response: AxiosResponse<ApiResponse<OfferResponse>> = await api.post('/api/offers/create', request);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Send offer to candidate
  sendOffer: async (id: string): Promise<ApiResponse<OfferResponse>> => {
    try {
      const response: AxiosResponse<ApiResponse<OfferResponse>> = await api.post(`/api/offers/${id}/send`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Resend offer to candidate
  resendOffer: async (id: string): Promise<ApiResponse<OfferResponse>> => {
    try {
      const response: AxiosResponse<ApiResponse<OfferResponse>> = await api.post(`/api/offers/${id}/resend`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get all offers
  getAllOffers: async (): Promise<ApiResponse<OfferResponse[]>> => {
    try {
      const response: AxiosResponse<ApiResponse<OfferResponse[]>> = await api.get('/api/offers/list');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get offers by status
  getOffersByStatus: async (status: OfferStatus): Promise<ApiResponse<OfferResponse[]>> => {
    try {
      const response: AxiosResponse<ApiResponse<OfferResponse[]>> = await api.get(`/api/offers/status/${status}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Search offers
  searchOffers: async (searchTerm?: string, status?: OfferStatus): Promise<ApiResponse<OfferResponse[]>> => {
    try {
      const params: Record<string, string> = {};
      if (searchTerm) params.searchTerm = searchTerm;
      if (status) params.status = status;

      const response: AxiosResponse<ApiResponse<OfferResponse[]>> = await api.get('/api/offers/search', { params });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get offers by date range
  getOffersByDateRange: async (startDate: string, endDate: string): Promise<ApiResponse<OfferResponse[]>> => {
    try {
      const response: AxiosResponse<ApiResponse<OfferResponse[]>> = await api.get('/api/offers/date-range', {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Update offer status
  updateOfferStatus: async (id: string, status: OfferStatus): Promise<ApiResponse<OfferResponse>> => {
    try {
      const response: AxiosResponse<ApiResponse<OfferResponse>> = await api.put(`/api/offers/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Download offer PDF
  downloadOffer: async (id: string): Promise<Blob> => {
    try {
      const response: AxiosResponse<Blob> = await api.get(`/api/offers/${id}/download`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Delete offer
  deleteOffer: async (id: string): Promise<ApiResponse<string>> => {
    try {
      const response: AxiosResponse<ApiResponse<string>> = await api.delete(`/api/offers/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get available offer statuses
  getAvailableStatuses: async (): Promise<ApiResponse<OfferStatus[]>> => {
    try {
      const response: AxiosResponse<ApiResponse<OfferStatus[]>> = await api.get('/api/offers/statuses');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Health check
  healthCheck: async (): Promise<ApiResponse<string>> => {
    try {
      const response: AxiosResponse<ApiResponse<string>> = await api.get('/api/offers/health');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

// Purchases API methods
export const purchasesApi = {
  create: async (projectId: string, file: File, notes?: string): Promise<ApiResponse<any>> => {
    try {
      const form = new FormData();
      form.append('data', new Blob([JSON.stringify({ projectId, notes })], { type: 'application/json' }));
      form.append('file', file);
      const response = await api.post('/api/purchases', form);
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  },
  my: async (): Promise<ApiResponse<any[]>> => {
    try {
      const response = await api.get('/api/purchases/my');
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  },
  adminList: async (): Promise<ApiResponse<PurchaseResponse[]>> => {
    try {
      const response = await api.get('/api/admin/purchases');
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  },
  adminUpdateStatus: async (id: string, status: string): Promise<ApiResponse<any>> => {
    try {
      const response = await api.put(`/api/admin/purchases/${id}/status?status=${status}`);
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError<ErrorResponse>);
    }
  }
};

// Token management utilities
export const tokenUtils = {
  setToken: (token: string) => {
    localStorage.setItem('authToken', token);
  },

  getToken: (): string | null => {
    return localStorage.getItem('authToken');
  },

  removeToken: () => {
    localStorage.removeItem('authToken');
  },

  isTokenValid: (token: string): boolean => {
    try {
      // Basic JWT structure check
      const parts = token.split('.');
      if (parts.length !== 3) return false;

      // Decode payload
      const payload = JSON.parse(atob(parts[1]));

      // Check expiration
      if (payload.exp && Date.now() >= payload.exp * 1000) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }
};